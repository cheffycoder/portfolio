import { skipLinkStyles } from './skip-link.styles';
import type { SkipLinkProps } from './skip-link.types';

/** First stop for keyboard users: jumps past the navigation. */
export function SkipLink({ href }: SkipLinkProps) {
  return (
    <a className={skipLinkStyles.root()} href={href}>
      Skip to content
    </a>
  );
}
