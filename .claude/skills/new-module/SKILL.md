---
name: new-module
description: Create a new portfolio module (component, screen, feature piece, connector) with the right folder and role files. Use whenever adding new code or a new component.
---

# New module

Every piece of code is a module folder with role files (docs/code-structure.md). Lint enforces it.

1. **Pick the place.**
   - Route? Only `page.tsx`/`layout.tsx`… in `apps/web/src/app/`; they compose views, nothing else.
   - One area of the site → `apps/web/src/features/<feature>/<module>/` (`home`, `articles`, `not-found`).
   - A new home screen → `features/home/<name>-screen/`, wrapped in `Screen`, with its id and label added to
     `homeScreens` in `config/site/site.constants.ts` and composed in `app/page.tsx`.
   - UI used by several features → `apps/web/src/components/<group>/<module>/`.
   - Outside service (analytics, SEO, paths) → `lib/<module>/`, providers as `<module>/<provider>/<provider>.adapter.ts`.
   - Settings or copy → `config/<module>/`. Tiny shared helper → `utils/<module>/`.
2. **Name the folder** in kebab-case. Every file inside starts with the folder name.
3. **Create only the roles you need**:
   - `<m>.types.ts`: props and other types (never declare types anywhere else).
   - `<m>.constants.ts`: fixed values, copy, limits.
   - `<m>.helpers.ts`: pure logic. Add `<m>.helpers.test.ts` next to it.
   - `<m>.schema.ts`: Zod schemas; infer types in `.types.ts`.
   - `<m>.hooks.ts`: React hooks (`'use client'`).
   - `<m>.styles.ts`: `export const <m>Styles = { root: cva('…'), part: cva('…', { variants }) }`.
     A variant never overrides a utility from the same recipe's base; put both values in variants.
   - `<m>.view.tsx`: the component. Uses `className={<m>Styles.part()}`; merge with `cn()` from
     `@/utils/cn/cn.helpers`. No class strings, no types, no hooks declared here.
   - `<m>.service.ts` for side effects (DOM, storage, network), `<m>.adapter.ts` for a provider.
4. **Import exact files** (`@/components/screens/screen/screen.view`). Never create `index.ts`.
5. Content rises in with `revealStyles.root({ step })`; numbers roll with `RollNumber`; screen numbers come
   from `ScreenLabel`, never typed by hand.
6. User-facing behaviour gets an e2e test in `apps/web/e2e/<area>/<area>.spec.ts` (desktop and phone).
7. Run `pnpm lint` and `pnpm typecheck`. Fix every message; never disable the rules.
8. Never commit. Give the maintainer the git commands to run (AGENTS.md › Git).
