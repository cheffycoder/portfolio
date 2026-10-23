import { cn } from '@/utils/cn/cn.helpers';

import { iconStyles } from './icon.styles';
import type { IconProps } from './icon.types';

/** A decorative icon from the page's sprite (icon-sprite). Give the control around it an accessible name. */
export function Icon({ name, size, className }: IconProps) {
  return (
    <svg className={cn(iconStyles.root({ size }), className)} aria-hidden="true" focusable="false">
      <use href={`#i-${name}`} />
    </svg>
  );
}
