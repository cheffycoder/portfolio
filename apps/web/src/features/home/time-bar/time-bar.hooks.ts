'use client';

import { useEffect, useState } from 'react';

import { site } from '@/config/site/site.constants';

import { HOME_OFFSET_MINUTES } from './time-bar.constants';
import {
  cityFromZone,
  dayPercent,
  describeDiff,
  minutesOfDay,
  msToNextMinute,
} from './time-bar.helpers';
import type { ClockState } from './time-bar.types';

const formatter = (timeZone?: string) =>
  new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    ...(timeZone ? { timeZone } : {}),
  });

/** Both clocks, updated on every whole minute. Null until the browser knows the visitor's zone. */
export function useClocks(): ClockState | null {
  const [state, setState] = useState<ClockState | null>(null);

  useEffect(() => {
    const home = formatter(site.location.timeZone);
    const local = formatter();
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const city = cityFromZone(zone);
    const tick = () => {
      const now = new Date();
      const offset = -now.getTimezoneOffset();
      const diff = offset - HOME_OFFSET_MINUTES;
      setState({
        home: home.format(now),
        local: local.format(now),
        homePercent: dayPercent(minutesOfDay(now, HOME_OFFSET_MINUTES)),
        localPercent: dayPercent(minutesOfDay(now, offset)),
        same: diff === 0,
        youLabel: city ? `You, in ${city}` : 'Your time',
        youDiff: describeDiff(diff),
      });
    };
    tick();
    let interval: ReturnType<typeof setInterval> | undefined;
    const align = setTimeout(() => {
      tick();
      interval = setInterval(tick, 60_000);
    }, msToNextMinute(Date.now()));
    return () => {
      clearTimeout(align);
      clearInterval(interval);
    };
  }, []);

  return state;
}
