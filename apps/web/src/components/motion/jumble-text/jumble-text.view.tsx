'use client';

import { cn } from '@/utils/cn/cn.helpers';

import { useJumble } from './jumble-text.hooks';
import { jumbleTextStyles } from './jumble-text.styles';
import type { JumbleTextProps } from './jumble-text.types';

/** A heading whose letters come loose on hover, with a short "still writing" note under it. */
export function JumbleText({
  text,
  as: Heading,
  id,
  headingClassName,
  noteClassName,
}: JumbleTextProps) {
  const { word, note } = useJumble();
  return (
    <>
      <Heading className={headingClassName} id={id} aria-label={text}>
        <span ref={word} className={jumbleTextStyles.word()} tabIndex={0}>
          {[...text].map((ch, i) => (
            <span key={i} className={jumbleTextStyles.letter()} data-ch aria-hidden="true">
              {ch}
            </span>
          ))}
        </span>
      </Heading>
      <p ref={note} className={cn(jumbleTextStyles.note(), noteClassName)} aria-hidden="true" />
    </>
  );
}
