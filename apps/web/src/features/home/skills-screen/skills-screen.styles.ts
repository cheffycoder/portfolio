import { cva } from 'class-variance-authority';

export const skillsScreenStyles = {
  label: cva('type-label'),
  heading: cva('type-h2'),
  panel: cva('grid min-h-[156px] max-md:min-h-[210px] short-phone:min-h-[180px]'),
  set: cva(
    'flex flex-wrap content-center justify-center gap-2.5 transition-[opacity,translate] duration-[350ms,500ms] ease-[var(--ease-ui),var(--ease-out)] [grid-area:1/1] max-md:gap-2',
    {
      variants: {
        active: {
          true: 'pointer-events-auto translate-y-0 opacity-100 delay-[80ms]',
          false: 'pointer-events-none translate-y-2.5 opacity-0',
        },
      },
    },
  ),
  skill: cva(
    'rounded-[14px] px-[18px] py-3.5 text-[15px] leading-none ring-1 ring-line-2 transition-shadow duration-200 ring-inset hover:ring-fg-30pc max-md:rounded-xl max-md:px-[13px] max-md:py-[11px] max-md:text-[13px] short-phone:px-[11px] short-phone:py-[9px]',
  ),
  controls: cva('flex-wrap items-center gap-2.5 max-md:gap-y-3'),
  switch: cva('max-md:order-first max-md:basis-full max-md:justify-start'),
};
