import { cn } from '@/lib/utils';
import Link from 'next/link';

interface LinkButtonProps extends React.ComponentPropsWithRef<'button'> {
  label: string;
  href: string;
}
function LinkButton({ className, label, href, ...inputs }: LinkButtonProps) {
  return (
    <Link
      className={cn(
        'flex cursor-pointer items-center justify-center rounded-md bg-yellow-50 p-4 text-black transition-colors hover:bg-gray-400 active:bg-gray-600',
        className,
      )}
      href={href}
    >
      <div>{label}</div>
    </Link>
  );
}

export default LinkButton;
