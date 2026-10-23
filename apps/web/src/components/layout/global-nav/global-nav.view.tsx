'use client';

import Link from 'next/link';

import { ThemeToggle } from '@/components/theme/theme-toggle/theme-toggle.view';
import { buttonStyles } from '@/components/ui/button/button.styles';
import { Icon } from '@/components/ui/icon/icon.view';
import { routes, site } from '@/config/site/site.constants';
import { cn } from '@/utils/cn/cn.helpers';

import { FlyoutMenu } from './flyout-menu/flyout-menu.view';
import { navLinks } from './global-nav.helpers';
import { useFlyout } from './global-nav.hooks';
import { globalNavStyles } from './global-nav.styles';
import type { GlobalNavProps } from './global-nav.types';

/** Monogram, Articles, Get in touch and the theme switch; below 834px the links move into a full-screen menu. */
export function GlobalNav({ page }: GlobalNavProps) {
  const { open, setOpen, toggle } = useFlyout();
  const [articles, contact] = navLinks(page);
  const markLabel = `${site.initials}, ${site.name}, home`;

  return (
    <header className={globalNavStyles.root()}>
      <nav className={globalNavStyles.inner()} aria-label="Global">
        {page === 'home' ? (
          <a className={globalNavStyles.mark()} href="#intro" aria-label={markLabel}>
            {site.initials}
          </a>
        ) : (
          <Link className={globalNavStyles.mark()} href={routes.home} aria-label={markLabel}>
            {site.initials}
          </Link>
        )}
        <ul className={globalNavStyles.list()}>
          {articles ? (
            <li>
              <Link
                className={cn(globalNavStyles.link(), articles.out && buttonStyles.outLink())}
                href={articles.href}
                aria-label={articles.ariaLabel}
                aria-current={articles.current ? 'page' : undefined}
              >
                {articles.label}
                {articles.out ? (
                  <Icon name="ne" size={11} className={buttonStyles.outLinkIcon()} />
                ) : null}
              </Link>
            </li>
          ) : null}
          {contact ? (
            <li>
              <Link
                className={cn(
                  globalNavStyles.link(),
                  buttonStyles.root({ tone: 'soft', size: 'sm' }),
                )}
                href={contact.href}
                aria-label={contact.ariaLabel}
              >
                {contact.label}
                {contact.out ? <Icon name="ne" size={14} /> : null}
              </Link>
            </li>
          ) : null}
        </ul>
        <div className={globalNavStyles.actions()}>
          <ThemeToggle />
          <button
            ref={toggle}
            type="button"
            className={cn(buttonStyles.icon(), globalNavStyles.menuToggle())}
            aria-expanded={open}
            aria-controls="flyout"
            aria-label={open ? 'Close menu' : 'Menu'}
            onClick={() => setOpen(!open)}
          >
            <span className={globalNavStyles.bars()} aria-hidden="true">
              <span className={globalNavStyles.bar({ position: 'top', open })} />
              <span className={globalNavStyles.bar({ position: 'bottom', open })} />
            </span>
          </button>
        </div>
      </nav>
      <FlyoutMenu open={open} links={navLinks(page)} onClose={() => setOpen(false)} />
    </header>
  );
}
