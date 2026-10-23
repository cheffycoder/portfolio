import { expect, test } from '@playwright/test';

test.use({ reducedMotion: 'reduce', colorScheme: 'light' });

test.describe('interactions', () => {
  test('the theme switch flips the page and is remembered', async ({ page }) => {
    await page.goto('./');
    const toggle = page.locator('#intro').getByRole('button', { name: 'Switch to dark theme' });
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(
      page.locator('#intro').getByRole('button', { name: 'Switch to light theme' }),
    ).toBeVisible();
  });

  test('the theme sweep plays and lands on the new theme', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('./');
    await page.locator('#intro [data-theme-toggle]').click();
    await expect(page.locator('[data-sky]')).toHaveAttribute('data-sky', 'dark');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark', { timeout: 4000 });
    await expect(page.locator('[data-sky]')).toHaveAttribute('data-sky', 'idle', { timeout: 4000 });
  });

  test('a highlight tile turns over to its detail', async ({ page }) => {
    await page.goto('./#numbers');
    const tile = page.locator('#numbers article').first();
    const more = tile.getByRole('button', { name: 'More about page load time' });
    await more.click();
    await expect(more).toHaveAttribute('aria-expanded', 'true');
    await expect(tile.getByText('At LogiNext: code splitting')).toBeVisible();
  });

  test('the company filter dims the other company’s results', async ({ page }) => {
    await page.goto('./#numbers');
    await page.locator('#numbers').getByRole('button', { name: 'FanCode', exact: true }).click();
    const loginext = page.locator('#numbers article[data-company="loginext"]').first();
    await expect.poll(() => loginext.evaluate((el) => getComputedStyle(el).opacity)).toBe('0.22');
  });

  test('skill groups switch by hand', async ({ page }) => {
    await page.goto('./#skills');
    const skills = page.locator('#skills');
    await skills.getByRole('button', { name: 'Tools', exact: true }).click();
    await expect(skills.getByRole('list', { name: 'Tools' })).toBeVisible();
    await expect(skills.getByText('GitHub Actions')).toBeVisible();
    await skills.getByRole('button', { name: 'Next group' }).click();
    await expect(skills.getByText('Design systems')).toBeVisible();
  });

  test('the skills timer fills its pill until the next group, and pause holds it', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('./#skills');
    const skills = page.locator('#skills');
    // The fill restarts (is replaced) on every group, so measure it fresh each time.
    const share = () =>
      skills.locator('[role="group"]').evaluate((group) => {
        const pill = group.firstElementChild as HTMLElement;
        const fill = pill.firstElementChild as HTMLElement | null;
        return fill ? fill.getBoundingClientRect().width / pill.offsetWidth : 0;
      });
    await expect.poll(share).toBeGreaterThan(0.3);
    await skills.getByRole('button', { name: 'Pause' }).click();
    const held = await share();
    await page.waitForTimeout(1000);
    expect(Math.abs((await share()) - held)).toBeLessThan(0.05);
    await skills.getByRole('button', { name: 'Play' }).click();
    await expect(skills.getByRole('button', { name: 'Languages', exact: true })).toHaveAttribute(
      'aria-pressed',
      'true',
      { timeout: 6000 },
    );
  });

  test('the file lifecycle bar moves with the keyboard', async ({ page }) => {
    await page.goto('./#share-on');
    const bar = page.getByRole('slider', { name: 'File lifecycle stage' });
    await bar.focus();
    await page.keyboard.press('ArrowRight');
    await expect(bar).toHaveAttribute('aria-valuetext', 'Shared');
    await page.keyboard.press('End');
    await expect(bar).toHaveAttribute('aria-valuetext', 'Deleted');
    await page.keyboard.press('Home');
    await expect(bar).toHaveAttribute('aria-valuetext', 'Uploaded');
  });

  test('"Coming soon." comes loose on hover', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('articles/');
    await page.getByRole('heading', { name: 'Coming soon.' }).locator('span').first().hover();
    await expect(page.getByText('Drafting…')).toBeVisible();
  });

  test('copy email reports back', async ({ page, browserName, context }) => {
    test.skip(browserName !== 'chromium', 'clipboard permission is Chromium-only in Playwright');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('./#contact');
    await page.locator('#contact').getByRole('button', { name: /Copy/ }).click();
    await expect(page.getByRole('status')).toHaveText('Copied to clipboard');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      'shivambandral@gmail.com',
    );
  });
});
