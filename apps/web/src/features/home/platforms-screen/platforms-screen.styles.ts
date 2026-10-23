import { cva } from 'class-variance-authority';

export const platformsScreenStyles = {
  wrap: cva(
    'grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-center gap-12 max-lg:grid-cols-1 max-lg:gap-7 max-md:gap-[18px]',
  ),
  copy: cva('max-w-[520px]'),
  label: cva('type-label'),
  heading: cva('mt-3 type-h2'),
  lead: cva('mt-4 type-lead'),
  shipped: cva('mt-7 flex flex-wrap items-center gap-2 max-md:mt-5'),
  shippedLabel: cva('mr-1 type-label'),
};
