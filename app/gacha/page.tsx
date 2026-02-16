'use client';
import Button from '@/components/Button';
import { charAtom, fundsAtom } from '@/store';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import Panel from '@/components/Panel';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { gacha } from '@/lib/gacha';

export default function Gacha() {
  const [funds, setFunds] = useAtom(fundsAtom);
  const [hasPanel, setPanel] = useState(false);
  const [pulls, setPulls] = useAtom(charAtom);
  return (
    <div className="relative">
      <Panel
        className={cn(
          'top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2',
          {
            hidden: !hasPanel,
          },
        )}
        setVisibility={setPanel}
      />
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
              setPulls([...pulls, gacha()]);
              setFunds(funds - 10);
              setPanel(true);
            }}
            label="x1"
            className="min-w-20"
            disabled={funds < 10}
          />
          <Button
            onClick={() => setFunds(funds - 10 * 10)}
            label="x10"
            className="min-w-20"
            disabled={funds < 10 * 10}
          />
        </div>
      </div>
    </div>
  );
}
