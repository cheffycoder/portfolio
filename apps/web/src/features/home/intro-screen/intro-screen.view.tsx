import { GlobalNav } from '@/components/layout/global-nav/global-nav.view';
import { revealStyles } from '@/components/motion/reveal/reveal.styles';
import { Screen } from '@/components/screens/screen/screen.view';
import { RichText } from '@/components/ui/rich-text/rich-text.view';
import { intro } from '@/config/profile/profile.constants';
import type { HomeScreenProps } from '@/features/home/home-screen/home-screen.types';
import { OpenTo } from '@/features/home/open-to/open-to.view';
import { TimeBar } from '@/features/home/time-bar/time-bar.view';
import { cn } from '@/utils/cn/cn.helpers';

import { introScreenStyles as s } from './intro-screen.styles';

/** 01 · Intro: the global nav, both clocks, who and what, and the "Open to …" call to action. */
export function IntroScreen({ id }: HomeScreenProps) {
  return (
    <Screen id={id} labelledBy="hero-title" navSpace="top" header={<GlobalNav page="home" />}>
      <TimeBar className={revealStyles.root()} />
      <div className={s.copy()}>
        <p className={cn(s.eyebrow(), revealStyles.root({ step: 1 }))}>{intro.eyebrow}</p>
        <h1 className={cn(s.heading(), revealStyles.root({ step: 2 }))} id="hero-title">
          {intro.heading.before}
          <b>{intro.heading.emphasis}</b>
          {intro.heading.after}
        </h1>
        <p className={cn(s.lead(), revealStyles.root({ step: 3 }))}>
          <RichText value={intro.lead} />
        </p>
        <div className={cn(s.actions(), revealStyles.root({ step: 4 }))}>
          <OpenTo
            leadIn={intro.openTo.leadIn}
            phrases={intro.openTo.phrases}
            action={intro.openTo.action}
            href="#contact"
          />
        </div>
      </div>
    </Screen>
  );
}
