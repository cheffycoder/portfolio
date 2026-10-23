import { afterEach, describe, expect, it, vi } from 'vitest';

import { pickAdapter } from './analytics.helpers';

describe('analytics', () => {
  afterEach(() => {
    delete (window as { umami?: unknown }).umami;
  });

  it('chooses the adapter from settings', () => {
    expect(pickAdapter('umami').name).toBe('umami');
    expect(pickAdapter('none').name).toBe('none');
    expect(pickAdapter('anything-else').name).toBe('none');
  });

  it('forwards events to Umami when its script is loaded', () => {
    const track = vi.fn();
    (window as { umami?: unknown }).umami = { track };
    pickAdapter('umami').track({ name: 'outbound', props: { target: 'github' } });
    expect(track).toHaveBeenCalledWith('outbound', { target: 'github' });
  });

  it('does nothing if the script is blocked', () => {
    expect(() => pickAdapter('umami').track({ name: 'copy_email' })).not.toThrow();
  });
});
