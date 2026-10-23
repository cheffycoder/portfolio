import { describe, expect, it } from 'vitest';

import { easeAmplitude, isFixed } from './jumble-text.helpers';

describe('jumble text', () => {
  it('keeps spaces and full stops in place', () => {
    expect(isFixed(' ')).toBe(true);
    expect(isFixed('.')).toBe(true);
    expect(isFixed('C')).toBe(false);
  });

  it('eases towards the target without overshooting', () => {
    const up = easeAmplitude(0, 1, 16);
    expect(up).toBeGreaterThan(0);
    expect(up).toBeLessThan(1);
    const down = easeAmplitude(1, 0, 16);
    expect(down).toBeLessThan(1);
    expect(1 - down).toBeLessThan(up);
  });
});
