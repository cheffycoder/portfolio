import { expect, test } from '@playwright/test';

const SITE = 'https://example.github.io/portfolio';

test.describe('seo', () => {
  test('home: title, description, canonical and share card', async ({ page }) => {
    await page.goto('./');
    await expect(page).toHaveTitle('Shivam Bandral · Frontend Engineer');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${SITE}/`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Frontend/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      `${SITE}/og-image.png`,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    );
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  });

  test('home: structured data describes the person and the profile page', async ({ page }) => {
    await page.goto('./');
    const items = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) => nodes.map((n) => JSON.parse(n.textContent ?? '{}')));
    const types = items.map((i) => i['@type']);
    expect(types).toEqual(expect.arrayContaining(['Person', 'ProfilePage', 'WebSite']));
    const person = items.find((i) => i['@type'] === 'Person');
    expect(person.sameAs).toContain('https://github.com/cheffycoder');
    expect(person.url).toBe(`${SITE}/`);
  });

  test('articles stay out of search until there are articles', async ({ page }) => {
    await page.goto('articles/');
    await expect(page).toHaveTitle('Articles · Shivam Bandral');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${SITE}/articles/`,
    );
  });

  test('sitemap, robots and manifest use the full addresses', async ({ request }) => {
    const sitemap = await (await request.get('sitemap.xml')).text();
    expect(sitemap).toContain(`<loc>${SITE}/</loc>`);
    expect(sitemap).not.toContain('/articles/');
    const robots = await (await request.get('robots.txt')).text();
    expect(robots).toContain(`Sitemap: ${SITE}/sitemap.xml`);
    const manifest = await (await request.get('manifest.webmanifest')).json();
    expect(manifest.start_url).toBe('/portfolio/');
    for (const icon of manifest.icons) {
      expect((await request.get(icon.src.replace('/portfolio/', ''))).ok(), icon.src).toBe(true);
    }
  });
});
