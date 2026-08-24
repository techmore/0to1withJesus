import { firstSevenDays } from './first-path-data.js';
import { firstDayCard } from './app-view.js';

export function setupFirstPath() {
  const grid = document.getElementById("first-days-grid");
  const progress = document.getElementById("path-progress-count");
  const reset = document.getElementById("path-reset");
  const storageKey = "the-way-first-seven-days";

  if (!grid) return;

  const validDayIds = new Set(firstSevenDays.map((item) => String(item.day)));

  const load = () => {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
      return new Set(Array.isArray(parsed) ? parsed.filter((day) => validDayIds.has(String(day))).map(String) : []);
    } catch {
      return new Set();
    }
  };

  const save = (completedDays) => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify([...completedDays]));
    } catch {
      return;
    }
  };

  const render = () => {
    // Re-rendering replaces every checkbox, so remember which one had focus
    // and restore it afterwards to keep keyboard users in place.
    const focusedDay = document.activeElement?.dataset?.pathCheck || null;
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

    if (focusedDay) {
      grid.querySelector(`[data-path-check="${focusedDay}"]`)?.focus({ preventScroll: true });
    }
  };

  reset?.addEventListener("click", () => {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      return;
    }
    render();
  });

  render();
}
