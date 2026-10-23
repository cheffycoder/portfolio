import { describe, expect, it } from 'vitest';

import { clamp, pad2 } from './number.helpers';

describe('number helpers', () => {
  it('keeps values inside the range', () => {
    expect(clamp(-1, 0, 3)).toBe(0);
    expect(clamp(2, 0, 3)).toBe(2);
    expect(clamp(9, 0, 3)).toBe(3);
  });

  it('pads screen numbers to two digits', () => {
    expect(pad2(1)).toBe('01');
    expect(pad2(11)).toBe('11');
  });
});
