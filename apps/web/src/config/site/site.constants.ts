/** Who the site is about, how to reach him, and the site's structure. Change wording here, never in components. */
export const site = {
  name: 'Shivam Bandral',
  initials: 'SB',
  role: 'Frontend Software Engineer',
  /** Short role for titles and share cards. */
  shortRole: 'Frontend Engineer',
  description:
    'Shivam Bandral, Frontend Software Engineer in Mumbai building fast, scalable interfaces across web and mobile at FanCode and LogiNext.',
  locale: 'en_IN',
  email: 'shivambandral@gmail.com',
  location: {
    city: 'Mumbai',
    region: 'Maharashtra',
    country: 'India',
    countryCode: 'IN',
    /** Shown under the home clock. */
    coordinates: '19°04′N 72°52′E',
    timeZone: 'Asia/Kolkata',
  },
  social: {
    github: 'https://github.com/cheffycoder',
    linkedin: 'https://www.linkedin.com/in/shivambandral/',
    x: 'https://x.com/shivam_bandral',
  },
  xHandle: '@shivam_bandral',
  /** Topics for search engines (Person.knowsAbout and keywords). */
  keywords: [
    'Frontend engineer',
    'React',
    'Next.js',
    'React Native',
    'TypeScript',
    'Web performance',
    'Design systems',
    'Mumbai',
  ],
  copyright: '© 2026',
  colophon: 'Built with love',
} as const;

/** Routes, written once so links, the sitemap and tests agree. Paths end with "/" (trailingSlash). */
export const routes = {
  home: '/',
  articles: '/articles/',
  contact: '/#contact',
} as const;

/** The home page's screens, in order: element ids (also the #links) and their short names in navs and footers. */
export const homeScreens = {
  intro: { id: 'intro', label: 'Intro' },
  about: { id: 'about', label: 'About' },
  numbers: { id: 'numbers', label: 'Numbers' },
  fancode: { id: 'fancode', label: 'FanCode' },
  loginext: { id: 'loginext', label: 'LogiNext' },
  platforms: { id: 'platforms', label: 'Web & mobile' },
  coDevelop: { id: 'co-develop', label: 'Co-Develop' },
  shareOn: { id: 'share-on', label: 'Share On' },
  skills: { id: 'skills', label: 'Skills' },
  writing: { id: 'writing', label: 'Writing' },
  contact: { id: 'contact', label: 'Contact' },
} as const;

export const homeScreenOrder = Object.values(homeScreens);
