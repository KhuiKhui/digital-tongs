from ultralytics import YOLO
import requests
import cv2
import numpy as np
import time
import torch
from threading import Timer

# change MODEL_PATH where necessary
MODEL_PATH = "./best.pt"
VIDEO_SOURCE = 1  # Webcam
MAX_MISSING_FRAMES = 15
CONF = 0.25
IOU = 0.5


def PROMINENCE_SCORE(box, conf):
    return (box[2] - box[0]) * (box[3] - box[1]) * conf


TARGET_CLASSES = ["cardboard", "cigarette", "glass", "metal", "paper", "plastic"]
detection_count = {
    "cardboard": 0,
    "cigarette": 0,
    "glass": 0,
    "metal": 0,
    "paper": 0,
    "plastic": 0,
    "none": 0,
}


def get_brightness_and_noise(frame):

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    brightness = cv2.mean(gray)[0]
    kernel = np.array(
        [
            [1, -2, 1],
            [-2, 4, -2],
            [1, -2, 1],
        ],
        dtype=np.float32,
    )
    immerkaer = cv2.filter2D(
        frame, ddepth=cv2.CV_32F, kernel=kernel, borderType=cv2.BORDER_REFLECT
    )

    inner = immerkaer[1:-1, 1:-1]
    noise = np.sqrt(np.pi / 2.0) * np.mean(np.abs(inner)) / 6.0
    return brightness, noise


# Prepare model
torch.set_num_threads(2)
torch.backends.mkldnn.enabled = True
device = "cpu"

model = YOLO(MODEL_PATH)
frame_idx = 0
disposed_log = []
request_ready = True
tracking_state = False


# Utilities
def set_ready():
    global request_ready
    request_ready = True


def to_numpy(x):
    if x is None:
        return None
    try:
        return x.cpu().numpy()
    except Exception:
        return np.array(x)


# Track model
tracked_id = None
tracked_class = None
missing_frames = 0

results = model.track(
    source=VIDEO_SOURCE,
    stream=True,
    conf=CONF,
    iou=IOU,
    persist=True,
    imgsz=640,
    device=device,
)
last_saved_name = None
average_brightness = 0
average_noise = 0

for r in results:
    if frame_idx >= 100:
        break
    frame_idx += 1
    frame = r.orig_img.copy()
    detections = []

    if r.boxes is not None and len(r.boxes) > 0:
        # Properties of tracked item
        boxes = r.boxes.xyxy.cpu().numpy()
        confs = r.boxes.conf.cpu().numpy()
        classes = r.boxes.cls.cpu().numpy()
        ids = r.boxes.id

        boxes = np.asarray(boxes, dtype=float)
        confs = np.asarray(confs, dtype=float).ravel()
        classes = np.asarray(classes, dtype=int).ravel()

        if ids is None:
            ids = np.full(len(boxes), -1, dtype=int)
        else:
            ids = np.asarray(ids, dtype=int).ravel()

        for box, conf, cls_id, track_id in zip(boxes, confs, classes, ids):
            bbox = box.tolist()
            cls_id = int(cls_id)
            cls_name = (
                TARGET_CLASSES[cls_id] if cls_id < len(TARGET_CLASSES) else str(cls_id)
            )

            detections.append(
                {
                    "bbox": bbox,  # bounding box
                    "conf": float(conf),  # confidence score
                    "cls_id": cls_id,
                    "cls_name": cls_name,
                    "track_id": int(track_id),  # unique id of object
                }
            )

            last_saved_name = cls_name

    # If there are no tracked objects
    if tracked_id is None and detections:
        scores = [PROMINENCE_SCORE(d["bbox"], d["conf"]) for d in detections]
        best = detections[int(np.argmax(scores))]
        tracked_id = best["track_id"]
        tracked_class = best["cls_name"]
        missing_frames = 0

    # Check if still visible
    active_detection = None
    if tracked_id is not None:
        for d in detections:
            if d["track_id"] == tracked_id:
                active_detection = d
                break

        if active_detection:
            missing_frames = 0
        else:
            missing_frames += 1

        # Object gone
        if missing_frames > MAX_MISSING_FRAMES:
            disposed_log.append(
                {"class": tracked_class, "frame": frame_idx, "time": time.time()}
            )
            tracked_id = None
            tracked_class = None
            missing_frames = 0

            # http_post(last_saved_name)

    if len(detections) == 0:
        detection_count["none"] += 1

    cur_brightness, cur_noise = get_brightness_and_noise(frame)
    average_brightness += cur_brightness
    average_noise += cur_noise
    for d in detections:
        x1, y1, x2, y2 = map(int, d["bbox"])

        if tracked_id is not None and d["track_id"] == tracked_id:
            color = (0, 255, 0)  # tracked = green
            thickness = 3
            label = f"TRACKED: {d['cls_name']} ID:{d['track_id']}"
            detection_count[d["cls_name"]] += 1
        else:
            color = (200, 200, 200)
            thickness = 1
            label = f"{d['cls_name']} ID:{d['track_id']}"

        cv2.rectangle(frame, (x1, y1), (x2, y2), color, thickness)
        cv2.putText(frame, label, (x1, y1 - 8), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

    cv2.putText(
        frame,
        f"Frame: {frame_idx}",
        (10, 25),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.6,
        (255, 255, 255),
        2,
    )
    cv2.putText(
        frame,
        "Press 'd' to dispose | 'q' to quit",
        (10, frame.shape[0] - 10),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.5,
        (255, 255, 255),
        1,
    )

    cv2.imshow("Single Object Tracking", frame)

    key = cv2.waitKey(1) & 0xFF

    if key == ord("q"):
        break

    if key == ord("d") and tracked_id is not None:
        disposed_log.append(
            {
                "class": tracked_class,
                "frame": frame_idx,
                "time": time.time(),
                "manual": True,
            }
        )
        tracked_id = None
        tracked_class = None
        missing_frames = 0

print(detection_count)

total = 0
for key, value in detection_count.items():
    total += value

print("average_brightness:", round(average_brightness / 100 / 255, 2))
print("average_noise:", round(average_noise / 100, 2))
print("success_rate:", round(detection_count["plastic"] / total, 2))
cv2.destroyAllWindows()
