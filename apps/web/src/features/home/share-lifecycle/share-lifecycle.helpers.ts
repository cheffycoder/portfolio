import { clamp } from '@/utils/number/number.helpers';

import { KNOB_SPAN, MAX_STRETCH } from './share-lifecycle.constants';
import type { Drag, Fade } from './share-lifecycle.types';

/** How visible state `i` is when the bar is at `v`: every label and window cross-fades by distance. */
export function fadeFor(i: number, v: number): Fade {
  const d = i - v;
  return {
    o: clamp(1 - Math.abs(d) * 1.6, 0, 1),
    d: clamp(d, -1, 1),
    ad: Math.min(1, Math.abs(d)),
  };
}

/** CSS variables for a fade, ready for style.setProperty / a style prop. */
export const fadeVars = (f: Fade): Record<string, string> => ({
  '--o': f.o.toFixed(3),
  '--d': f.d.toFixed(3),
  '--ad': f.ad.toFixed(3),
});

/**
 * The value under the pointer (0…max) for a bar at `left` with `width`. Pulling past either end stretches the
 * bar like rubber, anchored at the far end, instead of moving the value.
 */
export function dragAt(clientX: number, left: number, width: number, max: number): Drag {
  const raw = ((clientX - left - KNOB_SPAN / 2) / (width - KNOB_SPAN)) * max;
  if (raw < 0) {
    return { value: 0, stretch: 1 + Math.min(MAX_STRETCH, (-raw / max) * 0.12), origin: 'right' };
  }
  if (raw > max) {
    return {
      value: max,
      stretch: 1 + Math.min(MAX_STRETCH, ((raw - max) / max) * 0.12),
      origin: 'left',
    };
  }
  return { value: raw, stretch: 1, origin: 'center' };
}

/** Keyboard steps for the slider: arrows move one state, Home / End jump to the ends. */
export function keyTarget(key: string, current: number, max: number): number | null {
  const step = (
    { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 } as Record<string, number>
  )[key];
  if (step) return clamp(Math.round(current) + step, 0, max);
  if (key === 'Home') return 0;
  if (key === 'End') return max;
  return null;
}
