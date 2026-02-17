'use client';
import Panel from '../Panel';
import Image from 'next/image';
import Button from '../Button';
import { cn } from '@/lib/utils';
import { useAtom } from 'jotai';
import { charAtom, charAfterRollAtom, gachaTenRollModalAtom } from '@/store';

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
      <div className="grid size-full auto-rows-auto grid-cols-3 items-center justify-center gap-4 overflow-auto p-4">
        {charAfterRoll.map((char: string, id: number) => {
          return (
            <Image
              key={id}
              alt="char"
              width={500}
              height={1000}
              src={'/' + char}
              className="size-60 cursor-pointer rounded-md object-cover transition-all select-none hover:rotate-3"
            />
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
