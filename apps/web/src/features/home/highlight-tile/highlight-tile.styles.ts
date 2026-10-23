import { cva } from 'class-variance-authority';

/** Outlined tiles; "+" turns a tile over to its detail (DESIGN.md §4). */
export const highlightTileStyles = {
  root: cva(
    'group/tile relative isolate grid min-h-[208px] overflow-clip rounded-tile px-[26px] pt-[26px] pb-6 ring-1 ring-line-2 transition-[opacity,box-shadow] duration-[450ms,250ms] ease-ui ring-inset hover:ring-fg-28pc max-lg:min-h-[186px] max-lg:p-[22px] max-md:min-h-[132px] max-md:rounded-2xl max-md:px-4 max-md:pt-4 max-md:pb-3.5 short-phone:min-h-[100px] short-phone:px-3 short-phone:pt-3 short-phone:pb-2.5 short-tablet:min-h-[160px] short-laptop:min-h-[164px] short-laptop:px-[22px] short-laptop:pt-5 short-laptop:pb-[18px]',
    {
      variants: {
        tone: { fancode: 'warm-g', loginext: 'cool-g' },
        dimmed: { true: 'opacity-22', false: '' },
      },
    },
  ),
  glow: cva(
    'absolute right-[15%] -bottom-[55%] left-[15%] -z-1 h-[70%] rounded-full opacity-10 blur-[42px] transition-opacity duration-400 bg-gradient group-hover/tile:opacity-16 group-data-[open]/tile:opacity-16',
  ),
  face: cva(
    'flex flex-col items-center justify-center gap-2 text-center transition-[opacity,translate] duration-[350ms,500ms] ease-[var(--ease-ui),var(--ease-out)] [grid-area:1/1] max-md:gap-1',
  ),
  front: cva(
    'group-data-[open]/tile:pointer-events-none group-data-[open]/tile:-translate-y-2.5 group-data-[open]/tile:opacity-0',
  ),
  back: cva(
    'pointer-events-none translate-y-2.5 gap-4 px-2 opacity-0 group-data-[open]/tile:pointer-events-auto group-data-[open]/tile:translate-y-0 group-data-[open]/tile:opacity-100 max-lg:p-0 max-md:justify-center max-md:gap-2 max-md:px-0 max-md:py-[30px] short-phone:py-0 short-phone:pr-[22px] short-phone:pl-0 short-laptop:gap-2.5',
  ),
  stat: cva(
    'mb-1 font-display text-[36px] leading-none font-semibold tracking-[-0.02em] tabular-nums max-lg:text-[30px] max-md:text-[24px] short-phone:text-[21px] short-laptop:text-[30px]',
  ),
  title: cva('type-title max-md:text-[13px]'),
  accent: cva('h-[3px] w-7 rounded-[2px] opacity-85 bg-gradient max-md:w-[22px]', {
    variants: {
      back: {
        true: 'max-md:hidden short-laptop:hidden',
        false: 'mt-2.5 max-md:mt-1.5',
      },
    },
    defaultVariants: { back: false },
  }),
  detail: cva(
    'text-[14px] leading-[1.45] tracking-[-0.005em] text-fg-2 max-md:text-[12.5px] short-phone:text-[11.5px] short-phone:leading-[1.35] short-laptop:text-[13px]',
  ),
  figure: cva('w-full pr-10 text-left max-lg:pr-[46px] max-md:hidden short-tablet:hidden'),
  plus: cva(
    "absolute right-[18px] bottom-[18px] grid size-[30px] place-items-center rounded-full text-fg ring-[1.5px] ring-line-2 transition-[rotate,box-shadow,background-color] duration-[450ms,200ms,200ms] ease-out ring-inset group-data-[open]/tile:rotate-45 group-data-[open]/tile:bg-ink group-data-[open]/tile:text-on-ink group-data-[open]/tile:ring-0 before:absolute before:-inset-2 before:content-[''] hover:ring-fg max-md:right-3 max-md:bottom-3 max-md:size-[26px] short-phone:right-2 short-phone:bottom-2 short-phone:size-[22px] [&_.ico]:[stroke-width:2.4]",
  ),
};
