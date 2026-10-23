import { cva } from 'class-variance-authority';

export const screenFootStyles = {
  root: cva(
    'container-screen grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-t border-line pt-3.5 pb-[calc(env(safe-area-inset-bottom,0px)+18px)] font-label text-[12px] leading-[1.4] text-fg-3',
  ),
  start: cva('min-w-0'),
  end: cva('min-w-0 justify-self-end text-right'),
  count: cva('tracking-[0.12em] whitespace-nowrap tabular-nums'),
  link: cva(
    'inline-flex items-center gap-1.5 whitespace-nowrap transition-colors duration-200 hover:text-fg',
  ),
  /** "Previous:" / "Next:" and the colophon tail drop on phones. */
  word: cva('max-md:hidden'),
  nudge: cva('', {
    variants: { direction: { up: 'animate-nudge-up', down: 'animate-nudge-down' } },
  }),
};
