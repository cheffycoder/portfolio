import { cva } from 'class-variance-authority';

export const themeToggleStyles = {
  icon: cva(
    'transition-transform duration-500 ease-out group-hover:rotate-[35deg] group-data-[mode=dark]:hidden',
  ),
  sun: cva(
    'hidden text-sun transition-transform duration-500 ease-out group-hover:rotate-[35deg] group-data-[mode=dark]:block',
  ),
  root: cva('group', {
    variants: { compact: { true: 'max-md:size-[30px]', false: '' } },
    defaultVariants: { compact: false },
  }),
};
