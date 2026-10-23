'use client';

import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { RefObject } from 'react';

import {
  ACTIVE_BAND,
  DECK_KEYS,
  OWN_KEYS_SELECTOR,
  ScreenDeckContext,
} from './screen-deck.constants';
import { indexOf, stepIndex } from './screen-deck.helpers';
import type { ScreenDeckValue, ScreenEntry, ScreenState } from './screen-deck.types';

const smooth = (): ScrollBehavior =>
  matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

/** The deck around this component (or the empty default outside a deck). */
export function useScreenDeck(): ScreenDeckValue {
  return useContext(ScreenDeckContext);
}

/** Whether the screen with this id is active now, and whether it has been seen (reveals played). */
export function useScreenState(id: string): ScreenState {
  const { screens, active, seen, inDeck } = useScreenDeck();
  const index = indexOf(screens, id);
  return { index, active: index >= 0 && index === active, seen: seen.has(id), inDeck };
}

/**
 * Runs the snap deck: tracks the active screen, scrolls in-page links and keys to screens, and honours a
 * #screen in the address on arrival.
 */
export function useDeckController(
  screens: readonly ScreenEntry[],
  container: RefObject<HTMLElement | null>,
): ScreenDeckValue {
  const [active, setActive] = useState(-1);
  // The first screen counts as seen from the server render, so its content animates in on first paint.
  const [seen, setSeen] = useState<ReadonlySet<string>>(
    () => new Set(screens[0] ? [screens[0].id] : []),
  );

  const element = useCallback(
    (index: number) => {
      const id = screens[index]?.id;
      return id ? document.getElementById(id) : null;
    },
    [screens],
  );

  const goTo = useCallback(
    (index: number) => element(index)?.scrollIntoView({ behavior: smooth(), block: 'start' }),
    [element],
  );

  // The screen crossing the middle of the viewport is the active one.
  useEffect(() => {
    const root = container.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = indexOf(screens, entry.target.id);
          if (index < 0) continue;
          setActive(index);
          setSeen((prev) =>
            prev.has(entry.target.id) ? prev : new Set(prev).add(entry.target.id),
          );
        }
      },
      { root, rootMargin: ACTIVE_BAND },
    );
    screens.forEach((_, i) => {
      const el = element(i);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [container, element, screens]);

  // In-page links (#about, #contact…) scroll the deck instead of jumping.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href*="#"]');
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.pathname !== location.pathname || !link.hash) return;
      const index = indexOf(screens, decodeURIComponent(link.hash.slice(1)));
      if (index < 0) return;
      e.preventDefault();
      goTo(index);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [goTo, screens]);

  // Arrow keys and Page Up/Down move one screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const delta = DECK_KEYS[e.key];
      if (!delta || e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as Element | null)?.closest?.(OWN_KEYS_SELECTOR)) return;
      e.preventDefault();
      goTo(stepIndex(active, delta, screens.length));
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [active, goTo, screens.length]);

  // Arriving with #screen (e.g. "Get in touch" from the articles page).
  useEffect(() => {
    const index = indexOf(screens, decodeURIComponent(location.hash.slice(1)));
    if (index > 0) requestAnimationFrame(() => element(index)?.scrollIntoView({ block: 'start' }));
  }, [element, screens]);

  return useMemo(
    () => ({ screens, active, seen, goTo, inDeck: true }),
    [screens, active, seen, goTo],
  );
}
