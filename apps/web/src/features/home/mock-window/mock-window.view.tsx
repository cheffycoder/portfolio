import { cn } from '@/utils/cn/cn.helpers';

import { mockWindowStyles as s } from './mock-window.styles';
import type { MockWindowProps } from './mock-window.types';

/** A small app window: traffic lights, a title, something on the right, and its content. */
export function MockWindow({ title, aside, label, className, style, children }: MockWindowProps) {
  return (
    <div
      className={cn(s.root(), className)}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      <div className={s.bar()}>
        <span className={s.file()}>
          <span className={s.lights()}>
            <i className={s.light({ color: 'red' })} />
            <i className={s.light({ color: 'amber' })} />
            <i className={s.light({ color: 'green' })} />
          </span>
          {title}
        </span>
        {aside}
      </div>
      {children}
    </div>
  );
}
