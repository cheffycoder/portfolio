import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/paths/paths.service';

export const dynamic = 'force-static';

/**
 * Crawlers read robots.txt only at a domain's root, so on a GitHub Pages project page (/portfolio) this file is
 * informational; the sitemap is submitted in Search Console instead (docs/deploy.md).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
