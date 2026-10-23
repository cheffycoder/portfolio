import type { Metadata } from 'next';

import { env } from '@/config/env/env.service';
import { credentials, skills } from '@/config/profile/profile.constants';
import { site } from '@/config/site/site.constants';
import { absoluteUrl } from '@/lib/paths/paths.service';

import { DEFAULT_SHARE_IMAGE, SCHEMA_IDS } from './seo.constants';
import type { JsonLd, PageSeo } from './seo.types';

const titleSuffix = `${site.name} · ${site.shortRole}`;
const idOf = (key: keyof typeof SCHEMA_IDS): string => `${absoluteUrl('/')}${SCHEMA_IDS[key]}`;

/**
 * Every page builds its metadata here, so titles, canonicals and share cards are always consistent.
 * Each page is its own canonical.
 */
export function pageMetadata({ title, description, path, image, noIndex }: PageSeo): Metadata {
  const fullTitle = title ? `${title} · ${site.name}` : titleSuffix;
  const url = absoluteUrl(path);
  const shareImage = image ?? DEFAULT_SHARE_IMAGE;
  const imageUrl = absoluteUrl(shareImage.url);
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: path === '/' ? 'profile' : 'website',
      siteName: site.name,
      locale: site.locale,
      url,
      title: fullTitle,
      description,
      images: [{ ...shareImage, url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      creator: site.xHandle,
      title: fullTitle,
      description,
      images: [{ url: imageUrl, alt: shareImage.alt }],
    },
  };
}

/** Schema.org Person: who the site is about, linked to his profiles so search engines join them up. */
export function personJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': idOf('person'),
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: absoluteUrl('/'),
    image: absoluteUrl(DEFAULT_SHARE_IMAGE.url),
    email: `mailto:${site.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    worksFor: { '@type': 'Organization', ...credentials.worksFor },
    alumniOf: { '@type': 'CollegeOrUniversity', ...credentials.alumniOf },
    knowsAbout: [...new Set([...site.keywords, ...skills.groups[0]!.skills])],
    sameAs: Object.values(site.social),
  };
}

/** Schema.org ProfilePage for the home page: the page is about the Person above. */
export function profilePageJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': idOf('profile'),
    url: absoluteUrl('/'),
    name: titleSuffix,
    description: site.description,
    inLanguage: 'en',
    isPartOf: { '@id': idOf('website') },
    mainEntity: { '@id': idOf('person') },
  };
}

/** Schema.org WebSite, so search engines show the site's name instead of its address. */
export function websiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': idOf('website'),
    name: site.name,
    alternateName: titleSuffix,
    url: absoluteUrl('/'),
    inLanguage: 'en',
    publisher: { '@id': idOf('person') },
  };
}

/** Breadcrumbs (Home › Articles) for rich results. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: absoluteUrl(step.path),
    })),
  };
}

/** Search Console ownership tag, only when a code is configured. */
export const verification = (): Metadata['verification'] =>
  env.googleSiteVerification ? { google: env.googleSiteVerification } : undefined;
