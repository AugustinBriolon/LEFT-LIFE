import { forwardRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChartIcon } from './Icons';
import clsx from 'clsx';

interface StatsModalProps {
  weeksLived: number;
  totalWeeks: number;
}

export const StatsModal = forwardRef<HTMLButtonElement, StatsModalProps>(
  ({ weeksLived, totalWeeks }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const remainingWeeks = totalWeeks - weeksLived;
    const percentageLived = ((weeksLived * 100) / totalWeeks).toFixed(2);
    const yearsLived = Math.floor(weeksLived / 52);
    const remainingYears = Math.floor(remainingWeeks / 52);
    const monthsLived = Math.floor((weeksLived * 12) / 52);

    useGSAP(() => {
      if (isOpen) {
        gsap.to('.modal-overlay', {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.inOut',
        });
        gsap.to('.modal-content', {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
        });
      }
    }, [isOpen]);

    const handleClose = () => {
      gsap.to('.modal-content', {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
      gsap.to('.modal-overlay', {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => setIsOpen(false),
      });
    };

    return (
      <>
        <button
          ref={ref}
          className="fixed right-10 top-8 flex scale-0 items-center gap-2 rounded-tree bg-white px-4 py-2 opacity-0 md:top-button"
          onClick={() => setIsOpen(true)}
        >
          <ChartIcon className="h-5 w-5 text-black" strokeWidth={2.5} />
        </button>

        {isOpen && (
          <div
            className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50 opacity-0"
            onClick={handleClose}
          >
            <div
              className="modal-content w-full max-w-2xl scale-95 space-y-6 rounded-tree bg-zinc-900 p-6 text-white opacity-0 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold uppercase">Life Progress</h2>
                <button
                  className="rounded-lg p-1 transition-colors hover:bg-white/10"
                  onClick={handleClose}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeWidth={2} />
                  </svg>
                </button>
              </div>

              <div className="rounded-tree bg-white/5 p-6">
                <div className="mb-6 flex flex-col items-center gap-2">
                  <p className="font-game text-4xl text-white/90">{percentageLived}%</p>
                  <p className="text-sm uppercase tracking-wider text-white/60">Life Progress</p>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-1000"
                    style={{ width: `${percentageLived}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-tree bg-white/5 p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="font-game text-2xl">{yearsLived}</p>
                      <p className="text-sm text-white/60">Years Lived</p>
                    </div>
                    <div>
                      <p className="font-game text-2xl">{monthsLived}</p>
                      <p className="text-sm text-white/60">Months Lived</p>
                    </div>
                    <div>
                      <p className="font-game text-2xl">{weeksLived.toLocaleString()}</p>
                      <p className="text-sm text-white/60">Weeks Lived</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-tree bg-white/5 p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="font-game text-2xl">{remainingYears}</p>
                      <p className="text-sm text-white/60">Years Remaining</p>
                    </div>
                    <div>
                      <p className="font-game text-2xl">{Math.floor((remainingWeeks * 12) / 52)}</p>
                      <p className="text-sm text-white/60">Months Remaining</p>
                    </div>
                    <div>
                      <p className="font-game text-2xl">{remainingWeeks.toLocaleString()}</p>
                      <p className="text-sm text-white/60">Weeks Remaining</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  },
);
