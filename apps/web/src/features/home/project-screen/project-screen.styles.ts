import { cva } from 'class-variance-authority';

/** Side projects: a full-width stage on top, copy and links below. */
export const projectScreenStyles = {
  head: cva(
    'mb-5 flex items-center gap-2.5 border-b border-line pb-3 max-md:mb-3.5 short-phone:hidden shorter-laptop:mb-3.5',
  ),
  label: cva('type-label'),
  sep: cva('text-line-2'),
  meta: cva('type-meta'),
  stage: cva(
    'grid min-h-[clamp(220px,34vh,310px)] grid-cols-[minmax(0,1fr)] place-items-center gap-[18px] rounded-tile bg-stage p-[clamp(18px,4vw,36px)] shadow-[0_0_0_1px_var(--line)] max-md:min-h-0 max-md:gap-3.5 max-md:rounded-2xl max-md:px-3 max-md:py-4 short-phone:gap-2.5 short-phone:p-3 shorter-laptop:min-h-[200px] shorter-laptop:px-6 shorter-laptop:py-5',
  ),
  body: cva(
    'mt-6 flex items-end justify-between gap-x-7 gap-y-4 max-md:mt-[18px] max-md:flex-col max-md:items-stretch',
  ),
  copy: cva('grid max-w-[560px] gap-2'),
  heading: cva(
    'font-display text-[26px] leading-[1.15] font-semibold tracking-[-0.022em] max-md:text-[22px] max-md:leading-[1.2]',
  ),
  lead: cva('text-[15px] leading-[1.6] text-fg-2 max-md:leading-[1.55] short-phone:leading-[1.5]'),
  tags: cva('mt-1 flex flex-wrap gap-1.5 short-phone:hidden'),
  actions: cva('flex flex-none flex-wrap gap-2.5'),
  action: cva('max-md:flex-1'),
};
