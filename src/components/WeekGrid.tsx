import React from 'react';
import clsx from 'clsx/lite';

interface WeeksGridProps {
  weeksLived: number;
  totalWeeks: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const WeeksGrid: React.FC<WeeksGridProps> = ({
  weeksLived,
  totalWeeks,
  containerRef,
}) => (
  <div
    ref={containerRef}
    className="w-full h-fit grid grid-cols-[repeat(52,6px)] gap-2 justify-center"
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
);