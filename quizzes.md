# Quiz Coverage Plan

This file is the planning source for the quiz system. The website can keep a smaller curated question bank in `reference.js`, while this document tracks the full target coverage, useful references, and generation rules.

## Goal

Build quizzes that help a beginner move from recognition to understanding:

- Section quizzes: Torah/Pentateuch, historical books, biblical novellas, wisdom books, prophets, Gospels, Acts, letters, Catholic letters, Revelation.
- Book quizzes: one quiz for every biblical book in the canon list below.
- Chapter quizzes: one short quiz for every chapter where chapter-level comprehension matters.
- Random practice: 25, 50, 100, or all available questions from the full bank, optionally narrowed by search.
- Complete checks: end-of-book and whole-Bible quizzes that test sequence, people, places, themes, and timeline.

## Canon Note

The list below follows the broader Catholic-style canonical order the user provided, including deuterocanonical books such as Tobit, Judith, Wisdom, Sirach, Baruch, and 1-2 Maccabees. The app should eventually explain canon differences without making the beginner feel like one tradition is being smuggled in silently.

For Protestant-focused tracks, mark deuterocanonical books as "Apocrypha / Deuterocanonical context" instead of removing them. For Catholic-focused tracks, keep them in the main Old Testament sequence.

## Valuable References

- [USCCB Books of the Bible](https://bible.usccb.org/bible): canonical order, book introductions, chapter navigation, and deuterocanonical coverage.
- [USCCB New American Bible page](https://www.usccb.org/offices/new-american-bible): Catholic canon framing and NAB resources.
- [Catechism of the Catholic Church, paragraph 120](https://www.usccb.org/sites/default/files/flipbooks/catechism/36/index.html): Catholic list of inspired books.
- [BibleProject book guides](https://bibleproject.com/guides/): beginner-friendly literary structure, themes, and book-level orientation.
- [BibleProject reading plans](https://bibleproject.com/readingplans/): structured reading paths useful for quiz sequencing.
- [Bible Gateway audio and passage tools](https://www.biblegateway.com/resources/audio/): reading/listening workflow and translation comparison.
- [Bible Gateway deuterocanonical note](https://support.biblegateway.com/hc/en-us/articles/360001399108-Are-the-deuterocanonical-books-the-Apocrypha-available-on-Bible-Gateway): practical note that availability depends on translation.
- [API.Bible chapters guide](https://docs.api.bible/guides/chapters/): possible future data source for book/chapter metadata.
- [Open Scripture API books docs](https://openscriptureapi.org/docs/books): possible future open API for book and chapter metadata.

## Quiz Design Rules

Every quiz should include:

- Recall: names, order, people, places, repeated terms.
- Comprehension: what happened and why it matters.
- Context: where the book/chapter sits in the larger Bible story.
- Vocabulary: terms a beginner would otherwise miss.
- Synthesis: how the passage points toward Jesus, covenant, kingdom, wisdom, worship, exile, restoration, church, or new creation.

Avoid trivia-only quizzes. A good question should help someone reread the passage better.

## Question Types

- `identify`: Who is speaking? Who is involved? Where is this?
- `sequence`: What comes before or after this?
- `meaning`: What does this word, sign, or event mean in context?
- `theme`: What major theme is being developed?
- `connection`: How does this connect to Jesus, the wider Bible, or Christian practice?
- `application`: What should a learner notice, pray, practice, or revisit?

## Coverage Levels

### Level 1: Starter

- Whole Bible sections
- Gospel of John
- John chapter path
- Luke and Acts
- Romans and Ephesians
- Locations and timeline

### Level 2: Full Book Coverage

Each book gets:

- 8-12 book-level questions
- 3-5 questions for the introduction
- 3-5 questions for each major movement or chapter cluster

### Level 3: Chapter Coverage

Each chapter gets:

- 3 recall/comprehension questions
- 1 vocabulary/context question
- 1 synthesis question

### Level 4: Mastery

- 25-question random practice
- 50-question section practice
- 100-question whole-Bible practice
- Complete book test
- Complete Bible test

## Canon and Chapter Inventory

### Old Testament

| Section | Book | Chapters |
| --- | --- | ---: |
| Pentateuch | Genesis | 50 |
| Pentateuch | Exodus | 40 |
| Pentateuch | Leviticus | 27 |
| Pentateuch | Numbers | 36 |
| Pentateuch | Deuteronomy | 34 |
| Historical Books | Joshua | 24 |
| Historical Books | Judges | 21 |
| Historical Books | Ruth | 4 |
| Historical Books | 1 Samuel | 31 |
| Historical Books | 2 Samuel | 24 |
| Historical Books | 1 Kings | 22 |
| Historical Books | 2 Kings | 25 |
| Historical Books | 1 Chronicles | 29 |
| Historical Books | 2 Chronicles | 36 |
| Historical Books | Ezra | 10 |
| Historical Books | Nehemiah | 13 |
| Biblical Novellas | Tobit | 14 |
| Biblical Novellas | Judith | 16 |
| Biblical Novellas | Esther | 10 |
| Biblical Novellas | 1 Maccabees | 16 |
| Biblical Novellas | 2 Maccabees | 15 |
| Wisdom Books | Job | 42 |
| Wisdom Books | Psalms | 150 |
| Wisdom Books | Proverbs | 31 |
| Wisdom Books | Ecclesiastes | 12 |
| Wisdom Books | Song of Songs | 8 |
| Wisdom Books | Wisdom | 19 |
| Wisdom Books | Sirach | 51 |
| Prophetic Books | Isaiah | 66 |
| Prophetic Books | Jeremiah | 52 |
| Prophetic Books | Lamentations | 5 |
| Prophetic Books | Baruch | 6 |
| Prophetic Books | Ezekiel | 48 |
| Prophetic Books | Daniel | 14 |
| Prophetic Books | Hosea | 14 |
| Prophetic Books | Joel | 4 |
| Prophetic Books | Amos | 9 |
| Prophetic Books | Obadiah | 1 |
| Prophetic Books | Jonah | 4 |
| Prophetic Books | Micah | 7 |
| Prophetic Books | Nahum | 3 |
| Prophetic Books | Habakkuk | 3 |
| Prophetic Books | Zephaniah | 3 |
| Prophetic Books | Haggai | 2 |
| Prophetic Books | Zechariah | 14 |
| Prophetic Books | Malachi | 3 |

### New Testament

| Section | Book | Chapters |
| --- | --- | ---: |
| Gospels | Matthew | 28 |
| Gospels | Mark | 16 |
| Gospels | Luke | 24 |
| Gospels | John | 21 |
| Acts | Acts | 28 |
| New Testament Letters | Romans | 16 |
| New Testament Letters | 1 Corinthians | 16 |
| New Testament Letters | 2 Corinthians | 13 |
| New Testament Letters | Galatians | 6 |
| New Testament Letters | Ephesians | 6 |
| New Testament Letters | Philippians | 4 |
| New Testament Letters | Colossians | 4 |
| New Testament Letters | 1 Thessalonians | 5 |
| New Testament Letters | 2 Thessalonians | 3 |
| New Testament Letters | 1 Timothy | 6 |
| New Testament Letters | 2 Timothy | 4 |
| New Testament Letters | Titus | 3 |
| New Testament Letters | Philemon | 1 |
| New Testament Letters | Hebrews | 13 |
| Catholic Letters | James | 5 |
| Catholic Letters | 1 Peter | 5 |
| Catholic Letters | 2 Peter | 3 |
| Catholic Letters | 1 John | 5 |
| Catholic Letters | 2 John | 1 |
| Catholic Letters | 3 John | 1 |
| Catholic Letters | Jude | 1 |
| Revelation | Revelation | 22 |

## Suggested Rollout

1. Current `reference.js` bank now covers starter quizzes plus a second layer for vocabulary, worship/Temple terms, Genesis/Exodus people, kings and prophets, women of the Bible, Old Testament timeline, New Testament timeline, biblical geography, Gospels, Acts, Paul's churches, prophets/exile, wisdom/prayer, and Revelation/new creation. Genesis, Exodus, Matthew, Mark, Luke, Acts, John, Romans, Ephesians, the Torah/Pentateuch section quiz, the historical books section quiz, the biblical novellas section quiz, the wisdom books section quiz, the prophets section quiz, the Gospels section quiz, the Acts section quiz, the letters section quiz, the Catholic Letters section quiz, and the Revelation section quiz have now started too.
2. Add section quizzes for the remaining Old Testament and New Testament groupings.
3. Add chapter-level quizzes only after book quizzes are solid, starting with John, Luke, Acts, Romans, Genesis, and Exodus. Genesis 1, Exodus 1, Exodus 2, Exodus 3, Exodus 4, Exodus 5, Exodus 6, Exodus 7, Exodus 8, Exodus 9, Exodus 10, Exodus 11, Exodus 12, and Exodus 13 chapter coverage has now started too.
4. Move to a generated data file if the quiz bank gets too large for `reference.js`.

## Data Structure Target

```js
{
  title: "John 1 Quiz",
  scope: "chapter",
  testament: "New Testament",
  section: "Gospels",
  book: "John",
  chapter: 1,
  questions: [
    {
      type: "meaning",
      prompt: "What title does John use for Jesus at the beginning of the chapter?",
      answer: "John calls Jesus the Word, who was with God and was God.",
      references: ["John 1:1-18"]
    }
  ]
}
```

## Open Decisions

- Whether to keep the Catholic/deuterocanonical list as the default or offer tradition filters.
- Whether random quizzes should eventually be scored, not just revealed.
- Whether complete quizzes should require all answers before reveal.
- Whether to use an API for chapter metadata or keep the inventory static.
- Whether to store quiz progress in local storage.
