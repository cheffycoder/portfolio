import { cva } from 'class-variance-authority';

export const roleScreenStyles = {
  head: cva(
    'mb-7 flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1.5 border-b border-line pb-3.5 max-md:mb-5',
  ),
  who: cva('flex flex-wrap items-baseline gap-x-3 gap-y-1'),
  company: cva(
    'text-gradient font-label text-[13px] leading-[1.4] font-semibold tracking-[0.1em] uppercase',
  ),
  meta: cva('type-meta'),
  heading: cva('max-w-[18ch] type-quote'),
  accent: cva('text-gradient'),
  lead: cva('mt-3.5 max-w-[52ch] type-lead'),
  results: cva(
    'mt-11 grid grid-cols-3 gap-6 border-t border-line pt-[22px] max-md:mt-[26px] max-md:grid-cols-1 max-md:gap-3.5 max-md:pt-4 tiny:mt-4 tiny:gap-2.5 tiny:pt-3',
  ),
  result: cva(
    'grid content-start gap-1.5 max-md:grid-cols-[104px_1fr] max-md:items-baseline max-md:gap-x-3.5 max-md:gap-y-0.5',
  ),
  resultLabel: cva(
    'font-label text-[11px] leading-[1.4] font-medium tracking-[0.08em] text-fg-3 uppercase max-md:col-span-full',
  ),
  stat: cva(
    'mt-1.5 text-gradient font-display font-semibold tracking-[-0.02em] tabular-nums max-md:mt-0',
    {
      variants: {
        kind: {
          number: 'text-[32px] leading-none max-lg:text-[28px] max-md:text-[22px]',
          word: 'text-[24px] leading-[1.15] max-md:text-[18px]',
        },
      },
    },
  ),
  detail: cva('type-cap max-md:col-start-2 tiny:text-[12px] tiny:leading-[1.4]'),
};
