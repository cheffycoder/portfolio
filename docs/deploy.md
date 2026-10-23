# Deploy

How the portfolio goes live on GitHub Pages, and how to undo a bad release.

## How it works

Every merge to `main` runs CI (`.github/workflows/ci.yml`). Only when **Check** (format, lint, types, unit tests,
build) and **E2E** (five browsers and devices) pass:

1. **Build for Pages** asks GitHub where the site lives (`actions/configure-pages`): the address and the path,
   e.g. `https://cheffycoder.github.io/portfolio` and `/portfolio`. It builds with those, so every link, image,
   canonical, the sitemap and share cards use the real address.
2. **Deploy** publishes `apps/web/out` to GitHub Pages (`actions/deploy-pages`).

Pull requests never deploy. To release, merge to `main`. To redeploy without a change: Actions → CI → Run workflow.

## One-time setup

1. **Repository → Settings → Pages → Build and deployment → Source: GitHub Actions.** (While it still says
   "Deploy from a branch", GitHub keeps serving the old files from `main`.)
2. Optional settings, under **Settings → Secrets and variables → Actions → Variables** (all public values):
   - `GOOGLE_SITE_VERIFICATION`: the code from Search Console's "HTML tag" method (only the `content` value).
   - `ANALYTICS_PROVIDER` = `umami` and `UMAMI_WEBSITE_ID`, if you add Umami.
3. Optional, for a public repo: **Settings → Rules → Rulesets → New branch ruleset** on `main`: require a pull
   request and the `Check`, `E2E` and `PR title` checks.

## Search

1. **Google Search Console → Add property → URL prefix** `https://cheffycoder.github.io/portfolio/` → verify
   with the HTML tag (step 2 above), merge, then press Verify.
2. **Sitemaps → Add** `sitemap.xml`. On a project page crawlers ignore `/portfolio/robots.txt` (they only read
   robots.txt at a domain's root), so submitting the sitemap here is what points them at it.
3. **URL inspection** on the home page → Request indexing.
4. Add the site address to the LinkedIn, GitHub and X profiles: the structured data links back to them
   (`sameAs`, `rel="me"`), and links from those profiles are the fastest way to get crawled.

## Moving to a better address later

- **`cheffycoder.github.io`** (no `/portfolio`): rename the repository to `cheffycoder.github.io`. The next deploy
  builds for the root automatically; robots.txt then works too. Old `/portfolio/` links stop working, so
  update the profiles that link to it.
- **A custom domain**: Settings → Pages → Custom domain, add the DNS records GitHub shows, tick Enforce HTTPS.
  CI picks up the new address on the next deploy; nothing in the code changes. Re-add the property in Search
  Console for the new address.

## Check a release

- The site loads; the theme switch, the highlights filter and the Share On bar work.
- `/articles/` loads; `/nothing-here/` shows "Nothing here." with a 404 status.
- A share preview (paste the address into a LinkedIn or X post draft) shows the card.

## Undo a bad release

Revert the change in a pull request and merge it; CI deploys the fixed `main`. In a hurry: Actions → pick the
last good run on `main` → Re-run jobs.
