'use client';
import { useAtom, useAtomValue } from 'jotai';
import Button from './Button';
import {
  expAtom,
  expBuffAtom,
  isPickingLitter,
  levelAtom,
  moneyBuffAtom,
} from '@/store';
import { levelManager } from '@/lib/exp';

export default function Footer() {
  const [lvl, addLvl] = useAtom(levelAtom);
  const [exp, addExp] = useAtom(expAtom);
  const moneyBuff = useAtomValue(moneyBuffAtom);
  const expBuff = useAtomValue(expBuffAtom);
  const [isPick, setPick] = useAtom(isPickingLitter);
  return (
    <div className="flex w-full flex-row items-center justify-end p-4">
      <Button
        onClick={() => setPick(!isPick)}
        label={'Pick litter mode: ' + isPick}
      />
    </div>
  );
}
