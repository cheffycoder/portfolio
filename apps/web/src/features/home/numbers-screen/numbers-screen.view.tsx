'use client';

import { revealStyles } from '@/components/motion/reveal/reveal.styles';
import { Screen } from '@/components/screens/screen/screen.view';
import { screenHeadStyles } from '@/components/screens/screen-head/screen-head.styles';
import { ScreenLabel } from '@/components/screens/screen-head/screen-head.view';
import { Segmented } from '@/components/ui/segmented/segmented.view';
import { highlights } from '@/config/profile/profile.constants';
import { HighlightTile } from '@/features/home/highlight-tile/highlight-tile.view';
import type { HomeScreenProps } from '@/features/home/home-screen/home-screen.types';
import { cn } from '@/utils/cn/cn.helpers';

import { COMPANY_FILTER } from './numbers-screen.constants';
import { useCompanyFilter } from './numbers-screen.hooks';
import { numbersScreenStyles as s } from './numbers-screen.styles';

/** 03 · Highlights: six results, three per company, with a filter to show one company's. */
export function NumbersScreen({ id }: HomeScreenProps) {
  const { index, setIndex, company } = useCompanyFilter();
  return (
    <Screen id={id} labelledBy="nb-title">
      <div className={screenHeadStyles.root()}>
        <p className={cn(s.label(), revealStyles.root())}>
          <ScreenLabel screenId={id} title={highlights.title} />
        </p>
        <h2 className={cn(s.heading(), revealStyles.root({ step: 1 }))} id="nb-title">
          {highlights.heading}
        </h2>
      </div>
      <div className={cn(s.grid(), revealStyles.root({ step: 2 }))}>
        {highlights.items.map((item, i) => (
          <HighlightTile
            key={item.title}
            highlight={item}
            dimmed={company !== 'all' && company !== item.company}
            screenId={id}
            order={i}
          />
        ))}
      </div>
      <div className={cn(screenHeadStyles.toggleRow(), revealStyles.root({ step: 3 }))}>
        <Segmented
          label={highlights.filterLabel}
          options={COMPANY_FILTER}
          index={index}
          onPick={setIndex}
        />
      </div>
    </Screen>
  );
}
