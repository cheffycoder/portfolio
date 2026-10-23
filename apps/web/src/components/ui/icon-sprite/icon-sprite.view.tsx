import { ICONS } from '@/components/ui/icon/icon.constants';

import { iconSpriteStyles } from './icon-sprite.styles';

const symbols = Object.entries(ICONS)
  .map(([name, body]) => `<symbol id="i-${name}" viewBox="0 0 24 24">${body}</symbol>`)
  .join('');

/** Every icon once, as symbols; rendered a single time in the root layout. */
export function IconSprite() {
  return (
    <svg
      className={iconSpriteStyles.root()}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: symbols }}
    />
  );
}
