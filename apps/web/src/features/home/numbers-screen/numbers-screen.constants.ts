import type { SegmentOption } from '@/components/ui/segmented/segmented.types';

/** The filter under the tiles. */
export const COMPANY_FILTER: readonly SegmentOption[] = [
  { value: 'all', label: 'All' },
  { value: 'fancode', label: 'FanCode' },
  { value: 'loginext', label: 'LogiNext' },
];
