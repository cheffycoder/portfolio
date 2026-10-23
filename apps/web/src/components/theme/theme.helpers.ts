import { SKY_CORE } from './theme.constants';
import type { ThemeMode } from './theme.types';

export const otherMode = (mode: ThemeMode): ThemeMode => (mode === 'dark' ? 'light' : 'dark');

/**
 * Size and position of the sky disc for a sweep from (x, y): big enough that its solid core covers the
 * farthest corner of a w×h viewport.
 */
export function skyDisc(x: number, y: number, w: number, h: number) {
  const far = Math.hypot(Math.max(x, w - x), Math.max(y, h - y));
  const size = (far / SKY_CORE) * 2;
  return { size, left: x - size / 2, top: y - size / 2 };
}
