import { cva } from 'class-variance-authority';

export const codeWindowStyles = {
  peers: cva(
    'inline-flex items-center gap-1.5 font-sans text-[10.5px] leading-[normal] whitespace-nowrap text-ok-fg',
  ),
  peerDot: cva(
    "relative size-1.5 rounded-full bg-live after:absolute after:inset-0 after:animate-ping after:rounded-full after:bg-live after:content-['']",
  ),
  lines: cva(
    'no-scrollbar grid gap-2 overflow-x-auto whitespace-nowrap max-md:gap-1.5 max-md:fade-x-end max-md:text-[10px]',
  ),
  n: cva('mr-2 text-fg-3'),
  kw: cva('text-code-kw'),
  str: cva('text-code-str'),
  peerTag: cva(
    'ml-2 inline-flex rounded bg-peer px-1.5 py-px font-sans text-[10px] leading-[normal] font-medium text-peer-fg',
  ),
};
