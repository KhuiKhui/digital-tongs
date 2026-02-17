'use client';
import Panel from '../Panel';
import Image from 'next/image';
import Button from '../Button';
import { cn } from '@/lib/utils';
import { useAtom } from 'jotai';
import { charAtom, gachaOneRollModalAtom } from '@/store';

export default function GachaOneRollModal() {
  const [oneRollModal, setOneRollModalState] = useAtom(gachaOneRollModalAtom);
  const [pulls, setPulls] = useAtom(charAtom);
  return (
    <Panel
      className={cn('top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2', {
        hidden: !oneRollModal,
      })}
      setVisibility={setOneRollModalState}
    >
      <div className="font-bold">Congrats!!</div>
      <Image
        alt="char"
        width={500}
        height={1000}
        src={'/' + pulls[pulls.length - 1]}
        className="size-full rounded-md object-cover select-none"
      />
      <div className="font-bold">
        You got{' '}
        {pulls.length > 0 &&
          pulls[pulls.length - 1]
            .slice(0, pulls[pulls.length - 1].length - 4)
            .toUpperCase()}
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
