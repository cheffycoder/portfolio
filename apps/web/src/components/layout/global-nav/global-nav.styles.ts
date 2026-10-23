import { cva } from 'class-variance-authority';

/** The nav at the top of the first screen (and the articles page); it scrolls away with its screen. */
export const globalNavStyles = {
  root: cva('absolute inset-x-0 top-0 z-5 pt-[env(safe-area-inset-top,0px)]'),
  inner: cva('container-screen flex h-[52px] items-center justify-between gap-5 text-[13px]'),
  mark: cva(
    'inline-grid size-[30px] place-items-center rounded-full bg-fg-6pc font-label text-[11px] leading-none font-semibold tracking-[0.04em] text-fg ring-1 ring-line-2 ring-inset',
  ),
  list: cva('ml-auto flex items-center gap-[22px] max-nav:hidden'),
  link: cva(
    'inline-flex items-center gap-1.5 whitespace-nowrap text-fg-2 transition-colors duration-200 hover:text-fg aria-[current=page]:text-fg',
  ),
  actions: cva('flex items-center gap-2'),
  menuToggle: cva('hidden max-nav:grid'),
  bars: cva('grid gap-1'),
  bar: cva(
    'block h-[1.5px] w-3.5 rounded-[1px] bg-current transition-transform duration-300 ease-ui',
    {
      variants: {
        position: { top: '', bottom: '' },
        open: { true: '', false: '' },
      },
      compoundVariants: [
        { position: 'top', open: true, className: 'translate-y-[2.75px] rotate-45' },
        { position: 'bottom', open: true, className: '-translate-y-[2.75px] -rotate-45' },
      ],
    },
  ),
};
