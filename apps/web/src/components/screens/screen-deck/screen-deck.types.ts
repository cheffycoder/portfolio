import type { ReactNode } from 'react';

/** One full-viewport screen: its element id and the short name shown in navs and footers. */
export type ScreenEntry = { id: string; label: string };

export type ScreenDeckValue = {
  screens: readonly ScreenEntry[];
  /** Index of the screen crossing the middle of the viewport; -1 before the first measure. */
  active: number;
  /** Screens that have been active at least once (their reveals have played). */
  seen: ReadonlySet<string>;
  goTo: (index: number) => void;
  /** False outside a deck (the articles page): screens then reveal as soon as they mount. */
  inDeck: boolean;
};

export type ScreenDeckProps = {
  screens: readonly ScreenEntry[];
  children: ReactNode;
};

export type ScreenState = {
  index: number;
  active: boolean;
  seen: boolean;
  inDeck: boolean;
};
