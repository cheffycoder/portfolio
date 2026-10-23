# Design sense

Why the portfolio looks the way it does, and a log of design decisions. Update DESIGN.md in the same change.

## Principles

- **The work is the colour.** Paper and ink everywhere; the company gradients mark the company's results only.
- **One screen, one idea.** Nothing scrolls inside a screen; on short screens details give way, never the layout.
- **Numbers once.** Each result appears in exactly one place, so every number reads as earned.
- **Motion explains.** Things move when they carry meaning (a value rolling in, devices taken apart, a theme
  sweeping like a sky) and never while you read.

## Log

- **2026-10-23 · Ported v6 to the production site.** Matched the prototype screen for screen; automated
  screenshot comparison at 320–1440px wide, light and dark, came back within 0.1% on every screen.
- **2026-10-23 · "Open to" pill text is fg-2, not fg-3.** On the pill's tint fg-3 measured 4.2:1, under WCAG AA.
- **2026-10-23 · Contact card gap is 20px on short phones.** At iPhone 15 size (393×659) the prototype's card
  overflowed its screen by 4px.
- **2026-10-23 · A 404 screen in the same style** (the prototype had none): monogram nav, one line, the way home.
- **2026-10-23 · The "coming soon" note fades in and out with the hover** (the prototype left it on after the first
  hover).
