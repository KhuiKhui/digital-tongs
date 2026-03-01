import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const expAtom = atomWithStorage('exp', 0);
export const levelAtom = atomWithStorage('level', 1);
export const fundsAtom = atomWithStorage('funds', 1000);
export const labelAtom = atom<string>('plastic');

export const charAtom = atomWithStorage<string[]>('chars', []);
export const charAfterRollAtom = atom<string[]>([]);
export const chosenCharAtom = atomWithStorage('chosenChar', '');
export const moneyBuffAtom = atom(1);
export const expBuffAtom = atom(1);

export const gachaOneRollModalAtom = atom(false);
export const gachaTenRollModalAtom = atom(false);
export const chooseCharModalAtom = atom(false);
export const labelModalAtom = atom(false);
