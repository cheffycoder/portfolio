/** Keeps a number within [min, max]. */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/** Two-digit screen numbers: 1 → "01". */
export const pad2 = (n: number): string => String(n).padStart(2, '0');
