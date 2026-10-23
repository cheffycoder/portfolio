import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;
/**
 * The tests build the site under a base path, the way a GitHub Pages project page serves it, so links, images,
 * icons and canonicals are checked with the prefix in place (docs/deploy.md).
 */
const BASE_PATH = '/portfolio';

/**
 * Every e2e test runs on desktop and mobile (DESIGN.md breakpoints): desktop Chrome + Safari, iPad portrait,
 * Android phone, iPhone. Tests run against the real static build (`out/`), served like GitHub Pages serves it.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL: `http://localhost:${PORT}${BASE_PATH}/`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'desktop-chrome',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'desktop-safari',
      use: { ...devices['Desktop Safari'], viewport: { width: 1440, height: 900 } },
    },
    { name: 'tablet', use: { ...devices['iPad (gen 7)'] } },
    { name: 'android', use: { ...devices['Pixel 7'] } },
    { name: 'iphone', use: { ...devices['iPhone 15'] } },
  ],
  webServer: {
    command: 'pnpm build && pnpm preview',
    url: `http://localhost:${PORT}${BASE_PATH}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: {
      PORT: String(PORT),
      NEXT_PUBLIC_BASE_PATH: BASE_PATH,
      NEXT_PUBLIC_SITE_URL: `https://example.github.io${BASE_PATH}`,
    },
  },
});
