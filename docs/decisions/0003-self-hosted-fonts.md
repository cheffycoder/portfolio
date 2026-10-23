# 0003 · Self-host fonts instead of Google Fonts

**Context.** The prototype loaded Inter and Space Grotesk from Google Fonts: an extra connection before text
renders, a third party seeing every visit, and builds that depend on Google.

**Decision.** Ship the variable Latin files (SIL Open Font License, from Fontsource) in `src/assets/fonts` and
load them with `next/font/local`, which preloads them and sizes the fallbacks to avoid layout shift.

**Consequences.** Faster first paint, no third-party requests, about 70 KB of fonts in the repo.

**Revisit when.** The site needs scripts outside Latin.
