/** Letters that never scramble: spaces and the full stop. */
export const isFixed = (ch: string): boolean => ch === ' ' || ch === '.';

/** Eases the spread towards its target; slower to settle (520ms) than to scatter (380ms). */
export const easeAmplitude = (amp: number, target: number, dt: number): number =>
  amp + (target - amp) * (1 - Math.exp(-dt / (target ? 380 : 520)));
