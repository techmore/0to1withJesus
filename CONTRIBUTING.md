# Contributing

This site is static, so changes should stay simple and easy to verify.

## Local setup

- Use Node 22 from `.nvmrc` (any Node >= 20 works)
- Install dependencies with `npm ci`
- Start a local server with `make serve`

## Verification

- Run `make test` before pushing changes
- The test suite checks the module split, HTML shells, shared chrome, and local HTTP fetches (served by a built-in Node static server on a free port, so nothing else needs to be installed)
- `node audit.mjs` runs the deeper offline audit (links, anchors, ids, quizzes, roadmap)
- GitHub Actions runs `npm test` and `node audit.mjs` on push and pull request

## Project layout

- `index.html` is the home hub
- `resources.html` is the searchable library
- `poetry.html` is the poetry and imagination guide
- `reference.html` is the reference browser, including the ordered Bible books overview
- `roadmap.html` is the mastery roadmap
- `quizzes.html`, `quizzes/*.html`, and `quiz-study.html` are the quiz hub, tracks, and study guide
- `*-data.js` (`resource-data.js`, `poetry-data.js`, `drawer-data.js`, `first-path-data.js`, `books-data.js`, `prayer-data.js`, `reference-data.js`, `roadmap-data.js`) hold the content data
- `page-*.js` are per-page entries; `app-*.js`, `reference*.js`, `quiz-study.js`, and `roadmap.js` handle wiring and rendering
- `topbar.js` is the one classic (non-module) script every page loads: it collapses the nav behind a Menu button on narrow screens and marks the current page link
- `styles.css` is the single stylesheet; colours are semantic tokens on `:root` with a `prefers-color-scheme: dark` override, so new rules should use `var(--surface)`, `var(--text)`, `var(--ink)` and friends rather than raw colours

## Notes

- `roadmap.html` still depends on browser-side remote React modules through its import map
- Keep new content in data modules when possible, and keep bootstrap files focused on wiring
- Bump the `?v=YYYYMMDD-N` stamp in every HTML file whenever JS or CSS changes (`page-verify.mjs` fails if the stamps differ between pages)
- Everything in `topbar.js` is progressive enhancement; pages must stay usable with JavaScript disabled
