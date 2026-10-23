import { cva } from 'class-variance-authority';

/** The primary call to action: "Open to …" with a phrase that rolls like a split-flap sign. */
export const openToStyles = {
  root: cva(
    'group min-h-[46px] max-w-full gap-2 bg-fg-5pc pr-4 pl-5 text-[14px] text-fg ring-1 ring-line-2 backdrop-blur-[8px] transition-[background-color,box-shadow,scale] duration-300 ring-inset hover:bg-fg-9pc hover:opacity-100 hover:ring-fg-24pc',
  ),
  /** fg-2 here and in `go`, not the prototype's fg-3: on the pill's tint fg-3 is 4.2:1 (under WCAG AA). */
  leadIn: cva('text-fg-2'),
  /** Every phrase, for screen readers and search engines; the rolling window is decorative. */
  spoken: cva('sr-only'),
  window: cva('relative inline-block h-[1.5em] overflow-hidden fade-y align-bottom'),
  track: cva('flex flex-col transition-transform duration-700 ease-spring'),
  phrase: cva('h-[1.5em] leading-[1.5em] font-medium whitespace-nowrap text-fg'),
  go: cva(
    'ml-1.5 inline-flex h-5 items-center gap-1.5 border-l border-line-2 pl-3 text-[12.5px] text-fg-2 transition-colors duration-300 group-hover:text-fg',
  ),
  goLabel: cva('max-xs:hidden'),
  goIcon: cva('animate-nudge-down text-fg-2'),
};
