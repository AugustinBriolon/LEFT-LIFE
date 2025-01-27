import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !cursorRef.current) return;

    document.body.style.cursor = 'none';

    const cursor = cursorRef.current;
    
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        duration: 0.5,
        x: e.clientX - cursor.offsetWidth / 2,
        y: e.clientY - cursor.offsetHeight / 2,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return cursorRef;
};