'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useReducedMotion } from '@/components/motion/reduced-motion/reduced-motion.hooks';

import type { PillBox } from './segmented.types';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** Measures the active option so the pill can slide under it; keeps an overflowing group scrolled to it. */
export function usePill(index: number) {
  const group = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<PillBox | null>(null);

  const measure = useCallback(() => {
    const button = group.current?.querySelectorAll<HTMLButtonElement>('button')[index];
    if (button) setBox({ left: button.offsetLeft, width: button.offsetWidth });
  }, [index]);

  useIsoLayoutEffect(() => {
    measure();
    const el = group.current;
    const button = el?.querySelectorAll<HTMLButtonElement>('button')[index];
    if (el && button && el.scrollWidth > el.clientWidth) {
      el.scrollTo({ left: button.offsetLeft - (el.clientWidth - button.offsetWidth) / 2 });
    }
  }, [measure, index]);

  useEffect(() => {
    addEventListener('resize', measure);
    void document.fonts?.ready.then(measure);
    return () => removeEventListener('resize', measure);
  }, [measure]);

  return { group, box };
}

/**
 * A switch that moves on by itself every `durationMs` while `inView`, with pause / play. Picking an option (by
 * hand or by the timer) or leaving the screen starts a fresh wait; resuming continues the wait it paused.
 */
export function useAutoAdvance(count: number, durationMs: number, inView: boolean) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const [wantsPlay, setWantsPlay] = useState(true);
  const playing = wantsPlay && !reducedMotion;
  const [cycle, setCycle] = useState(0);
  const remaining = useRef(durationMs);
  const lastCycle = useRef(cycle);

  const pick = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
      setCycle((c) => c + 1);
    },
    [count],
  );

  useEffect(() => {
    if (cycle !== lastCycle.current) {
      lastCycle.current = cycle;
      remaining.current = durationMs;
    }
    if (!playing || !inView) return;
    const startedAt = performance.now();
    const wait = remaining.current;
    const timer = setTimeout(() => pick(index + 1), wait);
    return () => {
      clearTimeout(timer);
      remaining.current = Math.max(400, wait - (performance.now() - startedAt));
    };
  }, [playing, inView, index, cycle, durationMs, pick]);

  // Leaving the screen starts a fresh wait, so the fill and the timer begin together on return.
  const [wasInView, setWasInView] = useState(inView);
  if (wasInView !== inView) {
    setWasInView(inView);
    if (!inView) setCycle((c) => c + 1);
  }

  return { index, pick, playing, togglePlay: () => setWantsPlay(!playing), cycle };
}
