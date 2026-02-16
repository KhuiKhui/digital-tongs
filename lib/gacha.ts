const pulls = ['tighnari.jpg', 'aya.jpg', 'yuu.jpg', 'mei.jpg'];

export function gacha() {
  const random = Math.floor(Math.random() * 4);
  return pulls[random];
}
