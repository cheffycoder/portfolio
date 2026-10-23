import type { MetadataRoute } from 'next';

import { routes } from '@/config/site/site.constants';
import { absoluteUrl } from '@/lib/paths/paths.service';

export const dynamic = 'force-static';

/** Indexable pages only (the articles page joins once it has articles). Dated by the build that deployed it. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl(routes.home),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
