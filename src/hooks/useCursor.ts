import { useEffect, useRef } from 'react';

export const useCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !cursorRef.current) return;

    document.body.style.cursor = 'none';

    const cursor = cursorRef.current;
    
    const onMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - cursor.offsetWidth / 2}px, ${e.clientY - cursor.offsetHeight / 2}px)`;
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return cursorRef;
};
