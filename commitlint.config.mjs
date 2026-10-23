// Commit message rules. The convention is explained in docs/commits.md.
// Type decides the version bump: feat → minor, fix/perf → patch, `!` or BREAKING CHANGE → major.

const scopes = [
  'web', // apps/web: pages, features, components
  'content', // profile copy: experience, numbers, projects, skills (config/profile)
  'design', // tokens, DESIGN.md, design-sense.md
  'seo', // metadata, structured data, sitemaps
  'analytics', // tracking adapters and events
  'e2e', // Playwright tests and config
  'deps', // dependency updates
  'tooling', // lint, format, hooks, tsconfig, agents and skills
  'release', // version bumps and changelog
];

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'refactor',
        'style',
        'test',
        'docs',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'scope-enum': [2, 'always', scopes],
    'header-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
    'footer-max-line-length': [2, 'always', 100],
  },
};
