'use client';
import Button from '@/components/Button';
import {
  charAtom,
  expAtom,
  levelAtom,
  fundsAtom,
  gachaOneRollModalAtom,
  gachaTenRollModalAtom,
  charAfterRollAtom,
} from '@/store';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import Image from 'next/image';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import { convertDuplicates, gacha } from '@/lib/gacha';
import { saveData } from '@/lib/data';
import { levelManager } from '@/lib/exp';
import { useEffect } from 'react';

export default function Gacha() {
  const [funds, setFunds] = useAtom(fundsAtom);
  const setOneRollModalState = useSetAtom(gachaOneRollModalAtom);
  const setTenRollModalState = useSetAtom(gachaTenRollModalAtom);
  const [pulls, setPulls] = useAtom(charAtom);
  const [lvl, addLvl] = useAtom(levelAtom);
  const [exp, addExp] = useAtom(expAtom);
  const [charAfterRoll, setCharAfterRoll] = useAtom(charAfterRollAtom);

  const boxCost = 10;

  useEffect(() => {
    if (localStorage.getItem('level')) {
      addLvl(JSON.parse(localStorage.getItem('level')!));
    }
    if (localStorage.getItem('exp')) {
      addExp(JSON.parse(localStorage.getItem('exp')!));
    }
    if (localStorage.getItem('funds')) {
      setFunds(JSON.parse(localStorage.getItem('funds')!));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('level', lvl + '');
    localStorage.setItem('exp', exp + '');
    localStorage.setItem('funds', funds + '');
  }, [lvl, exp, funds]);

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
              setCharAfterRoll([newChar]);
              const expGained = convertDuplicates(newChar, pulls);
              if (expGained === 0) {
                setPulls([...pulls, newChar]);
                localStorage.setItem(
                  'chars',
                  JSON.stringify([...pulls, newChar]),
                );
              } else {
                levelManager({
                  currentLvl: lvl,
                  setLvl: addLvl,
                  currentExp: exp,
                  setExp: addExp,
                  expGained: expGained,
                });
              }
              setFunds(funds - boxCost);
              saveData({ funds: funds - boxCost, chars: [...pulls, newChar] });
              setOneRollModalState(true);
            }}
            label="x1"
            className="min-w-20"
            disabled={funds < boxCost}
          />
          <Button
            onClick={() => {
              let expGained = 0;
              const newChars = [];
              const charsToShow = [];
              for (let i = 0; i < 10; i++) {
                const newChar = gacha();
                charsToShow.push(newChar);
                const expGainedIndiv = convertDuplicates(newChar, [
                  ...pulls,
                  ...newChars,
                ]);
                if (expGainedIndiv === 0) {
                  newChars.push(newChar);
                } else {
                  expGained += expGainedIndiv;
                }
              }

              setCharAfterRoll(charsToShow);
              setPulls([...pulls, ...newChars]);

              localStorage.setItem(
                'chars',
                JSON.stringify([...pulls, ...newChars]),
              );

              levelManager({
                currentLvl: lvl,
                setLvl: addLvl,
                currentExp: exp,
                setExp: addExp,
                expGained: expGained,
              });

              setFunds(funds - 10 * boxCost);
              saveData({
                funds: funds - 10 * boxCost,
                chars: [...pulls, ...newChars],
              });
              setTenRollModalState(true);
            }}
            label="x10"
            className="min-w-20"
            disabled={funds < 10 * boxCost}
          />
        </div>
      </div>
    </div>
  );
}
