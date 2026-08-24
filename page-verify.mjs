import { readFile } from 'node:fs/promises';
import { prayerSection, prayerCard } from './app-prayer.js';
import { prayerSections } from './prayer-data.js';

// Canonical site chrome. Pages copy these blocks verbatim; this test keeps the
// copies from drifting apart. If you intentionally change site navigation,
// update the lists here in the same commit.
const primaryNav = [
  ['./index.html#start-here', 'Start Here'],
  ['./index.html#bible-in-a-year', 'Bible in a Year'],
  ['./poetry.html', 'Poetry'],
  ['./resources.html', 'Resources'],
  ['./prayer.html', 'Prayer'],
  ['./roadmap.html', 'Roadmap'],
];

const referenceNav = [
  ['./reference.html#vocabulary', 'Vocabulary'],
  ['./reference.html#books', 'Books'],
  ['./prayer.html', 'Prayer'],
  ['./reference.html#people', 'People'],
  ['./reference.html#locations', 'Locations'],
  ['./reference.html#timeline', 'Timeline'],
  ['./reference.html#versions', 'Versions'],
  ['./reference.html#traditions', 'Traditions'],
  ['./quizzes.html', 'Quizzes'],
];

const pages = [
  { file: 'index.html', title: 'Jesus Guide | Bible Study Welcome Guide', entry: './page-home.js' },
  { file: 'resources.html', title: 'Resources | Jesus Guide', entry: './page-resources.js' },
  { file: 'poetry.html', title: 'Poetry | Jesus Guide', entry: './page-poetry.js' },
  { file: 'prayer.html', title: 'Prayer Guide | Jesus Guide', entry: './page-prayer.js' },
  { file: 'reference.html', title: 'Reference Guide | Jesus Guide', entry: './reference.js' },
  { file: 'quiz-study.html', title: 'Quiz Study Guide | Jesus Guide', entry: './quiz-study.js' },
  { file: 'roadmap.html', title: 'Mastery Roadmap | Jesus Guide', entry: './roadmap.js' },
  { file: 'quizzes.html', title: 'Quiz Hub | Jesus Guide', entry: null },
  { file: 'quizzes/starter.html', title: 'Starter Quizzes | Jesus Guide', entry: '../reference.js' },
  { file: 'quizzes/intermediate.html', title: 'Intermediate Quizzes | Jesus Guide', entry: '../reference.js' },
  { file: 'quizzes/expert.html', title: 'Expert Quizzes | Jesus Guide', entry: '../reference.js' },
];

function resolveLinks(file, links) {
  const prefix = file.includes('/') ? '../' : './';
  return links.map(([href, label]) => [href.replace(/^\.\//, prefix), label]);
}


const stamps = new Set();

for (const { file, title, entry } of pages) {
  const html = await readFile(new URL(`./${file}`, import.meta.url), 'utf8');

  if (!html.includes(`<title>${title}</title>`)) {
    throw new Error(`${file} is missing <title>${title}</title>`);
  }

  if (entry) {
    const scriptMatch = html.match(/<script type="module" src="([^"?]+)/);
    if (!scriptMatch || !scriptMatch[1].startsWith(entry)) {
      throw new Error(`${file} should load ${entry}`);
    }
    // Subdirectory pages load ../reference.js; root pages ./something.js.
  }

  // Cache-busting stamp must be present and uniform across pages.
  for (const match of html.matchAll(/(?:styles\.css|\.js)\?v=([\w-]+)/g)) {
    stamps.add(match[1]);
  }
  if (!/v=\d{8}-\d+/.test(html)) {
    throw new Error(`${file} asset links are missing a ?v=YYYYMMDD-N cache-bust stamp`);
  }

  // Shared chrome that every page must have.
  if (!html.includes('<a class="skip-link" href="#top">Skip to content</a>')) {
    throw new Error(`${file} is missing the skip link`);
  }
  if (!html.includes('<footer class="footer">')) {
    throw new Error(`${file} is missing the footer`);
  }
  if (/class="backdrop/.test(html)) {
    throw new Error(`${file} still contains dead .backdrop divs`);
  }

  // Nav rows must match the canonical link lists exactly.
  const navRows = [...html.matchAll(/<nav class="topnav topnav-(primary|reference)"[^>]*>([\s\S]*?)<\/nav>/g)];
  const expectedRows = {
    primary: resolveLinks(file, primaryNav),
    reference: resolveLinks(file, referenceNav),
  };
  if (navRows.length !== 2) {
    throw new Error(`${file} must contain exactly one primary and one reference nav row`);
  }
  for (const [, kind, body] of navRows) {
    const actual = [...body.matchAll(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].map((m) => [m[1], m[2].trim()]);
    const expected = expectedRows[kind];
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`${file} ${kind} nav drifted from canonical:\n  actual:   ${JSON.stringify(actual)}\n  expected: ${JSON.stringify(expected)}`);
    }
  }
}

if (stamps.size !== 1) {
  throw new Error(`Asset cache-bust stamps are inconsistent across pages: ${[...stamps].join(', ')}`);
}

// prayer.html ships the rendered prayer sections as static no-JS fallback
// markup. The static copy must match what app-prayer.js would render from
// prayer-data.js, or the two drift apart.
{
  const html = await readFile(new URL('./prayer.html', import.meta.url), 'utf8');
  const startMarker = '<!-- prayer-sections:start';
  const endMarker = '<!-- prayer-sections:end -->';
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker);
  if (start === -1 || end === -1) {
    throw new Error('prayer.html is missing the prayer-sections start/end markers');
  }
  const bodyStart = html.indexOf('\n', start) + 1;
  const staticMarkup = html.slice(bodyStart, end).trim();
  const expectedMarkup = prayerSections.map(prayerSection).join('').trim();
  if (staticMarkup !== expectedMarkup) {
    throw new Error(
      'prayer.html static sections drifted from prayer-data.js. ' +
        'Re-render with: node -e "import(\'./app-prayer.js\').then(async (m) => { ' +
        'const { prayerSections } = await import(\'./prayer-data.js\'); ' +
        'console.log(prayerSections.map(m.prayerSection).join(\'\')); })"'
    );
  }
}

console.log('page verification ok');
