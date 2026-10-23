import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

const activeScreen = (page: Page) =>
  page.evaluate(() => {
    const mid = window.innerHeight / 2;
    return [...document.querySelectorAll('main > section')].find((s) => {
      const r = s.getBoundingClientRect();
      return r.top <= mid && r.bottom >= mid;
    })?.id;
  });

/** Opens a page and waits until the deck's handlers are attached (before that, keys do nothing). */
const open = async (page: Page, path: string) => {
  await page.goto(path);
  await expect(page.locator('main[data-deck-ready]')).toBeAttached();
};

test.use({ reducedMotion: 'reduce' });

test.describe('navigation', () => {
  test('the floating nav appears from the second screen', async ({ page }) => {
    await page.goto('./');
    const nav = page.getByRole('navigation', { name: 'Sections' });
    await expect(nav).toBeHidden();
    await page.locator('#intro a[href="#about"]').last().click();
    await expect.poll(() => activeScreen(page)).toBe('about');
    await expect(nav).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Shivam Bandral' })).toBeVisible();
  });

  test('footers link each screen to its neighbours, numbered', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('#about')).toContainText('02 / 11');
    await page.locator('#about a[href="#intro"]').last().click();
    await expect.poll(() => activeScreen(page)).toBe('intro');
    await expect(page.locator('#contact')).toContainText('© 2026');
  });

  test('arrow keys move one screen at a time', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard only');
    await open(page, './');
    await expect.poll(() => activeScreen(page)).toBe('intro');
    // Each press goes out the moment the previous screen change shows, before any scroll has settled.
    await page.keyboard.press('ArrowDown');
    await expect.poll(() => activeScreen(page)).toBe('about');
    await page.keyboard.press('ArrowDown');
    await expect.poll(() => activeScreen(page)).toBe('numbers');
    await page.keyboard.press('ArrowUp');
    await expect.poll(() => activeScreen(page)).toBe('about');
  });

  test('quick presses add up instead of repeating', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard only');
    await open(page, './');
    await expect.poll(() => activeScreen(page)).toBe('intro');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect.poll(() => activeScreen(page)).toBe('numbers');
    await page.waitForTimeout(1500);
    expect(await activeScreen(page), 'stays there once the scroll settles').toBe('numbers');
  });

  test('"Open to …" scrolls to the contact card', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('link', { name: /^Open to senior frontend roles/ }).click();
    await expect.poll(() => activeScreen(page)).toBe('contact');
  });

  test('Get in touch from the articles page lands on the contact screen', async ({
    page,
    viewport,
  }) => {
    test.skip(
      (viewport?.width ?? 0) < 834,
      'the link sits in the phone menu there (covered below)',
    );
    await page.goto('articles/');
    await page.getByRole('link', { name: 'Get in touch (opens the home page)' }).click();
    await expect(page).toHaveURL(/\/portfolio\/#contact$/);
    await expect.poll(() => activeScreen(page)).toBe('contact');
  });

  test('phones and small tablets get a full-screen menu', async ({ page, viewport }) => {
    test.skip((viewport?.width ?? 0) >= 834, 'wide screens show the links inline');
    await page.goto('./');
    const open = page.getByRole('button', { name: 'Menu' });
    await open.click();
    const menu = page.getByRole('dialog', { name: 'Menu' });
    await expect(menu).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close menu' }).last()).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await open.click();
    await menu.getByRole('link', { name: 'Articles' }).click();
    await expect(page).toHaveURL(/\/portfolio\/articles\/$/);
  });

  test('below large screens, Explore lists every screen', async ({ page, viewport }) => {
    test.skip((viewport?.width ?? 0) >= 1069, 'large screens show Articles inline');
    await open(page, './#skills');
    const nav = page.getByRole('navigation', { name: 'Sections' });
    await nav.getByRole('button', { name: 'Explore' }).click();
    await nav.getByRole('link', { name: /^Contact/ }).click();
    await expect.poll(() => activeScreen(page)).toBe('contact');
  });

  test('wide screens get the side rail', async ({ page, viewport }) => {
    test.skip((viewport?.width ?? 0) < 1180, 'the rail needs room beside the column');
    await open(page, './#about');
    const rail = page.getByRole('navigation', { name: 'Screens' });
    await expect(rail).toBeVisible();
    await rail.getByRole('button', { name: 'Next screen: Numbers' }).click();
    await expect.poll(() => activeScreen(page)).toBe('numbers');
    await rail.getByRole('button', { name: /^Next screen/ }).click();
    await rail.getByRole('button', { name: /^Next screen/ }).click();
    await expect.poll(() => activeScreen(page)).toBe('loginext');
    await rail.getByRole('link', { name: '11 Contact' }).click();
    await expect.poll(() => activeScreen(page)).toBe('contact');
  });
});
