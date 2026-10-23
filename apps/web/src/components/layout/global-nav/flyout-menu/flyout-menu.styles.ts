import { cva } from 'class-variance-authority';

export const flyoutMenuStyles = {
  root: cva(
    'group invisible fixed inset-0 z-90 bg-page pt-[calc(env(safe-area-inset-top,0px)+84px)] pb-10 opacity-0 transition-[opacity,visibility] delay-[0s,300ms] duration-[300ms,0s] ease-ui data-[open]:visible data-[open]:opacity-100 data-[open]:delay-0 motion-reduce:transition-none',
  ),
  close: cva(
    'absolute top-[calc(env(safe-area-inset-top,0px)+10px)] right-[calc((100vw-var(--vc))/2)]',
  ),
  closeIcon: cva('rotate-45'),
  list: cva('container-screen grid gap-1'),
  link: cva(
    'inline-flex -translate-y-2 items-center gap-2.5 font-display text-[26px] leading-[1.5] font-semibold tracking-[-0.02em] opacity-0 transition-[opacity,translate] duration-300 ease-ui group-data-[open]:translate-y-0 group-data-[open]:opacity-100 aria-[current=page]:text-fg-3',
    {
      variants: {
        step: { 0: 'group-data-[open]:delay-[60ms]', 1: 'group-data-[open]:delay-[100ms]' },
      },
    },
  ),
};
