/**
 * One frame of the roll: digits still rolling show a random digit, everything else is final. Digits settle left
 * to right (digit i settles after frame i × 1.5 + 4).
 */
export function rollFrame(
  target: string,
  frame: number,
  random: () => number = Math.random,
): string {
  return [...target]
    .map((ch, i) =>
      /\d/.test(ch) && frame <= i * 1.5 + 4 ? String(Math.floor(random() * 10)) : ch,
    )
    .join('');
}
