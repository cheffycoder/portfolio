import { cva } from 'class-variance-authority';

export const articlesSoonStyles = {
  block: cva('grid justify-items-center gap-3.5 text-center'),
  label: cva('type-label'),
  heading: cva('inline-flex items-center gap-[18px] type-display'),
};
