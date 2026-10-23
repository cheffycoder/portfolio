# 0004 · Conventional Commits, checked by commitlint

**Context.** History should say what changed for visitors and be ready for automatic versioning.

**Decision.** Conventional Commits (docs/commits.md), checked on every commit (Husky commit-msg) and on every pull
request title in CI, because squash merging turns the title into the commit.

**Consequences.** A release tool (release-please) can be added later without rewriting history.

**Revisit when.** Never, unless the convention gets in the way.
