import { describe, expect, it } from 'vitest';

import { checkModulePath } from './module-structure.helpers.mjs';

const ok = (path) => expect(checkModulePath(path), path).toBeNull();
const bad = (path, pattern) => expect(checkModulePath(path), path).toMatch(pattern);

describe('module structure', () => {
  it('accepts every role in its module folder', () => {
    ok('apps/web/src/components/layout/global-nav/global-nav.view.tsx');
    ok('apps/web/src/components/layout/global-nav/global-nav.styles.ts');
    ok('apps/web/src/components/layout/global-nav/global-nav.types.ts');
    ok('apps/web/src/features/home/numbers-screen/numbers-screen.hooks.ts');
    ok('apps/web/src/features/home/time-bar/time-bar.helpers.test.ts');
    ok('apps/web/src/features/home/time-bar/time-bar.view.test.tsx');
    ok('apps/web/src/lib/analytics/umami/umami.adapter.ts');
    ok('apps/web/src/config/env/env.schema.ts');
    ok('apps/web/e2e/home/home.spec.ts');
    ok('apps/web/src/testing/vitest/vitest.setup.ts');
    ok('tooling/eslint-plugin/src/module-structure/module-structure.rule.mjs');
  });

  it('ignores files outside src and e2e (tool config)', () => {
    ok('apps/web/next.config.ts');
    ok('eslint.config.mjs');
  });

  it('allows only Next.js route files in app/', () => {
    ok('apps/web/src/app/page.tsx');
    ok('apps/web/src/app/articles/page.tsx');
    ok('apps/web/src/app/sitemap.ts');
    ok('apps/web/src/app/manifest.ts');
    bad('apps/web/src/app/articles/articles-list.tsx', /only Next\.js route files/);
  });

  it('allows declaration files only in src/types', () => {
    ok('apps/web/src/types/next-assets.d.ts');
    bad('apps/web/src/lib/thing.d.ts', /src\/types/);
  });

  it('rejects loose files and old-style names', () => {
    bad('apps/web/src/utils.ts', /never sit loose/);
    bad('apps/web/src/lib/paths/urls.ts', /<module>\.<role>/);
    bad('apps/web/src/lib/index.ts', /never sit loose|<module>\.<role>/);
  });

  it('requires the file to be named after its folder', () => {
    bad('apps/web/src/components/global-nav/nav.view.tsx', /must start with "global-nav\."/);
  });

  it('rejects unknown roles', () => {
    bad('apps/web/src/lib/seo/seo.utils.ts', /unknown role/);
  });

  it('keeps JSX in views only', () => {
    bad('apps/web/src/lib/seo/seo.helpers.tsx', /JSX belongs only in \.view\.tsx/);
    bad('apps/web/src/components/icon/icon.view.ts', /\.view files are \.tsx/);
  });

  it('keeps each role where it belongs', () => {
    bad('tooling/eslint-plugin/src/thing/thing.view.tsx', /apps\/web\/src/);
    bad('apps/web/src/lib/seo/seo.mock.ts', /src\/testing/);
    bad('apps/web/src/lib/seo/seo.spec.ts', /e2e folder/);
    bad('apps/web/e2e/home/home.spec.test.ts', /drop "\.test"/);
  });
});
