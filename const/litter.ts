interface Litter {
  name: string;
  money: number;
  exp: number;
  desc: string;
  rarity: 'common' | 'rare' | 'legendary';
}

type LitterRecord = Record<string, Litter>;

export const litter: LitterRecord = {
  plastic: {
    name: 'Plastic',
    money: 5,
    exp: 5,
    desc: 'common plastic, comes in many different shapes and sizes',
    rarity: 'common',
  },
  metal: {
    name: 'Metal',
    money: 20,
    exp: 10,
    desc: 'shiny and valuable, but still trash',
    rarity: 'rare',
  },
  glass: {
    name: 'Glass',
    money: 50,
    exp: 50,
    desc: 'you do NOT want to step on one of these...',
    rarity: 'legendary',
  },
};
