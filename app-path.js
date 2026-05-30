import { firstSevenDays } from './app-data.js';
import { firstDayCard, lightbulbIcon } from './app-view.js';

export function setupStaticLightbulbs() {
  document.querySelectorAll(".text-lightbulb").forEach((target) => {
    target.outerHTML = lightbulbIcon();
  });
}

export function setupFirstPath() {
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
