'use client';

import { useEffect, useState } from 'react';

import { useScreenState } from '@/components/screens/screen-deck/screen-deck.hooks';

import {
  ROLL_DELAY_MS,
  ROLL_FRAME_MS,
  ROLL_FRAMES,
  ROLL_STAGGER_MS,
} from './roll-number.constants';
import { rollFrame } from './roll-number.helpers';

/** The text to show: rolls like a counter each time the screen opens, then rests on the real value. */
export function useRolledValue(value: string, screenId: string, order: number): string {
  const { active } = useScreenState(screenId);
  const [text, setText] = useState(value);

  useEffect(() => {
    if (!active || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(
      () => {
        timer = setInterval(() => {
          frame += 1;
          if (frame > ROLL_FRAMES) {
            clearInterval(timer);
            setText(value);
            return;
          }
          setText(rollFrame(value, frame));
        }, ROLL_FRAME_MS);
      },
      ROLL_DELAY_MS + order * ROLL_STAGGER_MS,
    );
    return () => {
      clearTimeout(start);
      clearInterval(timer);
      setText(value);
    };
  }, [active, order, value]);

  return text;
}
