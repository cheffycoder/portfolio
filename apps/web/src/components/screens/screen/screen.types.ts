import type { ReactNode } from 'react';

export type ScreenProps = {
  /** Element id; for a screen in a deck it must match its ScreenEntry. */
  id: string;
  /** Id of the heading that names the screen. */
  labelledBy: string;
  /** "main" for a page that is a single screen (articles). */
  as?: 'section' | 'main';
  /** The company gradient the screen's accents use. */
  tone?: 'warm' | 'cool';
  /** Less room on top, for screens that carry the global nav. */
  navSpace?: 'float' | 'top';
  /** Centre the body's content horizontally too. */
  align?: 'start' | 'center';
  /** Decorative layers behind the content. */
  background?: ReactNode;
  /** A nav that sits at the top of the screen and scrolls away with it. */
  header?: ReactNode;
  /** Replaces the deck's previous/next footer (single-screen pages). */
  foot?: ReactNode;
  children: ReactNode;
};
