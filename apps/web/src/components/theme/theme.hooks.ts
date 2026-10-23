'use client';

import { useEffect, useSyncExternalStore } from 'react';

import { currentMode, subscribeToMode, toggleTheme } from './theme.service';
import type { ThemeMode } from './theme.types';

/** The theme in effect, kept in sync with the page. Before hydration it reads as light. */
export function useThemeMode(): ThemeMode {
  return useSyncExternalStore(subscribeToMode, currentMode, () => 'light');
}

/** "T" switches the theme anywhere on the page (except while typing or using a slider). */
export function useThemeShortcut(): void {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat || e.key.toLowerCase() !== 't') return;
      const target = e.target as Element | null;
      if (target?.closest?.('input, textarea, select, [contenteditable="true"], [role="slider"]'))
        return;
      toggleTheme();
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, []);
}
