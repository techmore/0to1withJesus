import { readFile } from 'node:fs/promises';

const requiredModules = [
  './link-helpers.js',
  './render-utils.js',
  './section-data.js',
  './resource-data.js',
  './glossary-data.js',
  './poetry-data.js',
  './drawer-data.js',
  './first-path-data.js',
  './app-view.js',
  './app-ui.js',
  './app-resources.js',
  './app-path.js',
  './app-glossary.js',
  './app-poetry.js',
  './app.js',
  './reference-data.js',
  './reference-view.js',
  './reference.js',
  './quiz-study.js',
];

const entrypoints = [
  ['index.html', './app.js'],
  ['resources.html', './app.js'],
  ['poetry.html', './app.js'],
  ['reference.html', './reference.js'],
  ['quiz-study.html', './quiz-study.js'],
  ['roadmap.html', './roadmap.js'],
];

for (const modulePath of requiredModules) {
  await import(new URL(modulePath, import.meta.url));
}

for (const [fileName, expectedScript] of entrypoints) {
  const html = await readFile(new URL(`./${fileName}`, import.meta.url), 'utf8');
  if (!html.includes(`src="${expectedScript}`)) {
    throw new Error(`${fileName} is missing ${expectedScript}`);
  }
}

console.log('smoke test ok');
