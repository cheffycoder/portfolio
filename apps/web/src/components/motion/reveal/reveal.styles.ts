import { cva } from 'class-variance-authority';

/**
 * Content that rises in when its screen first opens (the `reveal` utility in globals.css). `step` staggers
 * siblings by 90ms each.
 */
export const revealStyles = {
  root: cva('reveal', {
    variants: {
      step: { 0: '', 1: '[--i:1]', 2: '[--i:2]', 3: '[--i:3]', 4: '[--i:4]' },
    },
    defaultVariants: { step: 0 },
  }),
};
