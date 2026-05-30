import { sections } from './app-data.js';
import { renderSection, glossaryCard } from './app-view.js';
import { setupGlossary, setupGlossaryLinks } from './app-glossary.js';
import { setupFirstPath, setupStaticLightbulbs } from './app-path.js';
import { setupResources } from './app-resources.js';
import { setupTabs, setupGuideDrawer } from './app-ui.js';
import { setupPoetry } from './app-poetry.js';

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
