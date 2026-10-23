'use client';

import { useEffect, useState } from 'react';

import { ROLL_EVERY_MS } from './open-to.constants';

/**
 * The rolling phrase: moves to the next phrase every few seconds (not while the tab is hidden, not with
 * reduced motion). The window keeps the width of the longest phrase, so the pill never changes size.
 */
export function useRollingPhrase(count: number): number {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, ROLL_EVERY_MS);
    return () => clearInterval(timer);
  }, [count]);
  return index;
}
