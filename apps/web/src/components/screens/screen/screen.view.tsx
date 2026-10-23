'use client';

import { neighbours, screenCount } from '@/components/screens/screen-deck/screen-deck.helpers';
import { useScreenDeck, useScreenState } from '@/components/screens/screen-deck/screen-deck.hooks';
import {
  Colophon,
  ScreenFoot,
  ScreenFootLink,
} from '@/components/screens/screen-foot/screen-foot.view';

import { screenStyles } from './screen.styles';
import type { ScreenProps } from './screen.types';

/**
 * One full-viewport screen. Everything must fit without scrolling inside it (DESIGN.md §3). Its content
 * reveals the first time it becomes active ([data-seen]; a page that is a single screen is seen from the start);
 * in a deck, its footer links to its neighbours.
 */
export function Screen({
  id,
  labelledBy,
  as: Tag = 'section',
  tone,
  navSpace,
  align,
  background,
  header,
  foot,
  children,
}: ScreenProps) {
  const { screens } = useScreenDeck();
  const { index, seen, inDeck } = useScreenState(id);
  const { prev, next } = neighbours(screens, index);

  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={screenStyles.root({ tone, navSpace })}
      data-seen={seen || !inDeck ? '' : undefined}
    >
      {background ? (
        <div className={screenStyles.background()} aria-hidden="true">
          {background}
        </div>
      ) : null}
      {header}
      <div className={screenStyles.body({ align })}>{children}</div>
      {foot ??
        (index >= 0 ? (
          <ScreenFoot
            start={
              prev ? (
                <ScreenFootLink href={`#${prev.id}`} label={prev.label} direction="up" />
              ) : null
            }
            middle={screenCount(index, screens.length)}
            end={
              next ? (
                <ScreenFootLink href={`#${next.id}`} label={next.label} direction="down" />
              ) : (
                <Colophon />
              )
            }
          />
        ) : null)}
    </Tag>
  );
}
