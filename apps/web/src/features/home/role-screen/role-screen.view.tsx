import { revealStyles } from '@/components/motion/reveal/reveal.styles';
import { RollNumber } from '@/components/motion/roll-number/roll-number.view';
import { Screen } from '@/components/screens/screen/screen.view';
import { RoleArt } from '@/features/home/role-art/role-art.view';
import { cn } from '@/utils/cn/cn.helpers';

import { roleScreenStyles as s } from './role-screen.styles';
import type { RoleScreenProps } from './role-screen.types';

/** A role (FanCode, LogiNext): who, when, one line on the work, and three results in the company's gradient. */
export function RoleScreen({ id, role }: RoleScreenProps) {
  const headingId = `${id}-title`;
  return (
    <Screen
      id={id}
      labelledBy={headingId}
      tone={role.company === 'fancode' ? 'warm' : 'cool'}
      background={<RoleArt company={role.company} />}
    >
      <div className={cn(s.head(), revealStyles.root())}>
        <div className={s.who()}>
          <span className={s.company()}>{role.companyName}</span>
          <span className={s.meta()}>{role.title}</span>
        </div>
        <span className={s.meta()}>{role.period}</span>
      </div>
      <h2 className={cn(s.heading(), revealStyles.root({ step: 1 }))} id={headingId}>
        {role.heading.text}
        <span className={s.accent()}>{role.heading.accent}</span>
      </h2>
      <p className={cn(s.lead(), revealStyles.root({ step: 2 }))}>{role.lead}</p>
      <div className={cn(s.results(), revealStyles.root({ step: 3 }))}>
        {role.results.map((result, i) => (
          <div key={result.label} className={s.result()}>
            <p className={s.resultLabel()}>{result.label}</p>
            <p className={s.stat({ kind: result.kind })}>
              {result.kind === 'number' ? (
                <RollNumber
                  value={result.stat}
                  screenId={id}
                  order={role.results.slice(0, i).filter((r) => r.kind === 'number').length}
                />
              ) : (
                result.stat
              )}
            </p>
            <p className={s.detail()}>{result.detail}</p>
          </div>
        ))}
      </div>
    </Screen>
  );
}
