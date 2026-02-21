'use client';
import { useAtom, useSetAtom } from 'jotai';
import {
  chooseCharModalAtom,
  charAtom,
  chosenCharAtom,
  expBuffAtom,
  moneyBuffAtom,
} from '@/store';
import { cn } from '@/lib/utils';
import Panel from '../Panel';
import Button from '../Button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { saveData } from '@/lib/data';
import { characters } from '@/const/characters';

export default function ChooseModal() {
  const [chooseModal, setChooseModalState] = useAtom(chooseCharModalAtom);
  const [pulls, setPulls] = useAtom(charAtom);
  const [chosenCharInModal, setChosenCharInModal] = useState<null | number>(
    null,
  );
  const [chosenChar, setChosenChar] = useAtom(chosenCharAtom);
  const setMoneyBuff = useSetAtom(moneyBuffAtom);
  const setExpBuff = useSetAtom(expBuffAtom);

  useEffect(() => {
    if (localStorage.getItem('chars')) {
      setPulls(JSON.parse(localStorage.getItem('chars')!));
    }
  }, []);
  return (
    <Panel
      className={cn('top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2', {
        hidden: !chooseModal,
      })}
      setVisibility={setChooseModalState}
    >
      <div className="grid size-full auto-rows-fr grid-cols-4 justify-center gap-4 overflow-auto p-4">
        {pulls.length > 0 &&
          pulls.map((char: string, id: number) => {
            return (
              <div
                key={id}
                className="flex flex-col items-center justify-center gap-1"
              >
                <Image
                  alt="char"
                  width={500}
                  height={1000}
                  src={characters[char].path}
                  className={cn(
                    'size-full cursor-pointer rounded-md object-cover transition-all select-none hover:rotate-3',
                    {
                      'scale-105 border-2 border-black':
                        chosenCharInModal === id,
                    },
                  )}
                  onClick={() => {
                    if (chosenCharInModal === id) {
                      setChosenCharInModal(null);
                    } else {
                      setChosenCharInModal(id);
                    }
                  }}
                />
                <div className="text-xl font-bold">{characters[char].name}</div>
              </div>
            );
          })}
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <Button
          className="w-full px-4 py-2"
          label="Cancel"
          onClick={() => setChooseModalState(false)}
        />
        <Button
          className="w-full px-4 py-2 hover:bg-red-600 disabled:bg-gray-500"
          label="Delete"
          disabled={chosenCharInModal === null}
          onClick={() => {
            setPulls(() => pulls.filter((_, i) => i !== chosenCharInModal));
            setChosenCharInModal(null);
          }}
        />
        <Button
          className="w-full px-4 py-2 disabled:bg-gray-500"
          label="Choose"
          disabled={chosenCharInModal === null}
          onClick={() => {
            setChooseModalState(false);
            setChosenCharInModal(null);
            setChosenChar(pulls[chosenCharInModal!]);
            setExpBuff(characters[pulls[chosenCharInModal!]].expbuff);
            setMoneyBuff(characters[pulls[chosenCharInModal!]].moneybuff);

            saveData({ chosenChar: pulls[chosenCharInModal!] });
          }}
        />
      </div>
    </Panel>
  );
}
