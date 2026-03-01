'use client';
import { useSetAtom } from 'jotai';
import Button from './Button';
import { deleteSession } from '@/lib/session';
import {
  charAtom,
  chosenCharAtom,
  expAtom,
  fundsAtom,
  levelAtom,
} from '@/store';
import { RESET } from 'jotai/utils';
export default function LogoutButton() {
  const setChosenChar = useSetAtom(chosenCharAtom);
  const setChars = useSetAtom(charAtom);
  const setExp = useSetAtom(expAtom);
  const setFunds = useSetAtom(fundsAtom);
  const setLevel = useSetAtom(levelAtom);
  return (
    <Button
      onClick={() => {
        // localStorage.clear();
        setChosenChar(RESET);
        setChars(RESET);
        setExp(RESET);
        setFunds(RESET);
        setLevel(RESET);
        deleteSession();
      }}
      label="Logout"
    />
  );
}
