import { site } from '@/config/site/site.constants';

/** How long "Copied" (or the fallback hint) shows before the button reads "Copy" again. */
export const COPY_FEEDBACK_MS = 2200;

/** Profiles linked from the card (rel="me", so search engines tie them to this site). */
export const SOCIALS = [
  { name: 'GitHub', href: site.social.github, icon: 'github' },
  { name: 'LinkedIn', href: site.social.linkedin, icon: 'linkedin' },
  { name: 'X', href: site.social.x, icon: 'x' },
] as const;
