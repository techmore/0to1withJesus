import { amazonSearch, youtubeSearch } from './link-helpers.js';
import { sections, poetryWorks, resources, firstSevenDays, glossaryTerms, drawerTopics } from './app-data.js';
import { escapeHtml, glossaryLinks } from './render-utils.js';
import { resourceCard, poetryCard, renderSection, glossaryCard, firstDayCard, lightbulbIcon } from './app-view.js';

function setupPoetry() {
  const grid = document.getElementById("poetry-grid");
  if (!grid) return;

  grid.innerHTML = poetryWorks.map(poetryCard).join("");
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
