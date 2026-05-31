# Quiz Coverage Plan

This file is the planning source for the quiz system. The website can keep a smaller curated question bank in `reference.js`, while this document tracks the full target coverage, useful references, and generation rules.

## Goal

Build quizzes that help a beginner move from recognition to understanding:

- Starter path: Bible book order and section map first, then the Gospels and the rest of the Bible.
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

1. Keep the starter path prominent in the UI and make the quiz browser recommend the next relevant quiz automatically.
2. Add section quizzes for the remaining Old Testament and New Testament groupings.
3. Add chapter-level quizzes only after book quizzes are solid, starting with John, Luke, Acts, Romans, Matthew, Mark, Genesis, and Exodus. Luke 1, Luke 2, Luke 3, Luke 4, Luke 5, Luke 6, Luke 7, Luke 8, Luke 9, Luke 10, Luke 11, Luke 12, Luke 13, Luke 14, Luke 15, Luke 16, Luke 17, Luke 18, Luke 19, Luke 20, Luke 21, Luke 22, Luke 23, Luke 24, Acts 1, Acts 2, Acts 3, Acts 4, Acts 5, Acts 6, Acts 7, Acts 8, Acts 9, Acts 10, Acts 11, Acts 12, Acts 13, Acts 14, Acts 15, Acts 16, Acts 17, Acts 18, Acts 19, Acts 20, Acts 21, Acts 22, Acts 23, Acts 24, Acts 25, Acts 26, Acts 27, Acts 28, Romans 1, Romans 2, Romans 3, Romans 4, Romans 5, Romans 6, Romans 7, Romans 8, Romans 9, Romans 10, Romans 11, Romans 12, Romans 13, Romans 14, Romans 15, Romans 16, Romans 17, Matthew 1, Matthew 2, Matthew 3, Matthew 4, Matthew 5, Matthew 6, Matthew 7, Matthew 8, Matthew 9, Matthew 10, Matthew 11, Matthew 12, Matthew 13, Matthew 14, Matthew 15, Matthew 16, Matthew 17, Matthew 18, Matthew 19, Matthew 20, Matthew 21, Matthew 22, Matthew 23, Matthew 24, Matthew 25, Matthew 26, Matthew 27, Matthew 28, Matthew 29, Matthew 30, Matthew 31, Matthew 32, Matthew 33, Matthew 34, Matthew 35, Matthew 36, Matthew 37, Matthew 38, Matthew 39, Matthew 40, Matthew 41, Matthew 42, Matthew 43, Matthew 44, Matthew 45, Matthew 46, Matthew 47, Matthew 48, Matthew 49, Matthew 50, Matthew 51, Matthew 52, Matthew 53, Matthew 54, Matthew 55, Matthew 56, Matthew 57, Matthew 58, Matthew 59, Matthew 60, Matthew 61, Matthew 62, Matthew 63, Matthew 64, Matthew 65, Matthew 66, Matthew 67, Matthew 68, Matthew 69, Matthew 70, Matthew 71, Matthew 72, Matthew 73, Matthew 74, Matthew 75, Matthew 76, Matthew 77, Matthew 78, Matthew 79, Matthew 80, Matthew 81, Matthew 82, Matthew 83, Matthew 84, Matthew 85, Matthew 86, Matthew 87, Matthew 88, Matthew 89, Matthew 90, Matthew 91, Matthew 92, Matthew 93, Matthew 94, Matthew 95, Matthew 96, Matthew 97, Matthew 98, Matthew 99, Matthew 100, Matthew 101, Matthew 102, Matthew 103, Matthew 104, Matthew 105, Matthew 106, Matthew 107, Matthew 108, Matthew 109, Matthew 110, Matthew 111, Matthew 112, Matthew 113, Matthew 114, Matthew 115, Matthew 116, Matthew 117, Matthew 118, Matthew 119, Matthew 120, Matthew 121, Matthew 122, Matthew 123, Matthew 124, Matthew 125, Matthew 126, Matthew 127, Matthew 128, Matthew 129, Matthew 130, Matthew 131, Matthew 132, Matthew 133, Matthew 134, Matthew 135, Matthew 136, Matthew 137, Matthew 138, Matthew 139, Matthew 140, Matthew 141, Matthew 142, Matthew 143, Matthew 144, Matthew 145, Matthew 146, Matthew 147, Matthew 148, Matthew 149, Matthew 150, Matthew 151, Matthew 152, Matthew 153, Matthew 154, Matthew 155, Matthew 156, Matthew 157, Matthew 158, Matthew 159, Matthew 160, Matthew 161, Matthew 162, Matthew 163, Matthew 164, Matthew 165, Matthew 166, Matthew 167, Matthew 168, Genesis 1, Genesis 2, Genesis 3, Genesis 4, Genesis 5, Genesis 6, Genesis 7, Genesis 8, Genesis 9, Genesis 10, Genesis 11, Genesis 12, Genesis 13, Genesis 14, Genesis 15, Genesis 16, Genesis 17, Genesis 18, Genesis 19, Genesis 20, Genesis 21, Genesis 22, Genesis 23, Genesis 24, Genesis 25, Genesis 26, Genesis 27, Genesis 28, Genesis 29, Genesis 30, Genesis 31, Genesis 32, Genesis 33, Genesis 34, Genesis 35, Genesis 36, Genesis 37, Genesis 38, Genesis 39, and Exodus 40 chapter coverage has now started too.
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
