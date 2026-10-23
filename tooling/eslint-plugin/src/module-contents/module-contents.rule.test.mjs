import { RuleTester } from 'eslint';
import tseslint from 'typescript-eslint';
import { afterAll, describe, it } from 'vitest';

import { moduleContentsRule } from './module-contents.rule.mjs';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

const tester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
});

const at = (file) => `${process.cwd()}/${file}`;
const MOD = 'apps/web/src/features/home/numbers-screen';

tester.run('module-contents', moduleContentsRule, {
  valid: [
    { filename: at(`${MOD}/numbers-screen.types.ts`), code: 'export type A = { b: string };' },
    {
      filename: at(`${MOD}/numbers-screen.hooks.ts`),
      code: 'export function useFilter() { return 2; }',
    },
    {
      filename: at(`${MOD}/numbers-screen.styles.ts`),
      code: "import { cva } from 'class-variance-authority'; export const s = { a: cva('p-2') };",
    },
    {
      filename: at('apps/web/src/config/env/env.schema.ts'),
      code: "import { z } from 'zod'; export const s = z.string();",
    },
    {
      filename: at('apps/web/src/config/env/env.types.ts'),
      code: "import type { z } from 'zod'; export type T = z.infer<typeof s>;",
    },
    {
      filename: at(`${MOD}/numbers-screen.view.tsx`),
      code: 'export const V = () => <div className={s.root()} />;',
    },
    {
      filename: at(`${MOD}/numbers-screen.helpers.test.ts`),
      code: 'type Row = { a: number }; const useX = 1;',
    },
    { filename: at('apps/web/next.config.ts'), code: 'type Anything = string;' },
  ],
  invalid: [
    {
      filename: at(`${MOD}/numbers-screen.helpers.ts`),
      code: 'export type A = string;',
      errors: [{ message: /\.types\.ts/ }],
    },
    {
      filename: at(`${MOD}/numbers-screen.view.tsx`),
      code: 'interface P { a: string }',
      errors: [{ message: /\.types\.ts/ }],
    },
    {
      filename: at(`${MOD}/numbers-screen.view.tsx`),
      code: 'export function useThing() {}',
      errors: [{ message: /\.hooks\.ts/ }],
    },
    {
      filename: at(`${MOD}/numbers-screen.helpers.ts`),
      code: "import { z } from 'zod'; export const s = z.string();",
      errors: [{ message: /\.schema\.ts/ }],
    },
    {
      filename: at(`${MOD}/numbers-screen.view.tsx`),
      code: "import { cva } from 'class-variance-authority'; const s = cva('p-2');",
      errors: [{ message: /\.styles\.ts/ }],
    },
    {
      filename: at(`${MOD}/numbers-screen.view.tsx`),
      code: 'export const V = () => <div className="p-2" />;',
      errors: [{ message: /\.styles\.ts/ }],
    },
    {
      filename: at(`${MOD}/numbers-screen.view.tsx`),
      code: 'export const V = () => <div className={`p-2 ${x}`} />;',
      errors: [{ message: /\.styles\.ts/ }],
    },
    {
      filename: at('apps/web/src/app/page.tsx'),
      code: 'type Props = { a: string }; export default function P() { return <main className="p-2" />; }',
      errors: 2,
    },
  ],
});
