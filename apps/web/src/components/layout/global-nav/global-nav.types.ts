/** home: links scroll within the page; articles: Articles is current; other: every link leaves. */
export type NavPage = 'home' | 'articles' | 'other';

export type GlobalNavProps = {
  /** Which page carries the nav: links that point at the page itself become in-page or current. */
  page: NavPage;
};

export type NavLink = {
  label: string;
  href: string;
  /** Leaves the page (shows ↗). */
  out: boolean;
  /** The page you are on. */
  current: boolean;
  ariaLabel?: string;
};

export type FlyoutMenuProps = {
  open: boolean;
  links: readonly NavLink[];
  onClose: () => void;
};
