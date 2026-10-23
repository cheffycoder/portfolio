import { routes, site } from '@/config/site/site.constants';
import { ArticlesSoon } from '@/features/articles/articles-soon/articles-soon.view';
import { JsonLd } from '@/lib/seo/json-ld/json-ld.view';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo/seo.helpers';

// Kept out of search until the first article ships: a "coming soon" page is thin content
// (docs/decisions/0009-articles-noindex-until-published.md).
export const metadata = pageMetadata({
  title: 'Articles',
  description: `Articles by ${site.name} on frontend engineering, performance and design systems. Coming soon.`,
  path: routes.articles,
  noIndex: true,
});

export default function ArticlesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: site.name, path: routes.home },
          { name: 'Articles', path: routes.articles },
        ])}
      />
      <ArticlesSoon />
    </>
  );
}
