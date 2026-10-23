import { cva } from 'class-variance-authority';

/** The translucent pill that slides in from the second screen (DESIGN.md §5). */
export const localNavStyles = {
  root: cva(
    'invisible fixed top-[calc(env(safe-area-inset-top,0px)+12px)] left-1/2 z-80 w-[min(var(--vc),calc(100%-20px))] max-w-[960px] -translate-x-1/2 -translate-y-[84px] rounded-[18px] bg-nav shadow-float backdrop-blur-[20px] backdrop-saturate-[180%] transition-[translate,visibility] delay-[0s,350ms] duration-[350ms,0s] ease-out data-[visible]:visible data-[visible]:translate-y-0 data-[visible]:delay-0 max-md:w-[calc(100%-20px-env(safe-area-inset-left,0px)-env(safe-area-inset-right,0px))]',
  ),
  bar: cva('flex h-[52px] items-center gap-3.5 pr-2.5 pl-[18px] max-md:gap-2 max-md:pl-3.5'),
  title: cva(
    'font-display text-[15px] leading-none font-semibold tracking-[-0.015em] whitespace-nowrap max-md:text-[14px]',
  ),
  now: cva(
    '-ml-1.5 hidden font-label text-[12px] leading-none tracking-[0.02em] whitespace-nowrap text-fg-3 xl:inline',
  ),
  nowNumber: cva('font-medium text-fg tabular-nums'),
  spacer: cva('ml-auto'),
  links: cva('flex gap-[22px] text-[12px] max-lg:hidden'),
  link: cva('whitespace-nowrap text-fg-3 transition-colors duration-200 hover:text-fg'),
  explore: cva('hidden max-lg:inline-flex'),
  exploreIcon: cva('transition-transform duration-300 ease-ui', {
    variants: { open: { true: 'rotate-180', false: '' } },
  }),
  contact: cva('max-[359px]:hidden'),
  menu: cva('grid transition-[grid-template-rows] duration-400 ease-ui', {
    variants: { open: { true: 'grid-rows-[1fr]', false: 'grid-rows-[0fr]' } },
  }),
  menuInner: cva('overflow-hidden'),
  menuList: cva('px-[18px] pb-3.5'),
  menuLink: cva('flex justify-between border-t border-line py-[11px] text-[15px] font-medium'),
  menuMeta: cva('font-label text-[12px] leading-[normal] font-normal text-fg-3'),
  scrim: cva(
    'invisible fixed inset-0 z-70 bg-scrim opacity-0 backdrop-blur-[16px] transition-[opacity,visibility] delay-[0s,350ms] duration-[350ms,0s] ease-out data-[open]:visible data-[open]:opacity-100 data-[open]:delay-0',
  ),
};
