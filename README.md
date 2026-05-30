# Bible Study Welcome Guide

Static GitHub Pages site for a beginner-friendly, comprehensive guide to Jesus, Christianity, the Bible, historical context, listening paths, and supplemental resources.

## Pages

- `index.html` for the home hub and resource library
- `reference.html` for vocabulary, people, locations, timeline, Christian traditions, and quizzes
- `roadmap.html` for the interactive mastery tree and long-form learning path
- `quizzes.md` for quiz coverage planning, canon/chapter inventory, and source references

## Reference experience

The reference browser keeps one search active across every section. Section tabs show live match
counts so readers can see whether a person, place, doctrine, timeline event, or quiz set is relevant
before switching views.

## Local preview

Open `index.html` directly or serve the folder with a simple static server:

```bash
python3 -m http.server 8000
```

## Verify

Run the smoke and page checks with:

```bash
npm test
```

## Continuous Integration

Pushes and pull requests run the same `npm test` suite through GitHub Actions. If that check fails,
fix the local test suite first and then push again.

## Deploy

Push to GitHub and enable GitHub Pages from the repository settings. The site is static and does not require a build step.
