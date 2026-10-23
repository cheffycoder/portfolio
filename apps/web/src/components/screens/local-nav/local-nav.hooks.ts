'use client';

import { useEffect, useState } from 'react';

/** The Explore menu: closes on Escape and whenever the deck returns to the first screen. */
export function useExploreMenu(visible: boolean) {
  const [open, setOpen] = useState(false);
  const [wasVisible, setWasVisible] = useState(visible);
  if (wasVisible !== visible) {
    setWasVisible(visible);
    if (!visible) setOpen(false);
  }
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open]);
  return { open, setOpen };
}
