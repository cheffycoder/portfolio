import { cva } from 'class-variance-authority';

/** Mini figures, drawn to scale, in ink and the tile's gradient. */
export const highlightFigureStyles = {
  bars: cva('grid gap-2'),
  row: cva(
    'grid grid-cols-[44px_1fr] items-center gap-2.5 font-label text-[11px] leading-[normal] text-fg-3',
  ),
  track: cva('h-2 overflow-hidden rounded bg-fg-7pc'),
  bar: cva(
    'block h-full origin-left rounded transition-transform delay-150 duration-[900ms] ease-out',
    {
      variants: {
        hot: { true: 'bg-gradient', false: 'bg-dim' },
        open: { true: '', false: 'scale-x-0' },
      },
    },
  ),
  dots: cva('grid grid-cols-20 gap-[3px]'),
  dot: cva('aspect-square rounded-full', {
    variants: { on: { true: 'bg-cool-2', false: 'bg-dim' } },
  }),
  countRow: cva('flex flex-wrap gap-[5px]', {
    variants: { after: { true: 'mt-1.5', false: '' } },
  }),
  count: cva('size-[11px] rounded-full', {
    variants: { hot: { true: 'bg-gradient', false: 'bg-dim' } },
  }),
};
