import { escapeHtml } from './render-utils.js';
import { resourceGroups, resourceStarterSection } from './resource-data.js';

function searchText(item) {
  return [item.title, item.copy, ...(item.tags || []), ...(item.links || []).map((link) => link.label)]
    .join(" ")
    .toLowerCase();
}

export function resourceCard(item) {
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

export function renderGroupedResources(items) {
  const grouped = new Map();

  items.forEach((item) => {
    const category = item.category || "general";
    if (!grouped.has(category)) grouped.set(category, []);
    grouped.get(category).push(item);
  });

  return resourceGroups
    .filter(({ key }) => grouped.has(key))
    .map(({ key, label }) => `
      <section class="resource-group">
        <div class="section-heading section-heading-wide">
          <p class="eyebrow">${escapeHtml(label)}</p>
          <h2>${escapeHtml(label)}</h2>
        </div>
        <div class="grid grid-3">
          ${grouped.get(key).map(resourceCard).join("")}
        </div>
      </section>
    `)
    .join("");
}

export function renderStarterResources(items) {
  const picks = items.filter((item) => item.featured);
  if (!picks.length) return "";

  return `
    <section class="resource-group">
      <div class="section-heading section-heading-wide">
        <p class="eyebrow">${escapeHtml(resourceStarterSection.eyebrow)}</p>
        <h2>${escapeHtml(resourceStarterSection.title)}</h2>
        <p>${escapeHtml(resourceStarterSection.copy)}</p>
      </div>
      <div class="grid grid-3">
        ${picks.map(resourceCard).join("")}
      </div>
    </section>
  `;
}

export function renderResourceFilters() {
  return `
    <button class="chip is-active" data-filter="all">All</button>
    ${resourceGroups.map(({ key, label }) => `<button class="chip" data-filter="${escapeHtml(key)}">${escapeHtml(label)}</button>`).join("")}
  `;
}

export function poetryCard(item) {
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

export function renderSection(id, items) {
  const target = document.getElementById(id);
  if (!target) return;
  target.innerHTML = items.map(resourceCard).join("");
}

export function glossaryCard(item) {
  return `
    <article class="card glossary-card" data-glossary-search="${escapeHtml(searchText({ title: item.term, copy: item.definition, tags: [item.short], links: [] }))}">
      <span class="pill">Term</span>
      <h3>${escapeHtml(item.term)}</h3>
      <strong>${escapeHtml(item.short)}</strong>
      <p>${escapeHtml(item.definition)}</p>
    </article>
  `;
}

export function firstDayCard(item, completedDays) {
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

export function lightbulbIcon() {
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
