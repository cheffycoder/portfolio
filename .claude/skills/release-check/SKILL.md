---
name: release-check
description: Pre-release checklist for the portfolio: full checks, build under the GitHub Pages base path, e2e on all devices, prototype comparison, SEO audit. Use before merging a release or when asked "is it ready to ship".
---

# Release check

Run in order and stop at the first failure; report what failed and the fix.

1. `pnpm check`: format, lint, typecheck, unit tests.
2. `NEXT_PUBLIC_BASE_PATH=/portfolio NEXT_PUBLIC_SITE_URL=https://cheffycoder.github.io/portfolio pnpm build`:
   the static export succeeds under the base path GitHub Pages uses.
3. `pnpm test:e2e`: all 5 setups (desktop Chrome, desktop Safari, iPad, Android, iPhone).
4. Visual: start `pnpm preview` and open each screen at 390×844, 820×1180 and 1440×900 in light and dark next
   to `docs/prototype/index.html`. Anything that differs from the prototype is either a logged decision in
   docs/design-sense.md or a bug.
5. SEO (if the claude-seo plugin is installed): with `pnpm preview` running, `/seo audit http://localhost:4173/`,
   `/seo schema`, `/seo images`. Summarise issues by severity; fix critical/high before release.
6. Check `git status`: no `.env*`, build output or test reports are staged.
7. `git log --oneline <last tag>..HEAD`: list the `feat`, `fix`, `perf` and breaking (`!`) commits and say which
   version bump they imply (docs/commits.md).

Finish with a short go/no-go summary listing anything left for the maintainer to decide.
