import { cva } from 'class-variance-authority';

export const aboutScreenStyles = {
  dotsFade: cva('absolute inset-0 dot-field-fade'),
  dots: cva('absolute inset-0 dot-field'),
  title: cva('type-label'),
  statement: cva('max-w-[760px] type-statement'),
  lead: cva('mt-5 max-w-[56ch] type-lead'),
  facts: cva(
    'mt-12 flex flex-wrap gap-x-10 gap-y-3 border-t border-line pt-5 max-md:mt-7 max-md:gap-x-7 max-md:gap-y-3.5 tiny:mt-[18px] tiny:gap-x-6 tiny:gap-y-2.5 tiny:pt-3.5',
  ),
  fact: cva('grid gap-1'),
  factLabel: cva('type-label'),
  factValue: cva('text-[14px] text-fg'),
};
