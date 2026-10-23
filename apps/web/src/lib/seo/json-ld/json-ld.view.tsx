import type { JsonLdProps } from './json-ld.types';

/**
 * Structured data for search engines, one script per entity. `<` is escaped so content can never close the
 * script tag.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (Array.isArray(data) ? data : [data]).map((item, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, '\\u003c') }}
    />
  ));
}
