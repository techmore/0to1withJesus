// Prayer page renderer. Turns prayerSections data into the same
// section/heading/card markup that used to be hand-repeated in prayer.html.
import { prayerSections } from './prayer-data.js';
import { escapeHtml } from './render-utils.js';

export function prayerCard(card) {
  const pillMarkup = card.pill ? `<span class="track-pill">${escapeHtml(card.pill)}</span>` : "";
  const titleMarkup = card.title ? `<h3>${escapeHtml(card.title)}</h3>` : "";

  return `
    <article class="card page-guide-card">
      ${pillMarkup}
      ${titleMarkup}
      <p>${escapeHtml(card.copy)}</p>
    </article>
  `;
}

export function prayerSection(section) {
  const gridMarkup = section.cards
    ? `
        <div class="grid grid-${section.grid} page-guide-grid">
          ${section.cards.map(prayerCard).join("")}
        </div>`
    : "";
  const exampleTitleMarkup = section.exampleTitle
    ? `<h3>${escapeHtml(section.exampleTitle)}</h3>`
    : "";
  const exampleMarkup = section.example
    ? `
        <div class="card page-guide-card">
          ${exampleTitleMarkup}
          <p>${escapeHtml(section.example)}</p>
        </div>`
    : "";

  return `
    <section class="section">
      <div class="section-heading section-heading-wide">
        <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
        <h2>${escapeHtml(section.title)}</h2>
        <p>${escapeHtml(section.copy)}</p>
      </div>
      ${gridMarkup}${exampleMarkup}
    </section>
  `;
}

export function setupPrayerSections() {
  const container = document.getElementById("prayer-sections");
  // prayer.html ships the rendered sections as static fallback markup
  // (kept in sync with prayer-data.js by page-verify.mjs). Only render
  // client-side when that static copy is missing.
  if (!container || container.children.length > 0) return;

  container.innerHTML = prayerSections.map(prayerSection).join("");
}
