import type { ReactNode } from 'react';

export type ScreenFootProps = {
  start?: ReactNode;
  middle?: ReactNode;
  end?: ReactNode;
};

export type ScreenFootLinkProps = {
  href: string;
  label: string;
  direction: 'up' | 'down';
};
