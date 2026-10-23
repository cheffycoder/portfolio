export type ClockState = {
  /** "14:05" in Mumbai and in the visitor's zone. */
  home: string;
  local: string;
  /** Where each time sits on the 24-hour strip, 0–100. */
  homePercent: number;
  localPercent: number;
  same: boolean;
  /** "You, in New York" */
  youLabel: string;
  /** "9h 30m behind me" */
  youDiff: string;
};

export type TimeBarProps = { className?: string };
