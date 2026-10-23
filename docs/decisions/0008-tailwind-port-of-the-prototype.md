# 0008 · Port the prototype's CSS to Tailwind tokens and recipes

**Context.** Prototype v6 is one hand-written stylesheet (~830 lines) and one script. The production site must
match it exactly and follow the repo's standards (Tailwind, `cva` recipes in `.styles.ts`, no class strings in
JSX).

**Decision.** Theme values stay CSS variables on `:root` (so light and dark flip in one place) and are exposed as
Tailwind tokens. Type roles, the content column, reveals, grain, the dot field, the sky gradients and the
exploded-devices motion are `@utility` rules in `globals.css`; everything else is utilities in each module's
recipe. Breakpoints and the short-screen trims are Tailwind breakpoints and custom variants with the
prototype's exact values. Every screen was compared with the prototype by automated screenshots at nine sizes
in both themes.

**Consequences.** Two rules keep the cascade predictable: a `cva` variant never overrides a utility from its
own base, and a `type-*` role is never combined with a size or colour utility.

**Revisit when.** A redesign: start from DESIGN.md, not from the prototype.
