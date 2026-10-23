import { createContext } from 'react';

import type { ScreenDeckValue } from './screen-deck.types';

/** The middle band of the viewport: the screen crossing it is the active one. */
export const ACTIVE_BAND = '-49% 0px -49% 0px';

/** The deck's state, shared with screens, footers and navs. Outside a deck, nothing is active. */
export const ScreenDeckContext = createContext<ScreenDeckValue>({
  screens: [],
  active: -1,
  seen: new Set(),
  goTo: () => {},
  inDeck: false,
});

/** Keys that move between screens, and by how much. */
export const DECK_KEYS: Record<string, number> = {
  ArrowDown: 1,
  PageDown: 1,
  ArrowUp: -1,
  PageUp: -1,
};

/** While focus is in one of these, keys belong to it. */
export const OWN_KEYS_SELECTOR =
  'input, textarea, select, [contenteditable="true"], [role="slider"], [role="dialog"]';
