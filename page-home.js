// Page entry for index.html. Page entries (page-*.js) wire up only the
// features a given page actually uses; shared markup lives in the HTML.
import { setupFirstPath } from './app-path.js';
import { setupGuideDrawer } from './app-ui.js';

if (typeof document !== "undefined" && typeof window !== "undefined") {
  setupFirstPath();
  setupGuideDrawer();
}
