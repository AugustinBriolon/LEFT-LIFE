import { forwardRef } from 'react';
import { ChartIcon } from './Icons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface StatsModalProps {
  weeksLived: number;
  totalWeeks: number;
}

export const StatsModal = forwardRef<HTMLButtonElement, StatsModalProps>(
  ({ weeksLived, totalWeeks }, ref) => {
    const remainingWeeks = totalWeeks - weeksLived;
    const percentageLived = ((weeksLived * 100) / totalWeeks).toFixed(2);
    const yearsLived = Math.floor(weeksLived / 52);
    const remainingYears = Math.floor(remainingWeeks / 52);
    const monthsLived = Math.floor(weeksLived * 12 / 52);

    return (
      <Dialog>
        <DialogTrigger asChild>
          <button
            ref={ref}
            className="fixed bottom-6 right-6 flex scale-0 items-center gap-2 bg-white/15 px-4 py-2 text-white opacity-0 hover:bg-white/10"
          >
            <ChartIcon className="h-5 w-5" />
          </button>
        </DialogTrigger>
        
        <DialogContent className="bg-zinc-900 text-white border-zinc-800 sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold uppercase">
              Life Progress
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="bg-white/5 p-6">
              <div className="flex flex-col gap-2 items-center mb-6">
                <p className="text-4xl font-game text-white/90">{percentageLived}%</p>
                <p className="text-sm text-white/60 uppercase tracking-wider">Life Progress</p>
              </div>
              
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-white h-full rounded-full transition-all duration-1000"
                  style={{ width: `${percentageLived}%` }}
                />
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-game">{yearsLived}</p>
                    <p className="text-sm text-white/60">Years Lived</p>
                  </div>
                  <div>
                    <p className="text-2xl font-game">{monthsLived}</p>
                    <p className="text-sm text-white/60">Months Lived</p>
                  </div>
                  <div>
                    <p className="text-2xl font-game">{weeksLived.toLocaleString()}</p>
                    <p className="text-sm text-white/60">Weeks Lived</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-game">{remainingYears}</p>
                    <p className="text-sm text-white/60">Years Remaining</p>
                  </div>
                  <div>
                    <p className="text-2xl font-game">{Math.floor(remainingWeeks * 12 / 52)}</p>
                    <p className="text-sm text-white/60">Months Remaining</p>
                  </div>
                  <div>
                    <p className="text-2xl font-game">{remainingWeeks.toLocaleString()}</p>
                    <p className="text-sm text-white/60">Weeks Remaining</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  },
);