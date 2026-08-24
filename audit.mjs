// Site audit: integrity checks beyond smoke/page/data verification.
// All checks are offline and deterministic; external link rot lives in
// scripts/linkcheck.mjs because it needs network access.
//
// Covers: cache-bust stamp uniformity, internal link/anchor resolution,
// duplicate ids, module wiring (orphans), drawer topic reachability,
// glossary-term -> vocabulary coverage, Bible canon order, quiz duplicate
// detection, resource group validity, roadmap prerequisite cycles, and
// accessibility spot checks (aria refs, label/for pairing, heading order,
// button accessible names, viewport/lang/meta presence).
import { readdir, readFile } from 'node:fs/promises';

const root = new URL('./', import.meta.url);
const problems = [];
const notes = [];
const read = (f) => readFile(new URL(f, root), 'utf8');

const pages = [
  'index.html', 'resources.html', 'poetry.html', 'prayer.html', 'reference.html',
  'quiz-study.html', 'roadmap.html', 'quizzes.html',
  'quizzes/starter.html', 'quizzes/intermediate.html', 'quizzes/expert.html',
];
const jsFiles = (await readdir(root)).filter((f) => f.endsWith('.js'));
const html = {};
for (const f of pages) html[f] = await read(f);
const allHtml = Object.values(html).join('\n');

function resolvePath(fromFile, href) {
  const path = href.split('#')[0];
  if (!path || /^[a-z]+:/i.test(path) || path.startsWith('//')) return null;
  const parts = fromFile.split('/').slice(0, -1);
  for (const seg of path.split('/')) {
    if (seg === '.' || seg === '') continue;
    if (seg === '..') parts.pop();
    else parts.push(seg);
  }
  return parts.join('/');
}

// ---- Cache-bust stamps ------------------------------------------------------
{
  const stamps = new Set();
  for (const src of Object.values(html)) {
    for (const m of src.matchAll(/(?:styles\.css|\.js)\?v=([\w-]+)/g)) stamps.add(m[1]);
  }
  if (stamps.size !== 1) problems.push(`inconsistent cache-bust stamps: ${[...stamps].join(', ')}`);
  else if (!/^\d{8}-\d+$/.test([...stamps][0])) problems.push(`malformed stamp "${[...stamps][0]}" (want YYYYMMDD-N)`);
}

// ---- Internal references & fragments -----------------------------------------
{
  // Reference-tab anchors are handled client-side by reference.js (see
  // parseHash/tabAliases); they have no static ids by design.
  const jsOnlyTabs = new Set(['vocabulary', 'books', 'people', 'locations', 'timeline', 'versions', 'traditions', 'prayer']);
  const idIndex = {};
  for (const [f, src] of Object.entries(html)) {
    idIndex[f] = new Set([...src.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
    const seen = new Map();
    for (const m of src.matchAll(/\bid="([^"]+)"/g)) seen.set(m[1], (seen.get(m[1]) ?? 0) + 1);
    for (const [id, n] of seen) if (n > 1) problems.push(`${f}: duplicate id "${id}" x${n}`);
  }
  let count = 0;
  for (const [f, src] of Object.entries(html)) {
    for (const m of src.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const raw = m[1];
      if (/^(mailto:|data:|https?:)/.test(raw)) continue;
      count++;
      const target = resolvePath(f, raw);
      const frag = raw.includes('#') ? raw.split('#')[1] : null;
      if (target && !html[target]) {
        try {
          await readFile(new URL(target, root));
          continue;
        } catch {
          problems.push(`${f}: broken reference "${raw}"`);
          continue;
        }
      }
      if (!frag) continue;
      const targetFile = target ?? f;
      if (!idIndex[targetFile]?.has(frag)) {
        if (!(targetFile === 'reference.html' && jsOnlyTabs.has(frag))) {
          problems.push(`${f}: dead anchor "${raw}"`);
        }
      }
    }
  }
  notes.push(`${count} internal references resolved`);
}

// ---- Module wiring -------------------------------------------------------------
{
  const referenced = new Set();
  for (const [name, src] of [
    ...Object.entries(html),
    ...(await Promise.all(jsFiles.map(async (j) => [j, await read(j)]))),
  ]) {
    for (const m of src.matchAll(/(?:from\s+['"]|src=['"]|import\s+['"])([^'"]+\.js)/g)) {
      const base = m[1].split('/').pop();
      referenced.add(base);
    }
  }
  for (const j of jsFiles) {
    if (!referenced.has(j) && j !== 'audit.js') problems.push(`orphan module: ${j}`);
  }
}

// ---- Data integrity ---------------------------------------------------------------
const { referenceData } = await import(new URL('./reference-data.js', import.meta.url));
const { resources, resourceGroups } = await import(new URL('./resource-data.js', import.meta.url));
const { drawerTopics } = await import(new URL('./drawer-data.js', import.meta.url));
const { bibleBooks } = await import(new URL('./books-data.js', import.meta.url));
const { firstSevenDays } = await import(new URL('./first-path-data.js', import.meta.url));

{
  // Bible canon order (NIV naming: "Song of Songs")
  const canon = [
    'Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles','Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Songs','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi',
    'Matthew','Mark','Luke','John','Acts','Romans','1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation',
  ];
  bibleBooks.forEach((b, i) => {
    if (b.title !== canon[i]) problems.push(`books-data position ${i + 1}: "${b.title}" != canon "${canon[i]}"`);
  });
}
{
  // Quiz duplicates: same title collides on ?quiz= routing; exact dupes bloat the list.
  const byTitle = new Map();
  const exact = new Map();
  for (const q of referenceData.quizzes) {
    byTitle.set(q.title, (byTitle.get(q.title) ?? 0) + 1);
    const key = JSON.stringify(q);
    exact.set(key, (exact.get(key) ?? 0) + 1);
    for (const item of q.questions ?? []) {
      if (!item.prompt?.trim() || !item.answer?.trim()) problems.push(`quiz "${q.title}": empty prompt or answer`);
    }
  }
  for (const [t, n] of byTitle) if (n > 1) problems.push(`quiz title used ${n}x: "${t}"`);
  for (const [k, n] of exact) if (n > 1) problems.push(`quiz object duplicated ${n}x (title: ${JSON.parse(k).title})`);
  notes.push(`${referenceData.quizzes.length} quizzes checked`);
}
{
  const keys = new Set(resourceGroups.map((g) => g.key));
  for (const r of resources) {
    const cats = Array.isArray(r.category) ? r.category.flat() : [r.category];
    for (const c of cats) {
      if (c && !keys.has(c)) problems.push(`resource "${r.title}": unknown category "${c}"`);
    }
  }
}
{
  // Every drawer topic must be openable: either a static trigger in HTML or a
  // day card in the first-seven-days path that requests it.
  const vocabTitles = new Set(referenceData.reference.map((v) => v.title));
  const triggers = new Set([...allHtml.matchAll(/data-drawer-open="([^"]+)"/g)].map((m) => m[1]));
  for (const day of firstSevenDays) if (day.drawerTopic) triggers.add(day.drawerTopic);
  for (const key of Object.keys(drawerTopics)) {
    if (!triggers.has(key)) problems.push(`drawer topic "${key}" has no trigger anywhere`);
  }
  // Glossary buttons emitted into drawer bodies must land on real vocabulary entries.
  for (const [key, topic] of Object.entries(drawerTopics)) {
    const body = typeof topic === 'string' ? topic : (topic.body ?? '');
    for (const m of body.matchAll(/data-glossary-term="([^"]+)"/g)) {
      if (!vocabTitles.has(m[1])) problems.push(`drawer "${key}" glossary term "${m[1]}" missing from vocabulary`);
    }
  }
}
{
  const { roadmapNodes } = await import(new URL('./roadmap-data.js', import.meta.url));
  const byId = new Map(roadmapNodes.map((n) => [n.id, n]));
  const state = new Map();
  let cyclic = false;
  const visit = (id) => {
    if (state.get(id) === 'visiting') { problems.push(`roadmap prerequisite cycle through "${id}"`); cyclic = true; return; }
    if (state.get(id)) return;
    state.set(id, 'visiting');
    for (const p of byId.get(id)?.prerequisites ?? []) visit(p);
    state.set(id, 'done');
  };
  roadmapNodes.forEach((n) => visit(n.id));
  if (!cyclic) notes.push(`roadmap acyclic (${roadmapNodes.length} nodes)`);
}

// ---- Accessibility spot checks -------------------------------------------------------
for (const [f, src] of Object.entries(html)) {
  for (const m of src.matchAll(/aria-(?:controls|labelledby|describedby)="([^"]+)"/g)) {
    for (const id of m[1].split(/\s+/)) {
      if (!src.includes(`id="${id}"`) && !(f === 'reference.html' && id === 'reference-panel')) {
        problems.push(`${f}: aria ref to missing id "${id}"`);
      }
    }
  }
  for (const m of src.matchAll(/<label[^>]*\bfor="([^"]+)"/g)) {
    if (!src.includes(`id="${m[1]}"`)) problems.push(`${f}: <label for="${m[1]}"> targets nothing`);
  }
  let prev = 0;
  for (const m of src.matchAll(/<h([1-6])[\s>]/g)) {
    const lvl = Number(m[1]);
    if (prev && lvl > prev + 1) problems.push(`${f}: heading skip h${prev} -> h${lvl}`);
    prev = lvl;
  }
  for (const m of src.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)) {
    const inner = m[2].replace(/<[^>]+>/g, '').trim();
    if (!inner && !/aria-label=/.test(m[1])) problems.push(`${f}: button without accessible name`);
  }
  if (!/<html lang="/.test(src)) problems.push(`${f}: missing lang attribute`);
  if (!/<meta name="viewport"/.test(src)) problems.push(`${f}: missing viewport meta`);
  if (!/<meta\s+name="description"/.test(src)) problems.push(`${f}: missing meta description`);
  for (const m of src.matchAll(/<img\b([^>]*)>/g)) {
    if (!/\balt=/.test(m[1])) problems.push(`${f}: <img> without alt`);
  }
}

console.log('audit notes:');
notes.forEach((n) => console.log('  • ' + n));
if (problems.length) {
  console.error(`audit failed (${problems.length}):`);
  problems.forEach((p) => console.error('  ✗ ' + p));
  process.exit(1);
}
console.log('site audit ok');
