# Contributing

This site is static, so changes should stay simple and easy to verify.

## Local setup

- Use Node 20 from `.nvmrc`
- Install dependencies with `npm ci`
- Start a local server with `make serve`

## Verification

- Run `make test` before pushing changes
- The test suite checks the module split, HTML shells, and local HTTP fetches
- GitHub Actions runs the same `npm test` workflow on push and pull request

## Project layout

- `index.html` is the home hub
- `resources.html` is the searchable library
- `poetry.html` is the poetry and imagination guide
- `reference.html` is the reference browser, including the ordered Bible books overview
- `roadmap.html` is the mastery roadmap
- `section-data.js`, `resource-data.js`, `glossary-data.js`, `poetry-data.js`, `drawer-data.js`, `first-path-data.js`, and `books-data.js` hold the content data
- `app.js`, `app-resources.js`, `app-poetry.js`, `app-path.js`, `app-glossary.js`, `app-ui.js`, and `app-view.js` handle wiring and rendering

## Notes

- `roadmap.html` still depends on browser-side remote React modules through its import map
- Keep new content in data modules when possible, and keep bootstrap files focused on wiring
