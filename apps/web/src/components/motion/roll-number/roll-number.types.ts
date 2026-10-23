export type RollNumberProps = {
  value: string;
  /** The screen whose arrival plays the roll. */
  screenId: string;
  /** Position among the screen's numbers, for the stagger. */
  order?: number;
};
