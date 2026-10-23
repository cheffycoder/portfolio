# 0001 · Next.js App Router, static export, on GitHub Pages

**Context.** The portfolio changes rarely, must rank for its owner's name and role, and should cost nothing to
host. There is no domain yet. The owner asked for Next.js following Bulletproof React.

**Decision.** Next.js (App Router) with `output: 'export'` and `trailingSlash: true`, deployed by GitHub
Actions to GitHub Pages. Every page is pre-rendered HTML; interactive parts are client components inside it.

**Consequences.**

- Free hosting with HTTPS; no server. Folders are written as `index.html`, which Pages serves everywhere.
- As a project page the site lives under `/portfolio`, where robots.txt is not read: the sitemap is submitted in
  Search Console instead (docs/deploy.md).
- No runtime image optimisation; the art is pre-sized webp.

**Revisit when.** A custom domain arrives (configure it in Pages; no code change), or the site needs per-request
behaviour.
