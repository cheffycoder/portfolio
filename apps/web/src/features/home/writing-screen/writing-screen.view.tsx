import Link from 'next/link';

import { JumbleText } from '@/components/motion/jumble-text/jumble-text.view';
import { revealStyles } from '@/components/motion/reveal/reveal.styles';
import { Screen } from '@/components/screens/screen/screen.view';
import { ScreenLabel } from '@/components/screens/screen-head/screen-head.view';
import { buttonStyles } from '@/components/ui/button/button.styles';
import { Icon } from '@/components/ui/icon/icon.view';
import { writing } from '@/config/profile/profile.constants';
import { routes } from '@/config/site/site.constants';
import type { HomeScreenProps } from '@/features/home/home-screen/home-screen.types';
import { cn } from '@/utils/cn/cn.helpers';

import { writingScreenStyles as s } from './writing-screen.styles';

/** 10 · Writing: articles are on their way. */
export function WritingScreen({ id }: HomeScreenProps) {
  return (
    <Screen id={id} labelledBy="wr-title">
      <div className={s.block()}>
        <p className={cn(s.label(), revealStyles.root())}>
          <ScreenLabel screenId={id} title={writing.title} />
        </p>
        <JumbleText
          as="h2"
          id="wr-title"
          text={writing.heading}
          headingClassName={cn(s.heading(), revealStyles.root({ step: 1 }))}
        />
        <Link
          className={cn(buttonStyles.textLink(), revealStyles.root({ step: 3 }))}
          href={routes.articles}
        >
          {writing.homeLink}{' '}
          <Icon name="arrow-right" size={13} className={buttonStyles.textLinkIcon()} />
        </Link>
      </div>
    </Screen>
  );
}
