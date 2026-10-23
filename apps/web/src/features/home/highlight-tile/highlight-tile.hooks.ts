'use client';

import { useState } from 'react';

/** Whether the tile shows its back (detail) or its front (number). */
export function useTurnOver() {
  const [open, setOpen] = useState(false);
  return { open, toggle: () => setOpen((o) => !o) };
}
