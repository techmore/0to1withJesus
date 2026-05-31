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

export function referenceCard(item) {
  const title = asText(item.title, "Untitled entry");
  const kicker = asText(item.kicker, "Reference");
  const summary = asText(item.summary);
  const detail = asText(item.detail);
  const start = asText(item.start);
  const tagMarkup = asArray(item.tags).map((tag) => `<span class="pill">${escapeHtml(tag)}</span>`).join("");
  const questions = quizQuestions(item);
  const questionMarkup = questions.length
    ? `
      <div class="quiz-questions">
        ${questions
          .map(
            (question, index) => `
              <details class="quiz-question">
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
      <div class="reference-start">
        <span>Start here</span>
        <p>${escapeHtml(start)}</p>
      </div>
      ${questionMarkup}
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
  return items.filter((item) => quizTrackMatches(item, activeTrack));
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
    starter: "Learn the Bible's order and the broad map first.",
    intermediate: "Move into books, sections, and the shape of the story.",
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

const starterQuizTitles = [
  "Bible Book Order Starter Quiz",
  "Bible Books Order and Sections Quiz",
  "Old Testament Books Order Quiz",
  "New Testament Books Order Quiz",
  "Bible Sections Foundation Quiz",
];

const intermediateQuizTitles = [
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
  "Genesis Book Quiz",
  "Exodus Book Quiz",
  "Numbers Book Quiz",
  "Deuteronomy Book Quiz",
  "Joshua Book Quiz",
  "Judges Book Quiz",
  "Ruth Book Quiz",
  "Samuel Book Quiz",
  "Kings Book Quiz",
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

function quizTrackForItem(item) {
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

function nextQuizCue(activeTrack, items) {
  if (activeTrack === "starter") {
    const oldTestamentOrder = findQuiz(items, /Old Testament Books Order Quiz/i);
    const newTestamentOrder = findQuiz(items, /New Testament Books Order Quiz/i);
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
  const grouped = items.reduce((acc, item) => {
    const track = quizTrackForItem(item);
    if (!acc[track]) acc[track] = [];
    acc[track].push(item);
    return acc;
  }, {});
  const trackCounts = {
    starter: grouped.starter?.length || 0,
    intermediate: grouped.intermediate?.length || 0,
    expert: grouped.expert?.length || 0,
  };

  const tracks = ["starter", "intermediate", "expert"];
  const tocSections = tracks
    .map((track) => {
      const trackItems = grouped[track] || [];
      if (!trackItems.length) return "";
      return `
        <section class="quiz-track" data-quiz-track="${escapeHtml(track)}">
          <div class="quiz-toc-group-head">
            <p class="eyebrow">${escapeHtml(quizTrackLabel(track))}</p>
            <h4>${escapeHtml(quizTrackAnchor(track))}</h4>
            <p class="quiz-track-summary">${escapeHtml(quizTrackSummary(track))}</p>
          </div>
          <div class="quiz-track-groups">
            <section class="quiz-toc-group" data-quiz-track="${escapeHtml(track)}">
              <div class="quiz-toc-grid">
                ${trackItems.map(quizSectionCard).join("")}
              </div>
            </section>
          </div>
        </section>
      `;
    })
    .join("");

  return `
    <section class="quiz-hub">
      <div class="quiz-hub-head">
        <div>
          <p class="eyebrow">Quiz curriculum</p>
          <h3>Starter, Intermediate, and Expert are shown as separate curriculum blocks.</h3>
          <p>
            Search first to narrow the cards within each block. The page stays organized around the
            three curriculum levels so the map stays visible.
          </p>
        </div>
        <a class="link" href="./quizzes.md">Quiz planning notes</a>
      </div>
      ${nextQuizCue("starter", items)}
      <div class="quiz-toc" data-quiz-track-view>${tocSections || "<p>No quiz sets match this search yet.</p>"}</div>
      <p class="quiz-track-status" aria-live="polite">Showing the full curriculum breakdown.</p>
    </section>
  `;
}

export function renderQuizGenerator(items, state) {
  const activeTrack = state.quizTrackFilter || "starter";
  const filteredItems = quizItemsForTrack(items, { quizTrackFilter: activeTrack });
  const bank = quizQuestionBank(filteredItems);
  const requested = state.quizSize === "all" ? bank.length : Number(state.quizSize);
  const availableCount = bank.length;
  const chosenCount = state.randomQuiz.length;
  const activeTrackLabel = quizTrackLabel(activeTrack);
  const trackStep = quizTrackStep(activeTrack);
  const nextTrack = nextQuizTrack(activeTrack);
  const nextTrackLabel = quizTrackLabel(nextTrack);
  const searchActive = Boolean(state.query.trim());
  const modeCopy = searchActive
    ? `Study the filtered ${activeTrackLabel.toLowerCase()} track, then move to the next track when this one is solid.`
    : `Learn inside the ${activeTrackLabel.toLowerCase()} track, then move to the next track when this one is solid.`;
  const practiceMarkup = state.randomQuiz.length
    ? `
      <div class="quiz-random-list">
        ${state.randomQuiz
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
          <p class="quiz-generator-context">
            <span>${escapeHtml(activeTrackLabel)}</span>
            <span class="is-step">Step ${escapeHtml(trackStep)}</span>
          </p>
          <p class="quiz-generator-mode" id="quiz-generator-mode" aria-live="polite">${escapeHtml(modeCopy)}</p>
          <h3>${availableCount} available questions</h3>
          <p>
            ${chosenCount
              ? `Showing ${chosenCount} question${chosenCount === 1 ? "" : "s"}${requested > availableCount ? " because the current bank is smaller than the requested set." : "."}`
              : `Use this for recall practice inside the ${activeTrackLabel.toLowerCase()} track.`}
          </p>
        </div>
        <div class="quiz-generator-actions">
          <label class="quiz-size-control">
            <span>Set size</span>
            <select id="quiz-size">
              <option value="25" ${state.quizSize === "25" ? "selected" : ""}>25</option>
              <option value="50" ${state.quizSize === "50" ? "selected" : ""}>50</option>
              <option value="100" ${state.quizSize === "100" ? "selected" : ""}>100</option>
              <option value="all" ${state.quizSize === "all" ? "selected" : ""}>All</option>
            </select>
          </label>
          <button class="button button-primary" type="button" data-generate-quiz ${availableCount ? "" : "disabled"}>
            Generate
          </button>
          <button class="button button-secondary" type="button" aria-label="Go to ${escapeHtml(nextTrackLabel)} track" aria-describedby="quiz-generator-mode" title="Go to ${escapeHtml(nextTrackLabel)} track" data-quiz-track-filter="${escapeHtml(nextTrack)}">
            ${escapeHtml(nextTrackLabel)}
          </button>
        </div>
      </div>
      ${practiceMarkup}
    </section>
  `;
}

export function renderQuizCard(item) {
  const title = asText(item.title, "Untitled quiz");
  const card = referenceCard(item);
  return card.replace("<article", `<article id="${escapeHtml(slugify(title))}"`);
}

export function renderQuizView(items, state) {
  const practiceItems = quizItemsForTrack(items, state);
  return `
    ${renderQuizToc(items, state)}
    ${renderQuizGenerator(items, state)}
    ${practiceItems.length
      ? practiceItems.map(renderQuizCard).join("")
      : trackEmptyState(state)}
  `;
}

export function itemsForTab(referenceData, tabAliases, tabName, query = "") {
  const normalizedTab = tabAliases[tabName] || tabName;
  const items = referenceData[normalizedTab] ?? [];
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
