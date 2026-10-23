import { cva } from 'class-variance-authority';

/** Four file states stacked and cross-faded by the bar under them; the bar is the control (DESIGN.md §4). */
export const shareLifecycleStyles = {
  stack: cva('group/stack relative grid w-[min(100%,448px)] max-w-full min-w-0'),
  window: cva(
    'w-full [transform:translateY(calc(var(--d,0)*12px))_scale(calc(1-var(--ad,0)*0.03))] opacity-[var(--o,0)] transition-opacity duration-[120ms] ease-linear [grid-area:1/1] group-data-[settling]/stack:transition-[opacity,transform] group-data-[settling]/stack:duration-[450ms] group-data-[settling]/stack:ease-ui',
  ),
  file: cva('mb-3.5 flex items-center gap-3', {
    variants: { faded: { true: 'opacity-35', false: '' } },
  }),
  box: cva(
    'grid size-9 flex-none place-items-center rounded-[9px] bg-page text-fg ring-1 ring-line-2 ring-inset [&_.ico]:[stroke-width:1.6]',
  ),
  name: cva('block font-sans text-[12.5px] leading-[normal] font-medium text-fg'),
  sub: cva('block text-[10px] text-fg-3'),
  badge: cva('ml-auto flex-none rounded-full px-[9px] py-0.5 text-[10px] ring-1 ring-inset', {
    variants: {
      tone: {
        ok: 'bg-ok text-ok-fg ring-ok-line',
        warn: 'bg-warn/10 text-warn ring-warn/25',
        off: 'bg-fg-5pc text-fg-3 ring-line',
      },
    },
  }),
  link: cva(
    'mb-2.5 flex min-w-0 items-center gap-2 rounded-lg bg-page px-2.5 py-2 ring-1 ring-line ring-inset',
    { variants: { faded: { true: 'opacity-35', false: '' } } },
  ),
  linkText: cva('truncate'),
  linkIcon: cva('text-fg-3'),
  meta: cva('flex justify-between gap-2.5 text-[10.5px] text-fg-3 short-phone:hidden'),
  metaPart: cva('inline-flex items-center gap-1.5'),
  progress: cva('mb-2.5 h-2 overflow-hidden rounded bg-page ring-1 ring-line ring-inset'),
  progressFill: cva('block h-full w-full rounded bg-fg'),

  wrap: cva('w-[min(100%,448px)]'),
  bar: cva(
    'group/bar relative h-11 [transform-origin:var(--origin,center)] scale-x-(--stretch) cursor-grab touch-none rounded-[22px] bg-fg-7pc transition-transform duration-[450ms] ease-spring select-none [--stretch:1] data-[dragging]:cursor-grabbing data-[dragging]:transition-none data-[intro]:animate-bar-in',
  ),
  fill: cva(
    'absolute inset-y-0 left-0 w-[calc(44px+(100%-44px)*var(--v,0)/3)] overflow-hidden rounded-[22px] bg-ink group-data-[settling]/bar:transition-[width] group-data-[settling]/bar:duration-500 group-data-[settling]/bar:ease-spring',
  ),
  labels: cva(
    'pointer-events-none absolute inset-0 grid place-items-center text-[13px] font-semibold',
    {
      variants: {
        layer: {
          track: 'text-fg-2 group-data-[fresh]/bar:opacity-55',
          fill: 'w-[var(--bar-w,100%)] text-on-ink',
        },
      },
    },
  ),
  label: cva('translate-y-[calc(var(--d,0)*6px)] opacity-[var(--o,0)] [grid-area:1/1]'),
  ticks: cva(
    'pointer-events-none absolute inset-x-[22px] inset-y-0 flex items-center justify-between',
  ),
  tick: cva('size-1 rounded-full bg-fg-3 opacity-40'),
  knob: cva(
    'pointer-events-none absolute top-1 left-[calc((100%-44px)*var(--v,0)/3+4px)] z-2 grid size-9 place-items-center rounded-full bg-surface text-fg shadow-knob group-data-[dragging]/bar:scale-108 group-data-[fresh]/bar:animate-knob-nudge group-data-[settling]/bar:transition-[left] group-data-[settling]/bar:duration-500 group-data-[settling]/bar:ease-spring [&_.ico]:[stroke-width:2.2]',
  ),
  hint: cva(
    'pointer-events-none absolute top-1/2 left-[calc((100%-44px)*var(--v,0)/3+48px)] flex [transform:translateY(-50%)] gap-px text-fg-3 opacity-0 group-data-[fresh]/bar:animate-hint-run [&_.ico]:[stroke-width:2.4]',
  ),
};
