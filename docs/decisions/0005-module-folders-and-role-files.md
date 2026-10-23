# 0005 · Module folders and role files, enforced by lint

**Context.** The maintainer wants every file to say what it holds and to live where it is meant to, with no
barrel files, and wants that to hold when AI agents write code.

**Decision.** Every module is a kebab-case folder with files named `<module>.<role>.<ext>`
(docs/code-structure.md). `tooling/eslint-plugin` enforces names and locations (`module-structure`) and contents
(`module-contents`: types, hooks, Zod, `cva` and JSX each only in their role file; no class strings in JSX).

**Consequences.** More, smaller files with exact imports. Lint fails on misplaced code locally, in hooks and CI.

**Revisit when.** A role is repeatedly missing, or a framework needs file names the rule doesn't allow yet.
