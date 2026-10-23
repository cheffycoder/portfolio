import { track } from '@/lib/analytics/analytics.service';

import { SKY_SWEEP_MS, THEME_STORAGE_KEY } from './theme.constants';
import { otherMode, skyDisc } from './theme.helpers';
import type { ThemeMode } from './theme.types';

const root = () => document.documentElement;
const prefersDark = () => matchMedia('(prefers-color-scheme: dark)').matches;
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** The theme in effect: the visitor's choice, else the system's. */
export function currentMode(): ThemeMode {
  const chosen = root().dataset.theme;
  if (chosen === 'dark' || chosen === 'light') return chosen;
  return prefersDark() ? 'dark' : 'light';
}

function applyMode(mode: ThemeMode): void {
  root().dataset.theme = mode;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // Storage blocked: the choice lasts for this page only.
  }
}

/** Calls back whenever the theme changes, by choice or by the system. Returns the unsubscribe. */
export function subscribeToMode(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(root(), { attributes: true, attributeFilter: ['data-theme'] });
  const media = matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener('change', onChange);
  };
}

let sweeping = false;

/**
 * Sunrise / sunset: a disc grows from `from` with a band of sky colours on its edge until it covers the
 * farthest corner; the theme swaps while everything is covered; then the disc fades. With reduced motion,
 * or without the sky element, the theme simply swaps.
 */
export function toggleTheme(from?: Element | null): void {
  const next = otherMode(currentMode());
  track({ name: 'theme', props: { mode: next } });
  const sky = document.querySelector<HTMLElement>('[data-sky]');
  const disc = sky?.querySelector<HTMLElement>('[data-sky-disc]');
  if (reducedMotion() || !sky || !disc || typeof disc.animate !== 'function') {
    applyMode(next);
    return;
  }
  if (sweeping) return;
  sweeping = true;

  const origin =
    from ??
    [...document.querySelectorAll('[data-theme-toggle]')].find((t) => t.getClientRects().length) ??
    document.body;
  const r = origin.getBoundingClientRect();
  const { size, left, top } = skyDisc(
    r.left + r.width / 2,
    r.top + r.height / 2,
    innerWidth,
    innerHeight,
  );
  Object.assign(disc.style, {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}px`,
    top: `${top}px`,
  });
  sky.dataset.sky = next;

  disc
    .animate([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], {
      duration: SKY_SWEEP_MS,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards',
    })
    .finished.then(() => {
      root().classList.add('theme-switching');
      applyMode(next);
      void document.body.offsetWidth;
      root().classList.remove('theme-switching');
      return disc.animate(
        [
          { transform: 'scale(1)', opacity: 1 },
          { transform: 'scale(1)', opacity: 0 },
        ],
        { duration: SKY_SWEEP_MS, easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)', fill: 'forwards' },
      ).finished;
    })
    .catch(() => applyMode(next))
    .finally(() => {
      disc.getAnimations().forEach((a) => a.cancel());
      sky.dataset.sky = 'idle';
      sweeping = false;
    });
}
