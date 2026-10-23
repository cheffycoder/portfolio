'use client';

import { cn } from '@/utils/cn/cn.helpers';

import { usePill } from './segmented.hooks';
import { segmentedStyles } from './segmented.styles';
import type { SegmentedProps } from './segmented.types';

/** A row of options with a sliding pill under the chosen one; optionally timed, with a filling pill. */
export function Segmented({ label, options, index, onPick, timer, className }: SegmentedProps) {
  const { group, box } = usePill(index);
  return (
    <div
      ref={group}
      className={cn(segmentedStyles.root(), className)}
      role="group"
      aria-label={label}
    >
      <span
        className={segmentedStyles.pill()}
        style={box ? { width: box.width, transform: `translateX(${box.left}px)` } : { width: 0 }}
        aria-hidden="true"
      >
        {timer ? (
          <span
            key={`${index}-${timer.cycle}-${timer.running}`}
            className={segmentedStyles.fill({ running: timer.running, paused: timer.paused })}
            style={{ ['--dur' as string]: `${timer.durationMs}ms` }}
          />
        ) : null}
      </span>
      {options.map((option, i) => (
        <button
          key={option.value}
          type="button"
          className={segmentedStyles.option()}
          aria-pressed={i === index}
          onClick={() => onPick(i)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
