import { describe, expect, it } from 'vitest';

import { rollFrame } from './roll-number.helpers';

describe('roll number', () => {
  it('rolls only digits and keeps everything else', () => {
    expect(rollFrame('40s → 2s', 0, () => 0.99)).toBe('99s → 9s');
  });

  it('settles digits left to right', () => {
    expect(rollFrame('123', 5, () => 0)).toBe('100');
    expect(rollFrame('123', 8, () => 0)).toBe('123');
  });

  it('is final once the roll is done', () => {
    expect(rollFrame('−11 MB', 20)).toBe('−11 MB');
  });
});
