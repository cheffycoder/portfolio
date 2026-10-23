import Link from 'next/link';

import { GlobalNav } from '@/components/layout/global-nav/global-nav.view';
import { JumbleText } from '@/components/motion/jumble-text/jumble-text.view';
import { revealStyles } from '@/components/motion/reveal/reveal.styles';
import { Screen } from '@/components/screens/screen/screen.view';
import { screenFootStyles } from '@/components/screens/screen-foot/screen-foot.styles';
import { Colophon, ScreenFoot } from '@/components/screens/screen-foot/screen-foot.view';
import { buttonStyles } from '@/components/ui/button/button.styles';
import { Icon } from '@/components/ui/icon/icon.view';
import { writing } from '@/config/profile/profile.constants';
import { routes } from '@/config/site/site.constants';
import { cn } from '@/utils/cn/cn.helpers';

import { articlesSoonStyles as s } from './articles-soon.styles';

/** The articles page until the first article ships: one screen saying so, with the way back. */
export function ArticlesSoon() {
  return (
    <Screen
      id="articles"
      as="main"
      labelledBy="articles-title"
      navSpace="top"
      align="center"
      header={<GlobalNav page="articles" />}
      foot={
        <ScreenFoot
          start={
            <Link className={screenFootStyles.link()} href={routes.home}>
              <Icon name="arrow-up" size={12} />
              Home
            </Link>
          }
          middle="Articles"
          end={<Colophon />}
        />
      }
    >
      <div className={s.block()}>
        <p className={cn(s.label(), revealStyles.root())}>{writing.title}</p>
        <JumbleText
          as="h1"
          id="articles-title"
          text={writing.heading}
          headingClassName={cn(s.heading(), revealStyles.root({ step: 1 }))}
        />
        <Link
          className={cn(buttonStyles.textLink(), revealStyles.root({ step: 2 }))}
          href={routes.home}
        >
          {writing.backLink}{' '}
          <Icon name="arrow-right" size={13} className={buttonStyles.textLinkIcon()} />
        </Link>
      </div>
    </Screen>
  );
}
