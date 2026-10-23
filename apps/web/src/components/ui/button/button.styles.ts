import { cva } from 'class-variance-authority';

/** Pill buttons and links that look like buttons (DESIGN.md §4). */
export const buttonStyles = {
  root: cva(
    'inline-flex items-center justify-center rounded-full font-medium tracking-[-0.01em] whitespace-nowrap transition-[opacity,scale,background-color,box-shadow,color] duration-200 ease-ui active:scale-[0.97]',
    {
      variants: {
        tone: {
          solid: 'bg-ink text-on-ink hover:opacity-86',
          ghost: 'bg-transparent text-fg ring-1 ring-line-2 ring-inset hover:bg-fg-5pc',
          soft: 'bg-fg-6pc text-fg ring-1 ring-line-2 ring-inset hover:bg-fg-10pc hover:ring-fg-24pc',
          paper: 'bg-paper text-[#111] hover:opacity-86',
          'paper-ghost':
            'bg-transparent text-paper ring-1 ring-white/20 ring-inset hover:bg-white/8',
        },
        size: {
          md: 'min-h-10 gap-2 px-[18px] text-[14px]',
          sm: 'min-h-[30px] gap-1.5 px-3 text-[12px]',
        },
      },
      defaultVariants: { tone: 'solid', size: 'md' },
    },
  ),
  /** Round, outlined icon-only button (theme toggle, menu, close). */
  icon: cva(
    'grid size-8 shrink-0 place-items-center rounded-full ring-1 ring-line-2 transition-colors duration-200 ring-inset hover:bg-fg-6pc',
  ),
  /** Inline text link with a trailing arrow that nudges on hover. */
  textLink: cva(
    'group/link inline-flex items-center gap-1 text-[14px] font-medium transition-opacity duration-200 hover:opacity-60',
  ),
  textLinkIcon: cva('transition-transform duration-300 ease-out group-hover/link:translate-x-0.5'),
  /** A link that leaves the page: a small ↗ follows the label. */
  outLink: cva('group/out inline-flex items-center gap-[3px]'),
  outLinkIcon: cva(
    'opacity-60 transition-[translate,opacity] duration-200 ease-out group-hover/out:translate-x-px group-hover/out:-translate-y-px group-hover/out:opacity-100',
  ),
};
