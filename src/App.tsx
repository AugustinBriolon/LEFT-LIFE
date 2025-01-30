import { useRef, useState } from 'react';
import { DateInputGroup } from '@/components/DateInputGroup';
import { WeeksGrid } from '@/components/WeekGrid';
import { useAnimation } from '@/hooks/useAnimation';
import { DateInputs } from '@/types/types';
import {
  isValidDate,
  isDateInRange,
  formatDateString,
  calculateWeeksLived,
} from './utils/dateUtils';
import { StatsModal } from '@/components/StatsModal';
import { Cursor } from '@/components/Cursor';
import { usePostTimeEntries } from '@/api/post.handler';

export default function App() {
  const [dateInputs, setDateInputs] = useState<DateInputs>({
    day: '',
    month: '',
    year: '',
  });
  const [weeksLived, setWeeksLived] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [isDateSet, setIsDateSet] = useState(false);

  const { mutate } = usePostTimeEntries();

  const TOTAL_WEEKS = 90 * 52;

  const dayInputRef = useRef(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef(null);
  const inputsContainerRef = useRef(null);
  const squaresContainerRef = useRef(null);
  const buttonStatsRef = useRef(null);

  const { startAnimation } = useAnimation(
    titleRef,
    inputsContainerRef,
    squaresContainerRef,
    buttonStatsRef,
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

      console.log( {birthdate: dateStr, timeleft: TOTAL_WEEKS - calculatedWeeks });
      if(!isDateSet) {
        mutate({ birthdate: dateStr, timeleft: TOTAL_WEEKS - calculatedWeeks });
      }
      setIsDateSet(true);
      startAnimation();
    }
  };

  return (
    <div className="relative flex h-dvh w-screen items-center justify-center overflow-hidden">
      <Cursor />
      <h1 ref={titleRef} className="absolute w-fit whitespace-pre text-center text-3xl text-white">
        LEFT
        <br />
        TIME
      </h1>

      <div ref={inputsContainerRef} className="absolute">
        <DateInputGroup
          dateInputs={dateInputs}
          error={error}
          refs={{ day: dayInputRef, month: monthInputRef, year: yearInputRef }}
          onDateChange={handleDateChange}
          onInputChange={handleInputChange}
        />
      </div>

      {weeksLived && (
        <WeeksGrid ref={squaresContainerRef} totalWeeks={TOTAL_WEEKS} weeksLived={weeksLived} />
      )}

      {weeksLived && (
        <StatsModal ref={buttonStatsRef} totalWeeks={TOTAL_WEEKS} weeksLived={weeksLived} />
      )}
    </div>
  );
}
