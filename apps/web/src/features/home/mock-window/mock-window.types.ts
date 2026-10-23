import type { CSSProperties, ReactNode } from 'react';

export type MockWindowProps = {
  title: string;
  /** Right side of the title bar. */
  aside: ReactNode;
  /** Describes the whole window as one picture for screen readers. */
  label?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};
