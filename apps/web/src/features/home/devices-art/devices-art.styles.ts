import { cva } from 'class-variance-authority';

/** An exploded browser and phone, drawn in ink with the two brand gradients as the only colour. */
export const devicesArtStyles = {
  root: cva(
    'w-full max-w-[540px] justify-self-end text-fg max-lg:w-[min(100%,44svh)] max-lg:justify-self-center max-md:w-[min(100%,36svh)] tiny:w-[min(100%,30svh)]',
  ),
  svg: cva('h-auto w-full overflow-visible'),
  plane: cva('fill-page stroke-current [stroke-width:1.1] [stroke-opacity:0.55]'),
  line: cva('fill-none stroke-current [stroke-width:0.9] [stroke-opacity:0.4]'),
  soft: cva('fill-fg-6pc stroke-current [stroke-width:0.8] [stroke-opacity:0.35]'),
  guide: cva(
    'fill-none stroke-current [stroke-width:1] explode-guide [stroke-dasharray:3_6] [stroke-opacity:0.28]',
  ),
  hot: cva('stroke-none'),
  layer: cva('explode-layer', {
    variants: {
      depth: {
        0: '[--d:0]',
        1: '[--d:1]',
        2: '[--d:2]',
        3: '[--d:3]',
        4: '[--d:4]',
        5: '[--d:5]',
      },
      lift: {
        0: '',
        55: '[--c:55px]',
        60: '[--c:60px]',
        110: '[--c:110px]',
        120: '[--c:120px]',
        165: '[--c:165px]',
        180: '[--c:180px]',
        220: '[--c:220px]',
      },
    },
    defaultVariants: { depth: 0, lift: 0 },
  }),
};
