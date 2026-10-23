import { describe, expect, it } from 'vitest';

import { dragAt, fadeFor, fadeVars, keyTarget } from './share-lifecycle.helpers';

describe('share lifecycle bar', () => {
  it('shows only the current state at a whole step', () => {
    expect(fadeFor(1, 1)).toEqual({ o: 1, d: 0, ad: 0 });
    expect(fadeFor(2, 1).o).toBe(0);
  });

  it('cross-fades neighbours between steps', () => {
    const a = fadeFor(1, 1.25);
    const b = fadeFor(2, 1.25);
    expect(a.o).toBeCloseTo(0.6);
    expect(b.o).toBe(0);
    expect(a.d).toBeCloseTo(-0.25);
    expect(fadeVars(a)).toEqual({ '--o': '0.600', '--d': '-0.250', '--ad': '0.250' });
  });

  it('reads the value under the pointer', () => {
    // 344px bar: 300px of travel between the knob centres at 22px and 322px.
    expect(dragAt(22, 0, 344, 3)).toEqual({ value: 0, stretch: 1, origin: 'center' });
    expect(dragAt(172, 0, 344, 3).value).toBeCloseTo(1.5);
    expect(dragAt(322, 0, 344, 3).value).toBeCloseTo(3);
  });

  it('stretches instead of moving past either end, up to 6%', () => {
    const left = dragAt(-200, 0, 344, 3);
    expect(left).toMatchObject({ value: 0, origin: 'right' });
    expect(left.stretch).toBeCloseTo(1.06);
    const right = dragAt(372, 0, 344, 3);
    expect(right.origin).toBe('left');
    expect(right.stretch).toBeGreaterThan(1);
    expect(right.stretch).toBeLessThanOrEqual(1.06);
  });

  it('moves one step per arrow key and jumps with Home / End', () => {
    expect(keyTarget('ArrowRight', 0, 3)).toBe(1);
    expect(keyTarget('ArrowLeft', 0, 3)).toBe(0);
    expect(keyTarget('ArrowUp', 2.4, 3)).toBe(3);
    expect(keyTarget('End', 0, 3)).toBe(3);
    expect(keyTarget('Home', 2, 3)).toBe(0);
    expect(keyTarget('a', 2, 3)).toBeNull();
  });
});
