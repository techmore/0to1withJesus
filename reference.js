import { referenceData } from './reference-data.js';
import { escapeHtml } from './render-utils.js';
import {
  hashForTab as sharedHashForTab,
  itemsForTab as sharedItemsForTab,
  referenceCard,
  asArray,
  asText,
  renderQuizView,
  quizTrackForItem as sharedQuizTrackForItem,
} from './reference-view.js';


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
  quizTrackFilter: "all",
  randomQuiz: [],
};

const quizStateKey = "jesus-guide-quiz-state-v1";
const quizTrackFilters = ["all", "starter", "intermediate", "expert"];

function normalizeQuizTrackFilter(track) {
  return quizTrackFilters.includes(track) ? track : "all";
}

function quizTrackForQuery(query) {
  const text = asText(query).trim().toLowerCase();
  if (!text) return null;

  if (
    /bible books order|book order|old testament order|new testament order|books of the bible|bible map|structure|overview|starter|beginner|where do i start|path/.test(text)
  ) {
    return "starter";
  }
  if (
    /old testament|new testament|pentateuch|torah|historical books|wisdom books|prophets|gospels|acts|letters|catholic letters|pauline|general epistles|revelation|section|book/.test(text)
  ) {
    return "intermediate";
  }
  if (
    /\bchapter\b|\bch\.?\s*\d+\b|\b(?:john|matthew|mark|luke|acts|romans|genesis|exodus|leviticus|numbers|deuteronomy|joshua|judges|ruth|samuel|kings|chronicles|ezra|nehemiah|esther|job|psalms?|proverbs|ecclesiastes|isaiah|jeremiah|lamentations|ezekiel|daniel|hosea|joel|amos|obadiah|jonah|micah|nahum|habakkuk|zephaniah|haggai|zechariah|malachi|ephesians|galatians|philippians|colossians|thessalonians|timothy|titus|philemon|hebrews|james|peter|jude|revelation)\s*\d+\b/.test(text)
  ) {
    return "expert";
  }
  return null;
}

function itemsForTab(tabName, query = state.query) {
  return sharedItemsForTab(referenceData, tabAliases, tabName, query);
}

function filteredItems() {
  return itemsForTab(state.tab);
}

function visibleQuizItems(items = filteredItems()) {
  return state.tab === "quizzes"
    ? items.filter((item) => quizTrackForItem(item) === (state.quizTrackFilter || "all"))
    : items;
}

function quizTrackForItem(item) {
  return sharedQuizTrackForItem(item);
}

function parseHash(hash) {
  const raw = asText(hash).replace(/^#/, "");
  const [tabPart, queryPart] = raw.split("?");
  const params = new URLSearchParams(queryPart || "");
  return {
    tab: tabAliases[tabPart] || tabPart,
    quizTrackFilter: normalizeQuizTrackFilter(params.get("track") || "all"),
  };
}

function loadQuizState() {
  try {
    const raw = window.localStorage.getItem(quizStateKey);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (typeof parsed.quizSize === "string") state.quizSize = parsed.quizSize;
    if (typeof parsed.quizTrackFilter === "string") state.quizTrackFilter = normalizeQuizTrackFilter(parsed.quizTrackFilter);
  } catch {
    return;
  }
}

function saveQuizState() {
  try {
    window.localStorage.setItem(
      quizStateKey,
      JSON.stringify({
        quizSize: state.quizSize,
        quizTrackFilter: state.quizTrackFilter,
      }),
    );
  } catch {
    return;
  }
}

function hashForTab(tabName) {
  return sharedHashForTab(tabAliases, tabHashes, tabName);
}

function updateReferenceHash(tabName) {
  const normalizedTab = tabAliases[tabName] || tabName;
  const nextTabHash = hashForTab(normalizedTab);
  const params = new URLSearchParams();
  const normalizedTrack = normalizeQuizTrackFilter(state.quizTrackFilter);
  if (normalizedTab === "quizzes" && normalizedTrack !== "all") {
    params.set("track", normalizedTrack);
  }
  const nextHash = params.toString() ? `#${nextTabHash}?${params.toString()}` : `#${nextTabHash}`;
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
    const count = normalizedTab === "quizzes"
      ? itemsForTab(normalizedTab).filter((item) => quizTrackForItem(item) === (state.quizTrackFilter || "all")).length
      : itemsForTab(normalizedTab).length;

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
  const visibleItems = visibleQuizItems(items);
  const label = tabLabels[state.tab] || "Reference";
  const clearButton = document.querySelector("[data-clear-reference-search]");
  const previousQuizTrackFilter = normalizeQuizTrackFilter(state.quizTrackFilter);
  const trackChanged = previousQuizTrackFilter !== state.quizTrackFilter;
  if (state.tab === "quizzes" && trackChanged && state.randomQuiz.length) {
    state.randomQuiz = [];
  }
  grid.dataset.referenceView = state.tab;
  if (clearButton) {
    clearButton.hidden = !state.query.trim();
  }
  renderReferenceTabs();
  summary.innerHTML = `
    <span>${escapeHtml(label)}</span>
    <strong>${visibleItems.length} ${visibleItems.length === 1 ? "entry" : "entries"}</strong>
  `;

  grid.innerHTML = items.length
    ? state.tab === "quizzes"
      ? renderQuizView(items, { ...state, fixedQuizTrack: document.body.dataset.quizTrack || "", quizGuidePathPrefix: document.body.dataset.page === "quizzes" ? "../" : "./" })
      : items.map(referenceCard).join("")
    : `
      <article class="card reference-empty">
        <h3>No matches yet</h3>
        <p>Try a broader word, switch tabs, or clear the search to browse the whole section.</p>
      </article>
    `;

  if (state.tab === "quizzes") {
    const trackButtons = [...document.querySelectorAll("[data-quiz-track-filter]")];
    trackButtons.forEach((button) => {
      const active = normalizeQuizTrackFilter(button.dataset.quizTrackFilter || "all") === state.quizTrackFilter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const status = document.querySelector(".quiz-track-status");
    if (status) {
      if (state.query.trim()) {
        const query = state.query.trim();
        status.textContent = `Showing ${quizTrackLabel(state.quizTrackFilter).toLowerCase()} cards for "${query}".`;
      } else {
        status.textContent = "Showing the full curriculum breakdown.";
      }
    }

    if (trackChanged) {
      const selector =
        state.quizTrackFilter ? `[data-quiz-track="${state.quizTrackFilter}"]` : "[data-quiz-track-view]";
      window.requestAnimationFrame(() => {
        document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }
}

function setupReferenceTabs() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-reference-tab]");
    if (!button) return;
    if ((button.dataset.referenceTab || "") === "quizzes" && document.body.dataset.page !== "quizzes") {
      window.location.href = "./quizzes.html#quizzes";
      return;
    }
    setReferenceTab(button.dataset.referenceTab || "reference", { updateHash: true });
  });
}

function setReferenceTab(tabName, options = {}) {
  const normalizedTab = tabAliases[tabName] || tabName;
  const nextTab = referenceData[normalizedTab] ? normalizedTab : "reference";

  state.tab = nextTab;
  if (options.updateHash || state.quizTrackFilter !== "all") {
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
    saveQuizState();
    renderReference();
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-quiz-track-filter]");
    if (!button) return;

    state.quizTrackFilter = normalizeQuizTrackFilter(button.dataset.quizTrackFilter || "all");
    saveQuizState();
    renderReference();
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-generate-quiz]");
    if (!button) return;

    const bank = quizQuestionBank(visibleQuizItems());
    const requested = state.quizSize === "all" ? bank.length : Number(state.quizSize);
    state.randomQuiz = shuffleItems(bank).slice(0, Math.min(requested, bank.length));
    renderReference();

    window.requestAnimationFrame(() => {
      document.querySelector(".quiz-generator")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
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
    const { tab: tabName, quizTrackFilter } = parseHash(window.location.hash);
    if (!referenceData[tabName]) return;
    if (document.body.dataset.page === "quizzes" && tabName !== "quizzes") {
      window.location.replace("./quizzes.html#quizzes");
      return;
    }
    if (tabName === "quizzes" && document.body.dataset.page !== "quizzes") {
      window.location.replace("./quizzes.html#quizzes");
      return;
    }
    if (tabName === "quizzes") {
      state.quizTrackFilter = normalizeQuizTrackFilter(quizTrackFilter);
    }
    setReferenceTab(tabName);
    if (tabName === "quizzes") {
      updateReferenceHash(tabName);
    }
    document.getElementById("reference-browser")?.scrollIntoView({ behavior: "auto", block: "start" });
  };

  window.addEventListener("hashchange", applyHash);
  applyHash();
}

function bootstrapReference() {
  const fixedTrack = document.body.dataset.quizTrack || "";
  if (fixedTrack) {
    state.tab = "quizzes";
  }
  if (document.body.dataset.page === "quizzes" && !window.location.hash) {
    history.replaceState(null, "", `#quizzes?track=${fixedTrack || "starter"}`);
  }
  loadQuizState();
  if (fixedTrack) {
    state.quizTrackFilter = fixedTrack;
    state.tab = "quizzes";
  }
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
