import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';

export const DateInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({
  className,
  ...props
}, ref) => (
  <input
    ref={ref}
    className={clsx("w-16 p-2 text-center bg-black focus:outline-white/20 focus:outline-1 text-white" , className)}
    inputMode='numeric'
    {...props}
    type="text"
  />
));