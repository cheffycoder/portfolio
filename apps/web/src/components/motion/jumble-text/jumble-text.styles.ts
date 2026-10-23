import { cva } from 'class-variance-authority';

export const jumbleTextStyles = {
  word: cva('inline-flex cursor-default flex-wrap justify-center'),
  letter: cva('inline-block text-center whitespace-pre will-change-[transform,opacity]'),
  note: cva(
    'min-h-[1.4em] translate-y-1 font-label text-[12.5px] leading-[normal] tracking-[0.02em] text-fg-3 opacity-0 transition-[opacity,translate] duration-[500ms,600ms] ease-[var(--ease-ui),var(--ease-out)] data-[on]:translate-y-0 data-[on]:opacity-100',
  ),
};
