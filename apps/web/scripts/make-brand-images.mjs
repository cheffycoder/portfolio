// Renders the favicon set, app icons and the share card (Open Graph image) from HTML, with the site's own
// fonts, so they always match the design. Run after changing the name, role or colours:
//   pnpm --filter @portfolio/web brand-images
// Writes public/favicon.ico and public/{apple-icon,icon-192,icon-512,icon-maskable-512,og-image}.png.
// Uses Playwright's Chromium (pnpm test:e2e:install once).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { chromium } from '@playwright/test';

const here = (path) => fileURLToPath(new URL(path, import.meta.url));
const font = (file) => readFileSync(here(`../src/assets/fonts/${file}`)).toString('base64');

const INK = '#161616';
const PAPER = '#E9E7E0';
const PAPER_HI = '#F2F0EA';
const WARM = 'linear-gradient(120deg,#FF6B2C,#E0245E 60%,#8E1B5A)';
const COOL = 'linear-gradient(120deg,#33C3FF,#2563EB 60%,#1E3A8A)';

const fonts = `
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${font('inter-latin-variable.woff2')}) format('woff2');font-weight:100 900}
@font-face{font-family:'Space Grotesk';src:url(data:font/woff2;base64,${font('space-grotesk-latin-variable.woff2')}) format('woff2');font-weight:300 700}
*{margin:0;box-sizing:border-box}html,body{width:100%;height:100%}`;

/** The "SB" monogram: paper letters on an ink disc (or square, for icons the platform rounds itself). */
const monogram = (size, { round = true, inset = 0 } = {}) => `<!doctype html><style>${fonts}
body{display:grid;place-items:center;background:${round ? 'transparent' : INK}}
.m{width:${size - inset * 2}px;height:${size - inset * 2}px;border-radius:${round ? '50%' : '0'};background:${INK};display:grid;place-items:center;
color:${PAPER_HI};font:600 ${Math.round((size - inset * 2) * 0.4)}px/1 'Space Grotesk';letter-spacing:.02em}
</style><div class="m">SB</div>`;

const shareCard = `<!doctype html><style>${fonts}
body{background:${PAPER};color:${INK};font-family:Inter;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
.top{display:flex;align-items:center;gap:18px}
.mark{width:56px;height:56px;border-radius:50%;display:grid;place-items:center;background:rgba(22,22,22,.06);box-shadow:inset 0 0 0 1.5px rgba(22,22,22,.15);font:600 20px/1 'Space Grotesk';letter-spacing:.04em}
.label{font:500 20px/1.4 'Space Grotesk';letter-spacing:.08em;text-transform:uppercase;color:#66666B}
h1{font:600 76px/1.08 Inter;letter-spacing:-.03em;max-width:1000px}
h1 b{font-weight:600;background:linear-gradient(90deg,${INK},rgba(22,22,22,.55));-webkit-background-clip:text;color:transparent}
.foot{display:flex;align-items:flex-end;justify-content:space-between}
.name{font:600 30px/1.2 Inter;letter-spacing:-.015em}
.stack{margin-top:8px;font:400 20px/1.4 'Space Grotesk';color:#55555A}
.bars{display:flex;gap:10px}.bars i{width:72px;height:6px;border-radius:3px}
.glow{position:absolute;right:-160px;bottom:-260px;width:620px;height:620px;border-radius:50%;filter:blur(90px);opacity:.22;background:${WARM}}
.glow.c{left:-220px;top:-300px;right:auto;bottom:auto;background:${COOL};opacity:.14}
</style>
<div class="glow"></div><div class="glow c"></div>
<div class="top"><span class="mark">SB</span><span class="label">Frontend Software Engineer · Mumbai</span></div>
<h1>Building <b>fast, scalable interfaces</b> across web and mobile.</h1>
<div class="foot"><div><p class="name">Shivam Bandral</p><p class="stack">React · Next.js · React Native · TypeScript</p></div>
<div class="bars"><i style="background:${WARM}"></i><i style="background:${COOL}"></i></div></div>`;

/** A .ico holding PNG images (supported by every current browser). */
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = 6 + 16 * pngs.length;
  const entries = pngs.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const shot = async (html, width, height, omitBackground = false) => {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ omitBackground });
  await page.close();
  return png;
};

const favicons = [];
for (const size of [16, 32, 48])
  favicons.push({ size, data: await shot(monogram(size), size, size, true) });
writeFileSync(here('../public/favicon.ico'), ico(favicons));
writeFileSync(
  here('../public/apple-icon.png'),
  await shot(monogram(180, { round: false }), 180, 180),
);
writeFileSync(here('../public/icon-192.png'), await shot(monogram(192), 192, 192, true));
writeFileSync(here('../public/icon-512.png'), await shot(monogram(512), 512, 512, true));
writeFileSync(
  here('../public/icon-maskable-512.png'),
  await shot(monogram(512, { round: false, inset: 0 }), 512, 512),
);
writeFileSync(here('../public/og-image.png'), await shot(shareCard, 1200, 630));
await browser.close();
console.log('Brand images written.');
