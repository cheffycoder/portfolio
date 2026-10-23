import { THEME_INIT_SCRIPT } from '@/components/theme/theme.constants';

/** Inline in <head>: applies the saved theme before the first paint. */
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
