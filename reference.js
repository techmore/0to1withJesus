import { referenceData } from './reference-data.js';


const tabLabels = {
  reference: "Vocabulary",
  people: "People",
  locations: "Locations",
  timeline: "Timeline",
  versions: "Versions",
  traditions: "Traditions",
  quizzes: "Quizzes",
};

const tabAliases = {
  vocabulary: "reference",
  reference: "reference",
  places: "locations",
};

const tabHashes = {
  reference: "vocabulary",
  people: "people",
  locations: "locations",
  timeline: "timeline",
  versions: "versions",
  traditions: "traditions",
  quizzes: "quizzes",
};

const state = {
  tab: "reference",
  query: "",
  quizSize: "25",
  randomQuiz: [],
};

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function searchable(item) {
  return [
    item.title,
    item.kicker,
    item.summary,
    item.detail,
    item.start,
    ...(item.tags || []),
    ...(item.questions || []).flatMap((question) => [question.prompt, question.answer]),
  ]
    .join(" ")
    .toLowerCase();
}

function referenceCard(item) {
  const tagMarkup = item.tags.map((tag) => `<span class="pill">${escapeHtml(tag)}</span>`).join("");
  const questionMarkup = item.questions?.length
    ? `
      <div class="quiz-questions">
        ${item.questions
          .map(
            (question, index) => `
              <details class="quiz-question">
                <summary>
                  <span>Question ${index + 1}</span>
                  <strong>${escapeHtml(question.prompt)}</strong>
                </summary>
                <p>${escapeHtml(question.answer)}</p>
              </details>
            `,
          )
          .join("")}
      </div>
    `
    : "";

  return `
    <article class="card reference-card ${item.questions?.length ? "quiz-card" : ""}">
      <div class="reference-card-head">
        <span class="pill">${escapeHtml(item.kicker)}</span>
      </div>
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        <strong>${escapeHtml(item.summary)}</strong>
      </div>
      <p>${escapeHtml(item.detail)}</p>
      <div class="reference-start">
        <span>Start here</span>
        <p>${escapeHtml(item.start)}</p>
      </div>
      ${questionMarkup}
      <div class="resource-meta">${tagMarkup}</div>
    </article>
  `;
}

function quizQuestionBank(items) {
  return items.flatMap((item) =>
    (item.questions || []).map((question) => ({
      source: item.title,
      scope: item.kicker,
      prompt: question.prompt,
      answer: question.answer,
      tags: item.tags || [],
    })),
  );
}

function shuffleItems(items) {
  return [...items]
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function renderQuizToc(items) {
  const tocItems = items
    .map(
      (item) => `
        <a href="#${escapeHtml(slugify(item.title))}">
          <span>${escapeHtml(item.kicker)}</span>
          <strong>${escapeHtml(item.title)}</strong>
          <small>${item.questions?.length || 0} questions</small>
        </a>
      `,
    )
    .join("");

  return `
    <section class="quiz-hub">
      <div class="quiz-hub-head">
        <div>
          <p class="eyebrow">Quiz TOC</p>
          <h3>Choose a scope, or generate a mixed practice set.</h3>
          <p>
            Search first to narrow this to a book, section, chapter, or context topic. Leave search blank
            to pull from every available quiz question.
          </p>
        </div>
        <a class="link" href="./quizzes.md">Quiz planning notes</a>
      </div>
      <div class="quiz-toc">${tocItems || "<p>No quiz sets match this search yet.</p>"}</div>
    </section>
  `;
}

function renderQuizGenerator(items) {
  const bank = quizQuestionBank(items);
  const requested = state.quizSize === "all" ? bank.length : Number(state.quizSize);
  const availableCount = bank.length;
  const chosenCount = state.randomQuiz.length;
  const practiceMarkup = state.randomQuiz.length
    ? `
      <div class="quiz-random-list">
        ${state.randomQuiz
          .map(
            (question, index) => `
              <details class="quiz-question">
                <summary>
                  <span>${escapeHtml(question.source)} · ${escapeHtml(question.scope)} · ${index + 1}</span>
                  <strong>${escapeHtml(question.prompt)}</strong>
                </summary>
                <p>${escapeHtml(question.answer)}</p>
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
    <section class="quiz-generator">
      <div class="quiz-generator-controls">
        <div>
          <p class="eyebrow">Random practice</p>
          <h3>${availableCount} available questions</h3>
          <p>
            ${chosenCount
              ? `Showing ${chosenCount} question${chosenCount === 1 ? "" : "s"}${requested > availableCount ? " because the current bank is smaller than the requested set." : "."}`
              : "Use this for recall practice after reading. Search can turn it into a per-book or per-chapter generator."}
          </p>
        </div>
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
      </div>
      ${practiceMarkup}
    </section>
  `;
}

function renderQuizCard(item) {
  const card = referenceCard(item);
  return card.replace("<article", `<article id="${escapeHtml(slugify(item.title))}"`);
}

function renderQuizView(items) {
  return `
    ${renderQuizToc(items)}
    ${renderQuizGenerator(items)}
    ${items.length
      ? items.map(renderQuizCard).join("")
      : `
        <article class="card reference-empty">
          <h3>No matches yet</h3>
          <p>Try searching for a broader book, section, chapter, or topic.</p>
        </article>
      `}
  `;
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function itemsForTab(tabName, query = state.query) {
  const normalizedTab = tabAliases[tabName] || tabName;
  const items = referenceData[normalizedTab] || [];
  const queryText = query.trim().toLowerCase();

  if (!queryText) return items;
  return items.filter((item) => searchable(item).includes(queryText));
}

function filteredItems() {
  return itemsForTab(state.tab);
}

function hashForTab(tabName) {
  const normalizedTab = tabAliases[tabName] || tabName;
  return tabHashes[normalizedTab] || normalizedTab;
}

function updateReferenceHash(tabName) {
  const nextHash = `#${hashForTab(tabName)}`;
  if (window.location.hash !== nextHash) {
    history.replaceState(null, "", nextHash);
  }
}

function renderReferenceTabs() {
  const buttons = [...document.querySelectorAll("[data-reference-tab]")];
  const queryActive = Boolean(state.query.trim());

  buttons.forEach((item) => {
    const normalizedTab = tabAliases[item.dataset.referenceTab] || item.dataset.referenceTab;
    const active = normalizedTab === state.tab;
    const label = tabLabels[normalizedTab] || "Reference";
    const total = referenceData[normalizedTab]?.length || 0;
    const count = itemsForTab(normalizedTab).length;

    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", String(active));
    item.innerHTML = `
      <span>${escapeHtml(label)}</span>
      <small>${queryActive ? `${count}/${total}` : count}</small>
    `;
  });
}

function renderReference() {
  const grid = document.getElementById("reference-grid");
  const summary = document.getElementById("reference-summary");
  if (!grid || !summary) return;

  const items = filteredItems();
  const label = tabLabels[state.tab] || "Reference";
  const clearButton = document.querySelector("[data-clear-reference-search]");
  grid.dataset.referenceView = state.tab;
  if (clearButton) {
    clearButton.hidden = !state.query.trim();
  }
  renderReferenceTabs();
  summary.innerHTML = `
    <span>${escapeHtml(label)}</span>
    <strong>${items.length} ${items.length === 1 ? "entry" : "entries"}</strong>
  `;

  grid.innerHTML = items.length
    ? state.tab === "quizzes"
      ? renderQuizView(items)
      : items.map(referenceCard).join("")
    : `
      <article class="card reference-empty">
        <h3>No matches yet</h3>
        <p>Try a broader word, switch tabs, or clear the search to browse the whole section.</p>
      </article>
    `;
}

function setupReferenceTabs() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-reference-tab]");
    if (!button) return;
    setReferenceTab(button.dataset.referenceTab || "reference", { updateHash: true });
  });
}

function setReferenceTab(tabName, options = {}) {
  const normalizedTab = tabAliases[tabName] || tabName;
  const nextTab = referenceData[normalizedTab] ? normalizedTab : "reference";

  state.tab = nextTab;
  if (options.updateHash) {
    updateReferenceHash(nextTab);
  }
  renderReference();
}

function setupReferenceSearch() {
  const search = document.getElementById("reference-search");
  if (!search) return;

  search.addEventListener("input", () => {
    state.query = search.value;
    state.randomQuiz = [];
    renderReference();
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-clear-reference-search]");
    if (!button) return;
    search.value = "";
    state.query = "";
    state.randomQuiz = [];
    renderReference();
    search.focus();
  });
}

function setupQuizControls() {
  document.addEventListener("change", (event) => {
    if (event.target.id !== "quiz-size") return;
    state.quizSize = event.target.value;
    state.randomQuiz = [];
    renderReference();
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-generate-quiz]");
    if (!button) return;

    const bank = quizQuestionBank(filteredItems());
    const requested = state.quizSize === "all" ? bank.length : Number(state.quizSize);
    state.randomQuiz = shuffleItems(bank).slice(0, Math.min(requested, bank.length));
    renderReference();
  });
}

function setupReferenceJumps() {
  document.querySelectorAll("[data-reference-jump]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const tabName = link.dataset.referenceJump || "reference";
      const normalizedTab = tabAliases[tabName] || tabName;
      event.preventDefault();
      setReferenceTab(normalizedTab, { updateHash: true });
      document.getElementById("reference-browser")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setupReferenceHash() {
  const applyHash = () => {
    const hashTab = window.location.hash.replace("#", "");
    const tabName = tabAliases[hashTab] || hashTab;
    if (!referenceData[tabName]) return;
    setReferenceTab(tabName);
    document.getElementById("reference-browser")?.scrollIntoView({ behavior: "auto", block: "start" });
  };

  window.addEventListener("hashchange", applyHash);
  applyHash();
}

function bootstrapReference() {
  setupReferenceTabs();
  setupReferenceSearch();
  setupQuizControls();
  setupReferenceJumps();
  renderReference();
  setupReferenceHash();
}

if (typeof document !== "undefined" && typeof window !== "undefined") {
  bootstrapReference();
}
