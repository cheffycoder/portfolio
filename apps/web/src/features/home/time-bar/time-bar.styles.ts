import { cva } from 'class-variance-authority';

/** Here / there: my time, your time, and where both sit in a day (moon · sun · moon). */
export const timeBarStyles = {
  root: cva(
    'mb-10 grid max-w-[560px] gap-3.5 border-b border-line pb-5 max-md:mb-[26px] max-md:gap-3 max-md:pb-4 [@media(max-width:734px)_and_(max-height:720px)]:mb-4 [@media(max-width:734px)_and_(max-height:720px)]:gap-2',
  ),
  top: cva('flex items-end justify-between gap-4'),
  place: cva('gap-1', {
    variants: {
      side: { home: '', you: 'justify-items-end text-right' },
      hidden: { true: 'hidden', false: 'grid' },
    },
    defaultVariants: { hidden: false },
  }),
  time: cva(
    'font-display text-[22px] leading-none font-semibold tracking-[-0.01em] text-fg tabular-nums max-md:text-[19px]',
  ),
  where: cva('font-label text-[12px] leading-[1.3] tracking-[0.02em] text-fg-3'),
  sub: cva('mt-px block'),
  same: cva('self-center font-label text-[12.5px] leading-[1.3] text-fg-2', {
    variants: { shown: { true: '', false: 'hidden' } },
  }),
  strip: cva('relative mx-[9px] h-10'),
  day: cva(
    'absolute inset-x-0 top-3.5 h-[3px] rounded-[2px] bg-[linear-gradient(90deg,color-mix(in_srgb,var(--fg)_26%,transparent)_0_25%,color-mix(in_srgb,var(--fg)_8%,transparent)_25%_75%,color-mix(in_srgb,var(--fg)_26%,transparent)_75%_100%)]',
  ),
  sky: cva('absolute top-[25px] -ml-[5.5px] text-fg-3', {
    variants: { at: { start: 'left-0', middle: 'left-1/2', end: 'left-full' } },
  }),
  mark: cva(
    'absolute top-[15.5px] -mt-[6.5px] -ml-[6.5px] size-[13px] rounded-full transition-[left] duration-[1.2s] ease-out',
    {
      variants: {
        who: {
          home: 'bg-fg shadow-[0_0_0_3px_var(--bg)]',
          you: 'bg-page shadow-[inset_0_0_0_2px_var(--fg),0_0_0_3px_var(--bg)]',
        },
        hidden: { true: 'hidden', false: '' },
      },
    },
  ),
  tag: cva(
    'absolute bottom-[calc(100%+5px)] left-1/2 -translate-x-1/2 font-label text-[9.5px] leading-none font-medium tracking-[0.08em] whitespace-nowrap text-fg-2 uppercase',
  ),
};
