import { amazonSearch, youtubeSearch } from './link-helpers.js';
import { sections, poetryWorks, resources, firstSevenDays, glossaryTerms, drawerTopics } from './app-data.js';

function resourceCard(item) {
  const category = item.category || "general";
  const tagMarkup = item.tags
    .map((tag) => `<span class="pill">${escapeHtml(tag)}</span>`)
    .join("");

  const linkMarkup = item.links
    .map((link) => {
      const isInternal = link.href.startsWith("./") || link.href.startsWith("#");
      const target = isInternal ? "" : ` target="_blank" rel="noopener noreferrer"`;
      return `<a class="link" href="${escapeHtml(link.href)}"${target}>${escapeHtml(link.label)}</a>`;
    })
    .join("");

  return `
    <article class="card resource-card" data-category="${escapeHtml(category)}" data-search="${escapeHtml(searchText(item))}">
      <div class="resource-meta">${tagMarkup}</div>
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.copy)}</p>
      </div>
      <div class="resource-links">${linkMarkup}</div>
    </article>
  `;
}

function poetryCard(item) {
  const scriptureMarkup = item.scripture
    .map((passage) => `<span class="pill">${escapeHtml(passage)}</span>`)
    .join("");
  const linkMarkup = item.links
    .map((link) => `<a class="link" href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`)
    .join("");

  return `
    <article class="card poetry-card">
      <div class="resource-meta">${scriptureMarkup}</div>
      <h3>${escapeHtml(item.title)}</h3>
      <strong>${escapeHtml(item.frame)}</strong>
      <p>${escapeHtml(item.copy)}</p>
      <div class="resource-links">${linkMarkup}</div>
    </article>
  `;
}

function setupPoetry() {
  const grid = document.getElementById("poetry-grid");
  if (!grid) return;

  grid.innerHTML = poetryWorks.map(poetryCard).join("");
}

function searchText(item) {
  return [item.title, item.copy, ...(item.tags || []), ...(item.links || []).map((link) => link.label)]
    .join(" ")
    .toLowerCase();
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderSection(id, items) {
  const target = document.getElementById(id);
  if (!target) return;
  target.innerHTML = items.map(resourceCard).join("");
}

function glossaryCard(item) {
  return `
    <article class="card glossary-card" data-glossary-search="${escapeHtml(searchText({ title: item.term, copy: item.definition, tags: [item.short], links: [] }))}">
      <span class="pill">Term</span>
      <h3>${escapeHtml(item.term)}</h3>
      <strong>${escapeHtml(item.short)}</strong>
      <p>${escapeHtml(item.definition)}</p>
    </article>
  `;
}

function setupGlossary() {
  const grid = document.getElementById("glossary-grid");
  const search = document.getElementById("glossary-search");

  if (!grid) return;

  grid.innerHTML = glossaryTerms.map(glossaryCard).join("");

  const cards = [...grid.querySelectorAll(".glossary-card")];
  const apply = () => {
    const query = (search?.value || "").trim().toLowerCase();
    cards.forEach((card) => {
      const text = card.dataset.glossarySearch || "";
      card.style.display = !query || text.includes(query) ? "" : "none";
    });
  };

  search?.addEventListener("input", apply);
}

function setupGlossaryLinks() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-glossary-term]");
    if (!link) return;

    const search = document.getElementById("glossary-search");
    const glossary = document.getElementById("glossary");
    const closeButton = document.querySelector("[data-drawer-close]");

    if (!glossary || !search) {
      window.location.href = "./reference.html#vocabulary";
      return;
    }

    closeButton?.click();

    window.setTimeout(() => {
      search.value = link.dataset.glossaryTerm || "";
      search.dispatchEvent(new Event("input", { bubbles: true }));
      glossary?.scrollIntoView({ behavior: "smooth", block: "start" });
      search?.focus();
    }, 220);
  });
}

function firstDayCard(item, completedDays) {
  const id = `first-day-${item.day}`;
  const checked = completedDays.has(String(item.day)) ? "checked" : "";
  const noteMarkup = item.note ? `<p class="path-note">${escapeHtml(item.note)}</p>` : "";
  const drawerMarkup = item.drawerTopic ? `
    <button
      class="icon-button path-lightbulb"
      type="button"
      aria-label="Open rest guidance for day ${item.day}"
      aria-controls="guide-drawer"
      aria-expanded="false"
      data-drawer-open="${escapeHtml(item.drawerTopic)}"
    >
      ${lightbulbIcon()}
    </button>
  ` : "";

  return `
    <article class="card path-card ${checked ? "is-complete" : ""}" data-path-day="${item.day}">
      <div class="path-card-head">
        <span class="badge">${item.day}</span>
        <div class="path-card-actions">
          ${drawerMarkup}
          <label class="path-check" for="${id}">
            <input id="${id}" type="checkbox" data-path-check="${item.day}" ${checked} />
            <span>Done</span>
          </label>
        </div>
      </div>
      <h3>Day ${item.day}: ${escapeHtml(item.reading)}</h3>
      <p>${escapeHtml(item.focus)}</p>
      <div class="path-question">
        <span>Ask</span>
        <strong>${escapeHtml(item.question)}</strong>
      </div>
      ${noteMarkup}
      <div class="resource-links">
        <a class="link" href="${escapeHtml(item.readHref)}" target="_blank" rel="noopener noreferrer">Read</a>
        <a class="link" href="${escapeHtml(item.listenHref)}" target="_blank" rel="noopener noreferrer">Listen</a>
      </div>
    </article>
  `;
}

function lightbulbIcon() {
  return `
    <svg
      class="resource-panel-icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      stroke-width="1.5"
      aria-hidden="true"
      focusable="false"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  `;
}

function glossaryLinks(terms) {
  const links = terms
    .map((term) => `<button class="glossary-link" type="button" data-glossary-term="${escapeHtml(term)}">${escapeHtml(term)}</button>`)
    .join("");

  return `
    <div class="drawer-glossary-links" aria-label="Related glossary terms">
      <span>Related words</span>
      <div>${links}</div>
    </div>
  `;
}

function setupStaticLightbulbs() {
  document.querySelectorAll(".text-lightbulb").forEach((target) => {
    target.outerHTML = lightbulbIcon();
  });
}

function setupFirstPath() {
  const grid = document.getElementById("first-days-grid");
  const progress = document.getElementById("path-progress-count");
  const reset = document.getElementById("path-reset");
  const storageKey = "the-way-first-seven-days";

  if (!grid) return;

  const load = () => {
    try {
      return new Set(JSON.parse(localStorage.getItem(storageKey) || "[]"));
    } catch {
      return new Set();
    }
  };

  const save = (completedDays) => {
    localStorage.setItem(storageKey, JSON.stringify([...completedDays]));
  };

  const render = () => {
    const completedDays = load();
    grid.innerHTML = firstSevenDays.map((item) => firstDayCard(item, completedDays)).join("");
    if (progress) progress.textContent = `${completedDays.size} of ${firstSevenDays.length} days`;

    grid.querySelectorAll("[data-path-check]").forEach((input) => {
      input.addEventListener("change", () => {
        const next = load();
        input.checked ? next.add(input.dataset.pathCheck) : next.delete(input.dataset.pathCheck);
        save(next);
        render();
      });
    });
  };

  reset?.addEventListener("click", () => {
    localStorage.removeItem(storageKey);
    render();
  });

  render();
}

function setupTabs() {
  const tabs = [...document.querySelectorAll("[data-tab]")];
  const panels = [...document.querySelectorAll("[data-panel]")];

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const value = tab.dataset.tab;
      tabs.forEach((button) => {
        const active = button === tab;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-selected", String(active));
      });
      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.panel === value);
      });
    });
  });
}

function setupFilters() {
  const search = document.getElementById("resource-search");
  const chips = [...document.querySelectorAll("[data-filter]")];
  const cards = [...document.querySelectorAll(".resource-card")];

  let activeFilter = "all";

  const apply = () => {
    const query = (search?.value || "").trim().toLowerCase();

    cards.forEach((card) => {
      const category = card.dataset.category || "";
      const text = card.dataset.search || "";
      const matchesFilter = activeFilter === "all" || category === activeFilter;
      const matchesQuery = !query || text.includes(query);
      card.style.display = matchesFilter && matchesQuery ? "" : "none";
    });
  };

  search?.addEventListener("input", apply);

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      activeFilter = chip.dataset.filter || "all";
      chips.forEach((button) => button.classList.toggle("is-active", button === chip));
      apply();
    });
  });
}

function setupGuideDrawer() {
  const drawer = document.getElementById("guide-drawer");
  const overlay = document.querySelector(".drawer-overlay");
  const kicker = document.getElementById("guide-drawer-kicker");
  const title = document.getElementById("guide-drawer-title");
  const body = document.getElementById("guide-drawer-body");
  const closeButtons = [...document.querySelectorAll("[data-drawer-close]")];
  let activeTrigger = null;

  if (!drawer || !overlay || !kicker || !title || !body) return;

  const setOpen = (isOpen) => {
    drawer.classList.toggle("is-open", isOpen);
    overlay.classList.toggle("is-open", isOpen);
    drawer.setAttribute("aria-hidden", String(!isOpen));
    drawer.inert = !isOpen;
    document
      .querySelectorAll("[data-drawer-open]")
      .forEach((button) => button.setAttribute("aria-expanded", String(isOpen && button === activeTrigger)));
    document.body.classList.toggle("drawer-open", isOpen);

    if (isOpen) {
      overlay.hidden = false;
      drawer.querySelector("a, button")?.focus();
      return;
    }

    window.setTimeout(() => {
      if (!overlay.classList.contains("is-open")) overlay.hidden = true;
    }, 180);
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-drawer-open]");
    if (!trigger) return;

    const topic = drawerTopics[trigger.dataset.drawerOpen];
    if (!topic) return;

    activeTrigger = trigger;
    kicker.textContent = topic.kicker;
    title.textContent = topic.title;
    body.innerHTML = topic.body;
    setOpen(true);
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setOpen(false);
      activeTrigger?.focus();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawer.classList.contains("is-open")) {
      setOpen(false);
      activeTrigger?.focus();
    }
  });
}

function bootstrapApp() {
  renderSection("overview-grid", sections.overview);
  renderSection("listen-grid", sections.listen);
  renderSection("study-grid", sections.study);
  renderSection("context-grid", sections.context);
  renderSection("library-grid", sections.library);

  const resourceGrid = document.getElementById("resource-grid");
  if (resourceGrid) {
    resourceGrid.innerHTML = resources.map(resourceCard).join("");
  }

  setupTabs();
  setupFilters();
  setupFirstPath();
  setupPoetry();
  setupStaticLightbulbs();
  setupGuideDrawer();
  setupGlossary();
  setupGlossaryLinks();
}

if (typeof document !== "undefined" && typeof window !== "undefined") {
  bootstrapApp();
}
