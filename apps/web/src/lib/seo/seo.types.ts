export type ShareImage = { url: string; width: number; height: number; alt: string };

export type PageSeo = {
  /** Page title without the site name; omit for the home page. */
  title?: string;
  description: string;
  /** Path starting with "/", used for the canonical URL. */
  path: string;
  /** Root-relative or absolute share image. Defaults to the site's card. */
  image?: ShareImage;
  noIndex?: boolean;
};

export type JsonLd = Record<string, unknown>;
