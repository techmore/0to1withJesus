import { referenceData } from './reference-data.js';
import { resources, resourceGroups, resourceStarterSection } from './resource-data.js';
import { poetryWorks } from './poetry-data.js';
import { drawerTopics } from './drawer-data.js';
import { firstSevenDays } from './first-path-data.js';
import { bibleBooks } from './books-data.js';
import { roadmapNodes } from './roadmap-data.js';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(Array.isArray(resources) && resources.length > 0, 'resources must exist');
assert(Array.isArray(resourceGroups) && resourceGroups.length > 0, 'resourceGroups must exist');
assert(resourceStarterSection && typeof resourceStarterSection.title === 'string', 'resourceStarterSection must exist');
assert(Array.isArray(poetryWorks) && poetryWorks.length > 0, 'poetryWorks must exist');
assert(drawerTopics && typeof drawerTopics === 'object' && Object.keys(drawerTopics).length > 0, 'drawerTopics must exist');
assert(Array.isArray(firstSevenDays) && firstSevenDays.length === 7, 'firstSevenDays must contain seven days');
assert(Array.isArray(roadmapNodes) && roadmapNodes.length > 0, 'roadmapNodes must exist');
{
  const roadmapIds = new Set(roadmapNodes.map((node) => node.id));
  assert(roadmapIds.size === roadmapNodes.length, 'roadmap node ids must be unique');
  for (const node of roadmapNodes) {
    assert(typeof node.id === 'string' && node.id, `roadmap node needs an id (${node.title})`);
    assert(typeof node.title === 'string' && node.title, `roadmap node ${node.id} needs a title`);
    assert(Array.isArray(node.prerequisites), `roadmap node ${node.id} needs a prerequisites array`);
    for (const prerequisite of node.prerequisites) {
      assert(roadmapIds.has(prerequisite), `roadmap node ${node.id} references unknown prerequisite ${prerequisite}`);
    }
  }
}
assert(Array.isArray(bibleBooks) && bibleBooks.length === 66, 'bibleBooks must contain the standard 66-book order');
assert(new Set(bibleBooks.map((book) => book.title)).size === bibleBooks.length, 'bible book titles must be unique');
assert(bibleBooks.slice(0, 39).every((book) => book.kicker.startsWith('Old Testament')), 'the first 39 Bible books must be Old Testament books');
assert(bibleBooks.slice(39).every((book) => book.kicker.startsWith('New Testament')), 'the final 27 Bible books must be New Testament books');
for (const book of bibleBooks) {
  assert(typeof book.title === 'string' && book.title.length > 0, 'Bible book title must exist');
  assert(typeof book.summary === 'string' && book.summary.length > 0, `Bible book summary must exist for ${book.title}`);
  assert(typeof book.detail === 'string' && book.detail.length > 0, `Bible book detail must exist for ${book.title}`);
}
assert(referenceData && typeof referenceData === 'object', 'referenceData must exist');
assert(Array.isArray(referenceData.books) && referenceData.books.length === bibleBooks.length, 'reference books must be wired to bibleBooks');
assert(Array.isArray(referenceData.reference) && referenceData.reference.length > 0, 'reference vocabulary must exist');
assert(Array.isArray(referenceData.people) && referenceData.people.length > 0, 'reference people must exist');
assert(Array.isArray(referenceData.locations) && referenceData.locations.length > 0, 'reference locations must exist');
assert(Array.isArray(referenceData.timeline) && referenceData.timeline.length > 0, 'reference timeline must exist');
assert(Array.isArray(referenceData.versions) && referenceData.versions.length > 0, 'reference versions must exist');
assert(Array.isArray(referenceData.traditions) && referenceData.traditions.length > 0, 'reference traditions must exist');
assert(Array.isArray(referenceData.quizzes) && referenceData.quizzes.length > 0, 'reference quizzes must exist');

for (const quiz of referenceData.quizzes) {
  assert(typeof quiz.title === 'string' && quiz.title.length > 0, 'quiz title must exist');
  assert(Array.isArray(quiz.questions) && quiz.questions.length > 0, `quiz questions must exist for ${quiz.title}`);
}

console.log('data verification ok');
