/** A file's life on Share On, one state per window; the bar moves through them. */
export const LIFECYCLE = [
  {
    step: 'Uploaded',
    when: 'Day 0',
    sub: '18.4 MB · upload complete',
    badge: { label: 'Stored', tone: 'ok' },
    meta: ['Saved to MongoDB', '100%'],
  },
  {
    step: 'Shared',
    when: 'Day 0',
    sub: '18.4 MB',
    badge: { label: 'Link active', tone: 'ok' },
    meta: ['Emailed to 2 recipients', 'Expires in 24h'],
  },
  {
    step: 'Expiring',
    when: 'Hour 23',
    sub: '18.4 MB',
    badge: { label: 'Expiring', tone: 'warn' },
    meta: ['Link stops working soon', '1h left'],
  },
  {
    step: 'Deleted',
    when: 'Hour 24',
    sub: 'Removed from storage',
    badge: { label: 'Deleted', tone: 'off' },
    meta: ['Link expired', '0h left'],
  },
] as const;

export const FILE_NAME = 'design-tokens.zip';
export const SHARE_LINK = 'shareon.shivam.dev/files/8kq2x7';

/** Width of the knob's track ends: the knob is 36px inside a 44px-high bar. */
export const KNOB_SPAN = 44;
/** Pulling past an end stretches the bar by up to 6%. */
export const MAX_STRETCH = 0.06;
/** The bar plays its intro this long after its screen opens. */
export const INTRO_DELAY_MS = 700;
export const SETTLE_MS = 550;
