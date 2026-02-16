'use client';
import { useAtom } from 'jotai';
import Button from './Button';
import { expAtom, levelAtom } from '@/store';
import { levelManager } from '@/lib/exp';

export default function Footer() {
  const [lvl, addLvl] = useAtom(levelAtom);
  const [exp, addExp] = useAtom(expAtom);
  return (
    <div className="flex w-full flex-row items-center justify-end p-4">
      <Button
        onClick={() =>
          levelManager({
            currentLvl: lvl,
            setLvl: addLvl,
            currentExp: exp,
            setExp: addExp,
            expGained: 7,
          })
        }
        label="Settings"
      />
    </div>
  );
}
