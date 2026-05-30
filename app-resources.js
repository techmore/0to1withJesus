import { resources } from './app-data.js';
import { renderGroupedResources, renderResourceFilters, renderStarterResources } from './app-view.js';

export function setupResources() {
  const resourceGrid = document.getElementById("resource-grid");
  if (resourceGrid) {
    resourceGrid.innerHTML = `${renderStarterResources(resources)}${renderGroupedResources(resources)}`;
  }

  const resourceChips = document.querySelector(".resource-toolbar .chips");
  if (resourceChips) {
    resourceChips.innerHTML = renderResourceFilters();
  }
}
