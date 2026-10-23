import type { AnalyticsAdapter } from './analytics.types';
import { noopAdapter } from './noop/noop.adapter';
import { umamiAdapter } from './umami/umami.adapter';

/** The only place that decides which analytics provider is used. */
export function pickAdapter(provider: string): AnalyticsAdapter {
  return provider === 'umami' ? umamiAdapter : noopAdapter;
}
