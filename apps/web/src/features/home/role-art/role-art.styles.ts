import { cva } from 'class-variance-authority';

/**
 * Company artwork behind a role screen: darkened line art in light mode, glowing in dark mode, always faint
 * enough that the numbers stay readable. Hidden until its screen is first seen (art-reveal).
 */
export const roleArtStyles = {
  art: cva(
    'absolute h-auto max-w-none art-reveal opacity-(--bg-art-opacity) transition-opacity duration-[1.2s] ease-ui',
  ),
  f1: cva(
    'top-1/2 right-[-8vw] w-[min(64vw,900px)] translate-y-[-46%] rotate-[-4deg] opacity-[calc(var(--bg-art-opacity)*0.42)] mix-blend-multiply blur-[1.6px] contrast-85 grayscale max-md:top-auto max-md:right-[-60vw] max-md:bottom-[4%] max-md:w-[150vw] max-md:translate-y-0 dark:opacity-(--bg-art-opacity) dark:mix-blend-screen dark:blur-none dark:contrast-110 dark:invert',
  ),
  trackLight: cva(
    'top-[-4vh] left-[-6vw] w-[min(48vw,700px)] rotate-[-8deg] mix-blend-multiply max-md:top-[2vh] max-md:left-[-30vw] max-md:w-[110vw] dark:hidden',
  ),
  trackDark: cva(
    'top-[-2vh] left-[-6vw] hidden w-[min(30vw,420px)] rotate-[-8deg] mix-blend-screen max-md:left-[-30vw] dark:block',
  ),
  route: cva(
    'top-[52%] left-1/2 w-[min(130vw,1500px)] -translate-1/2 rotate-[-6deg] opacity-[calc(var(--bg-art-opacity)*0.55)] mix-blend-multiply blur-[1.2px] contrast-90 grayscale max-md:top-[30%] max-md:w-[240vw] dark:opacity-[calc(var(--bg-art-opacity)*0.7)] dark:mix-blend-screen',
  ),
  fade: cva('absolute inset-x-0 z-1 h-[120px] from-page to-transparent', {
    variants: { edge: { top: 'top-0 bg-linear-to-b', bottom: 'bottom-0 bg-linear-to-t' } },
  }),
};
