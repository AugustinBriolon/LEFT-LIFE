import React from 'react';
import { InputProps } from '../types/types';
import clsx from 'clsx';

export const DateInput: React.FC<InputProps> = ({
  value,
  placeholder,
  onChange,
  onKeyUp,
  maxLength,
  inputRef,
  className
}) => (
  <input
    ref={inputRef}
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyUp={onKeyUp}
    className={clsx("w-16 p-2 text-center bg-black focus:outline-white/20 focus:outline-1 text-white" , className)}
    maxLength={maxLength}
  />
);