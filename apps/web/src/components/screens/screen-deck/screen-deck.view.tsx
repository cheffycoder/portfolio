'use client';

import { useRef } from 'react';

import { LocalNav } from '@/components/screens/local-nav/local-nav.view';
import { ScreenRail } from '@/components/screens/screen-rail/screen-rail.view';

import { ScreenDeckContext } from './screen-deck.constants';
import { useDeckController } from './screen-deck.hooks';
import { screenDeckStyles } from './screen-deck.styles';
import type { ScreenDeckProps } from './screen-deck.types';

/**
 * One screen at a time (DESIGN.md §3): a snap-scrolling <main> of full-viewport screens, with the floating
 * local nav and the side rail that appear after the first screen.
 */
export function ScreenDeck({ screens, children }: ScreenDeckProps) {
  const container = useRef<HTMLElement>(null);
  const deck = useDeckController(screens, container);
  return (
    <ScreenDeckContext value={deck}>
      <LocalNav />
      <ScreenRail />
      <main ref={container} id="main" className={screenDeckStyles.root()}>
        {children}
      </main>
    </ScreenDeckContext>
  );
}
