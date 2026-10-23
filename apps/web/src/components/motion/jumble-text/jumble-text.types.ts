export type JumbleTextProps = {
  text: string;
  /** Heading level: h1 on its own page, h2 inside the home page. */
  as: 'h1' | 'h2';
  id?: string;
  headingClassName?: string;
  noteClassName?: string;
};

export type Letter = {
  span: HTMLSpanElement;
  ch: string;
  fixed: boolean;
  phase: [number, number, number];
  speed: number;
  tx: number;
  ty: number;
  tr: number;
  nextSwap: number;
};
