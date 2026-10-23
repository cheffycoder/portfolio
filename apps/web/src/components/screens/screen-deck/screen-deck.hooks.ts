'use client';

import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { RefObject } from 'react';

import {
  ACTIVE_BAND,
  ARRIVED_PX,
  DECK_KEYS,
  OWN_KEYS_SELECTOR,
  RETRY_WINDOW_MS,
  ScreenDeckContext,
  SETTLE_MS,
} from './screen-deck.constants';
import { hasArrived, indexOf, keyTarget } from './screen-deck.helpers';
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
 *
 * Event handlers read the live position from refs, not from React state: state reaches a handler only after a
 * render and an effect, so a key pressed in between would act on the previous screen.
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

  /** The active screen, updated the moment it changes (state follows for rendering). */
  const activeRef = useRef(-1);
  /** The screen a navigation is heading to, until the scroll comes to rest there. */
  const heading = useRef<{ index: number; at: number; retried: boolean } | null>(null);

  /** Whether a screen's top sits at the top of the deck (its scroll container, the screen's parent). */
  const arrived = useCallback(
    (index: number) => {
      const el = element(index);
      const root = el?.parentElement;
      if (!el || !root) return true;
      return hasArrived(
        el.getBoundingClientRect().top,
        root.getBoundingClientRect().top,
        ARRIVED_PX,
      );
    },
    [element],
  );

  const goTo = useCallback(
    (index: number) => {
      const el = element(index);
      if (!el) return;
      heading.current = arrived(index) ? null : { index, at: performance.now(), retried: false };
      el.scrollIntoView({ behavior: smooth(), block: 'start' });
    },
    [arrived, element],
  );

  const step = useCallback(
    (delta: number) =>
      goTo(keyTarget(activeRef.current, heading.current?.index ?? null, delta, screens.length)),
    [goTo, screens.length],
  );

  // When a scroll comes to rest: the navigation is done, or (once, if it was cut short) sent again.
  useEffect(() => {
    const root = container.current;
    if (!root) return;
    let timer = 0;
    const settle = () => {
      const target = heading.current;
      if (!target) return;
      const recent = performance.now() - target.at < RETRY_WINDOW_MS;
      if (!arrived(target.index) && recent && !target.retried) {
        target.retried = true;
        element(target.index)?.scrollIntoView({ behavior: smooth(), block: 'start' });
        return;
      }
      heading.current = null;
    };
    const onScroll = () => {
      clearTimeout(timer);
      timer = window.setTimeout(settle, SETTLE_MS);
    };
    root.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      root.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, [arrived, container, element]);

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
          activeRef.current = index;
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
      step(delta);
    };
    addEventListener('keydown', onKey);
    // Keys, links and the rail work from here on (tests wait for this before pressing anything).
    const root = container.current;
    root?.setAttribute('data-deck-ready', '');
    return () => {
      removeEventListener('keydown', onKey);
      root?.removeAttribute('data-deck-ready');
    };
  }, [container, step]);

  // Arriving with #screen (e.g. "Get in touch" from the articles page).
  useEffect(() => {
    const index = indexOf(screens, decodeURIComponent(location.hash.slice(1)));
    if (index > 0) requestAnimationFrame(() => element(index)?.scrollIntoView({ block: 'start' }));
  }, [element, screens]);

  return useMemo(
    () => ({ screens, active, seen, goTo, step, inDeck: true }),
    [screens, active, seen, goTo, step],
  );
}
