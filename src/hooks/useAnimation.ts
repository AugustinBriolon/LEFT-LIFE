import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const useAnimation = (
  titleRef: React.RefObject<HTMLHeadingElement | null>,
  inputsContainerRef: React.RefObject<HTMLDivElement | null>,
  squaresContainerRef: React.RefObject<HTMLDivElement | null>,
  buttonStatsRef: React.RefObject<HTMLButtonElement | null>
) => {
  const mm = gsap.matchMedia();
  const timeline = gsap.timeline();

  useGSAP(() => {
    gsap.set(titleRef.current, {
      top: '40%',
      left: '50%',
      xPercent: -50,
    });

    mm.add('(min-width: 769px)', () => {
      gsap.set(inputsContainerRef.current, {
        top: '50%',
        right: '50%',
        xPercent: 50,
      });
    });

    mm.add('(max-width: 768px)', () => {
      gsap.set(inputsContainerRef.current, {
        bottom: '50%',
        yPercent: 100,
        right: '50%',
        xPercent: 50,
      });
    });

    const squares = squaresContainerRef.current?.querySelectorAll('.week-square');
    if (squares) {
      gsap.set(squares, {
        opacity: 0,
        scale: 0,
      });
    }
  }, []);

  const { contextSafe } = useGSAP();
  const startAnimation = contextSafe(() => {

    mm.add('(min-width: 769px)', () => {
      timeline.to(titleRef.current, {
        top: '2.5rem',
        left: '2.5rem',
        xPercent: 0,
        duration: 1,
        ease: 'power2.inOut',
      });
  
      timeline.to(
        inputsContainerRef.current,
        {
          top: '2.5rem',
          right: '2.5rem',
          xPercent: 0,
          duration: 1,
          ease: 'power2.inOut',
        },
        '<'
      );
    });

    mm.add('(max-width: 768px)', () => {
      timeline.to(titleRef.current, {
        top: '1.2rem',
        left: '20%',
        xPercent: -50,
        duration: 1,
        ease: 'power2.inOut',
      });
  
      timeline.to(
        inputsContainerRef.current,
        {
          bottom: '1rem',
          yPercent: 0,
          right: '50%',
          xPercent: 50,
          duration: 1,
          ease: 'power2.inOut',
        },
        '<'
      );
    });

    if (!squaresContainerRef.current) {
      setTimeout(startAnimation, 100);
      return;
    }
    const squares = squaresContainerRef.current?.querySelectorAll('.week-square');
    if (squares) {
      timeline.to(
        squares,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.001,
          ease: 'expo.out',
        },
        '.5'
      );
    }

    timeline.to(
      buttonStatsRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'expo.out',
      },
      '>'
    );
  });

  return { startAnimation };
};
