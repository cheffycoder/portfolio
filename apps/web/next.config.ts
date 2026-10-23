import type { NextConfig } from 'next';

/**
 * The path the site is served under on GitHub Pages: "/portfolio" for a project page, "" for
 * <user>.github.io or a custom domain. CI passes the value GitHub Pages reports (docs/deploy.md).
 * The app reads the same variable through config/env, so links, images and canonicals agree.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

const config: NextConfig = {
  // Static export: `next build` writes plain HTML/CSS/JS to out/, which GitHub Pages serves as is.
  output: 'export',
  basePath,
  // /articles/ is written as articles/index.html, which every static host (GitHub Pages included) serves.
  trailingSlash: true,
  // Images are pre-sized webp files in public/, so Next's runtime image optimiser is not used.
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  // Our agent instructions live in the repo's own AGENTS.md; don't let `next dev` write another one here.
  agentRules: false,
};

export default config;
