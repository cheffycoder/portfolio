/** What the note under "Coming soon." says while the letters are loose, in turn. */
export const JUMBLE_NOTES = [
  'Drafting…',
  'Rewriting the intro…',
  'Checking the numbers…',
  'Almost there…',
];

/** Glyphs a loose letter flickers through. */
export const JUMBLE_GLYPHS = 'abcdefghijklmnopqrstuvwxyz#%&*+=?/<>';

/** How long letters scramble after the pointer arrives. */
export const SCRAMBLE_MS = 420;
/** Grace period before letters settle when the pointer leaves (quick passes don't restart everything). */
export const LEAVE_GRACE_MS = 140;
/** On touch, letters settle by themselves after this long. */
export const TAP_HOLD_MS = 1800;
/** A note stays the same unless it has been hidden at least this long. */
export const NOTE_REST_MS = 1600;
