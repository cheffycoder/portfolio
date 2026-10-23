'use client';

import type { CSSProperties } from 'react';

import { Icon } from '@/components/ui/icon/icon.view';
import { MockWindow } from '@/features/home/mock-window/mock-window.view';

import { FILE_NAME, LIFECYCLE, SHARE_LINK } from './share-lifecycle.constants';
import { fadeFor, fadeVars } from './share-lifecycle.helpers';
import { useLifecycleBar } from './share-lifecycle.hooks';
import { shareLifecycleStyles as s } from './share-lifecycle.styles';
import type { ShareLifecycleProps } from './share-lifecycle.types';

/** Server-rendered starting point (the first state), so the stage reads right before any script runs. */
const initial = (i: number) => fadeVars(fadeFor(i, 0)) as CSSProperties;

/** Share On's file lifecycle: four windows, cross-faded by dragging the bar (or with the arrow keys). */
export function ShareLifecycle({ screenId }: ShareLifecycleProps) {
  const { bar, stack } = useLifecycleBar(screenId);
  const last = LIFECYCLE.length - 1;
  return (
    <>
      <div
        ref={stack}
        className={s.stack()}
        role="img"
        aria-label="A shared file moving from upload to deletion"
      >
        {LIFECYCLE.map((state, i) => (
          <MockWindow
            key={state.step}
            className={s.window()}
            style={initial(i)}
            title={state.step}
            aside={<span>{state.when}</span>}
          >
            <div className={s.file({ faded: i === last })}>
              <span className={s.box()}>
                <Icon name="file" size={17} />
              </span>
              <span>
                <span className={s.name()}>{FILE_NAME}</span>
                <span className={s.sub()}>{state.sub}</span>
              </span>
              <span className={s.badge({ tone: state.badge.tone })}>{state.badge.label}</span>
            </div>
            {i === 0 ? (
              <div className={s.progress()}>
                <i className={s.progressFill()} />
              </div>
            ) : (
              <div className={s.link({ faded: i === last })}>
                <Icon name="link" size={13} className={s.linkIcon()} />
                <span className={s.linkText()}>{SHARE_LINK}</span>
              </div>
            )}
            <div className={s.meta()}>
              <span className={s.metaPart()}>
                {i === 1 ? <Icon name="mail" size={12} /> : null}
                {state.meta[0]}
              </span>
              <span>{state.meta[1]}</span>
            </div>
          </MockWindow>
        ))}
      </div>
      <div className={s.wrap()}>
        <div
          ref={bar}
          className={s.bar()}
          role="slider"
          tabIndex={0}
          aria-label="File lifecycle stage"
          aria-valuemin={0}
          aria-valuemax={last}
          aria-valuenow={0}
          aria-valuetext={LIFECYCLE[0].step}
          data-fresh=""
        >
          <span className={s.ticks()} aria-hidden="true">
            {LIFECYCLE.map((state) => (
              <i key={state.step} className={s.tick()} />
            ))}
          </span>
          <span className={s.labels({ layer: 'track' })} aria-hidden="true">
            {LIFECYCLE.map((state, i) => (
              <span key={state.step} className={s.label()} data-step={i} style={initial(i)}>
                {state.step}
              </span>
            ))}
          </span>
          <span className={s.fill()} aria-hidden="true">
            <span className={s.labels({ layer: 'fill' })}>
              {LIFECYCLE.map((state, i) => (
                <span key={state.step} className={s.label()} data-step={i} style={initial(i)}>
                  {state.step}
                </span>
              ))}
            </span>
          </span>
          <span className={s.hint()} aria-hidden="true">
            <Icon name="right" size={12} />
            <Icon name="right" size={12} />
          </span>
          <span className={s.knob()} aria-hidden="true">
            <Icon name="lr" size={15} />
          </span>
        </div>
      </div>
    </>
  );
}
