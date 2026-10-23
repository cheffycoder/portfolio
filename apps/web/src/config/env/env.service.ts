import { parseEnv } from './env.helpers';

/**
 * The site's settings. The only place that reads process.env in the web app.
 * Each value is referenced as `process.env.NEXT_PUBLIC_*` literally so Next.js can inline it.
 */
export const env = parseEnv({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  NEXT_PUBLIC_ANALYTICS_PROVIDER: process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER,
  NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
  NEXT_PUBLIC_UMAMI_SCRIPT_URL: process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL,
});
