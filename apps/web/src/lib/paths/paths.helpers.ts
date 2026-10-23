/**
 * Joins the site's base path (e.g. "/portfolio" on a GitHub Pages project page) with a root-relative path.
 * Next.js adds the base path to <Link> and to its own assets; plain <img>, icons, the manifest and share images
 * need it added by hand.
 */
export const joinBasePath = (basePath: string, path: string): string => {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('#')) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${clean}`;
};

/** Absolute address on the site: `siteUrl` already includes the base path. */
export const joinSiteUrl = (siteUrl: string, path: string): string => {
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return clean === '/' ? `${siteUrl}/` : `${siteUrl}${clean}`;
};
