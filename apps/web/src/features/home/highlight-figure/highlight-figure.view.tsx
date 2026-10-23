import { highlightFigureStyles as s } from './highlight-figure.styles';
import type { HighlightFigureProps } from './highlight-figure.types';

/** Before/after bars, a field of dots, or two rows of counters, depending on the highlight. */
export function HighlightFigure({ figure, open }: HighlightFigureProps) {
  if (figure.kind === 'bars') {
    return (
      <div className={s.bars()} role="img" aria-label={figure.label}>
        {[
          ['Before', figure.before, false],
          ['After', figure.after, true],
        ].map(([label, width, hot]) => (
          <div key={String(label)} className={s.row()}>
            <span>{label}</span>
            <span className={s.track()}>
              <span className={s.bar({ hot: Boolean(hot), open })} style={{ width: `${width}%` }} />
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (figure.kind === 'dots') {
    return (
      <div className={s.dots()} role="img" aria-label={figure.label}>
        {Array.from({ length: figure.total }, (_, i) => (
          <i key={i} className={s.dot({ on: i < figure.lit })} />
        ))}
      </div>
    );
  }
  return (
    <div role="img" aria-label={figure.label}>
      <div className={s.countRow()}>
        {Array.from({ length: figure.before }, (_, i) => (
          <i key={i} className={s.count({ hot: false })} />
        ))}
      </div>
      <div className={s.countRow({ after: true })}>
        {Array.from({ length: figure.after }, (_, i) => (
          <i key={i} className={s.count({ hot: true })} />
        ))}
      </div>
    </div>
  );
}
