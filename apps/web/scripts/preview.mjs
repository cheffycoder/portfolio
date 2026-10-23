// Serves out/ the way GitHub Pages does: under the base path, folders as index.html, and the site's own
// 404.html (with a 404 status) for anything unknown. `pnpm preview` and the e2e tests use it.
import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('../out', import.meta.url));
const PORT = Number(process.env.PORT ?? 4173);
const BASE = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

const fileAt = (path) => {
  try {
    const stat = statSync(path);
    if (stat.isFile()) return path;
    if (stat.isDirectory()) return fileAt(join(path, 'index.html'));
  } catch {
    // not found
  }
  return null;
};

const send = (res, status, file) => {
  res.writeHead(status, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
};

createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const path = decodeURIComponent(url.pathname);
  if (BASE && path === BASE) {
    res.writeHead(301, { location: `${BASE}/` }).end();
    return;
  }
  const inside = BASE ? (path.startsWith(`${BASE}/`) ? path.slice(BASE.length) : null) : path;
  const file = inside === null ? null : fileAt(join(OUT, normalize(inside)));
  if (file && file.startsWith(OUT)) {
    // A folder without its trailing slash redirects, as GitHub Pages does.
    if (!path.endsWith('/') && file.endsWith('index.html') && !path.endsWith('.html')) {
      res.writeHead(301, { location: `${path}/` }).end();
      return;
    }
    send(res, 200, file);
    return;
  }
  send(res, 404, join(OUT, '404.html'));
}).listen(PORT, () => {
  console.log(`Serving out/ at http://localhost:${PORT}${BASE}/`);
});
