# Portfolio

Shivam Bandral's portfolio: one page of full-screen sections and an articles page, built as a static, SEO-first
Next.js site and published on GitHub Pages.

## Quick start

Requirements: Node 22+, pnpm 10 (`corepack enable`).

```bash
pnpm install
pnpm check
pnpm dev
pnpm build
pnpm preview
pnpm test:e2e:install
pnpm test:e2e
```

`pnpm dev` serves the site at http://localhost:3000. `pnpm check` runs formatting, lint, typecheck and unit
tests. `pnpm build` writes the static site to `apps/web/out`, and `pnpm preview` serves it the way GitHub Pages
does. `pnpm test:e2e:install` downloads the test browsers once; `pnpm test:e2e` runs the browser tests on
desktop, tablet and phones.

Copy `.env.example` to `apps/web/.env.local` to override site settings. Defaults work for local development.

## Changing what the site says

All copy is in `apps/web/src/config/profile/profile.constants.ts` (and the name, links and screen list in
`config/site/site.constants.ts`). See **docs/content-guide.md**.

## What's where

| Folder                  | What it is                                            | Deployed?         |
| ----------------------- | ----------------------------------------------------- | ----------------- |
| `apps/web`              | The website (Next.js, static export)                  | Yes, GitHub Pages |
| `tooling/eslint-plugin` | Lint rules for the folder-per-module structure        | No                |
| `docs/`                 | Design system, decisions, guides, locked prototype v6 | No                |

Read **AGENTS.md** for architecture, design and testing rules, **docs/deploy.md** for how the site goes live,
**docs/commits.md** for commit messages and **docs/code-structure.md** for where every file goes.

Nobody pushes to `main`: work on a branch, open a pull request, merge when CI is green. Merging deploys.

## Committing from GitHub Desktop or another app

Git apps don't load your terminal profile, so the hooks can't find Node or pnpm (`pnpm: command not found`).
Husky runs `~/.config/husky/init.sh` before every hook; with nvm, put this in it:

```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use --silent >/dev/null 2>&1 || true
```
