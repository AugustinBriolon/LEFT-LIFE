import { forwardRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useTimeEntries } from '@/api/get.handler';
import { ChartIcon, GithubIcon } from './Icons';

interface StatsModalProps {
  weeksLived: number;
  totalWeeks: number;
}

export const StatsModal = forwardRef<HTMLButtonElement, StatsModalProps>(
  ({ weeksLived, totalWeeks }, ref) => {
    const { data, isLoading, isError } = useTimeEntries();
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
      gsap
        .timeline()
        .to('.modal-content', {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        })
        .to(
          '.modal-overlay',
          {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut',
          },
          '<',
        )
        .add(() => setIsOpen(false));
    };

    console.log(!isLoading && data);

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
            className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 opacity-0 backdrop-blur-sm md:p-0"
            onClick={handleClose}
          >
            <div
              className="modal-content relative max-h-[90dvh] w-full max-w-[calc(100vw-2rem)] scale-95 space-y-4 overflow-y-auto rounded-tree bg-zinc-900 p-4 text-white opacity-0 shadow-xl md:max-w-2xl md:space-y-6 md:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold uppercase md:text-3xl">Life Progress</h2>
                <button
                  className="rounded-lg p-1 transition-colors hover:bg-white/10"
                  onClick={handleClose}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeWidth={2} />
                  </svg>
                </button>
              </div>

              <div className="rounded-tree bg-white/5 p-4 md:p-6">
                <div className="mb-4 flex flex-col items-center gap-2 md:mb-6">
                  <p className="font-game text-3xl text-white/90 md:text-4xl">{percentageLived}%</p>
                  <p className="text-xs uppercase tracking-wider text-white/60 md:text-sm">
                    Life Progress
                  </p>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-1000"
                    style={{ width: `${percentageLived}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
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

              <div className="flex w-full items-center justify-between gap-4">
                <p className="text-xs">
                  Code by
                  <a
                    className="mx-1 font-bold hover:underline"
                    href="https://august1.dev/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Augustin Briolon
                  </a>
                  with{' '}
                  <span aria-label="heart" role="img">
                    ❤️
                  </span>
                </p>
                <a
                  className="p-1 transition-colors hover:bg-white/10"
                  href="https://github.com/AugustinBriolon/LEFT-LIFE"
                  rel="noreferrer"
                  target="_blank"
                >
                  <GithubIcon className="aspect-square h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </>
    );
  },
);
