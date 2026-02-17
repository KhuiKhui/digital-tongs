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
  children,
  ...inputs
}: PanelProps) {
  const [pulls, setPulls] = useAtom(charAtom);
  return (
    <div
      className={cn(
        'absolute flex h-[90%] w-[60%] flex-col items-center gap-4 rounded-md border-2 border-black bg-yellow-800 p-4',
        className,
      )}
      {...inputs}
    >
      {children}
    </div>
  );
}
