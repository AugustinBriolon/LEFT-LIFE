import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const useLifeAnimation = (
  titleRef: React.RefObject<HTMLHeadingElement>,
  inputsContainerRef: React.RefObject<HTMLDivElement>,
  squaresContainerRef: React.RefObject<HTMLDivElement>,
  buttonStatsRef: React.RefObject<HTMLButtonElement>
) => {
  useGSAP(() => {
    gsap.set(titleRef.current, {
      top: '40%',
      left: '50%',
      xPercent: -50,
    });

    gsap.set(inputsContainerRef.current, {
      top: '50%',
      right: '50%',
      xPercent: 50,
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
    const timeline = gsap.timeline();

    timeline.to(titleRef.current, {
      top: '2.5rem',
      left: '2.5rem',
      xPercent: 0,
      duration: 1,
      ease: 'power3.inOut',
    });

    timeline.to(
      inputsContainerRef.current,
      {
        top: '2.5rem',
        right: '2.5rem',
        xPercent: 0,
        duration: 1,
        ease: 'power3.inOut',
      },
      '<'
    );

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
        '-=0.5'
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
      '<'
    );
  });

  return { startAnimation };
};
