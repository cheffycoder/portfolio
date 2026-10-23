import { env } from '@/config/env/env.service';

import { joinBasePath, joinSiteUrl } from './paths.helpers';

/** A file in public/ as the browser must request it (base path included). */
export const assetPath = (path: string): string => joinBasePath(env.basePath, path);

/** The absolute address of a page or file on the site, for canonicals, share cards and structured data. */
export const absoluteUrl = (path: string): string => joinSiteUrl(env.siteUrl, path);
