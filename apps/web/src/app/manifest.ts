import type { MetadataRoute } from 'next';

import { site } from '@/config/site/site.constants';
import { assetPath } from '@/lib/paths/paths.service';

export const dynamic = 'force-static';

/** Install metadata. Paths carry the base path, which Next does not add inside the manifest. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · ${site.shortRole}`,
    short_name: site.initials,
    description: site.description,
    start_url: assetPath('/'),
    scope: assetPath('/'),
    display: 'standalone',
    background_color: '#E9E7E0',
    theme_color: '#E9E7E0',
    icons: [
      { src: assetPath('/icon-192.png'), sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: assetPath('/icon-512.png'), sizes: '512x512', type: 'image/png', purpose: 'any' },
      {
        src: assetPath('/icon-maskable-512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
