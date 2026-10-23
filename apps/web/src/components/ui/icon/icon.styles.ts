import { cva } from 'class-variance-authority';

export const iconStyles = {
  root: cva('ico', {
    variants: {
      size: {
        10: 'size-2.5',
        11: 'size-[11px]',
        12: 'size-3',
        13: 'size-[13px]',
        14: 'size-3.5',
        15: 'size-[15px]',
        17: 'size-[17px]',
        18: 'size-[18px]',
      },
    },
    defaultVariants: { size: 14 },
  }),
};
