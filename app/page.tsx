'use client';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { charAtom } from '@/store';

export default function Home() {
  const [pulls, setPulls] = useAtom(charAtom);
  return (
    <div className="flex size-full flex-row items-center justify-center p-4">
      <div className="h-2/3 w-1/4">
        <Image
          alt="char"
          width={500}
          height={1000}
          src="/tighnari.jpg"
          className="size-full object-cover transition-transform select-none active:scale-105 active:rotate-3"
        />
      </div>
    </div>
  );
}
