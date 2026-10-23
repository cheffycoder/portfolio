import { cva } from 'class-variance-authority';

/** The label + heading block at the top of a screen (DESIGN.md §3). */
export const screenHeadStyles = {
  root: cva('mb-10 max-md:mb-6 max-md:gap-2 short-phone:mb-4', {
    variants: {
      /** Label and extra content on one row (About). */
      row: {
        true: 'flex flex-wrap items-end justify-between gap-x-6 gap-y-3',
        false: 'grid gap-3',
      },
    },
    defaultVariants: { row: false },
  }),
  /** Centred row of switches under a screen's content. */
  toggleRow: cva('mt-8 flex justify-center max-md:mt-5 short-phone:mt-3.5'),
};
