import React from 'react';
import { DateInput } from './DateInput';
import { DateInputs } from '../types/types';

interface DateInputGroupProps {
  dateInputs: DateInputs;
  onInputChange: (field: keyof DateInputs, value: string) => void;
  onDateChange: () => void;
  error: string;
  refs: {
    day: React.RefObject<HTMLInputElement>;
    month: React.RefObject<HTMLInputElement>;
    year: React.RefObject<HTMLInputElement>;
  };
}

export const DateInputGroup: React.FC<DateInputGroupProps> = ({
  dateInputs,
  onInputChange,
  onDateChange,
  error,
  refs,
}) => (
  <div className="flex flex-col items-end gap-4 w-fit">
    <div className="flex items-center gap-2 text-xl">
      <DateInput
        value={dateInputs.day}
        placeholder="JJ"
        onChange={(value) => onInputChange('day', value)}
        onKeyUp={onDateChange}
        maxLength={2}
        inputRef={refs.day}
      />
      <span className="text-white">/</span>
      <DateInput
        value={dateInputs.month}
        placeholder="MM"
        onChange={(value) => onInputChange('month', value)}
        onKeyUp={onDateChange}
        maxLength={2}
        inputRef={refs.month}
      />
      <span className="text-white">/</span>
      <DateInput
        value={dateInputs.year}
        placeholder="AAAA"
        onChange={(value) => onInputChange('year', value)}
        onKeyUp={onDateChange}
        maxLength={4}
        inputRef={refs.year}
        className='w-20'
      />
    </div>
    {error && <p className="text-red-500 text-center">{error}</p>}
  </div>
);