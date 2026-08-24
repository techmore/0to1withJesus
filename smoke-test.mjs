import { readdir } from 'node:fs/promises';
import { readFile } from 'node:fs/promises';

// roadmap.js resolves React/React Flow through an import map (browser-only).
// audit.mjs and linkcheck.mjs are standalone scripts, not site modules;
// linkcheck performs network requests so it must never run inside the suite.
const EXCLUDED = new Set(['roadmap.js', 'audit.mjs', 'linkcheck.mjs']);

const localModules = (await readdir(new URL('.', import.meta.url)))
  .filter((name) => name.endsWith('.js') && !EXCLUDED.has(name));

if (localModules.length === 0) throw new Error('No JS modules found');

for (const moduleName of localModules) {
  await import(new URL(`./${moduleName}`, import.meta.url));
}

// The browser-only entry must still be wired into its page.
const roadmapPage = await readFile(new URL('./roadmap.html', import.meta.url), 'utf8');
if (!roadmapPage.includes('<script type="module" src="./roadmap.js')) {
  throw new Error('roadmap.html does not load ./roadmap.js');
}

// Pages that need scripting must wire their entry through type="module".
// quizzes.html is a static hub page and carries no script.
const pages = [
  'index.html',
  'resources.html',
  'poetry.html',
  'prayer.html',
  'reference.html',
  'quiz-study.html',
  'quizzes/starter.html',
  'quizzes/intermediate.html',
  'quizzes/expert.html',
];

const expectedEntry = {
  'index.html': './page-home.js',
  'resources.html': './page-resources.js',
  'poetry.html': './page-poetry.js',
  'prayer.html': './page-prayer.js',
  'reference.html': './reference.js',
  'quiz-study.html': './quiz-study.js',
};

for (const page of pages) {
  const html = await readFile(new URL(`./${page}`, import.meta.url), 'utf8');
  const scriptMatch = html.match(/<script type="module" src="([^"?]+)/);
  if (!scriptMatch) {
    throw new Error(`${page} is missing a module script`);
  }
  const prefix = expectedEntry[page] ?? '../reference.js';
  if (!scriptMatch[1].startsWith(prefix)) {
    throw new Error(`${page} should load ${prefix} but loads ${scriptMatch[1]}`);
  }
}

console.log(`smoke test ok (${localModules.length} modules import cleanly)`);
