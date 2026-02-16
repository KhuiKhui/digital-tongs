'use client';
import { useAtomValue } from 'jotai';
import LevelBar from './LevelBar';
import { fundsAtom } from '@/store';

export default function Figures() {
  const funds = useAtomValue(fundsAtom);
  return (
    <div className="flex flex-col gap-2">
      <div>
        <div className="inline font-bold">Funds:</div> {funds} DD
      </div>
      <LevelBar />
    </div>
  );
}
