'use client';

import { RollNumber } from '@/components/motion/roll-number/roll-number.view';
import { Icon } from '@/components/ui/icon/icon.view';
import { HighlightFigure } from '@/features/home/highlight-figure/highlight-figure.view';
import { cn } from '@/utils/cn/cn.helpers';

import { useTurnOver } from './highlight-tile.hooks';
import { highlightTileStyles as s } from './highlight-tile.styles';
import type { HighlightTileProps } from './highlight-tile.types';

/** Front: the number and what it measures. Back (via "+"): where it happened and a figure to scale. */
export function HighlightTile({ highlight, dimmed, screenId, order }: HighlightTileProps) {
  const { open, toggle } = useTurnOver();
  return (
    <article
      className={s.root({ tone: highlight.company, dimmed })}
      data-open={open ? '' : undefined}
      data-company={highlight.company}
    >
      <span className={s.glow()} aria-hidden="true" />
      <div className={cn(s.face(), s.front())} aria-hidden={open}>
        <p className={s.stat()}>
          <RollNumber value={highlight.stat} screenId={screenId} order={order} />
        </p>
        <h3 className={s.title()}>{highlight.title}</h3>
        <span className={s.accent()} aria-hidden="true" />
      </div>
      <div className={cn(s.face(), s.back())} aria-hidden={!open}>
        <p className={s.detail()}>{highlight.detail}</p>
        <span className={s.accent({ back: true })} aria-hidden="true" />
        <div className={s.figure()}>
          <HighlightFigure figure={highlight.figure} open={open} />
        </div>
      </div>
      <button
        type="button"
        className={s.plus()}
        aria-expanded={open}
        aria-label={`More about ${highlight.title.toLowerCase()}`}
        onClick={toggle}
      >
        <Icon name="plus" size={12} />
      </button>
    </article>
  );
}
