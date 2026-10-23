export type SegmentOption = { value: string; label: string };

export type SegmentedProps = {
  /** Accessible name of the group. */
  label: string;
  options: readonly SegmentOption[];
  index: number;
  onPick: (index: number) => void;
  /** Timed switch: the active pill fills while it waits for the next step. */
  timer?: {
    durationMs: number;
    /** The fill animates (screen in view). */
    running: boolean;
    /** The fill holds where it is (paused by the visitor). */
    paused: boolean;
    /** Changes whenever the wait restarts, so the fill starts over. */
    cycle: number;
  };
  className?: string;
};

export type PillBox = { left: number; width: number };
