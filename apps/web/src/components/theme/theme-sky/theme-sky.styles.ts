import { cva } from 'class-variance-authority';

export const themeSkyStyles = {
  root: cva(
    'pointer-events-none fixed inset-0 z-[300] overflow-hidden data-[sky=idle]:invisible motion-reduce:hidden',
  ),
  disc: cva(
    'absolute [transform:scale(0)] rounded-full will-change-[transform,opacity] in-data-[sky=dark]:sky-to-dark in-data-[sky=light]:sky-to-light',
  ),
  grain: cva('grain-layer dark:opacity-5 dark:mix-blend-screen dark:invert'),
};
