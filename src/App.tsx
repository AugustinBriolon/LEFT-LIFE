import React, { useRef, useState } from 'react';
import { DateInputGroup } from './components/DateInputGroup';
import { WeeksGrid } from './components/WeekGrid';
import { useLifeAnimation } from './hooks/useLifeAnimation';
import { DateInputs } from './types/types';
import {
  isValidDate,
  isDateInRange,
  formatDateString,
  calculateWeeksLived,
} from './utils/dateUtils';

const TOTAL_WEEKS = 90 * 52;

export default function App() {
  const [dateInputs, setDateInputs] = useState<DateInputs>({
    day: '',
    month: '',
    year: '',
  });
  const [weeksLived, setWeeksLived] = useState<number | null>(null);
  const [error, setError] = useState('');

  const dayInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const inputsContainerRef = useRef<HTMLDivElement>(null);
  const squaresContainerRef = useRef<HTMLDivElement>(null);

  const { startAnimation } = useLifeAnimation(
    titleRef,
    inputsContainerRef,
    squaresContainerRef
  );

  const handleInputChange = (field: keyof DateInputs, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const maxLength = field === 'year' ? 4 : 2;
    if (value.length > maxLength) return;

    setDateInputs((prev) => ({ ...prev, [field]: value }));
    setError('');

    if (value.length === maxLength) {
      if (field === 'day') {
        monthInputRef.current?.focus();
      } else if (field === 'month') {
        yearInputRef.current?.focus();
      }
    }
  };

  const handleDateChange = () => {
    const { day, month, year } = dateInputs;
    if (day.length === 2 && month.length === 2 && year.length === 4) {
      const numDay = parseInt(day, 10);
      const numMonth = parseInt(month, 10);
      const numYear = parseInt(year, 10);

      if (!isValidDate(numDay, numMonth, numYear)) {
        setError('Date invalide');
        return;
      }

      const dateStr = formatDateString(dateInputs);
      if (!isDateInRange(dateStr)) {
        setError("La date doit être entre aujourd'hui et il y a 90 ans");
        return;
      }

      const calculatedWeeks = calculateWeeksLived(dateStr);
      setWeeksLived(calculatedWeeks);

      if (weeksLived) startAnimation();
    }
  };

  return (
    <div className='relative h-screen w-screen flex items-center justify-center bg-black overflow-hidden'>
      <h1
        ref={titleRef}
        className='absolute text-white text-6xl w-fit text-center'
      >
        LEFT LIFE
      </h1>

      <div ref={inputsContainerRef} className="absolute">
      <DateInputGroup
        dateInputs={dateInputs}
        onInputChange={handleInputChange}
        onDateChange={handleDateChange}
        error={error}
        refs={{ day: dayInputRef, month: monthInputRef, year: yearInputRef }}
      />
    </div>

      {weeksLived && (
        <WeeksGrid
          weeksLived={weeksLived}
          totalWeeks={TOTAL_WEEKS}
          containerRef={squaresContainerRef}
        />
      )}
    </div>
  );
}
