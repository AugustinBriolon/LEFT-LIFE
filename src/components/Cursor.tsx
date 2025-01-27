import { CursorIcon } from './Icons';
import { useCursor } from '../hooks/useCursor';
import { cn } from '../lib/utils';

export const Cursor = () => {
  const cursorRef = useCursor();

  return (
    <div
      ref={cursorRef}
      className={cn(
        'pointer-events-none fixed left-0 top-0 z-[100]',
        'hidden md:block' 
      )}
    >
      <CursorIcon className="h-6 w-6 text-white" />
    </div>
  );
};