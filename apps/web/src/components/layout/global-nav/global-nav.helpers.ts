import { routes } from '@/config/site/site.constants';

import type { NavLink, NavPage } from './global-nav.types';

/** Articles and Get in touch, as seen from `page`. */
export function navLinks(page: NavPage): NavLink[] {
  const onHome = page === 'home';
  const onArticles = page === 'articles';
  return [
    {
      label: 'Articles',
      href: routes.articles,
      out: !onArticles,
      current: onArticles,
      ariaLabel: onArticles ? undefined : 'Articles (opens a new page)',
    },
    {
      label: 'Get in touch',
      href: onHome ? '#contact' : routes.contact,
      out: !onHome,
      current: false,
      ariaLabel: onHome ? undefined : 'Get in touch (opens the home page)',
    },
  ];
}
