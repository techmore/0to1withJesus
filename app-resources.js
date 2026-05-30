import { resources } from './resource-data.js';
import { renderGroupedResources, renderResourceFilters, renderStarterResources } from './app-view.js';

function setupResourceFilters() {
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

export function setupResources() {
  const resourceGrid = document.getElementById("resource-grid");
  if (resourceGrid) {
    resourceGrid.innerHTML = `${renderStarterResources(resources)}${renderGroupedResources(resources)}`;
  }

  const resourceChips = document.querySelector(".resource-toolbar .chips");
  if (resourceChips) {
    resourceChips.innerHTML = renderResourceFilters();
  }

  setupResourceFilters();
}
