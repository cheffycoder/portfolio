---
name: update-profile
description: Change what the portfolio says (role, numbers, projects, skills, contact) safely: every claim checked against the resume, every place it appears updated together. Use when the maintainer shares a new resume or asks to change copy.
---

# Update profile

All copy lives in `apps/web/src/config/profile/profile.constants.ts` (content) and
`apps/web/src/config/site/site.constants.ts` (name, links, location, screens). Components never hold copy.

1. **Ask for the resume** (or the exact new wording) if it isn't in the conversation. Never invent a number,
   employer, date or project detail. If a claim on the site isn't on the resume, flag it instead of keeping it.
2. **Change the constant**, keeping each number once on the site (a number in the highlights is not repeated in
   a role screen). Keep `RichText` emphasis (`{ strong }`) to one or two phrases per paragraph.
3. **Fit check**: copy changes length. Run `pnpm test:e2e -- e2e/foundation` (every screen must fit the
   viewport) and look at the changed screen at 375×667 and 320×568.
4. **SEO**: if the role, city or headline changed, update `site.description`, `site.keywords` and re-render the
   share card and icons with `pnpm --filter @portfolio/web brand-images`.
5. Update `docs/content-guide.md` if a rule changed. Suggest `feat(content): …` or `fix(content): …`.
6. Never commit; hand the maintainer the git commands (AGENTS.md › Git).
