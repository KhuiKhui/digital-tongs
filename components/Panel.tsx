import { cn } from '@/lib/utils';
import Button from './Button';
import { useAtom } from 'jotai';
import { charAtom } from '@/store';
import Image from 'next/image';

interface PanelProps extends React.ComponentPropsWithRef<'div'> {
  setVisibility: (visibility: boolean) => void;
}

export default function Panel({
  setVisibility,
  className,
  ...inputs
}: PanelProps) {
  const [pulls, setPulls] = useAtom(charAtom);
  return (
    <div
      className={cn(
        'absolute flex h-[80%] w-[60%] flex-col items-center gap-4 rounded-md border-2 border-black bg-red-500 p-4',
        className,
      )}
      {...inputs}
    >
      <Button
        className="absolute left-[85%] px-4 py-2"
        label="x"
        onClick={() => setVisibility(false)}
      />
      <div className="font-bold">Congrats!!</div>
      <Image
        alt="char"
        width={500}
        height={1000}
        src={'/' + pulls[pulls.length - 1]}
        className="size-full object-cover select-none"
      />
      <div className="font-bold">
        You got{' '}
        {pulls.length > 0 &&
          pulls[pulls.length - 1]
            .slice(0, pulls[pulls.length - 1].length - 4)
            .toUpperCase()}
      </div>
    </div>
  );
}
