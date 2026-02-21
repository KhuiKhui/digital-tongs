'use client';
import Image from 'next/image';
import { useAtom, useSetAtom } from 'jotai';
import {
  levelAtom,
  expAtom,
  charAtom,
  chosenCharAtom,
  fundsAtom,
  labelAtom,
  labelModalAtom,
} from '@/store';
import { characters } from '@/const/characters';
import { useEffect } from 'react';
import { litter } from '@/const/litter';
import { levelManager } from '@/lib/exp';

export default function Home() {
  const [chosenChar, setChosenChar] = useAtom(chosenCharAtom);
  const [lvl, setLvl] = useAtom(levelAtom);
  const [exp, setExp] = useAtom(expAtom);
  const [funds, setFunds] = useAtom(fundsAtom);
  const [label, setLabel] = useAtom(labelAtom);
  const setLabelModal = useSetAtom(labelModalAtom);

  useEffect(() => {
    if (localStorage.getItem('level')) {
      setLvl(JSON.parse(localStorage.getItem('level')!));
    }
    if (localStorage.getItem('exp')) {
      setExp(JSON.parse(localStorage.getItem('exp')!));
    }
    if (localStorage.getItem('funds')) {
      setFunds(JSON.parse(localStorage.getItem('funds')!));
    }
    if (localStorage.getItem('chosenChar')) {
      setChosenChar(localStorage.getItem('chosenChar')!);
    }

    const es = new EventSource('/api');
    es.onopen = () => {
      console.log('SSE connection established');
    };
    es.onmessage = (e) => {
      console.log(e);
      const litterType = JSON.parse(e.data).label;
      const litterObj = litter[litterType];
      setLabel(litterType);
      setLabelModal(true);

      levelManager({
        currentLvl: JSON.parse(localStorage.getItem('level')!),
        setLvl: setLvl,
        currentExp: JSON.parse(localStorage.getItem('exp')!),
        setExp: setExp,
        expGained: litterObj.exp,
      });

      setFunds((funds) => funds + litterObj.money);
    };
    return () => es.close();
  }, []);

  useEffect(() => {
    localStorage.setItem('level', lvl + '');
    localStorage.setItem('exp', exp + '');
    localStorage.setItem('funds', funds + '');
    localStorage.setItem('chosenChar', chosenChar);
  }, [lvl, exp, funds, chosenChar]);

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
