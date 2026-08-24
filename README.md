# Bible Study Welcome Guide

Static GitHub Pages site for a beginner-friendly, comprehensive guide to Jesus, Christianity, the Bible, historical context, listening paths, and supplemental resources.

## Pages

- `index.html` for the home hub and resource library
- `reference.html` for vocabulary, Bible books in order, people, locations, timeline, Christian traditions, and quizzes
- `roadmap.html` for the interactive mastery tree and long-form learning path
- `quizzes.md` for quiz coverage planning, canon/chapter inventory, and source references

## Reference experience

The reference browser keeps one search active across every section. Section tabs show live match
counts so readers can see whether a person, place, doctrine, timeline event, or quiz set is relevant
before switching views.

## Project layout

- `index.html`, `reference.html`, `roadmap.html`, `quizzes.html`, `quiz-study.html`, `quizzes/*.html`, `prayer.html`, `poetry.html`, `resources.html` — one HTML file per page. Shared chrome (topbar nav rows, footer, skip link) is duplicated on purpose so every page works without JavaScript; `page-verify.mjs` keeps those copies from drifting apart.
- `page-*.js` — per-page entry scripts (`page-home.js`, `page-poetry.js`, `page-prayer.js`, `page-resources.js`). Each page loads only the feature modules it needs.
- `prayer.html` ships its sections as static fallback markup inside `#prayer-sections`, wrapped in `<!-- prayer-sections:start/end -->` markers so the page works without JavaScript. `app-prayer.js` only renders client-side when that static copy is missing, and `page-verify.mjs` re-renders `prayer-data.js` in Node and fails if the static copy drifts. After editing prayer content, regenerate the block between the markers and bump the cache-bust stamp.
- `app-*.js`, `reference*.js`, `quiz-study.js`, `roadmap.js` — feature modules and renderers.
- `*-data.js` — pure content modules (resources, poetry, drawer topics, roadmap nodes, Bible books, …) with no DOM access.
- `styles.css` — the single shared stylesheet; the table of contents comment at the top maps its sections.

Cache busting: asset URLs carry a `?v=YYYYMMDD-N` stamp. Bump the stamp in the HTML files whenever JS or CSS changes (the tests assert the stamps stay uniform across pages; they intentionally do not hardcode the current value).

## Local preview

Open `index.html` directly or serve the folder with a simple static server:

```bash
python3 -m http.server 8000
```

If you prefer shortcuts, `make test` runs the verification suite and `make serve` starts the
static server.

The project pins Node 20 in `.nvmrc` and the `engines` field in `package.json`, so use that
runtime for local verification when possible.

## Verify

Run the smoke and page checks with:

```bash
npm test
```

The suite covers: module import safety, per-page entry wiring, canonical
navigation/footer/skip-link presence, uniform cache-bust stamps, data shape
checks, and HTTP 200s for every page.

For deeper checks, `npm run audit` (or `make audit`) runs the full test suite
plus `audit.mjs`, which covers internal link/anchor resolution, duplicate ids,
module wiring (orphans), drawer topic reachability, glossary-term coverage,
Bible canon order, quiz duplicate detection, resource group validity, roadmap
prerequisite cycles, and accessibility spot checks. It is offline and
deterministic.

`npm run audit:links` checks every outbound URL against the live web. It needs
network access, so it is not part of the test suite; run it when external
resources change.

## Continuous Integration

Pushes and pull requests run the same `npm test` suite through GitHub Actions. If that check fails,
fix the local test suite first and then push again.

## Roadmap note

The roadmap page uses a browser import map that loads React and React Flow from `esm.sh`. The local
verification scripts confirm the HTML shell and script wiring, but the interactive flow itself still
depends on the browser resolving those remote modules.

## Deploy

Push to GitHub and enable GitHub Pages from the repository settings. The site is static and does not require a build step.
