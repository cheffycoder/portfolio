import type { Highlight } from '@/config/profile/profile.types';

export type HighlightTileProps = {
  highlight: Highlight;
  /** Faded when the filter shows the other company. */
  dimmed: boolean;
  screenId: string;
  order: number;
};
