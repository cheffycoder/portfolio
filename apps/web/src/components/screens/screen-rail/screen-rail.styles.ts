import { cva } from 'class-variance-authority';

/** The vertical stepper (▲ dots ▼) beside the content column on wide screens (DESIGN.md §5). */
export const screenRailStyles = {
  root: cva(
    'invisible fixed top-1/2 left-[min(calc(50%+var(--vc)/2+64px),calc(100%-64px))] z-80 hidden translate-x-3 -translate-y-1/2 flex-col items-center gap-1.5 rounded-full bg-nav p-1.5 opacity-0 shadow-float backdrop-blur-[20px] backdrop-saturate-[180%] transition-[opacity,translate,visibility] delay-[0s,0s,450ms] duration-[350ms,450ms,0s] ease-[var(--ease-ui),var(--ease-out),linear] data-[visible]:visible data-[visible]:translate-x-0 data-[visible]:opacity-100 data-[visible]:delay-0 xl:flex',
  ),
  list: cva('grid'),
  dot: cva(
    "group relative grid h-[22px] w-7 place-items-center before:size-[5px] before:rounded-full before:bg-fg-3 before:opacity-45 before:transition-[scale,opacity,background-color] before:duration-300 before:ease-out before:content-[''] hover:before:opacity-100 focus-visible:rounded-lg focus-visible:outline-offset-[-2px] aria-[current=true]:before:scale-160 aria-[current=true]:before:bg-fg aria-[current=true]:before:opacity-100",
  ),
  tip: cva(
    'pointer-events-none absolute top-1/2 right-10 translate-x-1 -translate-y-1/2 rounded-[7px] bg-ink px-[9px] py-1.5 font-label text-[11px] leading-none font-medium whitespace-nowrap text-on-ink opacity-0 transition-[opacity,translate] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100',
  ),
  step: cva(
    'grid size-7 place-items-center rounded-full bg-fg-7pc text-fg-72pc transition-colors duration-100 ease-linear enabled:hover:bg-fg-14pc enabled:hover:text-fg disabled:cursor-default disabled:opacity-35 [&_.ico]:[stroke-width:2.4]',
  ),
};
