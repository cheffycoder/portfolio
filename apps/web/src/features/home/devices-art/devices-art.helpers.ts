/** Isometric projection of a flat layer, placed at (x, y) in the drawing. */
export const iso = (x: number, y: number): string => `matrix(0.866 0.5 -0.866 0.5 ${x} ${y})`;
