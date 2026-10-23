# AGENTS.md

Instructions for AI coding agents (Claude Code, Codex, Cursor, etc.) and humans working in this repo.
Read this first. If something here conflicts with a request, ask before deviating.

## What this is

**Shivam Bandral's portfolio**, a static, SEO-first site on GitHub Pages (`cheffycoder.github.io/portfolio`
until a custom domain exists). One page of eleven full-viewport screens (intro, about, highlights, FanCode,
LogiNext, web and mobile, two side projects, skills, writing, contact) plus an articles page that says "coming
soon" until the first article ships. Its job: get found, read well on every device, and lead to a conversation.

The locked visual reference is `docs/prototype/` (v6). The site matches it on phone, tablet and desktop, in
light and dark; differences are logged in `docs/design-sense.md`.

## Workspace map

```
apps/web               The website. Next.js App Router, static export → apps/web/out (plain files).
tooling/eslint-plugin  Project lint rules: module layout and role contents (docs/code-structure.md).
docs/                  DESIGN.md (tokens, components), design-sense.md (reasoning + decisions log),
                       code-structure.md, architecture.md, content-guide.md, deploy.md, commits.md,
                       decisions/, prototype/ (locked v6 design).
```

Never committed: secrets (`.env*`), build output, test and audit reports.

## Commands (run from the repo root)

```
pnpm install            Install everything (Node 22+, pnpm 10)
pnpm dev                Website at http://localhost:3000
pnpm build              Static build of the website → apps/web/out
pnpm preview            Serve out/ the way GitHub Pages does (base path, 404 page) at http://localhost:4173
pnpm check              Format check, lint, typecheck, unit tests — run before you finish
pnpm test:e2e:install   Download the Playwright browsers, Chromium and WebKit (once)
pnpm test:e2e           Playwright on 5 setups (desktop Chrome/Safari, iPad, Android, iPhone), under /portfolio
pnpm --filter @portfolio/web brand-images   Re-render favicon, app icons and the share card
```

Deploying is automatic: every merge to `main` that passes CI publishes the site to GitHub Pages
(`docs/deploy.md`). Nothing is deployed by hand.

Husky hooks:

- **pre-commit**: refuses the commit if any code file under `src/` or `e2e/` is untracked or git-ignored (it would
  pass locally and be missing on GitHub), then lint-staged and typecheck.
- **commit-msg**: commitlint (docs/commits.md).
- **pre-push**: refuses pushes to `main`; then, on a clean copy of exactly the commit being pushed, runs `pnpm check`
  and (unless the push changes only docs) the browser tests on all five setups, as CI does. Needs
  `pnpm test:e2e:install` once, and port 4173 free (stop any `pnpm preview`).

Never bypass hooks (`--no-verify`) and never weaken a lint rule to make code pass.

## Git: the maintainer runs every git command

- **AI agents never run git commands that change anything**: no `add`, `commit`, `push`, `merge`, `rebase`,
  `reset`, `checkout`/`switch`, `branch`, `stash`, `tag`, `restore`, `rm`, `mv`, `cherry-pick`, `revert`,
  `clean`, and no `gh pr merge`. Read-only commands (`status`, `diff`, `log`, `show`) are fine.
- Agents write code, then hand the maintainer the exact commands to run, one per line, with no inline
  `#` comments (zsh passes them as arguments). The maintainer reviews the diff and runs them.
- **Nobody pushes to `main`.** Every change goes: branch → push → pull request → CI green → squash merge on
  GitHub. The pre-push hook rejects pushes to `main` as a backstop.
- Branch names: `<type>/<short-description>` using the commit types, e.g. `feat/articles-list`, `fix/contact-fit`.

## Commits

Conventional Commits, mapped to semver; full guide in `docs/commits.md`, rules in `commitlint.config.mjs`.

- Shape: `type(scope): summary`. Summary imperative, lower case, no full stop, header ≤ 72 characters.
- Types: `feat` (minor), `fix` and `perf` (patch); `refactor`, `style`, `test`, `docs`, `build`, `ci`, `chore`,
  `revert` (no release). `!` or a `BREAKING CHANGE:` footer means major: a public URL or shared link breaks.
- Scopes: `web`, `content`, `design`, `seo`, `analytics`, `e2e`, `deps`, `tooling`, `release`.

## Code structure (enforced by ESLint)

Full guide: `docs/code-structure.md`. In short:

- **One folder per module; files named `<module>.<role>.<ext>`**, e.g. `time-bar/time-bar.view.tsx`,
  `time-bar.styles.ts`, `time-bar.types.ts`. Roles: `view`, `styles`, `hooks`, `types`, `constants`, `helpers`,
  `schema`, `service`, `adapter`, `errors`, `entry`, `spec`, `mock`, `setup`, `rule`.
- **Each kind of code only in its role file**: types in `.types.ts`, hooks in `.hooks.ts`, Zod in `.schema.ts`,
  `cva` class recipes in `.styles.ts`, JSX only in `.view.tsx`. No `className="…"` strings in JSX.
- **No loose files, no barrel (`index.ts`) files.** Import the exact file.
- Tests sit next to their file: `time-bar.helpers.ts` → `time-bar.helpers.test.ts`.
- `src/app/` holds only Next.js route files, which compose views and never declare types, hooks or styles.

## Architecture rules (Bulletproof React, enforced by ESLint)

Inside `apps/web/src`:

- `app/`: routes and page composition only. May import anything below.
- `features/<feature>/<module>/` (`home`, `articles`, `not-found`): **a feature never imports another feature.**
  Compose features in `app/`.
- Shared: `components/<group>/<module>/`, `lib/`, `config/`, `utils/`, `testing/`, `types/`.
  **Shared code never imports features or `app/`.** Flow is one-way: shared → features → app.
- `components/screens/` runs the snap deck: `ScreenDeck` (active screen, keys, in-page links; handlers read the
  live position from refs, never from state, so a key pressed mid-render isn't lost), `Screen`
  (one full-viewport screen; reveals and footers), `LocalNav`, `ScreenRail`, `ScreenLabel`.
- `lib/` holds the connectors. One file decides the provider; the rest of the code only uses the contract:
  - analytics → `lib/analytics/analytics.service.ts` (`track()`); provider chosen in `analytics.helpers.ts`
  - addresses → `lib/paths/paths.service.ts`: `assetPath()` for files in `public/`, `absoluteUrl()` for canonicals,
    share cards and structured data. **Never hard-code `/portfolio` or a domain.**
  - SEO metadata and structured data → `lib/seo/seo.helpers.ts` (`pageMetadata()` for every page)

Conventions:

- TypeScript strict. No `any`; prefer `unknown` + narrowing. Use `import type` for types.
- File and folder names are kebab-case.
- Absolute imports: `@/…` → `apps/web/src/…`.
- Settings come from `config/env/env.service.ts` (validated with Zod). Never read `process.env` elsewhere in the web
  app (`next.config.ts` reads the same `NEXT_PUBLIC_BASE_PATH`).
- Images in `src/assets/` are imported (`next/image`), which adds the base path; files in `public/` go through
  `assetPath()`.

## Design rules

`docs/DESIGN.md` is the source of truth; `apps/web/src/styles/globals.css` holds the tokens. In short:

- Matte paper and ink; the only colour is the two company gradients (FanCode warm, LogiNext cool).
- One content column for everything: the `container-screen` utility (880 / 680 / 87.5% up to 420px).
- Breakpoints: phones ≤ 734, tablets 735–1068, desktops ≥ 1069; the global nav collapses below 834; the side rail
  needs ≥ 1180. Short screens trim secondary details (`short-phone`, `short-laptop`, … variants).
- **Every screen fits the viewport; nothing scrolls inside a screen.** The e2e suite checks it on every setup.
- Type roles are `type-*` utilities (label, meta, display, h2, quote, statement, lead, stat, title, cap). Don't put
  a size or colour utility on top of a role; write the role out instead.
- In a `cva` recipe, a variant never overrides a utility from the same recipe's base: give both values as variants.
- Respect `prefers-reduced-motion` (reveals, rolls, the sky sweep and the jumble all stop).

When a design decision is made, log it in `docs/design-sense.md` and update `DESIGN.md` in the same change.

## Content rules

- All copy lives in `config/profile/profile.constants.ts` and `config/site/site.constants.ts`. Every claim must be
  on the resume; each number appears once on the site (`docs/content-guide.md`, skill `update-profile`).
- Screen numbers ("03 · Highlights") and footers come from the screen order in `homeScreens`; never type them.

## Testing

- Unit tests (Vitest) sit next to the code. Pure logic (time maths, roll frames, the lifecycle bar, paths, SEO,
  settings) must be tested.
- E2E tests (Playwright) live in `apps/web/e2e/<area>/<area>.spec.ts` and run against the static build served
  under `/portfolio`, on all 5 setups. New user-facing behaviour needs an e2e test covering desktop and phone.
- Accessibility is checked automatically (axe) on every page, light and dark. Fix violations; never disable the rule.

## SEO

- Use `pageMetadata()` for title, description, canonical, Open Graph and Twitter cards; one `h1` per page.
- The home page carries `Person`, `ProfilePage` and `WebSite` structured data; profile links use `rel="me"`.
- The articles page is `noindex` and out of the sitemap until it has articles (decision 0009).
- Audit with the claude-seo plugin (`/seo audit`, `/seo schema`) against `pnpm preview` before release.

## Done means

1. `pnpm check` passes.
2. `pnpm build` succeeds and, for UI changes, `pnpm test:e2e` passes.
3. UI changes still match `docs/prototype` on phone, tablet and desktop (or the difference is logged).
4. Docs are updated when behaviour, design or content rules change.
5. The maintainer has the exact git commands to review and run (see Git above). Agents never commit.
