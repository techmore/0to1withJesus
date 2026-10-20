// Shared topbar behaviour for every page. Loaded as a classic deferred script
// (not a module) so it works on the static quiz hub too. Everything here is
// progressive enhancement: without JavaScript the nav rows stay fully visible.
(function () {
  if (typeof document === "undefined" || typeof window === "undefined") return;

  var topbar = document.querySelector("header.topbar");
  var main = topbar && topbar.querySelector(".topbar-main");
  var navs = topbar ? Array.prototype.slice.call(topbar.querySelectorAll(".topnav")) : [];
  if (!topbar || !main || navs.length === 0) return;

  // Mark the link that points at the current page so the active pill matches
  // the page you are on. Anchor-only links (same page, #section) are skipped
  // because several of them can live on one page.
  var here = window.location.pathname.replace(/index\.html$/, "");
  navs.forEach(function (nav) {
    Array.prototype.forEach.call(nav.querySelectorAll("a[href]"), function (link) {
      if (link.hasAttribute("aria-current")) return;
      var url = new URL(link.getAttribute("href"), window.location.href);
      if (url.hash) return;
      if (url.pathname.replace(/index\.html$/, "") === here) link.setAttribute("aria-current", "page");
    });
  });

  // Collapsible menu on narrow screens.
  navs.forEach(function (nav, index) {
    if (!nav.id) nav.id = "site-nav-" + (index + 1);
  });

  var toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "nav-toggle";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open menu");
  toggle.setAttribute("aria-controls", navs.map(function (nav) { return nav.id; }).join(" "));
  toggle.innerHTML =
    '<svg class="nav-toggle-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
    '<svg class="nav-toggle-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
    "<span>Menu</span>";
  main.insertBefore(toggle, main.querySelector(".topnav"));
  topbar.classList.add("has-nav-toggle");

  function setOpen(isOpen) {
    topbar.classList.toggle("is-nav-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.querySelector("span").textContent = isOpen ? "Close" : "Menu";
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && topbar.classList.contains("is-nav-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (!topbar.classList.contains("is-nav-open")) return;
    if (topbar.contains(event.target)) return;
    setOpen(false);
  });

  // Reset when the viewport grows past the collapse breakpoint so the menu is
  // never left "open" (and announced as such) on desktop.
  var wide = window.matchMedia("(min-width: 761px)");
  var onChange = function () {
    if (wide.matches) setOpen(false);
  };
  if (wide.addEventListener) wide.addEventListener("change", onChange);
  else wide.addListener(onChange);
})();
