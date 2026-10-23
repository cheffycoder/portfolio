import { describe, expect, it } from 'vitest';

import {
  cityFromZone,
  dayPercent,
  describeDiff,
  formatSpan,
  minutesOfDay,
  msToNextMinute,
} from './time-bar.helpers';

describe('time bar', () => {
  it('finds the minute of the day in a zone, wrapping past midnight', () => {
    const date = new Date(Date.UTC(2026, 9, 23, 20, 0));
    expect(minutesOfDay(date, 330)).toBe(90); // 01:30 next day in Mumbai
    expect(minutesOfDay(date, -300)).toBe(15 * 60); // 15:00 in New York (EST)
    expect(minutesOfDay(new Date(Date.UTC(2026, 0, 1, 0, 10)), -60)).toBe(23 * 60 + 10);
  });

  it('places times on the strip', () => {
    expect(dayPercent(0)).toBe(0);
    expect(dayPercent(720)).toBe(50);
  });

  it('says how far apart the visitor is', () => {
    expect(formatSpan(330)).toBe('5h 30m');
    expect(formatSpan(-60)).toBe('1h');
    expect(formatSpan(45)).toBe('45m');
    expect(describeDiff(-570)).toBe('9h 30m behind me');
    expect(describeDiff(210)).toBe('3h 30m ahead of me');
    expect(describeDiff(0)).toBe('');
  });

  it('names the city from the time zone', () => {
    expect(cityFromZone('America/New_York')).toBe('New York');
    expect(cityFromZone('UTC')).toBe('UTC');
  });

  it('waits for the next whole minute', () => {
    expect(msToNextMinute(120_000)).toBe(60_000);
    expect(msToNextMinute(125_500)).toBe(54_500);
  });
});
