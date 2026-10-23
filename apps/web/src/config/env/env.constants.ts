/** Defaults that keep a fresh clone building with no .env at all. CI overrides the addresses (docs/deploy.md). */
export const ENV_DEFAULTS = {
  siteUrl: 'https://cheffycoder.github.io/portfolio',
  basePath: '',
  analyticsProvider: 'none',
  umamiScriptUrl: 'https://cloud.umami.is/script.js',
} as const;
