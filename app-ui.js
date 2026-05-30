import { drawerTopics } from './app-data.js';

export function setupTabs() {
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

export function setupGuideDrawer() {
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
