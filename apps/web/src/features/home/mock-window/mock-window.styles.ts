import { cva } from 'class-variance-authority';

/** Mock app windows on the side-project stages, in the first version's simple colours. */
export const mockWindowStyles = {
  root: cva(
    'w-[min(100%,560px)] max-w-full min-w-0 rounded-[14px] bg-win px-5 py-[18px] font-code text-[11px] leading-[1.6] tracking-normal text-fg shadow-win max-md:p-3.5',
  ),
  bar: cva(
    'mb-3 flex items-center justify-between gap-3 border-b border-line pb-3 text-[10.5px] text-fg-3',
  ),
  file: cva(
    'inline-flex min-w-0 items-center gap-2 overflow-hidden font-sans text-[12px] leading-[normal] font-medium text-ellipsis whitespace-nowrap text-fg',
  ),
  lights: cva('mr-1 inline-flex gap-1.5'),
  light: cva('size-2.5 rounded-full', {
    variants: {
      color: { red: 'bg-light-red', amber: 'bg-light-amber', green: 'bg-light-green' },
    },
  }),
};
