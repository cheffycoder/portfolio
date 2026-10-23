import { z } from 'zod';

/** Public site settings, validated once at build time. */
export const envSchema = z.object({
  /** Canonical address of the site, including any GitHub Pages path, without a trailing slash. */
  siteUrl: z.url(),
  /** The path the site is served under: "" or "/<repo>". Must match next.config.ts. */
  basePath: z.union([z.literal(''), z.string().regex(/^\/[a-z0-9._~/-]*[^/]$/i)]),
  /** Google Search Console HTML-tag verification code. */
  googleSiteVerification: z.string().min(1).optional(),
  analyticsProvider: z.enum(['umami', 'none']),
  umamiWebsiteId: z.string().optional(),
  umamiScriptUrl: z.url(),
});
