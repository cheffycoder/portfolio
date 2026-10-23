'use client';

import { useEffect, useRef } from 'react';

import {
  JUMBLE_GLYPHS,
  JUMBLE_NOTES,
  LEAVE_GRACE_MS,
  NOTE_REST_MS,
  SCRAMBLE_MS,
  TAP_HOLD_MS,
} from './jumble-text.constants';
import { easeAmplitude, isFixed } from './jumble-text.helpers';
import type { Letter } from './jumble-text.types';

const randomGlyph = () => JUMBLE_GLYPHS[Math.floor(Math.random() * JUMBLE_GLYPHS.length)] ?? '#';

/**
 * "Coming soon." is still being written: on hover (or focus, or a tap) the letters lift off, scramble and drift
 * away from their places, then re-type left to right as they glide home. Runs on its own animation frame,
 * outside React, so nothing re-renders while it moves.
 */
export function useJumble() {
  const word = useRef<HTMLSpanElement>(null);
  const note = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = word.current;
    if (!el) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const letters: Letter[] = [...el.querySelectorAll<HTMLSpanElement>('[data-ch]')].map((span) => {
      const ch = span.textContent ?? '';
      return {
        span,
        ch,
        fixed: isFixed(ch),
        phase: [Math.random() * 6.28, Math.random() * 6.28, Math.random() * 6.28],
        speed: 0.7 + Math.random() * 0.6,
        tx: 0,
        ty: 0,
        tr: 0,
        nextSwap: 0,
      };
    });
    let amp = 0;
    let target = 0;
    let raf = 0;
    let last = 0;
    let scrambleUntil = 0;
    let locked = false;
    let noteIndex = 0;
    let noteHiddenAt = 0;
    let leaveTimer = 0;
    let tapTimer = 0;
    let retype: number[] = [];

    // Lock each letter's width so swapping glyphs never reflows the word.
    const lockWidths = () => {
      if (locked) return;
      locked = true;
      letters.forEach((L) => (L.span.style.width = `${L.span.getBoundingClientRect().width}px`));
    };
    const scatter = () =>
      letters.forEach((L) => {
        L.tx = (Math.random() - 0.5) * 48;
        L.ty = (Math.random() - 0.5) * 30;
        L.tr = (Math.random() - 0.5) * 28;
      });

    const frame = (t: number) => {
      const dt = Math.min(48, t - (last || t));
      last = t;
      amp = easeAmplitude(amp, target, dt);
      const sec = t / 1000;
      for (const L of letters) {
        const x = amp * (L.tx + 3 * Math.sin(sec * 0.6 * L.speed + L.phase[0]));
        const y = amp * (L.ty + 4 * Math.sin(sec * 0.7 * L.speed + L.phase[1]));
        const r = amp * (L.tr + 4 * Math.sin(sec * 0.5 * L.speed + L.phase[2]));
        L.span.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${r.toFixed(2)}deg)`;
        L.span.style.opacity = (1 - amp * 0.3).toFixed(3);
        // Jumble only during the entry burst, then hold still.
        if (!L.fixed && target && t < scrambleUntil && t > L.nextSwap) {
          L.span.textContent = randomGlyph();
          L.nextSwap = t + 60 + Math.random() * 50;
        }
      }
      if (amp < 0.002 && !target) {
        letters.forEach((L) => {
          L.span.style.transform = '';
          L.span.style.opacity = '';
        });
        raf = 0;
        last = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (reduce.matches) return;
      lockWidths();
      retype.forEach(clearTimeout);
      retype = [];
      if (target === 0 && amp < 0.3) scatter(); // a fresh scatter only after it has settled
      target = 1;
      scrambleUntil = performance.now() + SCRAMBLE_MS;
      const n = note.current;
      if (n) {
        if (!n.textContent || performance.now() - noteHiddenAt > NOTE_REST_MS) {
          n.textContent = JUMBLE_NOTES[noteIndex++ % JUMBLE_NOTES.length] ?? '';
        }
        n.dataset.on = '';
      }
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      target = 0;
      scrambleUntil = 0;
      // Settle: a quick scramble, then the letters re-type left to right as they glide home.
      retype = letters.flatMap((L, k) =>
        L.fixed
          ? []
          : [
              window.setTimeout(() => (L.span.textContent = randomGlyph()), k * 28),
              window.setTimeout(() => (L.span.textContent = L.ch), 120 + k * 40),
            ],
      );
      const n = note.current;
      if (n && 'on' in n.dataset) {
        delete n.dataset.on;
        noteHiddenAt = performance.now();
      }
    };

    const onEnter = () => {
      clearTimeout(leaveTimer);
      start();
    };
    const onLeave = () => {
      clearTimeout(leaveTimer);
      leaveTimer = window.setTimeout(stop, LEAVE_GRACE_MS);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      start();
      clearTimeout(tapTimer);
      tapTimer = window.setTimeout(stop, TAP_HOLD_MS);
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('focus', start);
    el.addEventListener('blur', stop);
    el.addEventListener('pointerdown', onDown);
    return () => {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('focus', start);
      el.removeEventListener('blur', stop);
      el.removeEventListener('pointerdown', onDown);
      cancelAnimationFrame(raf);
      clearTimeout(leaveTimer);
      clearTimeout(tapTimer);
      retype.forEach(clearTimeout);
    };
  }, []);

  return { word, note };
}
