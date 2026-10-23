# 0002 · Same standards, tooling and workflow as Screenrobe

**Context.** The maintainer runs several side products and wants each to look and work the same way inside, so
any of them can be picked up (by a person or an agent) without relearning.

**Decision.** Copy Screenrobe's setup: pnpm workspace (`apps/*`, `tooling/*`), strict TypeScript, ESLint 9
with the Bulletproof import rules and the module-layout plugin, Prettier with Tailwind class sorting, Husky
(pre-commit, commit-msg, pre-push), commitlint, Vitest and Playwright on five setups with axe, AGENTS.md +
CLAUDE.md, project skills and a code-reviewer agent, and the same CI shape (PR title → check → e2e → deploy).
Differences: Pages instead of Cloudflare, no content or media packages.

**Consequences.** The two repos can later share a starter template. Version bumps should move together.

**Revisit when.** A third product starts: extract the shared parts into a template repository.
