import { MINUTES_PER_DAY } from './time-bar.constants';

/** Minutes since midnight in a zone `offset` minutes east of UTC. */
export const minutesOfDay = (date: Date, offset: number): number =>
  (((date.getUTCHours() * 60 + date.getUTCMinutes() + offset) % MINUTES_PER_DAY) +
    MINUTES_PER_DAY) %
  MINUTES_PER_DAY;

/** Position on a 24-hour strip, 0–100. */
export const dayPercent = (minutes: number): number => (minutes / MINUTES_PER_DAY) * 100;

/** 330 → "5h 30m", 60 → "1h", 30 → "30m" (sign ignored). */
export function formatSpan(minutes: number): string {
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return [h ? `${h}h` : '', m ? `${m}m` : ''].filter(Boolean).join(' ');
}

/** "5h 30m behind me" / "2h ahead of me"; empty when the times match. */
export const describeDiff = (diff: number): string =>
  diff === 0 ? '' : `${formatSpan(diff)} ${diff < 0 ? 'behind' : 'ahead of'} me`;

/** "America/New_York" → "New York". */
export const cityFromZone = (zone: string): string =>
  (zone.split('/').pop() ?? '').replace(/_/g, ' ');

/** Milliseconds until the next whole minute. */
export const msToNextMinute = (now: number): number => 60_000 - (now % 60_000);
