import { RefObject } from 'react';
import { DateInputs } from '../types/types';
import { DateInput } from './DateInput';

interface DateInputGroupProps {
  dateInputs: DateInputs;
  onInputChange: (field: keyof DateInputs, value: string) => void;
  onDateChange: () => void;
  error: string;
  refs: {
    day: RefObject<HTMLInputElement | null>;
    month: RefObject<HTMLInputElement | null>;
    year: RefObject<HTMLInputElement | null>;
  };
}

export const DateInputGroup = ({
  dateInputs,
  onInputChange,
  onDateChange,
  error,
  refs,
}: DateInputGroupProps) => (
  <div className="flex flex-col items-end gap-4 w-fit ">
    <div className="flex items-center gap-2 text-xl">
      <DateInput
        ref={refs.day}
        maxLength={2}
        placeholder="JJ"
        value={dateInputs.day}
        onChange={(value) => onInputChange('day', value)}
        onKeyUp={onDateChange}
      />
      <span className="text-white">/</span>
      <DateInput
        ref={refs.month}
        maxLength={2}
        placeholder="MM"
        value={dateInputs.month}
        onChange={(value) => onInputChange('month', value)}
        onKeyUp={onDateChange}
      />
      <span className="text-white">/</span>
      <DateInput
        ref={refs.year}
        className='w-20'
        maxLength={4}
        placeholder="AAAA"
        value={dateInputs.year}
        onChange={(value) => onInputChange('year', value)}
        onKeyUp={onDateChange}
      />
    </div>
    {error && <p className="text-red-500 text-center">{error}</p>}
  </div>
);