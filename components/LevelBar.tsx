'use client';
import { expAtom, levelAtom } from '@/store';
import { useAtomValue } from 'jotai';

function LevelBar() {
  const level = useAtomValue(levelAtom);
  const exp = useAtomValue(expAtom);
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="font-bold">Level {level}</div>
      <div className="h-4 w-60 bg-white">
        <div
          style={{ width: `${(exp * 100) / (level * 10)}%` }}
          className="h-4 bg-green-500"
        ></div>
      </div>
    </div>
  );
}

export default LevelBar;
