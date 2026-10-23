'use client';

import { useThemeShortcut } from '@/components/theme/theme.hooks';

import { themeSkyStyles } from './theme-sky.styles';

/**
 * The page-wide layers: the sky disc used by the theme sweep (components/theme/theme.service) and the paper
 * grain. Rendered once in the root layout; also owns the "T" shortcut.
 */
export function ThemeSky() {
  useThemeShortcut();
  return (
    <>
      <div className={themeSkyStyles.root()} data-sky="idle" aria-hidden="true">
        <div className={themeSkyStyles.disc()} data-sky-disc />
      </div>
      <div className={themeSkyStyles.grain()} aria-hidden="true" />
    </>
  );
}
