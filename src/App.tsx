import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function App() {
  const [dateInputs, setDateInputs] = useState({
    day: '',
    month: '',
    year: '',
  });
  const [weeksLived, setWeeksLived] = useState<boolean[]>([]);
  const [error, setError] = useState('');
  const [isValidDateSubmitted, setIsValidDateSubmitted] = useState(false);

  const dayInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const inputsContainerRef = useRef<HTMLDivElement>(null);
  const weeksContainerRef = useRef<HTMLDivElement>(null);

  const isValidDate = (day: number, month: number, year: number): boolean => {
    const date = new Date(year, month - 1, day);
    return (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year
    );
  };

  const isDateInRange = (dateStr: string): boolean => {
    const inputDate = new Date(dateStr);
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 90);

    return inputDate <= today && inputDate >= minDate;
  };

  const formatDateString = () => {
    const { day, month, year } = dateInputs;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const calculateWeeks = (birthDate: string): boolean[] => {
    const startDate = new Date(birthDate);
    const today = new Date();
    const totalWeeks = 90 * 52;
    const weeksCompleted = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
    );

    return Array.from(
      { length: totalWeeks },
      (_, index) => index < weeksCompleted
    );
  };

  const handleInputChange = (
    field: 'day' | 'month' | 'year',
    value: string
  ) => {
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

  useGSAP(() => {
    gsap.set(titleRef.current, {
      top: '40%',
      left: '50%',
      xPercent: -50,
    });

    gsap.set(inputsContainerRef.current, {
      top: '50%',
      right: '50%',
      xPercent: 50,
    });
  }, []);

  useGSAP(() => {
    if (weeksLived.length > 0 && !isValidDateSubmitted) {
      const timeline = gsap.timeline();

      timeline.to(titleRef.current, {
        top: '2.5rem',
        left: '2.5rem',
        xPercent: 0,
        duration: 1,
        ease: 'power3.inOut'
      });

      timeline.to(inputsContainerRef.current, {
        top: '2.5rem',
        right: '2.5rem',
        xPercent: 0,
        duration: 1,
        ease: 'power3.inOut'
      }, '<');

      timeline.fromTo(
        weeksContainerRef.current,
        {
          opacity: 0,
          scale: 0.9,
          y: 50
        },
        {
          opacity: 1,
          scale: 1,
          y: 50,
          duration: 1,
          ease: 'power3.out'
        },
        '-=0.5'
      );

      setIsValidDateSubmitted(true);
    }
  }, [weeksLived]);

  useEffect(() => {
    const { day, month, year } = dateInputs;
    if (day.length === 2 && month.length === 2 && year.length === 4) {
      const numDay = parseInt(day, 10);
      const numMonth = parseInt(month, 10);
      const numYear = parseInt(year, 10);

      if (!isValidDate(numDay, numMonth, numYear)) {
        setError('Date invalide');
        return;
      }

      const dateStr = formatDateString();
      if (!isDateInRange(dateStr)) {
        setError("La date doit être entre aujourd'hui et il y a 90 ans");
        return;
      }

      const calculatedWeeks = calculateWeeks(dateStr);
      setWeeksLived(calculatedWeeks);
    }
  }, [dateInputs]);

  return (
    <div className='relative h-screen w-screen bg-black overflow-hidden'>
      <h1
        ref={titleRef}
        className="absolute text-white text-6xl"
      >
        LEFT LIFE
      </h1>

      <div
        ref={inputsContainerRef}
        className="absolute flex flex-col gap-4 w-fit"
      >
        <div className='flex items-center gap-2 text-2xl'>
          <input
            ref={dayInputRef}
            type='text'
            placeholder='JJ'
            value={dateInputs.day}
            onChange={(e) => handleInputChange('day', e.target.value)}
            className='w-16 p-2 text-center bg-black focus:outline-white/20 focus:outline-1 text-white'
            maxLength={2}
          />
          <span className='text-white'>/</span>
          <input
            ref={monthInputRef}
            type='text'
            placeholder='MM'
            value={dateInputs.month}
            onChange={(e) => handleInputChange('month', e.target.value)}
            className='w-16 p-2 text-center bg-black focus:outline-white/20 focus:outline-1 text-white'
            maxLength={2}
          />
          <span className='text-white'>/</span>
          <input
            ref={yearInputRef}
            type='text'
            placeholder='AAAA'
            value={dateInputs.year}
            onChange={(e) => handleInputChange('year', e.target.value)}
            className='w-20 p-2 text-center bg-black focus:outline-white/20 focus:outline-1 text-white'
            maxLength={4}
          />
        </div>
        {error && <p className='text-red-500 text-center'>{error}</p>}
      </div>

      {weeksLived.length > 0 && (
        <div
          ref={weeksContainerRef}
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-h-[90vh] grid grid-cols-[repeat(52,10px)] gap-1 justify-center overflow-y-auto opacity-0'
        >
          {weeksLived.map((week, index) => (
            <div
              key={index}
              className={`w-3 h-3 border border-white ${week ? 'bg-white' : 'bg-transparent'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}