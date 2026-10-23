import { describe, expect, it } from 'vitest';

import { SKY_CORE } from './theme.constants';
import { otherMode, skyDisc } from './theme.helpers';

describe('theme', () => {
  it('flips the mode', () => {
    expect(otherMode('dark')).toBe('light');
    expect(otherMode('light')).toBe('dark');
  });

  it('sizes the disc so its solid core reaches the farthest corner', () => {
    const { size, left, top } = skyDisc(100, 50, 1000, 800);
    const far = Math.hypot(900, 750);
    expect((size / 2) * SKY_CORE).toBeCloseTo(far);
    expect(left + size / 2).toBe(100);
    expect(top + size / 2).toBe(50);
  });
});
