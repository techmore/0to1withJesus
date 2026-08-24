// External link rot check. Network-dependent, so it is NOT part of npm test;
// run it with `npm run audit:links` (or make audit-links) when outbound
// resources change. Bare-domain preconnect hints (fonts.googleapis.com,
// fonts.gstatic.com) are skipped: they 404 on root by design.
import { readFile } from 'node:fs/promises';

const root = new URL('./', import.meta.url);
const pages = [
  'index.html', 'resources.html', 'poetry.html', 'prayer.html', 'reference.html',
  'quiz-study.html', 'roadmap.html', 'quizzes.html',
  'quizzes/starter.html', 'quizzes/intermediate.html', 'quizzes/expert.html',
];
const skipHosts = new Set(['fonts.googleapis.com', 'fonts.gstatic.com']);

const urls = new Map();
for (const f of pages) {
  const src = await readFile(new URL(f, root), 'utf8');
  for (const m of src.matchAll(/(?:href|src)="(https?:\/\/[^"]+)"/g)) {
    let host;
    try { host = new URL(m[1]).host; } catch { continue; }
    if (skipHosts.has(host)) continue;
    if (!urls.has(m[1])) urls.set(m[1], []);
    urls.get(m[1]).push(f);
  }
}
console.log(`checking ${urls.size} unique external urls...`);

const bad = [];
let i = 0;
for (const [url, where] of urls) {
  i++;
  process.stdout.write(`${i}/${urls.size}\r`);
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; site-link-check)' },
    });
    clearTimeout(timer);
    if (!res.ok) bad.push(`${res.status} ${url}  [${[...new Set(where)].join(',')}]`);
  } catch (e) {
    bad.push(`${String(e.cause?.code ?? e.name).slice(0, 24)} ${url}  [${[...new Set(where)].join(',')}]`);
  }
}
console.log('');
if (bad.length) {
  console.error(`link check failed (${bad.length} of ${urls.size}):`);
  bad.forEach((b) => console.error('  ✗ ' + b));
  process.exit(1);
}
console.log(`all ${urls.size} external links healthy`);
