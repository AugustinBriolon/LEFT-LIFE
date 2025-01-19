import clsx from 'clsx/lite';
import { forwardRef, useState } from 'react';
import Chart from './Chart';
import { ChartIcon } from './Icons';

interface StatsModalProps {
  weeksLived: number;
  totalWeeks: number;
}

export const StatsModal = forwardRef<HTMLButtonElement, StatsModalProps>(({
  weeksLived,
  totalWeeks,
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const remainingWeeks = totalWeeks - weeksLived;

  return (
    <>
      <button
        ref={ref}
        className='fixed bottom-6 right-6 flex items-center gap-2 bg-white/15 hover:bg-white/10 text-white px-4 py-2 opacity-0 scale-0'
        onClick={() => setIsOpen(true)}
      >
        <ChartIcon className='w-5 h-5' />
      </button>

      <div
        className={clsx(
          'fixed inset-0 bg-black/80 backdrop-blur-sm',
          !isOpen && 'hidden'
        )}
        onClick={() => setIsOpen(false)}
      >
        <div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-zinc-900 text-white p-8'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-3xl font-bold uppercase'>Statistiques</h2>
            <button
              className='text-white/60 hover:text-white transition-colors'
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className='space-y-6'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='bg-white/5 p-4'>
                <p className='text-sm text-white/60'>Semaines vécues</p>
                <p className='text-3xl font-bold'>
                  {weeksLived.toLocaleString()}
                </p>
              </div>
              <div className='bg-white/5 p-4'>
                <p className='text-sm text-white/60'>Semaines restantes</p>
                <p className='text-3xl font-bold'>
                  {remainingWeeks.toLocaleString()}
                </p>
              </div>
            </div>
            <div className='flex justify-between items-center gap-2'>
              <Chart desktop={weeksLived} mobile={totalWeeks} texte='Vécues' />
              <Chart desktop={remainingWeeks} mobile={totalWeeks} texte='Restantes' />
            </div>
          </div>

          <div className='mt-8 flex justify-end'>
            <button
              className='bg-white/15 hover:bg-white/10 px-6 py-2 transition-colors duration-300'
              onClick={() => setIsOpen(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
