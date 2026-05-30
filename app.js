import { sections, poetryWorks, drawerTopics } from './app-data.js';
import { poetryCard, renderSection, glossaryCard } from './app-view.js';
import { setupGlossary, setupGlossaryLinks } from './app-glossary.js';
import { setupFirstPath, setupStaticLightbulbs } from './app-path.js';
import { setupResources } from './app-resources.js';
import { setupTabs, setupGuideDrawer } from './app-ui.js';

function setupPoetry() {
  const grid = document.getElementById("poetry-grid");
  if (!grid) return;

  grid.innerHTML = poetryWorks.map(poetryCard).join("");
}

function bootstrapApp() {
  renderSection("overview-grid", sections.overview);
  renderSection("listen-grid", sections.listen);
  renderSection("study-grid", sections.study);
  renderSection("context-grid", sections.context);
  renderSection("library-grid", sections.library);

  setupResources();

  setupTabs();
  setupFirstPath();
  setupPoetry();
  setupStaticLightbulbs();
  setupGuideDrawer();
  setupGlossary();
  setupGlossaryLinks();
}

if (typeof document !== "undefined" && typeof window !== "undefined") {
  bootstrapApp();
}
