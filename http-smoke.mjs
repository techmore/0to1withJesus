import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// A tiny static file server on an ephemeral port. This used to shell out to
// `python3 -m http.server 8000`, which failed whenever port 8000 was busy and
// made the suite depend on a Python install. Serving from Node keeps the test
// hermetic and lets several checkouts run the suite at once.
const root = fileURLToPath(new URL('.', import.meta.url)).replace(/[\\/]+$/, '');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.md': 'text/markdown; charset=utf-8',
};

const server = createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const relative = normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, '');
  const target = join(root, relative.endsWith('/') ? `${relative}index.html` : relative);
  if (!target.startsWith(root + sep) && target !== root) {
    response.writeHead(403).end();
    return;
  }
  try {
    const body = await readFile(target);
    response.writeHead(200, { 'content-type': types[extname(target)] ?? 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404).end('not found');
  }
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;

try {
  // Every served page must return 200, carry a module entry script, the shared
  // topbar script, and ship the shared stylesheet with a cache-bust stamp.
  const pages = [
    'index.html',
    'resources.html',
    'poetry.html',
    'prayer.html',
    'reference.html',
    'quiz-study.html',
    'roadmap.html',
    'quizzes/starter.html',
    'quizzes/intermediate.html',
    'quizzes/expert.html',
  ];

  for (const page of pages) {
    const response = await fetch(`${base}/${page}`);
    if (!response.ok) throw new Error(`Failed to fetch ${page}: ${response.status}`);
    const html = await response.text();
    if (!/<script type="module" src="[^"]+\?v=\d{8}-\d+">/.test(html)) {
      throw new Error(`${page} is missing a stamped module script`);
    }
    if (!/styles\.css\?v=\d{8}-\d+/.test(html)) {
      throw new Error(`${page} is missing a stamped stylesheet link`);
    }
    const topbar = html.match(/<script defer src="([^"?]+topbar\.js)\?v=\d{8}-\d+">/);
    if (!topbar) throw new Error(`${page} is missing the deferred topbar.js script`);
    const script = await fetch(new URL(topbar[1], `${base}/${page}`));
    if (!script.ok) throw new Error(`${page} links topbar.js at ${topbar[1]} but it does not resolve`);
  }

  // The static quiz hub has no module script but must still serve and ship styles.
  const hub = await (await fetch(`${base}/quizzes.html`)).text();
  if (!hub.includes('<title>Quiz Hub | Jesus Guide</title>') || !/styles\.css\?v=\d{8}-\d+/.test(hub)) {
    throw new Error('quizzes.html did not serve the expected static shell');
  }

  // Directory requests resolve to index.html, which is how GitHub Pages serves the root.
  const rootResponse = await fetch(`${base}/`);
  if (!rootResponse.ok || !(await rootResponse.text()).includes('<title>Jesus Guide |')) {
    throw new Error('server root did not resolve to index.html');
  }

  const missing = await fetch(`${base}/does-not-exist.html`);
  if (missing.status !== 404) throw new Error('missing pages should 404');

  console.log(`http smoke ok (${pages.length + 1} pages served from ${base})`);
} finally {
  server.close();
}
