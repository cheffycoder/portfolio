'use client';

import { revealStyles } from '@/components/motion/reveal/reveal.styles';
import { Screen } from '@/components/screens/screen/screen.view';
import { useScreenState } from '@/components/screens/screen-deck/screen-deck.hooks';
import { screenHeadStyles } from '@/components/screens/screen-head/screen-head.styles';
import { ScreenLabel } from '@/components/screens/screen-head/screen-head.view';
import { Icon } from '@/components/ui/icon/icon.view';
import { paddleStyles } from '@/components/ui/paddle/paddle.styles';
import { useAutoAdvance } from '@/components/ui/segmented/segmented.hooks';
import { Segmented } from '@/components/ui/segmented/segmented.view';
import { skills } from '@/config/profile/profile.constants';
import type { HomeScreenProps } from '@/features/home/home-screen/home-screen.types';
import { cn } from '@/utils/cn/cn.helpers';

import { SKILL_GROUP_MS } from './skills-screen.constants';
import { skillsScreenStyles as s } from './skills-screen.styles';

const options = skills.groups.map((g) => ({ value: g.id, label: g.label }));

/** 09 · Skills: everything on the resume, one group at a time, moving on by itself with pause / play. */
export function SkillsScreen({ id }: HomeScreenProps) {
  const { active } = useScreenState(id);
  const { index, pick, playing, togglePlay, cycle } = useAutoAdvance(
    options.length,
    SKILL_GROUP_MS,
    active,
  );
  return (
    <Screen id={id} labelledBy="sk-title">
      <div className={screenHeadStyles.root()}>
        <p className={cn(s.label(), revealStyles.root())}>
          <ScreenLabel screenId={id} title={skills.title} />
        </p>
        <h2 className={cn(s.heading(), revealStyles.root({ step: 1 }))} id="sk-title">
          {skills.heading}
        </h2>
      </div>
      <div className={cn(s.panel(), revealStyles.root({ step: 2 }))} aria-live="polite">
        {skills.groups.map((group, i) => (
          <ul
            key={group.id}
            className={s.set({ active: i === index })}
            aria-label={group.label}
            aria-hidden={i !== index}
          >
            {group.skills.map((skill) => (
              <li key={skill} className={s.skill()}>
                {skill}
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div
        className={cn(screenHeadStyles.toggleRow(), s.controls(), revealStyles.root({ step: 3 }))}
      >
        <button
          type="button"
          className={paddleStyles.root()}
          aria-label="Previous group"
          onClick={() => pick(index - 1)}
        >
          <Icon name="left" />
        </button>
        <Segmented
          className={s.switch()}
          label={skills.groupLabel}
          options={options}
          index={index}
          onPick={pick}
          timer={{ durationMs: SKILL_GROUP_MS, running: active, paused: !playing, cycle }}
        />
        <button
          type="button"
          className={paddleStyles.root()}
          aria-label="Next group"
          onClick={() => pick(index + 1)}
        >
          <Icon name="right" />
        </button>
        <button
          type="button"
          className={paddleStyles.root()}
          aria-label={playing ? 'Pause' : 'Play'}
          onClick={togglePlay}
        >
          <Icon name={playing ? 'pause' : 'play'} />
        </button>
      </div>
    </Screen>
  );
}
