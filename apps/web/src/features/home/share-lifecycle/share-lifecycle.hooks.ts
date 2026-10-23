'use client';

import { useEffect, useRef } from 'react';

import { useScreenState } from '@/components/screens/screen-deck/screen-deck.hooks';
import { clamp } from '@/utils/number/number.helpers';

import { INTRO_DELAY_MS, LIFECYCLE, SETTLE_MS } from './share-lifecycle.constants';
import { dragAt, fadeFor, fadeVars, keyTarget } from './share-lifecycle.helpers';

const MAX = LIFECYCLE.length - 1;

const setVars = (el: HTMLElement, vars: Record<string, string>) =>
  Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));

/**
 * Drives the lifecycle bar outside React (it repaints on every pointer move): drag or use the keys, and every
 * label and window cross-fades by its distance from the value; letting go settles on the nearest state.
 * The bar plays a short intro each time its screen opens.
 */
export function useLifecycleBar(screenId: string) {
  const bar = useRef<HTMLDivElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const { active } = useScreenState(screenId);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const windows = [...(stack.current?.children ?? [])] as HTMLElement[];
    const labels = [...el.querySelectorAll<HTMLElement>('[data-step]')];
    let v = 0;
    let rect: DOMRect | null = null;
    let dragging = false;
    let settleTimer = 0;

    const settling = (on: boolean) => {
      el.toggleAttribute('data-settling', on);
      stack.current?.toggleAttribute('data-settling', on);
    };
    const paint = (value: number) => {
      v = value;
      el.style.setProperty('--v', v.toFixed(3));
      labels.forEach((label) => setVars(label, fadeVars(fadeFor(Number(label.dataset.step), v))));
      windows.forEach((win, i) => setVars(win, fadeVars(fadeFor(i, v))));
      const r = Math.round(v);
      el.setAttribute('aria-valuenow', String(r));
      el.setAttribute('aria-valuetext', LIFECYCLE[r]?.step ?? '');
    };
    const settle = (value: number) => {
      settling(true);
      el.style.setProperty('--stretch', '1');
      paint(clamp(Math.round(value), 0, MAX));
      clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => settling(false), SETTLE_MS);
    };
    const moveTo = (clientX: number) => {
      if (!rect) return;
      const drag = dragAt(clientX, rect.left, rect.width, MAX);
      el.style.setProperty('--stretch', drag.stretch.toFixed(4));
      el.style.setProperty('--origin', drag.origin);
      paint(drag.value);
    };
    const syncWidth = () => el.style.setProperty('--bar-w', `${el.clientWidth}px`);
    const touched = () => el.removeAttribute('data-fresh');

    const onDown = (e: PointerEvent) => {
      touched();
      dragging = true;
      el.setPointerCapture(e.pointerId);
      rect = el.getBoundingClientRect();
      el.setAttribute('data-dragging', '');
      settling(true);
      moveTo(e.clientX);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      settling(false);
      moveTo(e.clientX);
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      el.removeAttribute('data-dragging');
      settle(v);
    };
    const onKey = (e: KeyboardEvent) => {
      touched();
      const target = keyTarget(e.key, v, MAX);
      if (target === null) return;
      e.preventDefault();
      settle(target);
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('keydown', onKey);
    const resize = new ResizeObserver(syncWidth);
    resize.observe(el);
    syncWidth();
    paint(0);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('keydown', onKey);
      resize.disconnect();
      clearTimeout(settleTimer);
    };
  }, []);

  // Each time the screen opens, the bar draws in from its knob.
  useEffect(() => {
    const el = bar.current;
    if (!active || !el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setTimeout(() => {
      el.style.setProperty('--bar-w', `${el.clientWidth}px`);
      el.removeAttribute('data-intro');
      void el.offsetWidth;
      el.setAttribute('data-intro', '');
    }, INTRO_DELAY_MS);
    const done = () => el.removeAttribute('data-intro');
    el.addEventListener('animationend', done);
    return () => {
      clearTimeout(timer);
      el.removeEventListener('animationend', done);
    };
  }, [active]);

  return { bar, stack };
}
