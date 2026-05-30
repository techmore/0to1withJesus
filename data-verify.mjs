import { referenceData } from './reference-data.js';
import { sections } from './section-data.js';
import { resources, resourceGroups, resourceStarterSection } from './resource-data.js';
import { glossaryTerms } from './glossary-data.js';
import { poetryWorks } from './poetry-data.js';
import { drawerTopics } from './drawer-data.js';
import { firstSevenDays } from './first-path-data.js';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(Array.isArray(sections.overview) && sections.overview.length > 0, 'sections.overview must exist');
assert(Array.isArray(resources) && resources.length > 0, 'resources must exist');
assert(Array.isArray(resourceGroups) && resourceGroups.length > 0, 'resourceGroups must exist');
assert(resourceStarterSection && typeof resourceStarterSection.title === 'string', 'resourceStarterSection must exist');
assert(Array.isArray(glossaryTerms) && glossaryTerms.length > 0, 'glossaryTerms must exist');
assert(Array.isArray(poetryWorks) && poetryWorks.length > 0, 'poetryWorks must exist');
assert(drawerTopics && typeof drawerTopics === 'object' && Object.keys(drawerTopics).length > 0, 'drawerTopics must exist');
assert(Array.isArray(firstSevenDays) && firstSevenDays.length === 7, 'firstSevenDays must contain seven days');
assert(referenceData && typeof referenceData === 'object', 'referenceData must exist');
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
