@AGENTS.md

## Claude Code specifics

- **Never run git commands that change anything** (commit, push, add, branch, checkout, merge…). Write the code,
  then give the maintainer the exact commands to run, one per line, no inline `#` comments. See AGENTS.md › Git.
- **Never push to or merge into `main`.** Changes reach `main` only through a pull request merged by the maintainer.
- Follow `docs/code-structure.md` for every new file. Use the `new-module` skill to create modules.
- Project skills live in `.claude/skills/`: `new-module`, `update-profile`, `release-check`. Use them for those tasks.
- Before finishing a change, run `pnpm check`. For UI changes also `pnpm build` and `pnpm test:e2e`.
- Ask the `code-reviewer` agent to review non-trivial changes against AGENTS.md and docs/DESIGN.md.
- SEO work uses the claude-seo plugin (`/seo …` commands) once it is installed on this machine.
