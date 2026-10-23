'use client';

import { useEffect, useRef, useState } from 'react';

import { track } from '@/lib/analytics/analytics.service';

import { COPY_FEEDBACK_MS } from './contact-screen.constants';

/**
 * Copies the email address. Where the clipboard is unavailable, shows the address selected so ⌘/Ctrl + C copies
 * it. The status message is announced to screen readers.
 */
export function useCopyEmail(email: string) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'manual'>('idle');
  const address = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (status === 'idle') return;
    if (status === 'manual' && address.current) {
      const range = document.createRange();
      range.selectNodeContents(address.current);
      const selection = getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
    const timer = setTimeout(() => setStatus('idle'), COPY_FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [status]);

  const copy = () => {
    track({ name: 'copy_email' });
    if (!navigator.clipboard?.writeText) {
      setStatus('manual');
      return;
    }
    navigator.clipboard.writeText(email).then(
      () => setStatus('copied'),
      () => setStatus('manual'),
    );
  };

  return { status, copy, address };
}

/** A soft light that follows a fine pointer over the card (not on touch, not with reduced motion). */
export function useSpotlight() {
  const card = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = card.current;
    if (!el) return;
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (!fine.matches || reduce.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    };
    const onLeave = () => cancelAnimationFrame(frame);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);
  return card;
}
