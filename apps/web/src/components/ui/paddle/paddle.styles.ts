import { cva } from 'class-variance-authority';

/** Round grey step buttons beside a switch (previous, next, play/pause). */
export const paddleStyles = {
  root: cva(
    'group grid size-9 flex-none place-items-center rounded-full bg-fg-7pc text-fg-72pc transition-colors duration-100 ease-linear hover:bg-fg-13pc hover:text-fg max-md:size-8 [&_.ico]:[stroke-width:2.4]',
  ),
};
