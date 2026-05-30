import { glossaryTerms } from './glossary-data.js';
import { glossaryCard } from './app-view.js';

export function setupGlossary() {
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

export function setupGlossaryLinks() {
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
