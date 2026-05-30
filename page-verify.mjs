import { readFile } from 'node:fs/promises';

const pages = [
  {
    file: 'index.html',
    includes: ['<title>Jesus Guide | Bible Study Welcome Guide</title>', 'src="./app.js?v=20260510-1"'],
  },
  {
    file: 'resources.html',
    includes: ['<title>Resources | Jesus Guide</title>', 'src="./app.js?v=20260510-1"'],
  },
  {
    file: 'poetry.html',
    includes: ['<title>Poetry | Jesus Guide</title>', 'src="./app.js?v=20260510-1"'],
  },
  {
    file: 'reference.html',
    includes: ['<title>Reference Guide | Jesus Guide</title>', 'src="./reference.js?v=20260524-1"'],
  },
  {
    file: 'roadmap.html',
    includes: ['<title>Mastery Roadmap | Jesus Guide</title>', 'src="./roadmap.js?v=20260509-1"'],
  },
];

for (const { file, includes } of pages) {
  const html = await readFile(new URL(`./${file}`, import.meta.url), 'utf8');
  for (const expected of includes) {
    if (!html.includes(expected)) {
      throw new Error(`${file} is missing ${expected}`);
    }
  }
}

console.log('page verification ok');
