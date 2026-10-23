# 0009 · Articles page stays out of search until it has articles

**Context.** The articles page only says "Coming soon". Indexed, it is thin content that can rank for nothing and
dilutes the home page.

**Decision.** `/articles/` is `noindex, follow`, absent from the sitemap, and carries breadcrumb data only.

**Consequences.** The home page is the one result for the name. Links to the articles page still work.

**Revisit when.** The first article ships: index the page, list it in the sitemap, add `Article` data per post.
