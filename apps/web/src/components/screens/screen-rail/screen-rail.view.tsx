'use client';

import { screenNumber, stepIndex } from '@/components/screens/screen-deck/screen-deck.helpers';
import { useScreenDeck } from '@/components/screens/screen-deck/screen-deck.hooks';
import { Icon } from '@/components/ui/icon/icon.view';

import { screenRailStyles } from './screen-rail.styles';

/** Previous / next screen and a dot per screen, from the second screen on. Arrows grey out at either end. */
export function ScreenRail() {
  const { screens, active, goTo } = useScreenDeck();
  const prev = screens[active - 1];
  const next = screens[active + 1];
  return (
    <nav
      className={screenRailStyles.root()}
      aria-label="Screens"
      data-visible={active > 0 ? '' : undefined}
    >
      <button
        type="button"
        className={screenRailStyles.step()}
        disabled={!prev}
        aria-label={prev ? `Previous screen: ${prev.label}` : 'Previous screen'}
        onClick={() => goTo(stepIndex(active, -1, screens.length))}
      >
        <Icon name="up" size={13} />
      </button>
      <ol className={screenRailStyles.list()}>
        {screens.map((s, i) => (
          <li key={s.id}>
            <a
              className={screenRailStyles.dot()}
              href={`#${s.id}`}
              aria-label={`${screenNumber(i)} ${s.label}`}
              aria-current={i === active ? 'true' : 'false'}
            >
              <span className={screenRailStyles.tip()} aria-hidden="true">
                {screenNumber(i)} {s.label}
              </span>
            </a>
          </li>
        ))}
      </ol>
      <button
        type="button"
        className={screenRailStyles.step()}
        disabled={!next}
        aria-label={next ? `Next screen: ${next.label}` : 'Next screen'}
        onClick={() => goTo(stepIndex(active, 1, screens.length))}
      >
        <Icon name="down" size={13} />
      </button>
    </nav>
  );
}
