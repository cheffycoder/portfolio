import { revealStyles } from '@/components/motion/reveal/reveal.styles';
import { Screen } from '@/components/screens/screen/screen.view';
import { buttonStyles } from '@/components/ui/button/button.styles';
import { chipStyles } from '@/components/ui/chip/chip.styles';
import { Icon } from '@/components/ui/icon/icon.view';
import { projects } from '@/config/profile/profile.constants';
import { cn } from '@/utils/cn/cn.helpers';
import { pad2 } from '@/utils/number/number.helpers';

import { projectScreenStyles as s } from './project-screen.styles';
import type { ProjectScreenProps } from './project-screen.types';

/** A side project: its mock on the stage, what it is, the stack, and links to the demo and the code. */
export function ProjectScreen({ id, project, position, stage }: ProjectScreenProps) {
  const headingId = `${id}-title`;
  const number = pad2(position.index + 1);
  return (
    <Screen id={id} labelledBy={headingId}>
      <div className={cn(s.head(), revealStyles.root())}>
        <span className={s.label()}>{projects.sectionLabel}</span>
        <span className={s.sep()} aria-hidden="true">
          ·
        </span>
        <span className={s.meta()}>
          {number} of {pad2(position.total)}
        </span>
      </div>
      <div className={cn(s.stage(), revealStyles.root({ step: 1 }))}>{stage}</div>
      <div className={s.body()}>
        <div className={s.copy()}>
          <p className={cn(s.label(), revealStyles.root({ step: 2 }))}>
            {number} | {project.kind}
          </p>
          <h2 className={cn(s.heading(), revealStyles.root({ step: 2 }))} id={headingId}>
            {project.name}
          </h2>
          <p className={cn(s.lead(), revealStyles.root({ step: 3 }))}>{project.description}</p>
          <ul className={cn(s.tags(), revealStyles.root({ step: 3 }))}>
            {project.tags.map((tag) => (
              <li key={tag} className={chipStyles.tag()}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <div className={cn(s.actions(), revealStyles.root({ step: 4 }))}>
          <a
            className={cn(buttonStyles.root(), s.action())}
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live demo <Icon name="ne" />
          </a>
          <a
            className={cn(buttonStyles.root({ tone: 'ghost' }), s.action())}
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="code" />
            Code
          </a>
        </div>
      </div>
    </Screen>
  );
}
