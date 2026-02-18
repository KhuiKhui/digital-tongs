'use client';
import Panel from '../Panel';
import Image from 'next/image';
import Button from '../Button';
import { cn } from '@/lib/utils';
import { useAtom } from 'jotai';
import { charAtom, charAfterRollAtom, gachaTenRollModalAtom } from '@/store';
import { characters } from '@/const/characters';

export default function GachaTenRollModal() {
  const [tenRollModal, setTenRollModalState] = useAtom(gachaTenRollModalAtom);
  const [charAfterRoll, setCharAfterRoll] = useAtom(charAfterRollAtom);
  return (
    <Panel
      className={cn('top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2', {
        hidden: !tenRollModal,
      })}
      setVisibility={setTenRollModalState}
    >
      <div className="font-bold">Congrats!!</div>
      <div className="grid size-full auto-rows-fr grid-cols-5 items-center justify-center gap-4 overflow-auto p-4">
        {charAfterRoll.map((char: string, id: number) => {
          return (
            <div
              key={id}
              className="flex flex-col items-center justify-center gap-2"
            >
              <Image
                alt="char"
                width={500}
                height={1000}
                src={characters[char].path}
                className="size-60 cursor-pointer rounded-md object-cover transition-all select-none hover:rotate-3"
              />
              <div className="text-xl font-bold">{characters[char].name}</div>
            </div>
          );
        })}
      </div>
      <Button
        className="w-full px-4 py-2"
        label="Yay!!!"
        onClick={() => setTenRollModalState(false)}
      />
    </Panel>
  );
}
