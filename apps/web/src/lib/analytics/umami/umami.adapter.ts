import type { AnalyticsAdapter } from '../analytics.types';
import type { UmamiWindow } from './umami.types';

/** Sends events to Umami's script, if it loaded (blocked scripts are ignored). */
export const umamiAdapter: AnalyticsAdapter = {
  name: 'umami',
  track({ name, props }) {
    if (typeof window === 'undefined') return;
    (window as UmamiWindow).umami?.track(name, props);
  },
};
