'use client';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { charAtom, chosenCharAtom } from '@/store';
import { useEffect } from 'react';

export default function Home() {
  const [chosenChar, setChosenChar] = useAtom(chosenCharAtom);

  return (
    <div className="flex size-full flex-row items-center justify-center p-4">
      <div className="flex h-2/3 w-1/4 items-center justify-center">
        {chosenChar ? (
          <div className="flex size-full flex-col items-center justify-center gap-6">
            <Image
              alt="char"
              width={500}
              height={1000}
              src={'/' + chosenChar}
              className="size-full rounded-md object-cover transition-transform select-none active:scale-105 active:rotate-3"
            />
            <div className="cursor-pointer rounded-full border-2 border-yellow-900 bg-yellow-500 px-8 py-2 text-xl font-bold transition-colors hover:bg-yellow-400">
              {chosenChar[0].toUpperCase() +
                chosenChar.slice(1, chosenChar.length - 4)}
            </div>
          </div>
        ) : (
          <div>Choose a character! If you don't have any, roll!</div>
        )}
      </div>
    </div>
  );
}
