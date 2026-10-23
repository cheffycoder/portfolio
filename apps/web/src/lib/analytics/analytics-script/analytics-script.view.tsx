import Script from 'next/script';

import { env } from '@/config/env/env.service';

/** Loads the analytics provider's script, if any. Page views are tracked by the provider itself. */
export function AnalyticsScript() {
  if (env.analyticsProvider === 'umami' && env.umamiWebsiteId) {
    return (
      <Script
        src={env.umamiScriptUrl}
        data-website-id={env.umamiWebsiteId}
        data-domains={new URL(env.siteUrl).hostname}
        strategy="afterInteractive"
      />
    );
  }
  return null;
}
