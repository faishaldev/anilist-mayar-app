import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
      prevent: (node) => node.hasAttribute('data-lenis-prevent'),
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      if (lenisRef.current) lenisRef.current.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = (
    target: number | string,
    options?: { offset?: number; duration?: number },
  ) => {
    if (lenisRef.current) lenisRef.current.scrollTo(target, options);
  };

  const stop = () => {
    if (lenisRef.current) lenisRef.current.stop();
  };

  const start = () => {
    if (lenisRef.current) lenisRef.current.start();
  };

  return { scrollTo, stop, start };
};
