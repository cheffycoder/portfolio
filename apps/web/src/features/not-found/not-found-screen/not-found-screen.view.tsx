import Link from 'next/link';

import { GlobalNav } from '@/components/layout/global-nav/global-nav.view';
import { revealStyles } from '@/components/motion/reveal/reveal.styles';
import { Screen } from '@/components/screens/screen/screen.view';
import { screenFootStyles } from '@/components/screens/screen-foot/screen-foot.styles';
import { Colophon, ScreenFoot } from '@/components/screens/screen-foot/screen-foot.view';
import { buttonStyles } from '@/components/ui/button/button.styles';
import { Icon } from '@/components/ui/icon/icon.view';
import { routes } from '@/config/site/site.constants';
import { cn } from '@/utils/cn/cn.helpers';

import { notFoundScreenStyles as s } from './not-found-screen.styles';

/** Any address that isn't a page: say so plainly and offer the way home. */
export function NotFoundScreen() {
  return (
    <Screen
      id="not-found"
      as="main"
      labelledBy="not-found-title"
      navSpace="top"
      align="center"
      header={<GlobalNav page="other" />}
      foot={
        <ScreenFoot
          start={
            <Link className={screenFootStyles.link()} href={routes.home}>
              <Icon name="arrow-up" size={12} />
              Home
            </Link>
          }
          middle="404"
          end={<Colophon />}
        />
      }
    >
      <div className={s.block()}>
        <p className={cn(s.label(), revealStyles.root())}>Error 404</p>
        <h1 className={cn(s.heading(), revealStyles.root({ step: 1 }))} id="not-found-title">
          Nothing here.
        </h1>
        <p className={cn(s.lead(), revealStyles.root({ step: 2 }))}>
          This page doesn&apos;t exist, or it moved. Everything is on the home page.
        </p>
        <Link
          className={cn(buttonStyles.textLink(), revealStyles.root({ step: 3 }))}
          href={routes.home}
        >
          Back to the portfolio{' '}
          <Icon name="arrow-right" size={13} className={buttonStyles.textLinkIcon()} />
        </Link>
      </div>
    </Screen>
  );
}
