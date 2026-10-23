import { describe, expect, it } from 'vitest';

import { breadcrumbJsonLd, pageMetadata, personJsonLd, profilePageJsonLd } from './seo.helpers';

describe('seo', () => {
  it('makes each page its own canonical, with the site name in the title', () => {
    const home = pageMetadata({ description: 'd', path: '/' });
    expect(home.title).toBe('Shivam Bandral · Frontend Engineer');
    expect(home.alternates?.canonical).toBe('https://cheffycoder.github.io/portfolio/');
    const articles = pageMetadata({ title: 'Articles', description: 'd', path: '/articles/' });
    expect(articles.title).toBe('Articles · Shivam Bandral');
    expect(articles.alternates?.canonical).toBe(
      'https://cheffycoder.github.io/portfolio/articles/',
    );
  });

  it('uses absolute share images and can keep a page out of search', () => {
    const meta = pageMetadata({ description: 'd', path: '/x/', noIndex: true });
    expect(meta.robots).toEqual({ index: false, follow: true });
    const images = meta.openGraph?.images as { url: string }[];
    expect(images[0]?.url).toBe('https://cheffycoder.github.io/portfolio/og-image.png');
  });

  it('describes the person with linked profiles and ties the profile page to them', () => {
    const person = personJsonLd();
    expect(person['@type']).toBe('Person');
    expect(person.sameAs).toContain('https://github.com/cheffycoder');
    const page = profilePageJsonLd();
    expect(page.mainEntity).toEqual({ '@id': person['@id'] });
  });

  it('numbers breadcrumbs from one with absolute addresses', () => {
    const crumbs = breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Articles', path: '/articles/' },
    ]);
    expect(crumbs.itemListElement).toEqual([
      expect.objectContaining({ position: 1, item: 'https://cheffycoder.github.io/portfolio/' }),
      expect.objectContaining({
        position: 2,
        item: 'https://cheffycoder.github.io/portfolio/articles/',
      }),
    ]);
  });
});
