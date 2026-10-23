'use client';

import { buttonStyles } from '@/components/ui/button/button.styles';
import { Icon } from '@/components/ui/icon/icon.view';
import { cn } from '@/utils/cn/cn.helpers';

import { useRollingPhrase } from './open-to.hooks';
import { openToStyles } from './open-to.styles';
import type { OpenToProps } from './open-to.types';

/** "Open to [rolling phrase] | Say hello ↓": scrolls to the contact screen. */
export function OpenTo({ leadIn, phrases, action, href }: OpenToProps) {
  const index = useRollingPhrase(phrases.length);
  return (
    <a className={cn(buttonStyles.root(), openToStyles.root())} href={href}>
      <span className={openToStyles.leadIn()}>{leadIn}</span>
      <span className={openToStyles.spoken()}>{` ${phrases.join(', ')}.`}</span>
      <span className={openToStyles.window()} aria-hidden="true">
        <span
          className={openToStyles.track()}
          style={{ transform: `translateY(${index * -1.5}em)` }}
        >
          {phrases.map((phrase) => (
            <span key={phrase} className={openToStyles.phrase()}>
              {phrase}
            </span>
          ))}
        </span>
      </span>
      <span className={openToStyles.go()}>
        <span className={openToStyles.goLabel()}>{action}</span>
        <Icon name="arrow-down" size={13} className={openToStyles.goIcon()} />
      </span>
    </a>
  );
}
