import type { ICONS } from './icon.constants';

export type IconName = keyof typeof ICONS;

export type IconSize = 10 | 11 | 12 | 13 | 14 | 15 | 17 | 18;

export type IconProps = {
  name: IconName;
  size?: IconSize;
  className?: string;
};
