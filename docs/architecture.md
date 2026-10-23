# Architecture

A static Next.js site. `next build` pre-renders every page to HTML in `apps/web/out`; GitHub Pages serves those
files. Interactive parts are small client components inside server-rendered pages, so search engines and
no-JS visitors get the full content.

## Pages

- `/` composes the eleven home screens inside `ScreenDeck` (`app/page.tsx`), in the order of `homeScreens`
  (`config/site/site.constants.ts`). That order drives element ids, `#links`, footers, the local nav, the rail
  and the "03 · …" labels.
- `/articles/` is one screen (`features/articles`) and is `noindex` until it has articles.
- Anything else gets `404.html` (`app/not-found.tsx`), which GitHub Pages serves with a 404 status.

## The screen deck (`components/screens`)

`ScreenDeck` renders the snap container and provides the deck state: the active screen (the one crossing the
middle of the viewport, via IntersectionObserver), the screens already seen, and `goTo()`. It also turns
`#screen` links and ↑/↓/Page keys into smooth scrolls and honours a `#screen` in the address on arrival.
Key and rail handlers read the live position from refs (state reaches a handler only after a render), step from
the screen a scroll is already heading to (so quick presses add up), and resend a scroll that Safari's snapping
cut short. `data-deck-ready` on `<main>` marks when the handlers are attached.

`Screen` is one full-viewport section. It sets `data-seen` the first time it is active (which plays the
`reveal` animations), renders its footer from the deck, and hosts an optional background and header. Outside a
deck (articles, 404) it reveals as soon as it mounts.

Parts that react to their screen use `useScreenState(id)`: numbers roll on every arrival, the devices explode
while active, the skills timer runs only while visible, the lifecycle bar plays its intro.

## Swappable pieces (`lib/`)

- **Addresses** (`lib/paths`): the site may live at `/portfolio` on GitHub Pages, at the root of
  `<user>.github.io`, or on a custom domain. `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_SITE_URL` (set by CI from
  GitHub Pages) decide; `assetPath()` and `absoluteUrl()` are the only places that apply them. Next adds the
  base path to `<Link>`, its own assets and imported images.
- **SEO** (`lib/seo`): `pageMetadata()` for every page; `Person`, `ProfilePage`, `WebSite` and breadcrumb
  structured data.
- **Analytics** (`lib/analytics`): `track()` behind an adapter; Umami or nothing, chosen by
  `NEXT_PUBLIC_ANALYTICS_PROVIDER`. Off by default.

## Theme

An inline script in `<head>` applies a saved choice before first paint. `components/theme` keeps toggles in sync
with the page (`useSyncExternalStore`), plays the sky sweep (`theme.service.ts`) and owns the **T** shortcut.

## Testing

Vitest for pure logic next to the code; Playwright against the real static build served under `/portfolio`
(`apps/web/scripts/preview.mjs` mimics GitHub Pages), on desktop Chrome and Safari, iPad, Android and iPhone,
with axe accessibility checks in light and dark.
