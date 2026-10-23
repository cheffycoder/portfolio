'use client';

import { useRolledValue } from './roll-number.hooks';
import type { RollNumberProps } from './roll-number.types';

/** A stat whose digits roll when its screen opens. The server-rendered HTML holds the final value. */
export function RollNumber({ value, screenId, order = 0 }: RollNumberProps) {
  return useRolledValue(value, screenId, order);
}
