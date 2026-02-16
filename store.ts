import { atom } from 'jotai';

export const expAtom = atom(0);
export const levelAtom = atom(1);
export const fundsAtom = atom(1000);

export const charAtom = atom<string[]>([]);
