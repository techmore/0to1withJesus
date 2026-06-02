import { escapeHtml } from './render-utils.js';

export function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function asText(value, fallback = "") {
  return typeof value === "string" ? value : value == null ? fallback : String(value);
}

function quizQuestions(item) {
  return asArray(item.questions).filter((question) => question && (asText(question.prompt) || asText(question.answer)));
}

function quizQuestionPrompt(question) {
  return asText(question?.prompt, "Question");
}

function quizQuestionAnswer(question) {
  return asText(question?.answer);
}

function quizQuestionId(title, index) {
  return `${slugify(title)}-q${index + 1}`;
}

function quizStudyLinkLabel(track) {
  return track === "starter" ? "Start with map" : "Study guide";
}

function searchable(item) {
  const questions = quizQuestions(item);
  return [
    asText(item.title),
    asText(item.kicker),
    asText(item.summary),
    asText(item.detail),
    asText(item.start),
    ...asArray(item.tags),
    ...questions.flatMap((question) => [asText(question?.prompt), asText(question?.answer)]),
  ]
    .join(" ")
    .toLowerCase();
}

export function referenceCard(item, options = {}) {
  const title = asText(item.title, "Untitled entry");
  const kicker = asText(item.kicker, "Reference");
  const summary = asText(item.summary);
  const detail = asText(item.detail);
  const start = asText(item.start);
  const tagMarkup = asArray(item.tags).map((tag) => `<span class="pill">${escapeHtml(tag)}</span>`).join("");
  const questions = quizQuestions(item);
  const quizTrack = questions.length ? quizTrackForItem(item) : "";
  const studyGuidePathPrefix = asText(options.quizGuidePathPrefix, "");
  const questionNavMarkup = questions.length
    ? `
      <nav class="quiz-question-nav" aria-label="${escapeHtml(title)} questions">
        <span>Jump to</span>
        ${questions
          .map(
            (_, index) =>
              `<a class="chip" href="#${escapeHtml(quizQuestionId(title, index))}">${index + 1}</a>`,
          )
          .join("")}
      </nav>
    `
    : "";
  const studyGuideMarkup = quizTrack && studyGuidePathPrefix !== undefined
    ? `
      <div class="reference-card-actions">
        <a class="button button-secondary" href="${escapeHtml(`${studyGuidePathPrefix}quiz-study.html?quiz=${encodeURIComponent(slugify(title))}&track=${encodeURIComponent(quizTrack)}`)}">${escapeHtml(quizStudyLinkLabel(quizTrack))}</a>
      </div>
    `
    : "";
  const questionMarkup = questions.length
    ? `
      <div class="quiz-questions quiz-questions-vertical">
        ${questions
          .map(
            (question, index) => `
              <details class="quiz-question quiz-question-item" id="${escapeHtml(quizQuestionId(title, index))}">
                <summary>
                  <span>Question ${index + 1}</span>
                  <strong>${escapeHtml(quizQuestionPrompt(question))}</strong>
                </summary>
                <p>${escapeHtml(quizQuestionAnswer(question))}</p>
              </details>
            `,
          )
          .join("")}
      </div>
    `
    : "";

  return `
    <article class="card reference-card ${questions.length ? "quiz-card" : ""}">
      <div class="reference-card-head">
        <span class="pill">${escapeHtml(kicker)}</span>
      </div>
      <div>
        <h3>${escapeHtml(title)}</h3>
        <strong>${escapeHtml(summary)}</strong>
      </div>
      <p>${escapeHtml(detail)}</p>
      ${questionNavMarkup}
      <div class="reference-start">
        <span>Start here</span>
        <p>${escapeHtml(start)}</p>
      </div>
      ${questionMarkup}
      ${studyGuideMarkup}
      <div class="resource-meta">${tagMarkup}</div>
    </article>
  `;
}

function quizQuestionBank(items) {
  return items.flatMap((item) =>
    quizQuestions(item)
      .map((question) => ({
        source: asText(item.title, "Untitled entry"),
        scope: asText(item.kicker, "Reference"),
        prompt: asText(question.prompt, "Question"),
        answer: asText(question.answer),
        tags: asArray(item.tags),
      })),
  );
}

function quizItemsForTrack(items, state) {
  const activeTrack = state.quizTrackFilter || "all";
  return items.filter((item) => quizTrackForItem(item) === activeTrack);
}

function shuffleItems(items) {
  return [...items]
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function findQuiz(items, pattern) {
  return items.find((item) => pattern.test(asText(item.title)));
}

function quizTrackLabel(track) {
  return {
    all: "Quiz curriculum",
    starter: "Starter",
    intermediate: "Intermediate",
    expert: "Expert",
  }[track] || "Quiz track";
}

function quizTrackDescription(track) {
  return {
    all: "Browse the full quiz curriculum.",
    starter: "Move through the starter phases: Bible order, testament order, and the major sections.",
    intermediate: "Move from the section map into book-level structure and chapter practice.",
    expert: "Use chapter recall and mixed practice to test retention.",
  }[track] || "";
}

function quizTrackSummary(track) {
  return quizTrackDescription(track);
}

function quizTrackAnchor(track) {
  return {
    starter: "start with the map",
    intermediate: "move into the books",
    expert: "train your recall",
  }[track] || "quiz track";
}

function quizTrackStep(track) {
  return {
    starter: "1 of 3",
    intermediate: "2 of 3",
    expert: "3 of 3",
  }[track] || "Overview";
}

function nextQuizTrack(track) {
  return {
    all: "starter",
    starter: "intermediate",
    intermediate: "expert",
    expert: "starter",
  }[track] || "starter";
}

function quizTrackPagePath(track) {
  return {
    starter: "./starter.html",
    intermediate: "./intermediate.html",
    expert: "./expert.html",
  }[track] || "./starter.html";
}

const starterQuizTitles = [
  "Starter Quiz: Bible book order and major sections",
  "Starter Quiz: Bible books order and sections",
  "Starter Quiz: Bible section foundations",
  "Starter Quiz: Old Testament book order",
  "Starter Quiz: New Testament book order",
  "Torah/Pentateuch Section Quiz",
  "Historical Books Section Quiz",
  "Biblical Novellas Section Quiz",
  "Wisdom Books Section Quiz",
  "Prophets Section Quiz",
  "Gospels Section Quiz",
  "Acts Section Quiz",
  "Letters Section Quiz",
  "Catholic Letters Section Quiz",
  "Revelation Section Quiz",
];

const intermediateQuizTitles = [
  "Genesis Book Quiz",
  "Exodus Book Quiz",
  "Leviticus Book Quiz",
  "Numbers Book Quiz",
  "Deuteronomy Book Quiz",
  "Joshua Book Quiz",
  "Judges Book Quiz",
  "Ruth Book Quiz",
  "1 Samuel Book Quiz",
  "2 Samuel Book Quiz",
  "Samuel Book Quiz",
  "1 Kings Book Quiz",
  "2 Kings Book Quiz",
  "Kings Book Quiz",
  "1 Chronicles Book Quiz",
  "2 Chronicles Book Quiz",
  "Chronicles Book Quiz",
  "Ezra Book Quiz",
  "Nehemiah Book Quiz",
  "Esther Book Quiz",
  "Job Book Quiz",
  "Psalms Book Quiz",
  "Proverbs Book Quiz",
  "Ecclesiastes Book Quiz",
  "Song of Songs Book Quiz",
  "Isaiah Book Quiz",
  "Jeremiah Book Quiz",
  "Lamentations Book Quiz",
  "Ezekiel Book Quiz",
  "Daniel Book Quiz",
  "Hosea Book Quiz",
  "Joel Book Quiz",
  "Amos Book Quiz",
  "Obadiah Book Quiz",
  "Jonah Book Quiz",
  "Micah Book Quiz",
  "Nahum Book Quiz",
  "Habakkuk Book Quiz",
  "Zephaniah Book Quiz",
  "Haggai Book Quiz",
  "Zechariah Book Quiz",
  "Malachi Book Quiz",
  "Matthew Book Quiz",
  "Mark Book Quiz",
  "Luke Book Quiz",
  "John Book Quiz",
  "Acts Book Quiz",
  "Romans Book Quiz",
  "1 Corinthians Book Quiz",
  "2 Corinthians Book Quiz",
  "Galatians Book Quiz",
  "Ephesians Book Quiz",
  "Philippians Book Quiz",
  "Colossians Book Quiz",
  "1 Thessalonians Book Quiz",
  "2 Thessalonians Book Quiz",
  "1 Timothy Book Quiz",
  "2 Timothy Book Quiz",
  "Titus Book Quiz",
  "Philemon Book Quiz",
  "Hebrews Book Quiz",
  "James Book Quiz",
  "1 Peter Book Quiz",
  "2 Peter Book Quiz",
  "1 John Book Quiz",
  "2 John Book Quiz",
  "3 John Book Quiz",
  "Jude Book Quiz",
  "Revelation Book Quiz",
];

const expertQuizTitles = [
  "Prayer and Approved Prayers Quiz",
  "Gospel of John Book Quiz",
  "Romans and Ephesians Doctrine Quiz",
  "Locations and Timeline Quiz",
  "Vocabulary Foundations Quiz",
  "Worship and Temple Vocabulary Quiz",
  "People of Genesis and Exodus Quiz",
  "Kings and Prophets People Quiz",
  "Women of the Bible Starter Quiz",
  "Old Testament Timeline Quiz",
  "New Testament Timeline Quiz",
  "Biblical Geography Quiz",
  "Gospels Overview Quiz",
  "Acts Mission Quiz",
  "Paul's Churches Quiz",
  "Prophets and Exile Quiz",
  "Wisdom and Prayer Quiz",
  "Revelation and New Creation Quiz",
  "John 18-21 Quiz",
];

function matchesAnyTitle(title, titles) {
  return titles.some((entry) => title === entry);
}

function matchesChapterQuiz(title) {
  return /^(Genesis|Exodus|Numbers|Deuteronomy|Joshua|Judges|Ruth|1 Samuel|2 Samuel|1 Kings|2 Kings|1 Chronicles|2 Chronicles|Ezra|Nehemiah|Esther|Job|Psalms?|Proverbs|Ecclesiastes|Song of Songs|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|1 Corinthians|2 Corinthians|Galatians|Ephesians|Philippians|Colossians|1 Thessalonians|2 Thessalonians|1 Timothy|2 Timothy|Titus|Philemon|Hebrews|James|1 Peter|2 Peter|1 John|2 John|3 John|Jude|Revelation) \d+ Quiz$/i.test(title);
}

export function quizTrackForItem(item) {
  const title = asText(item.title);
  if (matchesAnyTitle(title, starterQuizTitles)) {
    return "starter";
  }
  if (matchesAnyTitle(title, intermediateQuizTitles) || matchesChapterQuiz(title)) {
    return "intermediate";
  }
  if (matchesAnyTitle(title, expertQuizTitles)) {
    return "expert";
  }
  return "expert";
}

function quizSectionCard(item) {
  const title = asText(item.title, "Untitled quiz");
  const kicker = asText(item.kicker, "Quiz");
  return `
    <a class="quiz-toc-card" href="#${escapeHtml(slugify(title))}">
      <span>${escapeHtml(kicker)}</span>
      <strong>${escapeHtml(title)}</strong>
      <small>${quizQuestions(item).length} questions</small>
    </a>
  `;
}

const chapterCounts = {
  Genesis: 50,
  Exodus: 40,
  Leviticus: 27,
  Numbers: 36,
  Deuteronomy: 34,
  Joshua: 24,
  Judges: 21,
  Ruth: 4,
  "1 Samuel": 31,
  "2 Samuel": 24,
  "1 Kings": 22,
  "2 Kings": 25,
  "1 Chronicles": 29,
  "2 Chronicles": 36,
  Ezra: 10,
  Nehemiah: 13,
  Esther: 10,
  Job: 42,
  Psalms: 150,
  Psalm: 150,
  Proverbs: 31,
  Ecclesiastes: 12,
  "Song of Songs": 8,
  Isaiah: 66,
  Jeremiah: 52,
  Lamentations: 5,
  Ezekiel: 48,
  Daniel: 12,
  Hosea: 14,
  Joel: 3,
  Amos: 9,
  Obadiah: 1,
  Jonah: 4,
  Micah: 7,
  Nahum: 3,
  Habakkuk: 3,
  Zephaniah: 3,
  Haggai: 2,
  Zechariah: 14,
  Malachi: 4,
  Matthew: 28,
  Mark: 16,
  Luke: 24,
  John: 21,
  Acts: 28,
  Romans: 16,
  "1 Corinthians": 16,
  "2 Corinthians": 13,
  Galatians: 6,
  Ephesians: 6,
  Philippians: 4,
  Colossians: 4,
  "1 Thessalonians": 5,
  "2 Thessalonians": 3,
  "1 Timothy": 6,
  "2 Timothy": 4,
  Titus: 3,
  Philemon: 1,
  Hebrews: 13,
  James: 5,
  "1 Peter": 5,
  "2 Peter": 3,
  "1 John": 5,
  "2 John": 1,
  "3 John": 1,
  Jude: 1,
  Revelation: 22,
};

function chapterQuizParts(title) {
  const match = asText(title).match(/^(.+) (\d+) Quiz$/);
  return match ? { book: match[1], chapter: Number(match[2]) } : null;
}

function isValidQuizItem(item) {
  const parts = chapterQuizParts(item?.title);
  if (!parts) return true;
  const maxChapter = chapterCounts[parts.book];
  return !maxChapter || parts.chapter <= maxChapter;
}

function uniqueQuizItems(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!isValidQuizItem(item)) return false;
    const title = asText(item.title);
    if (!title) return true;
    if (seen.has(title)) return false;
    seen.add(title);
    return true;
  });
}

function starterPhaseForItem(item) {
  const title = asText(item.title);
  if (/Old Testament book order|New Testament book order/i.test(title)) {
    return "Starter Level 2: Testament order";
  }
  if (/Torah|Historical Books|Biblical Novellas|Wisdom Books|Prophets/i.test(title)) {
    return "Starter Level 3: Old Testament sections";
  }
  if (/Gospels|Acts Section|Letters|Catholic Letters|Revelation Section/i.test(title)) {
    return "Starter Level 4: New Testament sections";
  }
  return "Starter Level 1: Whole Bible map";
}

function intermediateLevelForItem(item) {
  const title = asText(item.title);
  const parts = chapterQuizParts(title);
  if (!parts) return "Overview: Whole books";
  if (/^(Genesis|Exodus)$/.test(parts.book)) return "Genesis and Exodus";
  if (/^(Numbers|Deuteronomy)$/.test(parts.book)) return "Wilderness and covenant";
  if (/^(Joshua|Judges|Ruth)$/.test(parts.book)) return "Land, judges, and Ruth";
  if (/^(1 Samuel|2 Samuel)$/.test(parts.book)) return "Samuel";
  if (/^(1 Kings|2 Kings)$/.test(parts.book)) return "Kings";
  if (/^(1 Chronicles|2 Chronicles)$/.test(parts.book)) return "Chronicles";
  if (/^Matthew$/.test(parts.book)) return "Matthew";
  if (/^Mark$/.test(parts.book)) return "Mark";
  if (/^Luke$/.test(parts.book)) return "Luke";
  if (/^John$/.test(parts.book)) return "John";
  return "Other chapter practice";
}

function expertLevelForItem(item) {
  const title = asText(item.title);
  if (/Prayer|Vocabulary|Worship|People|Timeline|Geography|Locations/i.test(title)) {
    return "Reference recall";
  }
  if (/Gospels|Acts|Paul|Prophets|Wisdom|Revelation|John|Romans/i.test(title)) {
    return "Synthesis review";
  }
  return "Mixed review";
}

function groupedQuizTocCards(trackItems, activeTrack) {
  const levelMap = {
    starter: {
      labels: [
        "Starter Level 1: Whole Bible map",
        "Starter Level 2: Testament order",
        "Starter Level 3: Old Testament sections",
        "Starter Level 4: New Testament sections",
      ],
      itemLevel: starterPhaseForItem,
    },
    intermediate: {
      labels: [
        "Overview: Whole books",
        "Genesis and Exodus",
        "Wilderness and covenant",
        "Land, judges, and Ruth",
        "Samuel",
        "Kings",
        "Chronicles",
        "Matthew",
        "Mark",
        "Luke",
        "John",
        "Other chapter practice",
      ],
      itemLevel: intermediateLevelForItem,
    },
    expert: {
      labels: [
        "Reference recall",
        "Synthesis review",
        "Mixed review",
      ],
      itemLevel: expertLevelForItem,
    },
  };
  const grouping = levelMap[activeTrack];
  if (!grouping) return `<div class="quiz-toc-grid">${trackItems.map(quizSectionCard).join("")}</div>`;

  return grouping.labels
    .map((label) => {
      const levelItems = trackItems.filter((item) => grouping.itemLevel(item) === label);
      if (!levelItems.length) return "";
      const questionCount = levelItems.reduce((sum, item) => sum + quizQuestions(item).length, 0);
      return `
        <section class="quiz-phase">
          <h5>${escapeHtml(label)} <span>${levelItems.length} sets / ${questionCount} questions</span></h5>
          <div class="quiz-toc-grid">
            ${levelItems.map(quizSectionCard).join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function nextQuizCue(activeTrack, items) {
  if (activeTrack === "starter") {
    const oldTestamentOrder = findQuiz(items, /Starter Quiz: Old Testament book order/i);
    const newTestamentOrder = findQuiz(items, /Starter Quiz: New Testament book order/i);
    return `
      <div class="quiz-path-next">
        <span class="track-pill">Next step</span>
        <div>
          <h5>Move from the map into the books</h5>
          <p>After the whole-Bible map feels clear, split the order into Old Testament and New Testament tracks.</p>
        </div>
        ${oldTestamentOrder ? `<a class="link" href="#${escapeHtml(slugify(oldTestamentOrder.title))}">Open OT order</a>` : ""}
        ${newTestamentOrder ? `<a class="link" href="#${escapeHtml(slugify(newTestamentOrder.title))}">Open NT order</a>` : ""}
      </div>
    `;
  }

  if (activeTrack === "intermediate") {
    return `
      <div class="quiz-path-next">
        <span class="track-pill">Next step</span>
        <div>
          <h5>Shift into chapter recall</h5>
          <p>Use the book and section quizzes to lock in the major Bible groupings, then move into chapter-level practice.</p>
        </div>
      </div>
    `;
  }

  if (activeTrack === "expert") {
    return `
      <div class="quiz-path-next">
        <span class="track-pill">Next step</span>
        <div>
          <h5>Use expert mode for review</h5>
          <p>Expert quizzes work best after the map and the book-level shapes already feel familiar.</p>
        </div>
      </div>
    `;
  }

  return "";
}

function trackEmptyState(state) {
  const trackLabel = quizTrackLabel(state.quizTrackFilter || "all");
  const search = state.query.trim();
  const nextTrack = nextQuizTrack(state.quizTrackFilter || "all");
  const nextLabel = quizTrackLabel(nextTrack);

  if (search) {
    return `
      <article class="card reference-empty">
        <h3>No matches in ${escapeHtml(trackLabel.toLowerCase())}</h3>
        <p>Broaden the search, switch tracks, or clear the search so the quiz browser can show the full set again.</p>
        <div class="quiz-empty-actions">
          <button class="chip" type="button" data-quiz-track-filter="${escapeHtml(nextTrack)}">Try ${escapeHtml(nextLabel)}</button>
        </div>
      </article>
    `;
  }

  return `
    <article class="card reference-empty">
      <h3>${escapeHtml(trackLabel)} is empty right now</h3>
      <p>Try another track, or use the Starter curriculum first and come back here after that.</p>
      <div class="quiz-empty-actions">
        <button class="chip" type="button" data-quiz-track-filter="starter">Open starter</button>
      </div>
    </article>
  `;
}

export function renderQuizToc(items, state = {}) {
  const fixedTrack = state.fixedQuizTrack || "";
  const activeTrack = fixedTrack || state.quizTrackFilter || "starter";
  const trackItems = uniqueQuizItems(items).filter((item) => quizTrackForItem(item) === activeTrack);
  const tocSections = trackItems.length
    ? `
      <section class="quiz-track is-active" data-quiz-track="${escapeHtml(activeTrack)}">
        <div class="quiz-toc-group-head">
          <p class="eyebrow">${escapeHtml(quizTrackLabel(activeTrack))}</p>
          <h4>${escapeHtml(quizTrackAnchor(activeTrack))}</h4>
          <p class="quiz-track-summary">${escapeHtml(quizTrackSummary(activeTrack))}</p>
        </div>
        <div class="quiz-track-groups">
          <section class="quiz-toc-group is-active" data-quiz-track="${escapeHtml(activeTrack)}">
            ${groupedQuizTocCards(trackItems, activeTrack)}
          </section>
        </div>
      </section>
    `
    : "";

  return `
    <section class="quiz-hub">
      <div class="quiz-hub-head">
        <div>
          <p class="eyebrow">Quiz curriculum</p>
          <h3>${escapeHtml(quizTrackLabel(activeTrack))} quizzes</h3>
          <p>${fixedTrack ? "Search this level and study the matching cards below." : "Search within this page’s quiz set."}</p>
        </div>
        ${fixedTrack ? "" : `<a class="link" href="./quizzes.md">Quiz planning notes</a>`}
      </div>
      ${fixedTrack ? nextQuizCue(activeTrack, items) : ""}
      <div class="quiz-toc" data-quiz-track-view>${tocSections || "<p>No quiz sets match this search yet.</p>"}</div>
      ${fixedTrack ? "" : `<p class="quiz-track-status" aria-live="polite">${escapeHtml(quizTrackLabel(activeTrack))} page.</p>`}
    </section>
  `;
}

export function renderQuizGenerator(items, state) {
  const activeTrack = state.fixedQuizTrack || state.quizTrackFilter || "starter";
  const filteredItems = quizItemsForTrack(items, { quizTrackFilter: activeTrack });
  const bank = quizQuestionBank(filteredItems);
  const quizSize = state.quizSize || "25";
  const randomQuiz = Array.isArray(state.randomQuiz) ? state.randomQuiz : [];
  const query = asText(state.query, "");
  const requested = quizSize === "all" ? bank.length : Number(quizSize);
  const availableCount = bank.length;
  const chosenCount = randomQuiz.length;
  const activeTrackLabel = quizTrackLabel(activeTrack);
  const trackStep = quizTrackStep(activeTrack);
  const nextTrack = nextQuizTrack(activeTrack);
  const nextTrackLabel = quizTrackLabel(nextTrack);
  const searchActive = Boolean(query.trim());
  const modeCopy = searchActive
    ? `Study the ${activeTrackLabel.toLowerCase()} quiz set, then use the next page when this one is solid.`
    : `Learn inside the ${activeTrackLabel.toLowerCase()} quiz set, then use the next page when this one is solid.`;
  const practiceMarkup = randomQuiz.length
    ? `
      <div class="quiz-random-list">
        ${randomQuiz
          .map(
            (question, index) => `
              <details class="quiz-question">
                <summary>
                  <span>${escapeHtml(question.source)} · ${escapeHtml(question.scope)} · ${index + 1}</span>
                  <strong>${escapeHtml(quizQuestionPrompt(question))}</strong>
                </summary>
                <p>${escapeHtml(quizQuestionAnswer(question))}</p>
              </details>
            `,
          )
          .join("")}
      </div>
    `
    : `
      <p class="quiz-empty-note">
        Generate a set when you are ready. Answers stay hidden until each question is opened.
      </p>
    `;

  return `
    <section class="quiz-generator" data-quiz-track="${escapeHtml(activeTrack)}">
      <div class="quiz-generator-controls">
        <div>
          <p class="eyebrow">Random practice</p>
          ${state.fixedQuizTrack ? "" : `<p class="quiz-generator-context"><span>${escapeHtml(activeTrackLabel)}</span><span class="is-step">Step ${escapeHtml(trackStep)}</span></p>`}
          ${state.fixedQuizTrack ? "" : `<p class="quiz-generator-mode" id="quiz-generator-mode" aria-live="polite">${escapeHtml(modeCopy)}</p>`}
          <h3>${availableCount} available questions</h3>
          <p>
            ${chosenCount
              ? `Showing ${chosenCount} question${chosenCount === 1 ? "" : "s"}${requested > availableCount ? " because the current bank is smaller than the requested set." : "."}`
              : `Use this for recall practice inside the ${activeTrackLabel.toLowerCase()} quiz set.`}
          </p>
        </div>
        <div class="quiz-generator-actions">
          <label class="quiz-size-control">
            <span>Set size</span>
            <select id="quiz-size">
              <option value="25" ${quizSize === "25" ? "selected" : ""}>25</option>
              <option value="50" ${quizSize === "50" ? "selected" : ""}>50</option>
              <option value="100" ${quizSize === "100" ? "selected" : ""}>100</option>
              <option value="all" ${quizSize === "all" ? "selected" : ""}>All</option>
            </select>
          </label>
          <button class="button button-primary" type="button" data-generate-quiz ${availableCount ? "" : "disabled"}>
            Generate
          </button>
          ${state.fixedQuizTrack
            ? ""
            : `<button class="button button-secondary" type="button" aria-label="Go to ${escapeHtml(nextTrackLabel)} track" aria-describedby="quiz-generator-mode" title="Go to ${escapeHtml(nextTrackLabel)} track" data-quiz-track-filter="${escapeHtml(nextTrack)}">${escapeHtml(nextTrackLabel)}</button>`}
        </div>
      </div>
      ${practiceMarkup}
    </section>
  `;
}

export function renderQuizCard(item, options = {}) {
  const title = asText(item.title, "Untitled quiz");
  const card = referenceCard(item, options);
  return card.replace("<article", `<article id="${escapeHtml(slugify(title))}"`);
}

export function renderQuizView(items, state) {
  const practiceItems = quizItemsForTrack(uniqueQuizItems(items), state);
  return `
    ${renderQuizToc(uniqueQuizItems(items), state)}
    ${renderQuizGenerator(uniqueQuizItems(items), state)}
    ${practiceItems.length
      ? practiceItems.map((item) => renderQuizCard(item, { quizGuidePathPrefix: asText(state.quizGuidePathPrefix, "") })).join("")
      : trackEmptyState(state)}
  `;
}

export function itemsForTab(referenceData, tabAliases, tabName, query = "") {
  const normalizedTab = tabAliases[tabName] || tabName;
  const items = normalizedTab === "quizzes" ? uniqueQuizItems(referenceData[normalizedTab] ?? []) : referenceData[normalizedTab] ?? [];
  const queryText = query.trim().toLowerCase();

  if (!queryText) return items;
  return items.filter((item) => searchable(item).includes(queryText));
}

export function hashForTab(tabAliases, tabHashes, tabName) {
  const normalizedTab = tabAliases[tabName] || tabName;
  return tabHashes[normalizedTab] || normalizedTab;
}

export function slugify(text) {
  return asText(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
