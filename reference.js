import { referenceData } from './reference-data.js';
import { escapeHtml } from './render-utils.js';
import {
  hashForTab as sharedHashForTab,
  itemsForTab as sharedItemsForTab,
  referenceCard,
  renderQuizView,
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
  randomQuiz: [],
};

function itemsForTab(tabName, query = state.query) {
  return sharedItemsForTab(referenceData, tabAliases, tabName, query);
}

function filteredItems() {
  return itemsForTab(state.tab);
}

function hashForTab(tabName) {
  return sharedHashForTab(tabAliases, tabHashes, tabName);
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
