'use client';

import Link from 'next/link';

import { screenNumber } from '@/components/screens/screen-deck/screen-deck.helpers';
import { useScreenDeck } from '@/components/screens/screen-deck/screen-deck.hooks';
import { ThemeToggle } from '@/components/theme/theme-toggle/theme-toggle.view';
import { buttonStyles } from '@/components/ui/button/button.styles';
import { Icon } from '@/components/ui/icon/icon.view';
import { routes, site } from '@/config/site/site.constants';
import { cn } from '@/utils/cn/cn.helpers';

import { useExploreMenu } from './local-nav.hooks';
import { localNavStyles } from './local-nav.styles';

/**
 * The floating nav for screens 2…n: name, position (wide screens), Articles, an Explore menu of every screen
 * (below large), Get in touch and the theme switch.
 */
export function LocalNav() {
  const { screens, active } = useScreenDeck();
  const visible = active > 0;
  const { open, setOpen } = useExploreMenu(visible);
  const current = screens[active];
  const first = screens[0];

  return (
    <>
      <div
        className={localNavStyles.scrim()}
        data-open={open ? '' : undefined}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <nav
        className={localNavStyles.root()}
        data-visible={visible ? '' : undefined}
        aria-label="Sections"
        onClick={(e) => {
          if ((e.target as Element).closest('a')) setOpen(false);
        }}
      >
        <div className={localNavStyles.bar()}>
          <a className={localNavStyles.title()} href={`#${first?.id ?? ''}`}>
            {site.name}
          </a>
          <span className={localNavStyles.now()} aria-live="polite">
            {current ? (
              <>
                <b className={localNavStyles.nowNumber()}>{screenNumber(active)}</b> /{' '}
                {String(screens.length).padStart(2, '0')} · {current.label}
              </>
            ) : null}
          </span>
          <span className={localNavStyles.spacer()} />
          <div className={localNavStyles.links()}>
            <Link
              className={cn(buttonStyles.outLink(), localNavStyles.link())}
              href={routes.articles}
              aria-label="Articles (opens a new page)"
            >
              Articles
              <Icon name="ne" size={11} className={buttonStyles.outLinkIcon()} />
            </Link>
          </div>
          <button
            type="button"
            className={cn(
              buttonStyles.root({ tone: 'ghost', size: 'sm' }),
              localNavStyles.explore(),
            )}
            aria-expanded={open}
            aria-controls="localnav-menu"
            onClick={() => setOpen(!open)}
          >
            Explore <Icon name="down" size={10} className={localNavStyles.exploreIcon({ open })} />
          </button>
          <a
            className={cn(
              buttonStyles.root({ tone: 'soft', size: 'sm' }),
              localNavStyles.contact(),
            )}
            href="#contact"
          >
            Get in touch
          </a>
          <ThemeToggle compact />
        </div>
        <div className={localNavStyles.menu({ open })} id="localnav-menu">
          <div className={localNavStyles.menuInner()}>
            <ul className={localNavStyles.menuList()}>
              {screens.slice(1).map((s, i) => (
                <li key={s.id}>
                  <a
                    className={localNavStyles.menuLink()}
                    href={`#${s.id}`}
                    tabIndex={open ? 0 : -1}
                  >
                    {s.label}
                    <span className={localNavStyles.menuMeta()}>{screenNumber(i + 1)}</span>
                  </a>
                </li>
              ))}
              <li>
                <Link
                  className={localNavStyles.menuLink()}
                  href={routes.articles}
                  tabIndex={open ? 0 : -1}
                >
                  Articles
                  <span className={localNavStyles.menuMeta()}>Soon</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
