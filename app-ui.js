import { drawerTopics } from './drawer-data.js';

export function setupGuideDrawer() {
  const drawer = document.getElementById("guide-drawer");
  const overlay = document.querySelector(".drawer-overlay");
  const kicker = document.getElementById("guide-drawer-kicker");
  const title = document.getElementById("guide-drawer-title");
  const body = document.getElementById("guide-drawer-body");
  const closeButtons = [...document.querySelectorAll("[data-drawer-close]")];
  let activeTrigger = null;

  if (!drawer || !overlay || !kicker || !title || !body) return;

  // While the dialog is open, remove the rest of the page from the tab order
  // and accessibility tree so focus stays inside the drawer.
  const pageSiblings = ["header.topbar", "main", "footer"]
    .map((selector) => document.querySelector(selector))
    .filter(Boolean);

  const setOpen = (isOpen) => {
    drawer.classList.toggle("is-open", isOpen);
    overlay.classList.toggle("is-open", isOpen);
    drawer.setAttribute("aria-hidden", String(!isOpen));
    drawer.inert = !isOpen;
    pageSiblings.forEach((element) => {
      element.inert = isOpen;
    });
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

  // Glossary term buttons inside the drawer jump to the reference browser with
  // the term pre-filled, instead of leading to a plain section anchor.
  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-glossary-term]");
    if (!link) return;

    const term = link.dataset.glossaryTerm || "";
    setOpen(false);
    window.location.href = `./reference.html?q=${encodeURIComponent(term)}#vocabulary`;
  });
}
