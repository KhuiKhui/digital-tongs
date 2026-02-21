import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({ message: 'Connected!' })}\n\n`,
        ),
      );

      // Cleanup on connection close
      req.signal.addEventListener('abort', () => {
        controller.close();
      });
    },
  });

  // Return the stream with proper headers
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
    },
  });
}
