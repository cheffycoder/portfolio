// One lint config for the whole workspace.
// Architecture rules follow Bulletproof React: shared → features → app, no cross-feature imports,
// kebab-case files, no barrel (index) files, one folder per module with role files
// (docs/code-structure.md). See AGENTS.md › Architecture.
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier';
import checkFile from 'eslint-plugin-check-file';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import portfolio from '@portfolio/eslint-plugin/plugin';

const WEB = 'apps/web';
const WEB_SRC = `${WEB}/src`;
const CODE = '**/*.{js,jsx,mjs,cjs,ts,tsx}';
const TS = '**/*.{ts,tsx}';

// Feature folders are discovered, so a new feature is isolated automatically.
const featuresDir = fileURLToPath(new URL(`./${WEB_SRC}/features`, import.meta.url));
let features = [];
try {
  features = readdirSync(featuresDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
} catch {
  features = [];
}

// Reuse the exact plugin instances registered by eslint-config-next,
// so the same plugins can be applied to non-Next workspaces without redefinition errors.
const findPlugin = (name) => nextVitals.find((c) => c.plugins?.[name])?.plugins[name];
const importPlugin = findPlugin('import');

// Scope every Next.js config object to the web app only.
const scopedNext = nextVitals.map((config) => ({
  ...config,
  files: config.files
    ? config.files.map((pattern) => `${WEB}/${pattern.replace(/^\*\*\//, '**/')}`)
    : [`${WEB}/${CODE}`],
  settings: { ...config.settings, next: { rootDir: WEB } },
}));

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      '**/dist/**',
      '**/coverage/**',
      '**/playwright-report/**',
      '**/test-results/**',
      '**/.cache/**',
      'docs/prototype/**',
      '**/next-env.d.ts',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...scopedNext,

  // ---- Everything ----
  {
    files: [CODE],
    languageOptions: { globals: { ...globals.node } },
    plugins: { import: importPlugin },
    settings: {
      'import/resolver': {
        typescript: { project: ['apps/*/tsconfig.json'] },
        node: true,
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [{ pattern: '@/**', group: 'internal' }],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      // Tooling must never reach into apps.
      'import/no-restricted-paths': [
        'error',
        {
          zones: [{ target: './tooling', from: './apps', message: 'Tooling cannot import apps.' }],
        },
      ],
    },
  },

  // ---- Module layout: <module>/<module>.<role>.<ext>, each kind of code in its own role file ----
  {
    files: [CODE],
    plugins: { portfolio },
    rules: {
      'portfolio/module-structure': 'error',
      'portfolio/module-contents': 'error',
    },
  },
  {
    files: [TS],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // ---- Web app architecture (Bulletproof React) ----
  {
    files: [`${WEB_SRC}/${CODE}`],
    languageOptions: { globals: { ...globals.browser } },
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // Cross-feature imports are forbidden; compose features in the app layer.
            ...features.map((feature) => ({
              target: `./${WEB_SRC}/features/${feature}`,
              from: `./${WEB_SRC}/features`,
              except: [`./${feature}`],
              message: 'Features cannot import other features. Compose them in src/app.',
            })),
            // Unidirectional flow: shared → features → app.
            {
              target: `./${WEB_SRC}/features`,
              from: `./${WEB_SRC}/app`,
              message: 'Features cannot import from the app layer.',
            },
            {
              target: [
                `./${WEB_SRC}/components`,
                `./${WEB_SRC}/hooks`,
                `./${WEB_SRC}/lib`,
                `./${WEB_SRC}/types`,
                `./${WEB_SRC}/utils`,
                `./${WEB_SRC}/config`,
                `./${WEB_SRC}/testing`,
              ],
              from: [`./${WEB_SRC}/features`, `./${WEB_SRC}/app`],
              message: 'Shared code cannot import features or the app layer.',
            },
          ],
        },
      ],
    },
  },

  // ---- Naming: kebab-case files and folders, no barrel files ----
  {
    files: ['apps/*/src/**/*.{ts,tsx}', 'apps/*/e2e/**/*.ts', 'tooling/*/src/**/*.mjs'],
    plugins: { 'check-file': checkFile },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.{ts,tsx,mjs}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/filename-blocklist': ['error', { '**/index.{ts,tsx,mjs}': '*.{ts,tsx,mjs}' }],
    },
  },
  {
    files: ['apps/*/src/**/*.{ts,tsx}', 'tooling/*/src/**/*.mjs'],
    ignores: [`${WEB_SRC}/app/**`],
    plugins: { 'check-file': checkFile },
    rules: {
      'check-file/folder-naming-convention': [
        'error',
        {
          'apps/*/src/**/!(__tests__)/': 'KEBAB_CASE',
          'tooling/*/src/**/!(__tests__)/': 'KEBAB_CASE',
        },
      ],
    },
  },
  {
    files: [`${WEB_SRC}/app/**/*.{ts,tsx}`],
    plugins: { 'check-file': checkFile },
    rules: {
      'check-file/folder-naming-convention': [
        'error',
        { [`${WEB_SRC}/app/**/`]: 'NEXT_JS_APP_ROUTER_CASE' },
      ],
    },
  },

  // ---- Tests and scripts may log ----
  {
    files: ['**/*.test.{ts,tsx}', '**/e2e/**/*.ts', 'apps/*/scripts/**/*.mjs'],
    rules: { 'no-console': 'off' },
  },

  prettier,
);
