import clsx from 'clsx/lite';
import { forwardRef } from 'react';

interface WeeksGridProps {
  weeksLived: number;
  totalWeeks: number;
}

export const WeeksGrid = forwardRef<HTMLInputElement, WeeksGridProps>(({
  weeksLived,
  totalWeeks,
}, ref) => (
  <div
    ref={ref}
    className="mt-1.5 w-fit h-full grid grid-cols-[repeat(52,6px)] grid-rows-[repeat(90,6px)] gap-1 content-center justify-center overflow-y-scroll"
  >
    {Array.from({ length: totalWeeks }, (_, index) => (
      <div
        key={index}
        className={clsx(
          'week-square w-[6px] h-[6px] opacity-0 scale-0 will-change-transform border border-white',
          index < weeksLived && 'bg-white'
        )}
      />
    ))}
  </div>
));