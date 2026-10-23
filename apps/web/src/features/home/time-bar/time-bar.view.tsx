'use client';

import { Icon } from '@/components/ui/icon/icon.view';
import { site } from '@/config/site/site.constants';
import { cn } from '@/utils/cn/cn.helpers';

import { useClocks } from './time-bar.hooks';
import { timeBarStyles } from './time-bar.styles';
import type { TimeBarProps } from './time-bar.types';

/** My time and the visitor's, side by side, and where each falls in a day (night · day · night). */
export function TimeBar({ className }: TimeBarProps) {
  const clocks = useClocks();
  const same = clocks?.same ?? false;
  return (
    <div className={cn(timeBarStyles.root(), className)}>
      <div className={timeBarStyles.top()}>
        <p className={timeBarStyles.place({ side: 'home' })}>
          <b className={timeBarStyles.time()}>{clocks?.home ?? '--:--'}</b>
          <span className={timeBarStyles.where()}>
            {site.location.city}, {site.location.country}
            <span className={timeBarStyles.sub()}>{site.location.coordinates}</span>
          </span>
        </p>
        <p className={timeBarStyles.place({ side: 'you', hidden: same })}>
          <b className={timeBarStyles.time()}>{clocks?.local ?? '--:--'}</b>
          <span className={timeBarStyles.where()}>
            <span>{clocks && !same ? clocks.youLabel : 'Your time'}</span>
            <span className={timeBarStyles.sub()}>{clocks?.youDiff}</span>
          </span>
        </p>
        <p className={timeBarStyles.same({ shown: same })}>Same time as you</p>
      </div>
      <div className={timeBarStyles.strip()} aria-hidden="true">
        <span className={timeBarStyles.day()} />
        <Icon name="moon" size={11} className={timeBarStyles.sky({ at: 'start' })} />
        <Icon name="sun" size={11} className={timeBarStyles.sky({ at: 'middle' })} />
        <Icon name="moon" size={11} className={timeBarStyles.sky({ at: 'end' })} />
        <span
          className={timeBarStyles.mark({ who: 'you', hidden: same })}
          style={{ left: `${clocks?.localPercent ?? 0}%` }}
        >
          <span className={timeBarStyles.tag()}>You</span>
        </span>
        <span
          className={timeBarStyles.mark({ who: 'home' })}
          style={{ left: `${clocks?.homePercent ?? 0}%` }}
        >
          <span className={timeBarStyles.tag()}>Me</span>
        </span>
      </div>
    </div>
  );
}
