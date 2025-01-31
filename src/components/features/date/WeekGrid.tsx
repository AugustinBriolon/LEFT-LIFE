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
    className="mt-0 md:mt-2 p-2 w-fit max-h-grid h-full grid grid-cols-[repeat(52,6px)] grid-rows-[repeat(90,4px)] md:grid-rows-[repeat(90,6px)] gap-[1px] md:gap-1 content-center justify-center overflow-y-scroll"
  >
    {Array.from({ length: totalWeeks }, (_, index) => (
      <div
        key={index}
        className={clsx(
          'week-square w-[3px] md:w-[5px] h-[3px] md:h-[5px] opacity-0 scale-0 will-change-transform rounded-one',
          index < weeksLived ? 'bg-white/20 ' : 'bg-white'
        )}
      />
    ))}
  </div>
));