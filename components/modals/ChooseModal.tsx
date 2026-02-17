'use client';
import { useAtom } from 'jotai';
import { chooseCharModalAtom, charAtom, chosenCharAtom } from '@/store';
import { cn } from '@/lib/utils';
import Panel from '../Panel';
import Button from '../Button';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ChooseModal() {
  const [chooseModal, setChooseModalState] = useAtom(chooseCharModalAtom);
  const [pulls, setPulls] = useAtom(charAtom);
  const [chosenCharInModal, setChosenCharInModal] = useState<null | number>(
    null,
  );
  const [chosenChar, setChosenChar] = useAtom(chosenCharAtom);

  useEffect(() => {
    if (localStorage.getItem('chars')) {
      console.log('REFRESH');
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
      <div className="grid size-full auto-rows-auto grid-cols-3 justify-center gap-4 overflow-auto p-4">
        {pulls.map((char: string, id: number) => {
          return (
            <Image
              key={id}
              alt="char"
              width={500}
              height={1000}
              src={'/' + char}
              className={cn(
                'size-60 cursor-pointer rounded-md object-cover transition-all select-none hover:rotate-3',
                {
                  'scale-105 border-2 border-black': chosenCharInModal === id,
                },
              )}
              onClick={() => {
                if (chosenCharInModal && chosenCharInModal === id) {
                  setChosenCharInModal(null);
                } else {
                  setChosenCharInModal(id);
                }
              }}
            />
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
          className="w-full px-4 py-2 disabled:bg-gray-500"
          label="Choose"
          disabled={chosenCharInModal === null}
          onClick={() => {
            setChooseModalState(false);
            setChosenChar(pulls[chosenCharInModal!]);
          }}
        />
      </div>
    </Panel>
  );
}
