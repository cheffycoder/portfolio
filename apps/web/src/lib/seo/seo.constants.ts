import { site } from '@/config/site/site.constants';

import type { ShareImage } from './seo.types';

/** The site's share card (public/og-image.png), used when a page has no image of its own. */
export const DEFAULT_SHARE_IMAGE: ShareImage = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: `${site.name} · ${site.role}`,
};

/** Stable ids so the Person, the profile page and the website point at each other (Schema.org @id). */
export const SCHEMA_IDS = {
  person: '#person',
  website: '#website',
  profile: '#profile',
} as const;
