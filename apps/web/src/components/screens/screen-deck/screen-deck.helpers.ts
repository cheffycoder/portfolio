import { clamp, pad2 } from '@/utils/number/number.helpers';

import type { ScreenEntry } from './screen-deck.types';

/** "02", the number shown before a screen's title and in its footer. */
export const screenNumber = (index: number): string => pad2(index + 1);

/** "02 / 11" */
export const screenCount = (index: number, total: number): string =>
  `${pad2(index + 1)} / ${pad2(total)}`;

/** The screens before and after `index`, if any. */
export const neighbours = (screens: readonly ScreenEntry[], index: number) => ({
  prev: index > 0 ? screens[index - 1] : undefined,
  next: index >= 0 && index < screens.length - 1 ? screens[index + 1] : undefined,
});

/** Where a step of `delta` lands, kept within the deck. */
export const stepIndex = (active: number, delta: number, total: number): number =>
  clamp(Math.max(active, 0) + delta, 0, Math.max(total - 1, 0));

/** The index of the screen with this id, or -1. */
export const indexOf = (screens: readonly ScreenEntry[], id: string): number =>
  screens.findIndex((s) => s.id === id);
