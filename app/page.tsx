'use client';
import Image from 'next/image';
import { useAtom } from 'jotai';
import {
  levelAtom,
  expAtom,
  charAtom,
  chosenCharAtom,
  fundsAtom,
} from '@/store';
import { characters } from '@/const/characters';
import { useEffect } from 'react';

export default function Home() {
  const [chosenChar, setChosenChar] = useAtom(chosenCharAtom);
  const [lvl, setLvl] = useAtom(levelAtom);
  const [exp, setExp] = useAtom(expAtom);
  const [funds, setFunds] = useAtom(fundsAtom);

  useEffect(() => {
    if (localStorage.getItem('level')) {
      setLvl(JSON.parse(localStorage.getItem('level')!));
    }
    if (localStorage.getItem('level')) {
      setExp(JSON.parse(localStorage.getItem('exp')!));
    }
    if (localStorage.getItem('funds')) {
      setFunds(JSON.parse(localStorage.getItem('funds')!));
    }
    if (localStorage.getItem('chosenChar')) {
      setChosenChar(JSON.parse(localStorage.getItem('chosenChar')!));
    }
  }, []);
  return (
    <div className="flex size-full flex-row items-center justify-center p-4">
      <div className="flex h-[80%] w-1/4 items-center justify-center">
        {chosenChar ? (
          <div className="flex size-full flex-col items-center justify-center gap-6">
            <Image
              alt="char"
              width={500}
              height={1000}
              src={characters[chosenChar].path}
              className="size-90 rounded-md object-cover transition-transform select-none active:scale-105 active:rotate-3"
            />
            <div className="cursor-pointer rounded-full border-2 border-yellow-900 bg-yellow-500 px-8 py-2 text-xl font-bold transition-colors hover:bg-yellow-400">
              {characters[chosenChar].name}
            </div>
            <div className="text-md rounded-xl border-2 border-yellow-900 bg-yellow-500 px-4 py-2 font-bold">
              {characters[chosenChar].desc}
              <div className="mt-4 font-bold">
                rarity: {characters[chosenChar].rarity}
              </div>
              <div className="font-bold">
                money boost: x{characters[chosenChar].moneybuff}
              </div>
              <div className="font-bold">
                exp boost: x{characters[chosenChar].expbuff}
              </div>
            </div>
          </div>
        ) : (
          <div>Choose a character! If you don't have any, roll!</div>
        )}
      </div>
    </div>
  );
}
