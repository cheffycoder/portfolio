import { cva } from 'class-variance-authority';

export const introScreenStyles = {
  copy: cva('relative z-1 grid max-w-[760px] grid-cols-[minmax(0,1fr)] gap-5 max-md:gap-4'),
  eyebrow: cva('-mb-1 type-label'),
  heading: cva('type-display'),
  lead: cva('type-lead'),
  actions: cva('mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-3'),
};
