/** A run of text with emphasised parts: plain strings and { strong } pieces, rendered by RichText. */
export type RichText = readonly (string | { readonly strong: string })[];

export type CompanyId = 'fancode' | 'loginext';

/** Small drawing on the back of a highlight tile, to scale. */
export type HighlightFigure =
  | { kind: 'bars'; label: string; before: number; after: number }
  | { kind: 'dots'; label: string; total: number; lit: number }
  | { kind: 'count'; label: string; before: number; after: number };

export type Highlight = {
  company: CompanyId;
  /** The number on the front, e.g. "40s → 2s". Digits roll when the screen opens. */
  stat: string;
  title: string;
  /** One sentence on the back. */
  detail: string;
  figure: HighlightFigure;
};

export type RoleResult = {
  label: string;
  stat: string;
  /** "word" stats (e.g. "Org-wide") are set smaller and don't roll. */
  kind: 'number' | 'word';
  detail: string;
};

export type Role = {
  company: CompanyId;
  companyName: string;
  title: string;
  period: string;
  /** Heading: plain part, then the part set in the company's gradient. */
  heading: { text: string; accent: string };
  lead: string;
  results: readonly RoleResult[];
};

export type Project = {
  id: string;
  kind: string;
  name: string;
  description: string;
  tags: readonly string[];
  demoUrl: string;
  codeUrl: string;
};

export type SkillGroup = { id: string; label: string; skills: readonly string[] };

export type Fact = { label: string; value: string };
