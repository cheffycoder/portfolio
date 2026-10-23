'use client';

import { useThemeMode } from '@/components/theme/theme.hooks';
import { toggleTheme } from '@/components/theme/theme.service';
import { buttonStyles } from '@/components/ui/button/button.styles';
import { Icon } from '@/components/ui/icon/icon.view';
import { cn } from '@/utils/cn/cn.helpers';

import { themeToggleStyles } from './theme-toggle.styles';
import type { ThemeToggleProps } from './theme-toggle.types';

/** Moon in light mode, sun in dark mode; switching plays the sky sweep. Shortcut: T. */
export function ThemeToggle({ compact }: ThemeToggleProps) {
  const mode = useThemeMode();
  return (
    <button
      type="button"
      className={cn(buttonStyles.icon(), themeToggleStyles.root({ compact }))}
      data-theme-toggle
      data-mode={mode}
      aria-label={mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      title="Switch theme (T)"
      onClick={(e) => toggleTheme(e.currentTarget)}
    >
      <Icon name="moon" size={15} className={themeToggleStyles.icon()} />
      <Icon name="sun" size={15} className={themeToggleStyles.sun()} />
    </button>
  );
}
