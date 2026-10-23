'use client';

import { useScreenState } from '@/components/screens/screen-deck/screen-deck.hooks';

import { iso } from './devices-art.helpers';
import { devicesArtStyles as s } from './devices-art.styles';
import type { DevicesArtProps } from './devices-art.types';

/** A browser and a phone, taken apart layer by layer while their screen is active, put back together after. */
export function DevicesArt({ screenId }: DevicesArtProps) {
  const { active } = useScreenState(screenId);
  return (
    <div className={s.root()} data-exploded={active ? '' : undefined} aria-hidden="true">
      <svg className={s.svg()} viewBox="60 20 680 560" fill="none">
        <defs>
          <linearGradient id="pf-warm" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF6B2C" />
            <stop offset=".6" stopColor="#E0245E" />
            <stop offset="1" stopColor="#8E1B5A" />
          </linearGradient>
          <linearGradient id="pf-cool" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#33C3FF" />
            <stop offset=".6" stopColor="#2563EB" />
            <stop offset="1" stopColor="#1E3A8A" />
          </linearGradient>
        </defs>
        <path className={s.guide()} d="M250 150V330M475 280V460M103 235V415M328 365V545" />
        <path className={s.guide()} d="M600 60V280M678 105V325M444 150V370M522 195V415" />

        {/* Browser: base, cards, hero, nav */}
        <g className={s.layer({ depth: 0 })}>
          <g transform={iso(250, 330)}>
            <rect className={s.plane()} width="260" height="170" rx="12" />
            <rect className={s.soft()} x="14" y="14" width="232" height="142" rx="8" />
          </g>
        </g>
        <g className={s.layer({ depth: 1, lift: 60 })}>
          <g transform={iso(250, 270)}>
            <rect className={s.plane()} width="260" height="170" rx="12" fillOpacity=".9" />
            <rect className={s.soft()} x="18" y="84" width="66" height="56" rx="7" />
            <rect className={s.soft()} x="97" y="84" width="66" height="56" rx="7" />
            <rect className={s.soft()} x="176" y="84" width="66" height="56" rx="7" />
            <rect className={s.line()} x="18" y="150" width="120" height="7" rx="3.5" />
          </g>
        </g>
        <g className={s.layer({ depth: 2, lift: 120 })}>
          <g transform={iso(250, 210)}>
            <rect className={s.plane()} width="260" height="170" rx="12" fillOpacity=".9" />
            <rect
              className={s.hot()}
              x="18"
              y="18"
              width="224"
              height="52"
              rx="9"
              fill="url(#pf-cool)"
            />
            <rect className={s.line()} x="18" y="84" width="150" height="7" rx="3.5" />
            <rect className={s.line()} x="18" y="100" width="100" height="7" rx="3.5" />
          </g>
        </g>
        <g className={s.layer({ depth: 3, lift: 180 })}>
          <g transform={iso(250, 150)}>
            <rect className={s.plane()} width="260" height="170" rx="12" fillOpacity=".9" />
            <rect className={s.line()} x="18" y="14" width="44" height="10" rx="5" />
            <rect className={s.line()} x="150" y="14" width="30" height="10" rx="5" />
            <rect
              className={s.hot()}
              x="188"
              y="12"
              width="54"
              height="14"
              rx="7"
              fill="url(#pf-warm)"
            />
          </g>
        </g>

        {/* Phone: back, board and battery, display, UI, glass */}
        <g className={s.layer({ depth: 1 })}>
          <g transform={iso(600, 280)}>
            <rect className={s.plane()} width="90" height="180" rx="16" />
            <circle className={s.line()} cx="20" cy="20" r="8" />
            <circle className={s.line()} cx="20" cy="40" r="8" />
            <circle className={s.line()} cx="38" cy="30" r="3" />
          </g>
        </g>
        <g className={s.layer({ depth: 2, lift: 55 })}>
          <g transform={iso(600, 225)}>
            <rect className={s.plane()} width="90" height="180" rx="16" fillOpacity=".9" />
            <rect className={s.soft()} x="8" y="10" width="74" height="50" rx="6" />
            <rect className={s.line()} x="16" y="18" width="18" height="14" rx="2" />
            <rect className={s.line()} x="42" y="18" width="30" height="8" rx="2" />
            <rect className={s.soft()} x="14" y="70" width="62" height="96" rx="8" />
            <path className={s.line()} d="M45 108v20M35 118h20" />
          </g>
        </g>
        <g className={s.layer({ depth: 3, lift: 110 })}>
          <g transform={iso(600, 170)}>
            <rect className={s.plane()} width="90" height="180" rx="16" fillOpacity=".9" />
            <rect className={s.line()} x="6" y="6" width="78" height="168" rx="12" />
            <g className={s.soft()}>
              <rect x="14" y="20" width="14" height="14" rx="4" />
              <rect x="38" y="20" width="14" height="14" rx="4" />
              <rect x="62" y="20" width="14" height="14" rx="4" />
              <rect x="14" y="44" width="14" height="14" rx="4" />
              <rect x="38" y="44" width="14" height="14" rx="4" />
              <rect x="62" y="44" width="14" height="14" rx="4" />
            </g>
          </g>
        </g>
        <g className={s.layer({ depth: 4, lift: 165 })}>
          <g transform={iso(600, 115)}>
            <rect className={s.plane()} width="90" height="180" rx="16" fillOpacity=".9" />
            <rect
              className={s.hot()}
              x="12"
              y="26"
              width="66"
              height="42"
              rx="7"
              fill="url(#pf-warm)"
            />
            <rect className={s.line()} x="12" y="80" width="50" height="6" rx="3" />
            <rect className={s.line()} x="12" y="94" width="66" height="6" rx="3" />
            <rect className={s.line()} x="12" y="108" width="40" height="6" rx="3" />
          </g>
        </g>
        <g className={s.layer({ depth: 5, lift: 220 })}>
          <g transform={iso(600, 60)}>
            <rect className={s.plane()} width="90" height="180" rx="16" fillOpacity=".35" />
            <rect className={s.line()} x="33" y="7" width="24" height="6" rx="3" />
          </g>
        </g>
      </svg>
    </div>
  );
}
