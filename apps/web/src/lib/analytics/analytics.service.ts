/**
 * The one analytics entry point. Components call `track()` and never know the provider.
 * Swapping Umami for another tool means adding one adapter folder and changing `pickAdapter`.
 */
import { env } from '@/config/env/env.service';

import { pickAdapter } from './analytics.helpers';
import type { AnalyticsEvent } from './analytics.types';

const adapter = pickAdapter(env.analyticsProvider);

export function track(event: AnalyticsEvent): void {
  try {
    adapter.track(event);
  } catch {
    // Analytics must never break the page.
  }
}
