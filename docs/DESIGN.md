# Design

The source of truth for how the portfolio looks and moves. Tokens live in `apps/web/src/styles/globals.css`;
the locked reference is `prototype/` (v6). Reasoning and the decisions log are in `design-sense.md`.

## 1. Feel

Matte paper and ink, like an e-reader: a calm monochrome page with a fine grain, so glossy screens look matte.
The only colour is the two company gradients (FanCode warm, LogiNext cool). Apple-style spacing and type
pairing; one idea per screen.

## 2. Colour and type

| Token                  | Light                         | Dark           | Use                          |
| ---------------------- | ----------------------------- | -------------- | ---------------------------- |
| `page` (`--bg`)        | `#E9E7E0`                     | `#0B0C0E`      | Background                   |
| `fg` / `fg-2` / `fg-3` | 15 / 6 / 4.6:1                | AA             | Text, secondary text, labels |
| `ink` / `on-ink`       | `#161616`                     | `#F3F4F6`      | Solid buttons and pills      |
| `line` / `line-2`      | 8% / 15% ink                  | 8% / 15% white | Hairlines, outlines          |
| `warm-g` (FanCode)     | `#FF6B2C → #E0245E → #8E1B5A` |                | Gradient text, accents       |
| `cool-g` (LogiNext)    | `#33C3FF → #2563EB → #1E3A8A` |                | Gradient text, accents       |

The theme follows the system until the visitor picks one (saved in `localStorage`, applied before first paint).

Fonts, self-hosted: the system font on Apple devices with **Inter** as the fallback for text and display,
**Space Grotesk** for labels and data. Type roles (utilities in globals.css), each with one partner:

- label (12px caps, Space Grotesk) → heading (`type-h2` 32/28/24, `type-quote` 36/30/24) → lead (17/16/15)
- stat (32/28/26, tabular) → title (15) → caption (13)
- display (48/40/30) only in the hero; statement (26/22/19) only on About

## 3. Layout

- **One screen at a time.** The home page is a snap-scrolling column of full-viewport screens. Every screen
  fits the viewport and nothing scrolls inside it, on every device the e2e suite runs.
- **One column** (`container-screen`): `min(87.5vw, 880px)` on desktops, `680px` on tablets, `420px` on phones.
- **Breakpoints:** phones ≤ 734px, tablets 735–1068px, desktops ≥ 1069px. The global nav's links move into a
  full-screen menu below 834px. The side rail appears from 1180px.
- **Short screens** trim secondary details instead of scrolling: `short-phone` (≤734 × ≤720, or ≤380 × ≤800)
  hides tags, stage metadata and project headers and tightens type; `tiny` (≤380 × ≤720) trims further;
  `short-tablet` and `short-laptop` shrink the highlight tiles; `shorter-laptop` lowers the project stage.
- Every screen ends with a footer: previous ↑ · `NN / 11` · next ↓ (the last carries the colophon).

## 4. Components

- **Buttons:** 40px pills (`solid`, `ghost`, `soft`), 30px small ones in navs; contact card buttons on paper.
- **Segmented switch:** a pill slides under the chosen option; timed switches fill the pill while they wait
  (skills: 4.5s per group, with previous / next / pause).
- **Highlight tiles:** outlined; "+" turns a tile over to the detail and a figure drawn to scale.
- **Mock windows** on the side-project stages; Share On's lifecycle is driven by a draggable bar (keys too).
- **Contact card:** always dark, with a moving shine border and a pointer spotlight.

## 5. Navigation

- Global nav at the top of the first screen (and the articles page): monogram, Articles ↗, Get in touch, theme.
- From the second screen a translucent local nav slides in: name, position (≥1180), Articles (≥1069) or an
  Explore menu of every screen (below), Get in touch, theme.
- Side rail (≥1180): ▲, a dot per screen with tooltips, ▼.
- Keys: ↑/↓ and Page Up/Down move a screen; **T** switches the theme; Esc closes menus.

## 6. Motion

- Reveal: content rises 24px and fades in, 90ms apart, the first time its screen opens.
- Numbers roll like a counter each time their screen opens.
- Theme: a disc grows from the button with a band of sky colours (sunset to dark, sunrise to light), the theme
  swaps under it, then it fades (1.5s + 1.5s).
- "Coming soon.": letters lift off, scramble and drift on hover, then re-type as they settle.
- Web and mobile: the browser and phone explode layer by layer on arrival and stack back when you leave.
- `prefers-reduced-motion` stops all of it; content is simply there.
