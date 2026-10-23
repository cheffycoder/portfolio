import { cva } from 'class-variance-authority';

export const chipStyles = {
  /** Rounded label (platform names). */
  chip: cva(
    'inline-flex min-h-[34px] items-center gap-2.5 rounded-full bg-fg-3pc px-3.5 text-[13px] text-fg-2 ring-1 ring-line ring-inset',
  ),
  /** Small mono tag (tech stack). */
  tag: cva('rounded-md bg-fg-5pc px-2 py-1.5 font-label text-[11px] leading-none text-fg-2'),
};
