import { amazonSearch, youtubeSearch } from './link-helpers.js';

export const poetryWorks = [
  {
    title: "John Milton - Paradise Lost",
    frame: "Genesis, fall, temptation, obedience, and the promise of redemption.",
    copy: "Read it as a vast imaginative argument about Genesis 1-3, Romans 5, and the drama of creaturely freedom. The goal is not to replace Scripture, but to make you return to Genesis with sharper questions about pride, trust, and grace.",
    scripture: ["Genesis 1-3", "Romans 5", "Revelation 12"],
    links: [
      { label: "Amazon editions", href: amazonSearch("Paradise Lost John Milton annotated edition") },
      { label: "Yale Milton course", href: "https://oyc.yale.edu/english/engl-220" },
      { label: "YouTube deep dives", href: youtubeSearch("Paradise Lost Milton John Rogers lecture theology") },
    ],
  },
  {
    title: "Dante Alighieri - The Divine Comedy",
    frame: "Sin, repentance, purification, worship, judgment, and the soul's journey toward God.",
    copy: "Dante helps readers imagine moral consequence and spiritual desire. Pair Inferno with Jesus' teaching on judgment, Purgatorio with repentance and formation, and Paradiso with worship, resurrection hope, and the beatific vision.",
    scripture: ["Matthew 5-7", "1 Corinthians 13", "Revelation 21-22"],
    links: [
      { label: "Amazon editions", href: amazonSearch("Dante Divine Comedy translation notes") },
      { label: "100 Days of Dante", href: "https://100daysofdante.com/" },
      { label: "YouTube deep dives", href: youtubeSearch("Dante Divine Comedy Christian theology lecture") },
    ],
  },
  {
    title: "John Bunyan - The Pilgrim's Progress",
    frame: "Conversion, endurance, temptation, fellowship, suffering, and hope.",
    copy: "This is the easiest bridge from story back to discipleship. Read it beside the Gospels, Hebrews, and Ephesians as an allegory of the Christian life under pressure.",
    scripture: ["Matthew 7", "Ephesians 6", "Hebrews 11-12"],
    links: [
      { label: "Amazon editions", href: amazonSearch("The Pilgrim's Progress John Bunyan") },
      { label: "Project Gutenberg", href: "https://www.gutenberg.org/ebooks/131" },
      { label: "YouTube deep dives", href: youtubeSearch("Pilgrim's Progress explained Christian allegory") },
    ],
  },
  {
    title: "George Herbert and John Donne - Devotional Poetry",
    frame: "Prayer, doubt, surrender, repentance, holiness, death, and the nearness of God.",
    copy: "Use these as short daily readings when epic poetry is too much. Herbert's The Temple and Donne's holy sonnets teach readers to turn intellect, anxiety, guilt, and longing back into prayer.",
    scripture: ["Psalms", "Job", "Romans 7-8"],
    links: [
      { label: "Amazon: Herbert", href: amazonSearch("George Herbert The Temple poems") },
      { label: "Amazon: Donne", href: amazonSearch("John Donne Holy Sonnets poems") },
      { label: "YouTube deep dives", href: youtubeSearch("George Herbert John Donne devotional poetry lecture") },
    ],
  },
  {
    title: "Edmund Spenser - The Faerie Queene",
    frame: "Virtue, holiness, temptation, false religion, discipline, and sanctification.",
    copy: "Spenser is demanding, but useful after Scripture's virtue language starts to make sense. Read slowly as an allegorical training ground for recognizing how desire, deception, courage, and holiness are formed.",
    scripture: ["Galatians 5", "Ephesians 4-6", "2 Peter 1"],
    links: [
      { label: "Amazon editions", href: amazonSearch("The Faerie Queene Edmund Spenser annotated") },
      { label: "Poetry Foundation", href: "https://www.poetryfoundation.org/poets/edmund-spenser" },
      { label: "YouTube deep dives", href: youtubeSearch("Faerie Queene Spenser allegory Christian virtue lecture") },
    ],
  },
  {
    title: "T.S. Eliot - Four Quartets and The Waste Land",
    frame: "Time, spiritual dryness, memory, judgment, purification, and the possibility of grace.",
    copy: "Eliot is modern and dense, so read him after the Psalms, Ecclesiastes, and John have begun to shape your imagination. Four Quartets is the better devotional doorway; The Waste Land is more diagnostic of fragmentation.",
    scripture: ["Ecclesiastes", "John 1", "1 John 1"],
    links: [
      { label: "Amazon: Four Quartets", href: amazonSearch("T.S. Eliot Four Quartets") },
      { label: "Amazon: The Waste Land", href: amazonSearch("T.S. Eliot The Waste Land annotated") },
      { label: "YouTube deep dives", href: youtubeSearch("T.S. Eliot Four Quartets Christian theology lecture") },
    ],
  },
  {
    title: "Johann Wolfgang von Goethe - Faust",
    frame: "Ambition, temptation, spiritual exhaustion, knowledge, and the danger of gaining the world while losing the soul.",
    copy: "Read Faust later, as diagnosis rather than devotional grounding. It is useful for intellectually restless readers because it exposes how the hunger to master everything can become a spiritual trap that sends you back to Genesis, Job, Ecclesiastes, and Jesus' wilderness temptation.",
    scripture: ["Genesis 3", "Job 1-2", "Matthew 4", "Matthew 16:24-26"],
    links: [
      { label: "Amazon editions", href: amazonSearch("Goethe Faust translation notes") },
      { label: "Project Gutenberg", href: "https://www.gutenberg.org/ebooks/14591" },
      { label: "YouTube deep dives", href: youtubeSearch("Goethe Faust Christian theology temptation lecture") },
    ],
  },
];
