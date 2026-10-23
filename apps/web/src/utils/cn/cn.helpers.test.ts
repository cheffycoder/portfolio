import { describe, expect, it } from 'vitest';

import { cn } from './cn.helpers';

describe('cn', () => {
  it('joins classes and drops falsy values', () => {
    expect(cn('a', false, undefined, 'b')).toBe('a b');
  });

  it('lets a later class win a Tailwind conflict', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });
});
