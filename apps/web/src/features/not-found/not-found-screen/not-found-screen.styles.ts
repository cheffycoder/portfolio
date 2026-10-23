import { cva } from 'class-variance-authority';

export const notFoundScreenStyles = {
  block: cva('grid justify-items-center gap-3.5 text-center'),
  label: cva('type-label'),
  heading: cva('type-display'),
  lead: cva('max-w-[46ch] type-lead'),
};
