import type { Fact, Highlight, Project, RichText, Role, SkillGroup } from './profile.types';

/*
 * Everything the portfolio says about Shivam. Every claim must match the resume (docs/content-guide.md);
 * change wording here, never in components.
 */

export const intro = {
  eyebrow: 'Shivam Bandral · Frontend Software Engineer',
  heading: {
    before: 'Building ',
    emphasis: 'fast, scalable interfaces',
    after: ' across web and mobile.',
  },
  lead: [
    '4 years at ',
    { strong: 'FanCode' },
    ' and ',
    { strong: 'LogiNext' },
    ', shipping production interfaces with React, Next.js, React Native and TypeScript.',
  ] satisfies RichText,
  openTo: {
    leadIn: 'Open to',
    phrases: [
      'senior frontend roles',
      'thoughtful product teams',
      'hard frontend problems',
      'ambitious products',
    ],
    action: 'Say hello',
  },
} as const;

export const about = {
  title: 'About',
  statement: [
    'I turn complex product requirements into ',
    { strong: 'simple, fast and reliable interfaces' },
    ', working where product engineering, performance, design systems and ',
    { strong: 'AI experiences' },
    ' meet.',
  ] satisfies RichText,
  lead: 'I’m looking for ambitious teams building high-performance web or mobile software, where user experience and sound architecture both matter.',
  facts: [
    { label: 'Now', value: 'Frontend Software Engineer, FanCode' },
    { label: 'Before', value: 'Frontend Engineer, LogiNext' },
    { label: 'Studied', value: 'B.Tech, Computer Science, UPES' },
  ] satisfies readonly Fact[],
} as const;

/** Three per company; each number appears once on the site. */
export const highlights = {
  title: 'Highlights',
  heading: 'The work, in numbers.',
  filterLabel: 'Show results from',
  items: [
    {
      company: 'loginext',
      stat: '40s → 2s',
      title: 'Page load time',
      detail: 'At LogiNext: code splitting, lazy loading and caching.',
      figure: { kind: 'bars', label: '40 seconds before, 2 seconds after', before: 100, after: 5 },
    },
    {
      company: 'fancode',
      stat: '70 → 100',
      title: 'Banner eCPM',
      detail: 'At FanCode: GAM Roadblock ads, generating ₹4–5M a year.',
      figure: { kind: 'bars', label: 'eCPM 70 before, 100 after', before: 70, after: 100 },
    },
    {
      company: 'fancode',
      stat: '−80%',
      title: 'Design-to-dev effort',
      detail: 'At FanCode: a design system of tokens, theming, typography and components.',
      figure: { kind: 'bars', label: 'Effort cut to a fifth', before: 100, after: 20 },
    },
    {
      company: 'loginext',
      stat: '−90%',
      title: 'Google Maps API usage',
      detail: 'At LogiNext: caching and optimization that significantly cut costs.',
      figure: { kind: 'dots', label: '10 of every 100 calls remain', total: 100, lit: 10 },
    },
    {
      company: 'fancode',
      stat: '+30%',
      title: 'App performance',
      detail:
        'At FanCode: homepage architecture, state management and animations on Android and iOS.',
      figure: { kind: 'bars', label: '30% faster', before: 76.9, after: 100 },
    },
    {
      company: 'loginext',
      stat: '10×',
      title: 'Feature adoption',
      detail: 'At LogiNext: developer simulation tools that also sped up onboarding.',
      figure: { kind: 'count', label: 'One before, ten after', before: 1, after: 10 },
    },
  ] satisfies readonly Highlight[],
} as const;

export const roles = {
  fancode: {
    company: 'fancode',
    companyName: 'FanCode',
    title: 'Frontend Software Engineer',
    period: 'Sep 2024 – Present',
    heading: { text: 'Engineering experiences around ', accent: 'live sport.' },
    lead: 'Web and mobile experiences across live sports streaming, advertising and AI, shipped to Android, iOS and the web.',
    results: [
      {
        label: 'AI experiences',
        stat: 'Org-wide',
        kind: 'word',
        detail:
          'Led an Ask-Me-Anything platform and AI flows across Android, iOS, Web, SDK and backend.',
      },
      {
        label: 'App size',
        stat: '−11 MB',
        kind: 'number',
        detail: 'React Native app, through ProGuard and build-level optimizations.',
      },
      {
        label: 'Global launch',
        stat: '3 markets',
        kind: 'number',
        detail: 'Taken international in 3 months, through i18n and localization.',
      },
    ],
  },
  loginext: {
    company: 'loginext',
    companyName: 'LogiNext',
    title: 'Frontend Engineer',
    period: 'Jul 2022 – Aug 2024',
    heading: { text: 'Building interfaces for ', accent: 'systems that move.' },
    lead: 'Turning logistics data into faster, clearer tools for fleet and delivery teams.',
    results: [
      {
        label: 'Growth',
        stat: '+30%',
        kind: 'number',
        detail: 'Trial-to-paid conversions, after revamping subscription onboarding.',
      },
      {
        label: 'Build',
        stat: '−30%',
        kind: 'number',
        detail: 'Bundle size versus Create React App, with a custom React + Webpack setup.',
      },
      {
        label: 'SEO',
        stat: '90+',
        kind: 'number',
        detail: 'Lighthouse scores on React and Next.js applications.',
      },
    ],
  },
} as const satisfies Record<string, Role>;

export const platforms = {
  title: 'Web and mobile',
  heading: ['Fast on the web.', 'Fast in your pocket.'],
  lead: [
    'React and Next.js on the web, React Native on Android and iOS. I care about the whole frontend, from rendering lifecycles and bundle budgets to component architecture and ',
    { strong: 'developer experience' },
    '.',
  ] satisfies RichText,
  shippedLabel: 'Shipped to',
  shippedTo: ['Android', 'iOS', 'Web'],
} as const;

export const projects = {
  sectionLabel: 'Side project',
  coDevelop: {
    id: 'co-develop',
    kind: 'Real-time collaboration',
    name: 'Co-Develop',
    description:
      'A real-time collaborative coding platform with room-based multi-user editing, live presence and low-latency code sync over Socket.IO.',
    tags: ['React', 'Socket.IO', 'Node.js', 'Express.js'],
    demoUrl: 'https://co-develop.vercel.app',
    codeUrl: 'https://github.com/cheffycoder/co-develop',
  },
  shareOn: {
    id: 'share-on',
    kind: 'Secure file sharing',
    name: 'Share On',
    description:
      'A secure file-sharing platform with expiring links, automated email delivery and MongoDB-backed file lifecycle management, built on REST APIs.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    demoUrl: 'https://shareon.shivam.dev',
    codeUrl: 'https://github.com/cheffycoder/share-on',
  },
} as const satisfies { sectionLabel: string } & Record<'coDevelop' | 'shareOn', Project>;

/** Everything on the resume, one group at a time. */
export const skills = {
  title: 'Skills',
  heading: 'Skills and tools.',
  groupLabel: 'Skill group',
  groups: [
    {
      id: 'frontend',
      label: 'Frontend',
      skills: [
        'React.js',
        'React Native',
        'Next.js',
        'Redux',
        'Redux Saga',
        'React Reanimated',
        'Webpack',
      ],
    },
    {
      id: 'languages',
      label: 'Languages',
      skills: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'C++'],
    },
    {
      id: 'backend',
      label: 'Backend',
      skills: ['Node.js', 'Express.js', 'Socket.IO', 'MongoDB', 'Firebase Realtime Database'],
    },
    {
      id: 'tools',
      label: 'Tools',
      skills: [
        'Git',
        'GitHub Actions',
        'Figma',
        'Google Ad Manager',
        'Google Analytics',
        'New Relic',
        'Conviva',
        'Crashlytics',
      ],
    },
    {
      id: 'practices',
      label: 'Practices',
      skills: [
        'REST APIs',
        'Frontend architecture',
        'Design systems',
        'Performance optimization',
        'Accessibility (a11y)',
        'CI/CD',
        'Internationalization (i18n)',
        'Agile / Scrum',
      ],
    },
  ] satisfies readonly SkillGroup[],
} as const;

export const writing = {
  title: 'Writing & reflections',
  heading: 'Coming soon.',
  homeLink: 'Visit the articles page',
  backLink: 'Back to the portfolio',
} as const;

export const contact = {
  title: 'Contact',
  heading:
    'Interested in ambitious products, hard frontend problems and teams that care about engineering quality.',
  sub: 'Open to senior frontend engineering roles and thoughtful product teams.',
  status: 'Studied in the hills of Dehradun, now shipping from Mumbai',
  copyLabel: 'Copy',
  copyShort: 'Copy email',
  sendLabel: 'Send an email',
} as const;

/** The resume's schools and employers, for structured data (lib/seo). */
export const credentials = {
  worksFor: { name: 'FanCode', url: 'https://www.fancode.com' },
  alumniOf: {
    name: 'University of Petroleum and Energy Studies (UPES)',
    url: 'https://www.upes.ac.in',
  },
} as const;
