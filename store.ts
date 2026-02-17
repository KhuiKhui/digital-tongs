import { atom } from 'jotai';

export const expAtom = atom(0);
export const levelAtom = atom(1);
export const fundsAtom = atom(1000);

export const charAtom = atom<string[]>([]);
export const chosenCharAtom = atom('');
export const moneyBuffAtom = atom(1);
export const expBuffAtom = atom(1);

export const gachaOneRollModalAtom = atom(false);
export const gachaTenRollModalAtom = atom(false);
export const chooseCharModalAtom = atom(false);
