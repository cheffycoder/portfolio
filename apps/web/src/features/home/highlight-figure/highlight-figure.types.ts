import type { HighlightFigure as Figure } from '@/config/profile/profile.types';

export type HighlightFigureProps = {
  figure: Figure;
  /** Bars grow in only while their tile is turned over. */
  open: boolean;
};
