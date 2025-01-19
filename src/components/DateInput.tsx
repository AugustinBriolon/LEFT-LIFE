import { InputProps } from '@/types/types';
import clsx from 'clsx';
import { forwardRef } from 'react';

export const DateInput = forwardRef<HTMLInputElement, InputProps>(({
  value,
  placeholder,
  onChange,
  onKeyUp,
  maxLength,
  className
}, ref) => (
  <input
    ref={ref}
    className={clsx("w-16 p-2 text-center bg-black focus:outline-white/20 focus:outline-1 text-white" , className)}
    maxLength={maxLength}
    placeholder={placeholder}
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyUp={onKeyUp}
  />
));