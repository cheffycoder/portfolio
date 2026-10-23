# Code structure

Every piece of code lives in a **module folder**, and every file in that folder is named after it and says
what kind of code it holds. Two lint rules enforce this (`tooling/eslint-plugin`), so a file in the wrong
place or with the wrong contents fails `pnpm lint`, the pre-commit hook and CI.

```
time-bar/
  time-bar.view.tsx         the React component
  time-bar.styles.ts        its Tailwind classes (cva recipes)
  time-bar.types.ts         its props and other types
  time-bar.helpers.ts       pure functions it uses
  time-bar.constants.ts     fixed values
  time-bar.hooks.ts         React hooks
  time-bar.helpers.test.ts  tests for time-bar.helpers.ts
```

A module only has the files it needs. A two-line component may be just `.view.tsx` and `.styles.ts`.

## The rules

1. **One folder = one module.** Files are named `<folder>.<role>.<ext>`. `time-bar/clock.view.tsx` fails; it
   is either `time-bar/time-bar.view.tsx` or its own module `time-bar/clock/clock.view.tsx`.
2. **No loose files.** Nothing sits directly in `src/`, `e2e/` or a grouping folder like `components/screens/`.
3. **No barrel files.** No `index.ts` anywhere; import the exact file.
4. **Each kind of code lives in its role file.** The lint rule checks the contents, not just the name:
   - types, interfaces and enums only in `.types.ts`
   - React hooks (`use…`) only in `.hooks.ts`
   - Zod schemas (`z.…`) only in `.schema.ts`
   - class recipes (`cva`) only in `.styles.ts`; JSX never has a class-name string (`className="…"`)
   - JSX only in `.view.tsx`; every other role is `.ts`
5. **Tests sit next to what they test** and add `.test`. Tests may declare local types and fixtures.
6. **Route files only compose.** `src/app/` holds only Next.js route files (`page.tsx`, `layout.tsx`,
   `not-found.tsx`, `robots.ts`, `sitemap.ts`, `manifest.ts`, …).

## Roles

- `view` (`.tsx`, web app only): one React component.
- `styles` (web app only): Tailwind class recipes with `cva`, exported as `<module>Styles = { part: cva(…) }`
  and used as `className={timeBarStyles.root()}`. Combine with a caller's class via `cn()`.
  A variant must not override a utility from the same recipe's base: `cva` doesn't merge, so which one wins
  would depend on CSS order. Put both values in variants (`hidden: { true: 'hidden', false: 'grid' }`).
- `hooks` (web app only): React hooks.
- `types`: types and interfaces only.
- `constants`: fixed values (copy, limits, regexes, a React context object).
- `helpers`: pure functions. Same input, same output, no I/O.
- `schema`: Zod schemas. Types inferred from them go in `.types.ts`.
- `service`: functions with side effects: DOM, storage, network, environment variables.
- `adapter`: one implementation of a contract (a provider), e.g. `umami/umami.adapter.ts`.
- `errors`, `entry`, `spec` (e2e only), `mock` and `setup` (`src/testing/` only), `rule` (`tooling/` only).

Ambient declaration files (`*.d.ts`) live only in `src/types/`. Tool config and scripts at an app's root
(`next.config.ts`, `playwright.config.ts`, `scripts/*.mjs`) are outside the module layout.

## Where modules go (web app)

- `src/app/`: routes only.
- `src/features/<feature>/<module>/`: `home` (the screens and their parts), `articles`, `not-found`.
  Features never import other features; compose them in `src/app`.
- `src/components/<group>/<module>/`: shared UI: `screens` (deck, screen, navs, footer, labels), `layout`
  (global nav, skip link), `theme`, `motion` (reveal, rolling numbers, jumble text, reduced motion), `ui`.
- `src/lib/<module>/`: connectors: `analytics`, `paths`, `seo`.
- `src/config/<module>/`: `env` (the only reader of `process.env`), `site`, `profile`, `fonts`.
- `src/utils/<module>/`: `cn`, `number`.
- `src/assets/`: fonts and the background art (imported, so the base path is added for us).

## Adding a role

Change `tooling/eslint-plugin/src/module-structure/module-structure.constants.mjs`, this file and AGENTS.md
in the same change, with a decision note in `docs/decisions/`.
