import type { RichTextProps } from './rich-text.types';

/** Text with emphasised parts from config (plain strings and { strong } pieces). */
export function RichText({ value }: RichTextProps) {
  return value.map((part, i) =>
    typeof part === 'string' ? part : <strong key={i}>{part.strong}</strong>,
  );
}
