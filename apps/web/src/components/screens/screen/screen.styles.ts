import { cva } from 'class-variance-authority';

export const screenStyles = {
  root: cva(
    'relative isolate flex min-h-full snap-start snap-always flex-col overflow-hidden pt-[calc(env(safe-area-inset-top,0px)+var(--nav-space))]',
    {
      variants: {
        tone: { warm: 'warm-g', cool: 'cool-g', none: '' },
        navSpace: { float: '', top: '[--nav-space:56px]' },
      },
      defaultVariants: { tone: 'none', navSpace: 'float' },
    },
  ),
  background: cva('pointer-events-none absolute inset-0 -z-10 overflow-hidden'),
  body: cva(
    'container-screen flex min-w-0 flex-1 flex-col justify-center pt-6 pb-8 max-md:pt-3 max-md:pb-5 short-phone:pt-1.5 short-phone:pb-3',
    {
      variants: { align: { start: '', center: 'items-center text-center' } },
      defaultVariants: { align: 'start' },
    },
  ),
};
