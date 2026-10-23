import { describe, expect, it } from 'vitest';

import { parseEnv } from './env.helpers';

describe('site settings', () => {
  it('has safe defaults so a fresh clone builds', () => {
    const env = parseEnv({});
    expect(env.siteUrl).toBe('https://cheffycoder.github.io/portfolio');
    expect(env.basePath).toBe('');
    expect(env.analyticsProvider).toBe('none');
    expect(env.googleSiteVerification).toBeUndefined();
  });

  it('strips trailing slashes from the address and the base path', () => {
    const env = parseEnv({
      NEXT_PUBLIC_SITE_URL: 'https://example.github.io/portfolio/',
      NEXT_PUBLIC_BASE_PATH: '/portfolio/',
    });
    expect(env.siteUrl).toBe('https://example.github.io/portfolio');
    expect(env.basePath).toBe('/portfolio');
  });

  it('accepts a root site with no base path', () => {
    expect(parseEnv({ NEXT_PUBLIC_SITE_URL: 'https://example.github.io' }).basePath).toBe('');
  });

  it('refuses an address that does not include the base path', () => {
    expect(() =>
      parseEnv({
        NEXT_PUBLIC_SITE_URL: 'https://example.com',
        NEXT_PUBLIC_BASE_PATH: '/portfolio',
      }),
    ).toThrow(/must end with/);
  });

  it('requires a website id when Umami is on', () => {
    expect(() => parseEnv({ NEXT_PUBLIC_ANALYTICS_PROVIDER: 'umami' })).toThrow(/UMAMI_WEBSITE_ID/);
  });

  it('rejects bad values', () => {
    expect(() => parseEnv({ NEXT_PUBLIC_SITE_URL: 'not a url' })).toThrow(/siteUrl/);
    expect(() => parseEnv({ NEXT_PUBLIC_BASE_PATH: 'portfolio' })).toThrow(/basePath/);
    expect(() => parseEnv({ NEXT_PUBLIC_ANALYTICS_PROVIDER: 'ga' })).toThrow(/analyticsProvider/);
  });
});
