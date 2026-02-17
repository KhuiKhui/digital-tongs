const common = ['tighnari', 'aya', 'yuu', 'mei'];
const rare = ['koga', 'iroha', 'kaguya'];
const legendary = ['touko', 'vivian'];

export function gacha() {
  const rarityFactor = Math.random();
  if (rarityFactor <= 0.75) {
    const random = Math.floor(Math.random() * common.length);
    return common[random];
  } else if (rarityFactor <= 0.95) {
    const random = Math.floor(Math.random() * rare.length);
    return rare[random];
  } else {
    const random = Math.floor(Math.random() * legendary.length);
    return legendary[random];
  }
}

export function convertDuplicates(char: string, currentChars: string[]) {
  for (let i = 0; i < currentChars.length; i++) {
    if (char === currentChars[i]) {
      return 10;
    }
  }

  return 0;
}
