import { Icon } from '@/components/ui/icon/icon.view';
import { site } from '@/config/site/site.constants';

import { screenFootStyles } from './screen-foot.styles';
import type { ScreenFootLinkProps, ScreenFootProps } from './screen-foot.types';

/** The line under every screen: previous on the left, position in the middle, next (or colophon) on the right. */
export function ScreenFoot({ start, middle, end }: ScreenFootProps) {
  return (
    <div className={screenFootStyles.root()}>
      <div className={screenFootStyles.start()}>{start}</div>
      <span className={screenFootStyles.count()}>{middle}</span>
      <div className={screenFootStyles.end()}>{end}</div>
    </div>
  );
}

/** "↑ Previous: About" / "Next: Numbers ↓", with an arrow that nudges in its direction. */
export function ScreenFootLink({ href, label, direction }: ScreenFootLinkProps) {
  const icon = (
    <Icon
      name={direction === 'up' ? 'arrow-up' : 'arrow-down'}
      size={12}
      className={screenFootStyles.nudge({ direction })}
    />
  );
  return (
    <a className={screenFootStyles.link()} href={href}>
      {direction === 'up' ? icon : null}
      <span className={screenFootStyles.word()}>
        {direction === 'up' ? 'Previous: ' : 'Next: '}
      </span>
      {label}
      {direction === 'down' ? icon : null}
    </a>
  );
}

/** "© 2026 · Built with love" (the tail drops on phones), on the last screen and single pages. */
export function Colophon() {
  return (
    <>
      {site.copyright}
      <span className={screenFootStyles.word()}> · {site.colophon}</span>
    </>
  );
}
