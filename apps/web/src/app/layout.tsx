import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import '@/styles/globals.css';
import { ThemeScript } from '@/components/theme/theme-script/theme-script.view';
import { ThemeSky } from '@/components/theme/theme-sky/theme-sky.view';
import { IconSprite } from '@/components/ui/icon-sprite/icon-sprite.view';
import { inter, spaceGrotesk } from '@/config/fonts/fonts.constants';
import { site } from '@/config/site/site.constants';
import { AnalyticsScript } from '@/lib/analytics/analytics-script/analytics-script.view';
import { absoluteUrl, assetPath } from '@/lib/paths/paths.service';
import { verification } from '@/lib/seo/seo.helpers';
import { cn } from '@/utils/cn/cn.helpers';

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl('/')),
  applicationName: site.name,
  authors: [{ name: site.name, url: absoluteUrl('/') }],
  creator: site.name,
  keywords: [...site.keywords],
  category: 'technology',
  formatDetection: { email: false, telephone: false, address: false },
  verification: verification(),
  icons: {
    icon: [
      { url: assetPath('/favicon.ico'), sizes: '16x16 32x32 48x48' },
      { url: assetPath('/icon-192.png'), sizes: '192x192', type: 'image/png' },
    ],
    apple: { url: assetPath('/apple-icon.png'), sizes: '180x180' },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E9E7E0' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0C0E' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn(inter.variable, spaceGrotesk.variable)} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <IconSprite />
        <ThemeSky />
        {children}
        <AnalyticsScript />
      </body>
    </html>
  );
}
