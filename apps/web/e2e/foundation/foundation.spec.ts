import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

/** Every home screen, in order (config/site homeScreens). */
const SCREENS = [
  'intro',
  'about',
  'numbers',
  'fancode',
  'loginext',
  'platforms',
  'co-develop',
  'share-on',
  'skills',
  'writing',
  'contact',
];

test.use({ colorScheme: 'light' });

test.describe('foundation', () => {
  test('every home screen fills the viewport exactly, with nothing to scroll inside it', async ({
    page,
  }) => {
    await page.goto('./');
    for (const id of SCREENS) {
      const box = await page.evaluate((screenId) => {
        const el = document.getElementById(screenId)!;
        el.scrollIntoView({ block: 'start' });
        return {
          height: Math.round(el.getBoundingClientRect().height),
          viewport: window.innerHeight,
          sideways: document.documentElement.scrollWidth > window.innerWidth,
        };
      }, id);
      expect(box.sideways, `${id}: no sideways scrolling`).toBe(false);
      expect(box.height, `${id} fits one screen`).toBe(box.viewport);
    }
  });

  test('the articles page and the 404 page are single screens', async ({ page }) => {
    for (const path of ['articles/', 'nothing-here/']) {
      await page.goto(path);
      const fits = await page.evaluate(
        () => document.querySelector('main')!.getBoundingClientRect().height <= window.innerHeight,
      );
      expect(fits, path).toBe(true);
    }
  });

  test('unknown addresses get the site’s own page with a 404 status', async ({ page }) => {
    const response = await page.goto('nothing-here/');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Nothing here.');
  });

  test('no requests fail: fonts, art, icons and scripts all load under the base path', async ({
    page,
  }) => {
    const failed: string[] = [];
    page.on('response', (r) => {
      if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
    });
    await page.goto('./');
    for (const id of ['fancode', 'loginext']) {
      await page.evaluate((s) => document.getElementById(s)!.scrollIntoView(), id);
      await page.waitForTimeout(300);
    }
    await page.goto('articles/');
    expect(failed).toEqual([]);
  });

  for (const scheme of ['light', 'dark'] as const) {
    test(`has no detectable accessibility problems (${scheme})`, async ({ page }) => {
      test.slow();
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      for (const path of ['./', 'articles/', 'nothing-here/']) {
        await page.goto(path);
        // Reveal every screen so axe checks the content as visitors see it.
        await page.evaluate(() =>
          document
            .querySelectorAll('section, main')
            .forEach((s) => s.setAttribute('data-seen', '')),
        );
        const results = await new AxeBuilder({ page }).analyze();
        expect(
          results.violations,
          `${path}: ${results.violations.map((v) => v.id).join(', ')}`,
        ).toEqual([]);
      }
    });
  }
});
