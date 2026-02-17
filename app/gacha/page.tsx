'use client';
import Button from '@/components/Button';
import {
  charAtom,
  fundsAtom,
  gachaOneRollModalAtom,
  gachaTenRollModalAtom,
} from '@/store';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import Image from 'next/image';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import { gacha } from '@/lib/gacha';
import { saveData } from '@/lib/data';

export default function Gacha() {
  const [funds, setFunds] = useAtom(fundsAtom);
  const setOneRollModalState = useSetAtom(gachaOneRollModalAtom);
  const setTenRollModalState = useSetAtom(gachaTenRollModalAtom);
  const [pulls, setPulls] = useAtom(charAtom);
  return (
    <div className="relative">
      <div className="flex size-full flex-col items-center justify-center gap-8 p-4">
        <div className="flex flex-row items-center justify-evenly gap-8">
          <ArrowBigLeft size={48} />
          <Image
            alt="gacha"
            width={500}
            height={1000}
            src="/gacha.png"
            className="transition-transform select-none active:scale-105 active:rotate-3"
          />
          <ArrowBigRight size={48} />
        </div>
        <div>10 DD</div>
        <div className="flex w-1/2 flex-row items-center justify-between gap-4">
          <Button
            onClick={() => {
              const newChar = gacha();
              setPulls([...pulls, newChar]);
              setFunds(funds - 10);
              setOneRollModalState(true);
              saveData({ chars: [...pulls, newChar] });
              localStorage.setItem(
                'chars',
                JSON.stringify([...pulls, newChar]),
              );
            }}
            label="x1"
            className="min-w-20"
            disabled={funds < 10}
          />
          <Button
            onClick={() => {
              const newChars = [];
              for (let i = 0; i < 10; i++) {
                newChars.push(gacha());
              }

              setPulls([...pulls, ...newChars]);

              setFunds(funds - 10 * 10);
              setTenRollModalState(true);
              saveData({ chars: [...pulls, ...newChars] });
              localStorage.setItem(
                'chars',
                JSON.stringify([...pulls, ...newChars]),
              );
            }}
            label="x10"
            className="min-w-20"
            disabled={funds < 10 * 10}
          />
        </div>
      </div>
    </div>
  );
}
