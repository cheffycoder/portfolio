# Features

Code for one area of the site, one folder per feature (Bulletproof React). Inside a feature, every piece is
a module folder with role files (docs/code-structure.md), e.g. `home/time-bar/time-bar.view.tsx`.

- `home`: the eleven screens of the home page (intro, about, numbers, the two roles, web and mobile, the two side
  projects, skills, writing, contact) and their parts (clock strip, highlight tiles, file lifecycle bar…).
- `articles`: the articles page (a "coming soon" screen until the first article ships).

Rules (enforced by lint):

- A feature never imports another feature. Compose features in `src/app`.
- Features may import shared code (`components`, `lib`, `utils`, `config`, `types`).
- Shared code never imports features or `src/app`.
