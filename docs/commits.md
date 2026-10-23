# Commit messages

The portfolio uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Each message says what
kind of change it is, and that kind maps onto a [semantic version](https://semver.org) bump, so a release tool
can produce versions and a changelog from the history later. The `commit-msg` hook checks every message with
commitlint (`commitlint.config.mjs`); CI checks the pull request title, which becomes the squash commit.

## Shape

```
<type>(<scope>)<!>: <summary>

<body: optional, why the change was made>

<footer: optional, BREAKING CHANGE / Refs / Co-Authored-By>
```

- **summary**: imperative and lower case ("add", not "Added"), no full stop, header 72 characters max.
- **body and footer**: separated by a blank line; lines up to 100 characters.

## Types and the version bump they cause

- `feat`: something a visitor can now see or do → **minor**
- `fix`: something that was broken now works → **patch**
- `perf`: faster or lighter, same behaviour → **patch**
- `refactor`, `style`, `test`, `docs`, `build`, `ci`, `chore` → no release
- `revert`: undoes an earlier commit → follows the reverted type

Any type with `!`, or a `BREAKING CHANGE:` footer → **major**. Here that means a public URL or a shared link
stops working (`/articles/`, a `#screen` link people may have shared). A redesign is a `feat`, not breaking.

## Scopes

- `web`: apps/web pages, features, components
- `content`: what the site says (config/profile, config/site)
- `design`: tokens, DESIGN.md, design-sense.md
- `seo`: metadata, structured data, sitemap
- `analytics`: tracking adapters and events
- `e2e`: Playwright tests and config
- `deps`: dependency updates
- `tooling`: lint, format, hooks, tsconfig, agents and skills
- `release`: version bumps and changelog

Adding a scope means adding it to `commitlint.config.mjs` and this list in the same commit.

## Examples

```
feat(web): rebuild the portfolio from prototype v6 on next.js
feat(content): add the design system case study to highlights
fix(web): keep the contact card inside the screen on short phones
feat(seo): add person and profile page structured data
ci: deploy to github pages after checks pass
chore(deps): update next to 16.4.3
```
