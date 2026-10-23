/**
 * The file roles a module folder may contain, and where each role is allowed.
 * Docs: docs/code-structure.md. Adding a role means updating this file, that doc and AGENTS.md together.
 */

/** Paths (relative to the repo root) that follow the module layout. Everything else is tool config. */
export const SCOPED = /^(apps|packages|tooling)\/[^/]+\/(src|e2e)\//;

/** Next.js App Router files. They are the only files allowed in apps/web/src/app. */
export const APP_DIR = /^apps\/web\/src\/app\//;
export const NEXT_ROUTE_FILES = new Set([
  'page.tsx',
  'layout.tsx',
  'template.tsx',
  'not-found.tsx',
  'error.tsx',
  'global-error.tsx',
  'loading.tsx',
  'default.tsx',
  'route.ts',
  'robots.ts',
  'sitemap.ts',
  'manifest.ts',
  'opengraph-image.tsx',
  'twitter-image.tsx',
  'icon.tsx',
  'apple-icon.tsx',
]);

/** Ambient declaration files may live only directly inside a src/types folder. */
export const DECLARATION_DIR = /^(apps|packages|tooling)\/[^/]+\/src\/types\/[^/]+\.d\.ts$/;

const WEB_SRC = /^apps\/web\/src\//;
const E2E = /^apps\/[^/]+\/e2e\//;
const TESTING = /\/src\/testing\//;
const TOOLING = /^tooling\//;

/**
 * role → { what it holds, file extensions, where it may live (undefined = anywhere in scope) }.
 * `.test` may follow any role except `spec`, e.g. queries.helpers.test.ts tests queries.helpers.ts.
 */
export const ROLES = {
  view: { holds: 'one React component', ext: ['tsx'], where: WEB_SRC, whereText: 'apps/web/src' },
  styles: {
    holds: 'Tailwind class recipes (cva)',
    ext: ['ts'],
    where: WEB_SRC,
    whereText: 'apps/web/src',
  },
  hooks: { holds: 'React hooks', ext: ['ts'], where: WEB_SRC, whereText: 'apps/web/src' },
  types: { holds: 'types and interfaces only', ext: ['ts', 'mjs'] },
  constants: { holds: 'fixed values', ext: ['ts', 'mjs'] },
  helpers: { holds: 'pure functions (no I/O)', ext: ['ts', 'mjs'] },
  schema: { holds: 'Zod schemas', ext: ['ts'] },
  service: { holds: 'functions with side effects (files, network, storage, DOM)', ext: ['ts'] },
  adapter: { holds: 'one implementation of a contract (a provider)', ext: ['ts'] },
  errors: { holds: 'error classes', ext: ['ts', 'mjs'] },
  entry: { holds: 'a program entry point (CLI command, Worker)', ext: ['ts', 'mjs'] },
  spec: {
    holds: 'Playwright end-to-end tests',
    ext: ['ts'],
    where: E2E,
    whereText: 'an e2e folder',
  },
  mock: { holds: 'test doubles', ext: ['ts'], where: TESTING, whereText: 'src/testing' },
  setup: { holds: 'test runner setup', ext: ['ts'], where: TESTING, whereText: 'src/testing' },
  rule: { holds: 'one lint rule', ext: ['mjs'], where: TOOLING, whereText: 'tooling' },
};

/** <module>.<role>[.test].<ext> */
export const FILE_NAME = /^([a-z0-9]+(?:-[a-z0-9]+)*)\.([a-z]+)(\.test)?\.(ts|tsx|mjs)$/;
