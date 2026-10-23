import { describe, expect, it } from 'vitest';

import { navLinks } from './global-nav.helpers';

describe('global nav', () => {
  it('on the home page, Articles leaves and Get in touch scrolls', () => {
    const [articles, contact] = navLinks('home');
    expect(articles).toMatchObject({ href: '/articles/', out: true, current: false });
    expect(contact).toMatchObject({ href: '#contact', out: false });
  });

  it('on the articles page, Articles is current and Get in touch goes home', () => {
    const [articles, contact] = navLinks('articles');
    expect(articles).toMatchObject({ out: false, current: true });
    expect(contact).toMatchObject({ href: '/#contact', out: true });
  });

  it('elsewhere, every link leaves the page', () => {
    const [articles, contact] = navLinks('other');
    expect(articles).toMatchObject({ out: true, current: false });
    expect(contact).toMatchObject({ href: '/#contact', out: true });
  });
});
