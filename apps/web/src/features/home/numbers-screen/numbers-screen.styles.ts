import { cva } from 'class-variance-authority';

export const numbersScreenStyles = {
  label: cva('type-label'),
  heading: cva('type-h2'),
  grid: cva('grid grid-cols-3 gap-4 max-md:grid-cols-2 max-md:gap-2.5 short-phone:gap-2'),
};
