import { revealStyles } from '@/components/motion/reveal/reveal.styles';
import { Screen } from '@/components/screens/screen/screen.view';
import { screenHeadStyles } from '@/components/screens/screen-head/screen-head.styles';
import { ScreenLabel } from '@/components/screens/screen-head/screen-head.view';
import { RichText } from '@/components/ui/rich-text/rich-text.view';
import { about } from '@/config/profile/profile.constants';
import type { HomeScreenProps } from '@/features/home/home-screen/home-screen.types';
import { cn } from '@/utils/cn/cn.helpers';

import { aboutScreenStyles as s } from './about-screen.styles';

/** 02 · About: one statement, what I'm looking for, and three facts. */
export function AboutScreen({ id }: HomeScreenProps) {
  return (
    <Screen
      id={id}
      labelledBy="about-title"
      background={
        <div className={s.dotsFade()}>
          <div className={s.dots()} />
        </div>
      }
    >
      <div className={screenHeadStyles.root({ row: true })}>
        <h2 className={cn(s.title(), revealStyles.root())} id="about-title">
          <ScreenLabel screenId={id} title={about.title} />
        </h2>
      </div>
      <p className={cn(s.statement(), revealStyles.root({ step: 1 }))}>
        <RichText value={about.statement} />
      </p>
      <p className={cn(s.lead(), revealStyles.root({ step: 2 }))}>{about.lead}</p>
      <dl className={cn(s.facts(), revealStyles.root({ step: 3 }))}>
        {about.facts.map((fact) => (
          <div key={fact.label} className={s.fact()}>
            <dt className={s.factLabel()}>{fact.label}</dt>
            <dd className={s.factValue()}>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </Screen>
  );
}
