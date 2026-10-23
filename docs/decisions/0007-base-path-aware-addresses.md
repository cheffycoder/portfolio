# 0007 · Addresses come from GitHub Pages, never hard-coded

**Context.** The site starts at `https://cheffycoder.github.io/portfolio/` and will probably move to the root of
`cheffycoder.github.io` or a custom domain. Canonicals, share cards, the sitemap and structured data must always
carry the real address, and every link and file must work under the current path.

**Decision.** Two settings, `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_BASE_PATH`, read by `next.config.ts`
(`basePath`) and `config/env` (validated: the address must end with the path). CI takes both from
`actions/configure-pages`. Code uses `assetPath()` for files in `public/` and `absoluteUrl()` for absolute
addresses; images are imported so Next adds the path. The e2e suite runs under `/portfolio` to prove it.

**Consequences.** Moving the site is a settings change in GitHub, not a code change.

**Revisit when.** The site needs more than one address at once (it shouldn't).
