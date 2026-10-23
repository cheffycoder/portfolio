import { ENV_DEFAULTS } from './env.constants';
import { envSchema } from './env.schema';
import type { Env, RawEnv } from './env.types';

const trimSlash = (value: string): string => value.replace(/\/+$/, '');

export function parseEnv(raw: RawEnv): Env {
  const result = envSchema.safeParse({
    siteUrl: trimSlash(raw.NEXT_PUBLIC_SITE_URL || ENV_DEFAULTS.siteUrl),
    basePath: trimSlash(raw.NEXT_PUBLIC_BASE_PATH || ENV_DEFAULTS.basePath),
    googleSiteVerification: raw.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    analyticsProvider: raw.NEXT_PUBLIC_ANALYTICS_PROVIDER || ENV_DEFAULTS.analyticsProvider,
    umamiWebsiteId: raw.NEXT_PUBLIC_UMAMI_WEBSITE_ID || undefined,
    umamiScriptUrl: raw.NEXT_PUBLIC_UMAMI_SCRIPT_URL || ENV_DEFAULTS.umamiScriptUrl,
  });
  if (!result.success) {
    const fields = result.error.issues.map((i) => i.path.join('.')).join(', ');
    throw new Error(`Invalid site settings: ${fields}. See .env.example.`);
  }
  if (result.data.analyticsProvider === 'umami' && !result.data.umamiWebsiteId) {
    throw new Error('NEXT_PUBLIC_UMAMI_WEBSITE_ID is required when analytics provider is umami.');
  }
  // A site under a path must say so in its address too, or canonicals point at the wrong pages.
  if (
    result.data.basePath &&
    !new URL(result.data.siteUrl).pathname.endsWith(result.data.basePath)
  ) {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL (${result.data.siteUrl}) must end with NEXT_PUBLIC_BASE_PATH (${result.data.basePath}).`,
    );
  }
  return result.data;
}
