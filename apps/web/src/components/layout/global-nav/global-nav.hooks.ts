'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The phone menu: open state, Escape to close, focus moved into the menu when it opens and back to the toggle
 * when it closes.
 */
export function useFlyout() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    let frame = 0;
    if (open) {
      // After the menu's visibility has switched on (a hidden element can't take focus).
      frame = requestAnimationFrame(() =>
        document.querySelector<HTMLElement>('[data-menu-close]')?.focus({ preventScroll: true }),
      );
    } else if (wasOpen.current && document.activeElement?.closest('[data-flyout]')) {
      toggle.current?.focus({ preventScroll: true });
    }
    wasOpen.current = open;
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('keydown', onKey);
    };
  }, [open]);

  return { open, setOpen, toggle };
}
