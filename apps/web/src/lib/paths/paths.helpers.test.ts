import { describe, expect, it } from 'vitest';

import { joinBasePath, joinSiteUrl } from './paths.helpers';

describe('paths', () => {
  it('prefixes root-relative paths with the base path', () => {
    expect(joinBasePath('/portfolio', '/img/f1.webp')).toBe('/portfolio/img/f1.webp');
    expect(joinBasePath('/portfolio', 'img/f1.webp')).toBe('/portfolio/img/f1.webp');
    expect(joinBasePath('', '/img/f1.webp')).toBe('/img/f1.webp');
  });

  it('leaves absolute addresses and fragments alone', () => {
    expect(joinBasePath('/portfolio', 'https://x.com/a')).toBe('https://x.com/a');
    expect(joinBasePath('/portfolio', '#contact')).toBe('#contact');
  });

  it('builds absolute site addresses, keeping the home page canonical with a slash', () => {
    const site = 'https://example.github.io/portfolio';
    expect(joinSiteUrl(site, '/')).toBe('https://example.github.io/portfolio/');
    expect(joinSiteUrl(site, '/articles/')).toBe('https://example.github.io/portfolio/articles/');
    expect(joinSiteUrl(site, 'og-image.png')).toBe(
      'https://example.github.io/portfolio/og-image.png',
    );
    expect(joinSiteUrl('https://example.com', '/')).toBe('https://example.com/');
  });
});
