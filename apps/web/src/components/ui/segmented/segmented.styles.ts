import { cva } from 'class-variance-authority';

/** Segmented switch under its content, like Apple's tab platter (DESIGN.md §4). */
export const segmentedStyles = {
  root: cva(
    'relative no-scrollbar inline-flex max-w-full overflow-x-auto rounded-full bg-fg-6pc p-1',
  ),
  pill: cva(
    'absolute top-1 left-0 h-[calc(100%-8px)] overflow-hidden rounded-full bg-ink transition-[transform,width] duration-[450ms] ease-out',
  ),
  /**
   * The wait-for-next fill. Starts at `transform: scaleX(0)`, not Tailwind's `scale-x-0`: that sets the separate
   * `scale` property, which stays at 0 while the seg-fill keyframes grow `transform`, so nothing would show.
   */
  fill: cva(
    'absolute inset-0 origin-left [transform:scaleX(0)] rounded-[inherit] bg-[color-mix(in_srgb,var(--on-ink)_24%,transparent)]',
    {
      variants: {
        running: { true: 'animate-seg-fill', false: '' },
        paused: { true: '[animation-play-state:paused]', false: '' },
      },
    },
  ),
  option: cva(
    'relative z-1 h-[34px] flex-none rounded-full px-[18px] text-[13px] font-medium whitespace-nowrap text-fg-2 transition-colors duration-300 hover:not-aria-pressed:text-fg aria-pressed:text-on-ink max-md:h-8 max-md:px-2.5 max-md:text-[12px] max-xs:px-1.5 max-xs:text-[11px]',
  ),
};
