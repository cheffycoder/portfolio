# Content guide

What the portfolio says lives in two files; components never hold copy.

- `apps/web/src/config/site/site.constants.ts`: name, role, description (used for search and share cards),
  email, location, profile links, keywords, routes, and the list of home screens.
- `apps/web/src/config/profile/profile.constants.ts`: the hero, about, highlights, the two roles, web and
  mobile, the side projects, skills, writing and contact copy.

## Rules

- **Every claim is on the resume.** Numbers, employers, dates, project details. If it isn't, it doesn't go on
  the site (or the resume gets updated first).
- **Each number appears once.** The six highlights and the six role results are all different.
- **Emphasis is rare.** One or two `{ strong }` phrases per paragraph.
- **Screens must still fit.** Longer copy can push a screen past the viewport on small phones; the e2e suite
  fails if it does. Check the changed screen at 375×667 and 320×568.
- **Search and share cards:** after changing the name, role, city or headline, update `site.description` and
  `site.keywords`, then run `pnpm --filter @portfolio/web brand-images` to re-render the share card and icons.

## Adding a screen

Add its id and label to `homeScreens` (the order there is the order on the page), build it in
`features/home/<name>-screen/` with `Screen`, and compose it in `app/page.tsx`. Numbers, footers, the
local nav and the rail update themselves.

## Articles

The articles page says "Coming soon" and is kept out of search (decision 0009). When the first article is
ready, articles become their own content (MDX in a `packages/articles` workspace package), the page lists them,
each article gets `Article` structured data, and the page joins the sitemap.
