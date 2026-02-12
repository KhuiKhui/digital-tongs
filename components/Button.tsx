import { cn } from '@/lib/utils';

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  label: string;
}
function Button({ className, label, ...inputs }: ButtonProps) {
  return (
    <div>
      <button
        className={cn('rounded-md p-4 bg-white text-black', className)}
        {...inputs}
      >
        {label}
      </button>
    </div>
  );
}

export default Button;
