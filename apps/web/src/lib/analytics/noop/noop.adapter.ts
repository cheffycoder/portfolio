import type { AnalyticsAdapter } from '../analytics.types';

/** Used when analytics is off: every event is ignored. */
export const noopAdapter: AnalyticsAdapter = {
  name: 'none',
  track() {},
};
