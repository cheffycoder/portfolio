import { cva } from 'class-variance-authority';

export const screenDeckStyles = {
  /** The scroll container: one screen at a time, scrollbar hidden. */
  root: cva(
    'no-scrollbar h-full snap-y snap-mandatory overflow-x-hidden overflow-y-auto overscroll-y-contain',
  ),
};
