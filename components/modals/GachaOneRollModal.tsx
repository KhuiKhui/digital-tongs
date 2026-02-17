'use client';
import Panel from '../Panel';
import Image from 'next/image';
import Button from '../Button';
import { cn } from '@/lib/utils';
import { useAtom } from 'jotai';
import { charAtom, charAfterRollAtom, gachaOneRollModalAtom } from '@/store';

export default function GachaOneRollModal() {
  const [oneRollModal, setOneRollModalState] = useAtom(gachaOneRollModalAtom);
  const [charAfterRoll, setCharAfterRoll] = useAtom(charAfterRollAtom);
  return (
    <Panel
      className={cn('top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2', {
        hidden: !oneRollModal,
      })}
      setVisibility={setOneRollModalState}
    >
      <div className="text-xl font-bold">Congrats!!</div>
      <Image
        alt="char"
        width={500}
        height={1000}
        src={'/' + charAfterRoll[0]}
        className="size-full rounded-md object-cover select-none"
      />
      <div className="text-xl font-bold">
        You got{' '}
        {charAfterRoll.length > 0 &&
          charAfterRoll[0].slice(0, charAfterRoll[0].length - 4).toUpperCase()}
        !!
      </div>
      <Button
        className="w-full px-4 py-2"
        label="Yay!!!"
        onClick={() => setOneRollModalState(false)}
      />
    </Panel>
  );
}
