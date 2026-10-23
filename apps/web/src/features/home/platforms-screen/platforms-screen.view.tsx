import { revealStyles } from '@/components/motion/reveal/reveal.styles';
import { Screen } from '@/components/screens/screen/screen.view';
import { ScreenLabel } from '@/components/screens/screen-head/screen-head.view';
import { chipStyles } from '@/components/ui/chip/chip.styles';
import { RichText } from '@/components/ui/rich-text/rich-text.view';
import { platforms } from '@/config/profile/profile.constants';
import { DevicesArt } from '@/features/home/devices-art/devices-art.view';
import type { HomeScreenProps } from '@/features/home/home-screen/home-screen.types';
import { cn } from '@/utils/cn/cn.helpers';

import { platformsScreenStyles as s } from './platforms-screen.styles';

/** 06 · Web and mobile: one line per platform, where it shipped, and the exploded devices. */
export function PlatformsScreen({ id }: HomeScreenProps) {
  return (
    <Screen id={id} labelledBy="pf-title">
      <div className={s.wrap()}>
        <div className={s.copy()}>
          <p className={cn(s.label(), revealStyles.root())}>
            <ScreenLabel screenId={id} title={platforms.title} />
          </p>
          <h2 className={cn(s.heading(), revealStyles.root({ step: 1 }))} id="pf-title">
            {platforms.heading[0]}
            <br />
            {platforms.heading[1]}
          </h2>
          <p className={cn(s.lead(), revealStyles.root({ step: 2 }))}>
            <RichText value={platforms.lead} />
          </p>
          <div className={cn(s.shipped(), revealStyles.root({ step: 3 }))}>
            <span className={s.shippedLabel()}>{platforms.shippedLabel}</span>
            {platforms.shippedTo.map((name) => (
              <span key={name} className={chipStyles.chip()}>
                {name}
              </span>
            ))}
          </div>
        </div>
        <DevicesArt screenId={id} />
      </div>
    </Screen>
  );
}
