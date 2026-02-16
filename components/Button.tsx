import { cn } from '@/lib/utils';

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  label: string;
}
function Button({ className, label, ...inputs }: ButtonProps) {
  return (
    <div>
      <button
        className={cn(
          'cursor-pointer rounded-md bg-white p-4 text-black transition-colors hover:bg-gray-400 active:bg-gray-600',
          className,
        )}
        {...inputs}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
