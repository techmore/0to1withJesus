import { poetryWorks } from './poetry-data.js';
import { poetryCard } from './app-view.js';

export function setupPoetry() {
  const grid = document.getElementById("poetry-grid");
  if (!grid) return;

  grid.innerHTML = poetryWorks.map(poetryCard).join("");
}
