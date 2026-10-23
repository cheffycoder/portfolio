import { cva } from 'class-variance-authority';

/** The contact card: a dark card with a moving shine border and a pointer spotlight, in both themes. */
export const contactScreenStyles = {
  wrap: cva('relative overflow-hidden rounded-[18px] p-0.5 shadow-card'),
  shine: cva('absolute -inset-[250%] m-auto animate-spin-slow shine-border'),
  card: cva(
    'relative grid gap-6 rounded-2xl border border-white/10 bg-contact p-[clamp(24px,4vw,40px)] text-paper [--mx:-400px] [--my:-400px] short-phone:gap-5 tiny:gap-4 tiny:px-[18px] tiny:py-5',
  ),
  spotlight: cva(
    'pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(340px_circle_at_var(--mx)_var(--my),rgb(255_255_255/0.07),transparent_75%)]',
  ),
  top: cva(
    'relative z-1 flex items-start justify-between gap-5 border-b border-white/10 pb-[22px]',
  ),
  label: cva(
    'mt-2.5 font-label text-[14px] leading-[1.4] font-medium tracking-[0.08em] text-paper/55 uppercase',
  ),
  heading: cva(
    'mt-2.5 max-w-[26ch] font-display text-[24px] leading-[1.35] font-medium tracking-[-0.02em] max-md:text-[19px] tiny:text-[16.5px]',
  ),
  sub: cva('mt-2.5 text-[14px] text-paper/60 tiny:text-[12.5px]'),
  monogram: cva(
    'grid size-11 flex-none place-items-center rounded-full border border-white/20 font-label text-[12px] leading-[normal] font-medium max-md:hidden',
  ),
  actions: cva('relative z-1 flex flex-wrap gap-2.5 tiny:gap-2'),
  action: cva('max-w-full min-w-0 max-md:flex-[1_1_100%]'),
  copyLabel: cva('min-w-0 truncate'),
  long: cva('max-sm:hidden'),
  short: cva('hidden max-sm:inline'),
  foot: cva(
    'relative z-1 flex flex-wrap items-center justify-between gap-3.5 border-t border-white/10 pt-[18px] font-label text-[12px] leading-[normal] text-paper/55 max-md:flex-col max-md:items-stretch max-md:gap-4 tiny:gap-3 tiny:pt-3.5',
  ),
  status: cva(
    'inline-flex items-start gap-2 leading-[1.5] max-sm:block max-sm:text-center max-sm:text-balance',
  ),
  statusIcon: cva(
    'mt-0.5 flex-none opacity-80 max-sm:m-0 max-sm:mr-1.5 max-sm:inline-block max-sm:align-[-2px]',
  ),
  socials: cva('flex gap-2 max-md:order-first max-md:grid max-md:grid-cols-3'),
  social: cva(
    'grid size-[34px] place-items-center rounded-[10px] text-paper/70 ring-1 ring-white/14 transition-[color,box-shadow] duration-200 ring-inset hover:text-white hover:ring-white/30 max-md:flex max-md:h-[42px] max-md:w-auto max-md:items-center max-md:justify-center max-md:gap-[7px] max-md:rounded-full max-md:px-1.5 max-md:font-display max-md:text-[13.5px] max-md:leading-[normal] max-md:font-medium max-md:tracking-[-0.01em] max-md:text-paper/85 tiny:h-[38px]',
  ),
  socialIcon: cva('max-sm:size-[17px]'),
  socialLabel: cva('hidden max-md:inline max-sm:hidden'),
  live: cva('sr-only'),
};
