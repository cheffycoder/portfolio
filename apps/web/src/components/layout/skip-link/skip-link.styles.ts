import { cva } from 'class-variance-authority';

export const skipLinkStyles = {
  root: cva(
    'fixed -top-[60px] left-3 z-400 rounded-xl bg-ink px-4 py-2.5 text-[14px] text-on-ink focus:top-[calc(env(safe-area-inset-top,0px)+12px)]',
  ),
};
