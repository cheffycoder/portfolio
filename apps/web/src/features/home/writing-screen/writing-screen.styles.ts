import { cva } from 'class-variance-authority';

export const writingScreenStyles = {
  block: cva('grid justify-items-center gap-3.5 text-center'),
  label: cva('type-label'),
  heading: cva('type-h2'),
};
