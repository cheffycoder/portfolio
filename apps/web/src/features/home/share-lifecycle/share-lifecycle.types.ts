export type Fade = {
  /** Opacity, 1 at the current value and gone by ±0.625. */
  o: number;
  /** Signed distance from the current value, clamped to ±1 (direction of travel). */
  d: number;
  /** Absolute distance, clamped to 1 (how far back the window sits). */
  ad: number;
};

export type Drag = {
  value: number;
  stretch: number;
  origin: 'left' | 'right' | 'center';
};

export type ShareLifecycleProps = { screenId: string };
