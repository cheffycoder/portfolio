'use client';

import { screenNumber } from '@/components/screens/screen-deck/screen-deck.helpers';
import { useScreenState } from '@/components/screens/screen-deck/screen-deck.hooks';

import type { ScreenLabelProps } from './screen-head.types';

/** "03 · Highlights": the screen's number in the deck, then its title. Reordering screens renumbers them. */
export function ScreenLabel({ screenId, title }: ScreenLabelProps) {
  const { index } = useScreenState(screenId);
  return index >= 0 ? `${screenNumber(index)} · ${title}` : title;
}
