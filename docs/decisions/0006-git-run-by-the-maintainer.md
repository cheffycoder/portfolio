# 0006 · Git is run by the maintainer; main is protected by convention

**Context.** The maintainer reviews every change before it is committed and wants AI agents never to commit or
push.

**Decision.** Agents never run git commands that change anything; they hand over exact commands (AGENTS.md › Git).
Every change goes branch → pull request → CI green → squash merge. Backstops: the pre-push hook rejects pushes
to `main` and runs `pnpm check` on a clean copy of the pushed commit; Claude Code's project settings deny
mutating git commands.

**Consequences.** Merging is the only way to deploy, and it only deploys after CI passes.

**Revisit when.** Now, if the repository is public: add a branch ruleset for `main` (docs/deploy.md).
