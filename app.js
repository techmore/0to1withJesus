const sections = {
  overview: [
    {
      title: "The Gospel of John",
      copy: "The clearest first book for understanding who Jesus is, what he claimed, and why his death and resurrection matter.",
      tags: ["read", "gospel"],
      links: [
        { label: "BibleProject overview", href: "https://bibleproject.com/explore/video/john/" },
        { label: "BibleGateway audio", href: "https://www.biblegateway.com/resources/audio/" },
      ],
    },
    {
      title: "Luke + Acts",
      copy: "A longer narrative that shows Jesus in context and then follows the first Christian movement after the resurrection.",
      tags: ["read", "history"],
      links: [
        { label: "BibleProject reading plans", href: "https://bibleproject.com/readingplans/" },
        { label: "YouVersion", href: "https://www.bible.com/" },
      ],
    },
    {
      title: "Romans + Ephesians",
      copy: "Good next steps for understanding what Christians believe about grace, faith, salvation, the church, and life in Christ.",
      tags: ["read", "doctrine"],
      links: [
        { label: "BibleProject guides", href: "https://bibleproject.com/guides/" },
        { label: "BibleHub interlinear", href: "https://biblehub.com/interlinear/" },
      ],
    },
  ],
  listen: [
    {
      title: "BibleGateway audio Bibles",
      copy: "Listen to Scripture directly and move through a Gospel chapter by chapter instead of relying only on summaries.",
      tags: ["audio", "scripture"],
      links: [
        { label: "Audio Bibles", href: "https://www.biblegateway.com/resources/audio/" },
        { label: "Audio app", href: "https://www.biblegateway.com/bible-audio-app/" },
      ],
    },
    {
      title: "Billy Graham sermons and videos",
      copy: "Classic preaching sessions for when you want a clear gospel presentation, encouragement, or old-school evangelistic messages.",
      tags: ["audio", "video"],
      links: [
        { label: "Sermons", href: "https://billygraham.org/sermons/" },
        { label: "Videos", href: "https://billygraham.org/videos/" },
      ],
    },
    {
      title: "John Mark Comer podcasts and teaching",
      copy: "Helpful when you want a slower, formation-focused tone that still stays practical and beginner-friendly.",
      tags: ["audio", "formation"],
      links: [
        { label: "Home", href: "https://johnmarkcomer.com/" },
        { label: "Practicing the Way", href: "https://practicingtheway.org/" },
      ],
    },
  ],
  study: [
    {
      title: "BibleProject How to Read the Bible",
      copy: "Excellent for learning how biblical narrative, poetry, prophecy, and letters work together.",
      tags: ["course", "tool"],
      links: [
        { label: "BibleProject", href: "https://bibleproject.com/" },
        { label: "Guides", href: "https://bibleproject.com/guides/" },
      ],
    },
    {
      title: "Interlinear and word studies",
      copy: "Use Greek word tools when a verse is dense, technical, or debated. This is especially useful in Romans and John.",
      tags: ["tool", "language"],
      links: [
        { label: "BibleHub interlinear", href: "https://biblehub.com/interlinear/" },
        { label: "Perseus Digital Library", href: "https://www.perseus.tufts.edu/hopper/" },
      ],
    },
    {
      title: "Can I trust the Bible?",
      copy: "Apologetics resources for manuscripts, canon, reliability, and the historical case for Christianity.",
      tags: ["course", "apologetics"],
      links: [
        { label: "Wesley Huff", href: "https://www.wesleyhuff.com/home" },
        { label: "Apologetics Canada", href: "https://apologeticscanada.com/" },
      ],
    },
  ],
  context: [
    {
      title: "Second Temple Judaism",
      copy: "Learn the Jewish world Jesus entered: synagogue life, Temple worship, Pharisees, Sadducees, festivals, and expectations of Messiah.",
      tags: ["history", "jewish"],
      links: [
        { label: "BibleProject about us", href: "https://bibleproject.com/about/" },
        { label: "Wesley Huff articles", href: "https://www.wesleyhuff.com/blog/2017/12/1/the-question-of-canon-the-who-what-and-where-of-the-books-of-the-bible" },
      ],
    },
    {
      title: "Rome and the Mediterranean world",
      copy: "Understand emperors, roads, taxation, crucifixion, citizenship, military power, and the empire context behind the New Testament.",
      tags: ["history", "roman"],
      links: [
        { label: "Hillsdale courses", href: "https://online.hillsdale.edu/courses" },
        { label: "Ancient Christianity", href: "https://online.hillsdale.edu/courses" },
      ],
    },
    {
      title: "Greek and Latin",
      copy: "Use original-language tools to see how words, grammar, and literary style affect meaning without guessing from English alone.",
      tags: ["language", "tool"],
      links: [
        { label: "BibleHub interlinear", href: "https://biblehub.com/interlinear/" },
        { label: "Perseus", href: "https://www.perseus.tufts.edu/hopper/" },
      ],
    },
  ],
  library: [
    {
      title: "Best starter books",
      copy: "Good beginner books for learning Jesus, the gospel, and Christian basics without getting buried in jargon.",
      tags: ["books", "starter"],
      links: [
        { label: "Amazon search: Mere Christianity", href: amazonSearch("Mere Christianity C.S. Lewis") },
        { label: "Amazon search: The Case for Christ", href: amazonSearch("The Case for Christ Lee Strobel") },
      ],
    },
    {
      title: "Formation and discipleship",
      copy: "Useful when you want Christianity to become a lived apprenticeship instead of only information.",
      tags: ["books", "formation"],
      links: [
        { label: "Amazon search: The Ruthless Elimination of Hurry", href: amazonSearch("The Ruthless Elimination of Hurry John Mark Comer") },
        { label: "Amazon search: Practicing the Way", href: amazonSearch("Practicing the Way John Mark Comer") },
      ],
    },
    {
      title: "Courses and long-form learning",
      copy: "A more structured path for people who want a free, course-like experience that feels closer to a self-paced academy.",
      tags: ["course", "video"],
      links: [
        { label: "BibleProject classroom", href: "https://bibleproject.com/classroom/" },
        { label: "Hillsdale online", href: "https://online.hillsdale.edu/" },
      ],
    },
  ],
};

const poetryWorks = [
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

const resources = [
  {
    title: "BibleProject",
    category: "video",
    copy: "Clear Bible overviews, reading plans, classes, and guides that help you see Scripture as one story pointing to Jesus.",
      tags: ["Video", "Course", "Bible"],
    links: [
      { label: "Website", href: "https://bibleproject.com/" },
      { label: "How to read", href: "https://bibleproject.com/guides/" },
    ],
  },
  {
    title: "Mere Christianity",
    category: "books",
    copy: "A classic first book for understanding the basic claims of Christianity in clear, thoughtful language.",
    tags: ["Book", "Starter"],
    links: [
      { label: "Amazon search", href: amazonSearch("Mere Christianity C.S. Lewis") },
      { label: "About C.S. Lewis", href: "https://www.cslewis.com/" },
    ],
  },
  {
    title: "The Case for Christ",
    category: "books",
    copy: "A widely read introduction to the historical case for Jesus and the resurrection.",
    tags: ["Book", "Apologetics"],
    links: [
      { label: "Amazon search", href: amazonSearch("The Case for Christ Lee Strobel") },
      { label: "Lee Strobel", href: "https://leestrobel.com/" },
    ],
  },
  {
    title: "Bible translation comparison",
    category: "tool",
    copy: "Compare a passage in several translations to see meaning, wording, and tone side by side.",
    tags: ["Tool", "Bible"],
    links: [
      { label: "BibleGateway compare", href: "https://www.biblegateway.com/passage/?search=John+1&version=NIV" },
      { label: "YouVersion", href: "https://www.bible.com/" },
    ],
  },
  {
    title: "The Ruthless Elimination of Hurry",
    category: "books",
    copy: "Helpful if you want a practice-oriented next step in discipleship and spiritual habits.",
    tags: ["Book", "Formation"],
    links: [
      { label: "Amazon search", href: amazonSearch("The Ruthless Elimination of Hurry John Mark Comer") },
      { label: "John Mark Comer", href: "https://johnmarkcomer.com/" },
    ],
  },
  {
    title: "Wesley Huff",
    category: "video",
    copy: "Apologetics, manuscript evidence, canon, and public-facing explanation of why the Christian faith is intellectually credible.",
      tags: ["Apologetics", "History", "Bible"],
    links: [
      { label: "Home", href: "https://www.wesleyhuff.com/home" },
      { label: "Bio", href: "https://www.wesleyhuff.com/bio" },
    ],
  },
  {
    title: "Apologetics Canada",
    category: "video",
    copy: "Conferences, resources, podcasts, and teaching for questions about faith, culture, and the reliability of Christianity.",
      tags: ["Apologetics", "Video"],
    links: [
      { label: "Website", href: "https://apologeticscanada.com/" },
      { label: "Can I Trust the Bible?", href: "https://apologeticscanada.com/" },
    ],
  },
  {
    title: "John Mark Comer",
    category: "audio",
    copy: "Teaching, podcasts, and formation resources centered on apprentice-style discipleship to Jesus.",
    tags: ["Formation", "Audio", "Book"],
    links: [
      { label: "Home", href: "https://johnmarkcomer.com/" },
      { label: "Practicing the Way", href: "https://practicingtheway.org/" },
    ],
  },
  {
    title: "Billy Graham Evangelistic Association",
    category: "audio",
    copy: "Classic evangelistic preaching, devotionals, and school-of-evangelism material for gospel proclamation.",
    tags: ["Preaching", "Audio", "Video"],
    links: [
      { label: "Main site", href: "https://billygraham.org/" },
      { label: "Sermons", href: "https://billygraham.org/sermons/" },
    ],
  },
  {
    title: "BibleGateway audio",
    category: "audio",
    copy: "Listen to the Bible itself and move through the Gospels, Acts, and the letters at your own pace.",
      tags: ["Audio", "Scripture"],
    links: [
      { label: "Audio Bibles", href: "https://www.biblegateway.com/resources/audio/" },
      { label: "Audio app", href: "https://www.biblegateway.com/bible-audio-app/" },
    ],
  },
  {
    title: "The Bible in a Year with Fr. Mike Schmitz",
    category: "audio",
    copy: "A 365-episode listening path through the Catholic Bible with Scripture readings, brief commentary, and prayer. Best used as a replacement habit for scrolling.",
    tags: ["Audio", "Scripture", "Daily"],
    links: [
      { label: "YouTube playlist", href: "https://www.youtube.com/watch?v=JFbGuKTjlmc&list=PL0QzUlsjD3k3UnRBLz_Y3DYQGv-mQAqy0" },
      { label: "Ascension podcast", href: "https://app.ascensionpress.com/podcasts/bible?utm_source=ascension-shopify&utm_medium=website" },
      { label: "Reading plan PDF", href: "https://stthecla.com/wp-content/uploads/2021/09/Bible-in-a-Year-Reading-Plan.pdf" },
    ],
  },
  {
    title: "BibleHub interlinear",
    category: "tool",
    copy: "A practical original-language tool for verse-by-verse comparison, Strong’s numbers, and quick lexical checking.",
      tags: ["Greek", "Tool", "Study"],
    links: [
      { label: "Interlinear", href: "https://biblehub.com/interlinear/" },
      { label: "Search site", href: "https://biblehub.com/" },
    ],
  },
  {
    title: "Hillsdale College online courses",
    category: "course",
    copy: "Free courses that add useful history, philosophy, and Western civilization context for Christian and biblical study.",
    tags: ["Course", "History"],
    links: [
      { label: "Online courses", href: "https://online.hillsdale.edu/" },
      { label: "Catalog", href: "https://online.hillsdale.edu/courses" },
    ],
  },
  {
      title: "The Bible Project reading plans",
    category: "course",
    copy: "A gentle way to read through the Bible with guided plans, including Gospels-focused tracks.",
    tags: ["Course", "Bible"],
    links: [
      { label: "Reading plans", href: "https://bibleproject.com/readingplans/" },
      { label: "Classroom", href: "https://bibleproject.com/classroom/" },
    ],
  },
  {
    title: "Paradise Lost and Christian epic poetry",
    category: "books",
    copy: "Milton, Dante, Bunyan, Herbert, Donne, Spenser, and Eliot as slow imaginative companions that push readers back toward Scripture.",
    tags: ["Book", "Poetry", "Formation"],
    links: [
      { label: "Open poetry guide", href: "./poetry.html" },
      { label: "Amazon: Paradise Lost", href: amazonSearch("Paradise Lost John Milton annotated edition") },
      { label: "Yale Milton lectures", href: "https://oyc.yale.edu/english/engl-220" },
    ],
  },
  {
    title: "Dante deep-dive companions",
    category: "video",
    copy: "Long-form video and course resources for reading The Divine Comedy as moral, theological, and biblical imagination.",
    tags: ["Video", "Course", "Poetry"],
    links: [
      { label: "100 Days of Dante", href: "https://100daysofdante.com/" },
      { label: "YouTube search", href: youtubeSearch("Dante Divine Comedy Christian theology lecture") },
      { label: "Amazon editions", href: amazonSearch("Dante Divine Comedy translation notes") },
    ],
  },
];

const firstSevenDays = [
  {
    day: 1,
    reading: "John 1",
    focus: "Jesus as the Word, light, and Son of God.",
    question: "Who does John say Jesus is?",
    readHref: "https://www.biblegateway.com/passage/?search=John+1&version=NIV",
    listenHref: "https://www.biblegateway.com/audio/purevoice/niv/John.1",
  },
  {
    day: 2,
    reading: "John 2-3",
    focus: "Signs, new birth, belief, and God's love for the world.",
    question: "What does Jesus say a person needs?",
    readHref: "https://www.biblegateway.com/passage/?search=John+2-3&version=NIV",
    listenHref: "https://www.biblegateway.com/audio/purevoice/niv/John.2",
  },
  {
    day: 3,
    reading: "John 4",
    focus: "Jesus meets outsiders and offers living water.",
    question: "Who does Jesus welcome?",
    readHref: "https://www.biblegateway.com/passage/?search=John+4&version=NIV",
    listenHref: "https://www.biblegateway.com/audio/purevoice/niv/John.4",
  },
  {
    day: 4,
    reading: "John 5-6",
    focus: "Authority, signs, hunger, and the bread of life.",
    question: "What are people looking for from Jesus?",
    readHref: "https://www.biblegateway.com/passage/?search=John+5-6&version=NIV",
    listenHref: "https://www.biblegateway.com/audio/purevoice/niv/John.5",
  },
  {
    day: 5,
    reading: "John 7-10",
    focus: "Conflict, identity, light, truth, and the good shepherd.",
    question: "Why do people divide over Jesus?",
    readHref: "https://www.biblegateway.com/passage/?search=John+7-10&version=NIV",
    listenHref: "https://www.biblegateway.com/audio/purevoice/niv/John.7",
  },
  {
    day: 6,
    reading: "John 11-17",
    focus: "Resurrection, love, service, prayer, and final teaching.",
    question: "What does Jesus promise his followers?",
    readHref: "https://www.biblegateway.com/passage/?search=John+11-17&version=NIV",
    listenHref: "https://www.biblegateway.com/audio/purevoice/niv/John.11",
  },
  {
    day: 7,
    reading: "John 18-21",
    focus: "The cross, resurrection, restoration, and a moment to rest.",
    question: "What does Jesus accomplish?",
    readHref: "https://www.biblegateway.com/passage/?search=John+18-21&version=NIV",
    listenHref: "https://www.biblegateway.com/audio/purevoice/niv/John.18",
    note: "After seven days, pause. Rest is part of the path, not a failure to study.",
    drawerTopic: "sabbath",
  },
];

const glossaryTerms = [
  {
    term: "Gospel",
    short: "Good news centered on Jesus.",
    definition: "The announcement that God has acted through Jesus' life, death, and resurrection to bring forgiveness, reconciliation, and new life.",
  },
  {
    term: "Messiah",
    short: "God's promised king.",
    definition: "The anointed one promised in Israel's story. Christians believe Jesus is the Messiah who fulfills God's promises.",
  },
  {
    term: "Grace",
    short: "Gift, not earning.",
    definition: "God's generous favor toward people who cannot repair themselves or earn his love by performance.",
  },
  {
    term: "Faith",
    short: "Trusting allegiance.",
    definition: "More than agreeing with facts. Faith means trusting Jesus and learning to follow him with your life.",
  },
  {
    term: "Repentance",
    short: "Turning toward God.",
    definition: "A change of direction: telling the truth, turning from sin, and moving toward God.",
  },
  {
    term: "Sin",
    short: "The rupture Jesus heals.",
    definition: "Human rebellion, corruption, and failure that separates people from God, harms others, and distorts the self.",
  },
  {
    term: "Kingdom of God",
    short: "God's reign arriving.",
    definition: "God's rule and renewal breaking into the world through Jesus, calling people into a new way of life.",
  },
  {
    term: "Disciple",
    short: "A learner who follows.",
    definition: "Someone who learns from Jesus, follows his way, and becomes shaped by his teaching and life.",
  },
  {
    term: "Resurrection",
    short: "Jesus raised from death.",
    definition: "The Christian claim that Jesus was bodily raised from the dead, defeating death and beginning new creation.",
  },
  {
    term: "Sabbath",
    short: "A rhythm of rest.",
    definition: "A biblical rhythm of stopping, resting, worshiping, and remembering that life is received from God.",
  },
  {
    term: "Prayer",
    short: "Honest attention to God.",
    definition: "Speaking and listening to God with gratitude, confession, requests, trust, and worship.",
  },
  {
    term: "Church",
    short: "The people of Jesus.",
    definition: "Not only a building. The church is the community of people gathered around Jesus as Lord.",
  },
];

const drawerTopics = {
  john: {
    kicker: "Why John?",
    title: "Start with the clearest doorway to Jesus.",
    body: `
      <p class="drawer-intro">
        John is not first because the other Gospels matter less. John is first because it gives a direct,
        concentrated introduction to who Jesus is and what belief in him means.
      </p>
      ${glossaryLinks(["Gospel", "Faith", "Disciple"])}

      <div class="drawer-section">
        <h3>What John helps you see</h3>
        <article class="drawer-resource">
          <span class="pill">Start here</span>
          <h4>Jesus is more than a teacher</h4>
          <p>
            John opens by calling Jesus the Word, the light, the Son, and the one who makes God known.
            That gives a beginner the main question early: who is Jesus?
          </p>
        </article>
        <article class="drawer-resource">
          <span class="pill">Then widen</span>
          <h4>The other Gospels round out the picture</h4>
          <p>
            Luke gives a broad ordered account, Mark moves quickly through Jesus' authority and suffering,
            and Matthew highlights kingdom, fulfillment, and discipleship.
          </p>
        </article>
      </div>

      <div class="drawer-section drawer-note">
        <h3>Simple first move</h3>
        <ol class="steps">
          <li>Read John 1 slowly.</li>
          <li>Ask, "Who does John say Jesus is?"</li>
          <li>Do not worry about every unfamiliar word yet.</li>
          <li>Let the whole Gospel answer the first question.</li>
        </ol>
      </div>
    `,
  },
  listening: {
    kicker: "Listening Resources",
    title: "Read John with audio beside you.",
    body: `
      <p class="drawer-intro">
        Start with a modern translation and a clean narrator. If one site feels awkward on your phone,
        use the next one; the goal is steady exposure to the Gospel itself.
      </p>

      <div class="drawer-section">
        <h3>Best first choice</h3>
        <article class="drawer-resource">
          <span class="pill">Beginner</span>
          <h4>BibleGateway Audio Bibles</h4>
          <p>
            Best overall starting point: open John, choose NIV, NLT, or another readable translation,
            then use the speaker icon or Audio Bibles page to listen while the text stays nearby.
          </p>
          <div class="resource-links">
            <a class="link" href="https://www.biblegateway.com/passage/?search=John+1&version=NIV" target="_blank" rel="noopener noreferrer">John 1 NIV</a>
            <a class="link" href="https://www.biblegateway.com/resources/audio/" target="_blank" rel="noopener noreferrer">Audio Bibles</a>
            <a class="link" href="https://www.biblegateway.com/audio/devotional/story-of-jesus" target="_blank" rel="noopener noreferrer">Story of Jesus</a>
          </div>
        </article>
      </div>

      <div class="drawer-section">
        <h3>Good browser backups</h3>
        <article class="drawer-resource">
          <span class="pill">KJV</span>
          <h4>AudioBible.com</h4>
          <p>Simple chapter links with KJV text and audio together. Useful if you want word-for-word read-along in a traditional translation.</p>
          <div class="resource-links">
            <a class="link" href="https://audiobible.com/bible/bible.html" target="_blank" rel="noopener noreferrer">Open AudioBible</a>
          </div>
        </article>
        <article class="drawer-resource">
          <span class="pill">Languages</span>
          <h4>WordProject</h4>
          <p>No-frills chapter pages with text and audio, especially helpful when English is not the only language you want available.</p>
          <div class="resource-links">
            <a class="link" href="https://www.wordproject.org/bibles/audio/01_english/b43.htm" target="_blank" rel="noopener noreferrer">John Audio</a>
            <a class="link" href="https://wordproject.org/bibles/audio/index.htm" target="_blank" rel="noopener noreferrer">Audio Index</a>
          </div>
        </article>
        <article class="drawer-resource">
          <span class="pill">NET</span>
          <h4>Bible.org John Audio</h4>
          <p>A focused Gospel of John audio page using the NET Bible ecosystem. Good as another browser-based option.</p>
          <div class="resource-links">
            <a class="link" href="https://bible.org/john_audio" target="_blank" rel="noopener noreferrer">John MP3 Audio</a>
          </div>
        </article>
      </div>

      <div class="drawer-section drawer-note">
        <h3>Simple rhythm</h3>
        <ol class="steps">
          <li>Open John 1 in BibleGateway.</li>
          <li>Use NIV or NLT for a first pass.</li>
          <li>Listen to one chapter while following the words.</li>
          <li>Replay confusing sections before adding commentary.</li>
        </ol>
      </div>
    `,
  },
  translations: {
    kicker: "Translations",
    title: "Use clarity first, precision second.",
    body: `
      <p class="drawer-intro">
        A Bible translation is not a spiritual ranking system. For a beginner, the best translation is
        one you can actually read with understanding.
      </p>
      ${glossaryLinks(["Gospel", "Grace", "Faith"])}

      <div class="drawer-section">
        <h3>Simple recommendation</h3>
        <article class="drawer-resource">
          <span class="pill">First read</span>
          <h4>NIV or NLT</h4>
          <p>
            Use NIV or NLT when you want the story to make sense in clear modern English. This is especially
            helpful when reading John for the first time.
          </p>
        </article>
        <article class="drawer-resource">
          <span class="pill">Compare</span>
          <h4>ESV, CSB, NASB, or NKJV</h4>
          <p>
            Check a more literal or middle-ground translation when a verse feels important, dense, or
            confusing. Differences often show where the original wording carries nuance.
          </p>
        </article>
        <article class="drawer-resource">
          <span class="pill">Later</span>
          <h4>Interlinear tools</h4>
          <p>
            BibleHub and interlinear tools are useful later, but they can overload a beginner. Use them
            when you have a specific word or verse you want to inspect.
          </p>
        </article>
      </div>

      <div class="drawer-section">
        <h3>Try John 1 side by side</h3>
        <div class="resource-links">
          <a class="link" href="https://www.biblegateway.com/passage/?search=John+1&version=NIV,NLT,ESV,CSB" target="_blank" rel="noopener noreferrer">Compare John 1</a>
          <a class="link" href="https://biblehub.com/interlinear/john/1.htm" target="_blank" rel="noopener noreferrer">John 1 interlinear</a>
        </div>
      </div>
    `,
  },
  gospel: {
    kicker: "The Gospel",
    title: "The good news centers on Jesus.",
    body: `
      <p class="drawer-intro">
        The word Gospel means good news. In Christianity, the good news is not mainly advice or self-improvement.
        It is the announcement of what God has done through Jesus.
      </p>
      ${glossaryLinks(["Gospel", "Messiah", "Sin", "Grace", "Faith", "Repentance"])}

      <div class="drawer-section">
        <h3>Plain-language shape</h3>
        <article class="drawer-resource">
          <span class="pill">Jesus</span>
          <h4>God comes near</h4>
          <p>
            The New Testament presents Jesus as God's Son, the Messiah, the crucified and risen Lord, and
            the one who reveals God clearly.
          </p>
        </article>
        <article class="drawer-resource">
          <span class="pill">Cross</span>
          <h4>Forgiveness and rescue</h4>
          <p>
            Christians believe Jesus gives himself for sinners, deals with evil and death, and opens the
            way for forgiveness, reconciliation with God, and new life.
          </p>
        </article>
        <article class="drawer-resource">
          <span class="pill">Response</span>
          <h4>Trust and follow</h4>
          <p>
            Faith means more than agreeing with facts. It means trusting Jesus, turning toward him, and
            learning to live as his disciple.
          </p>
        </article>
      </div>

      <div class="drawer-section drawer-note">
        <h3>Hold this question</h3>
        <p>As you read John, keep asking: what does Jesus offer, and what does he ask people to trust?</p>
      </div>
    `,
  },
  prayer: {
    kicker: "Prayer",
    title: "Start with honest words to God.",
    body: `
      <p class="drawer-intro">
        Prayer is not a performance. For a beginner, prayer can start as honest attention to God:
        gratitude, confession, asking for help, and quiet trust.
      </p>
      ${glossaryLinks(["Prayer", "Grace", "Disciple"])}

      <div class="drawer-section">
        <h3>A simple pattern</h3>
        <article class="drawer-resource">
          <span class="pill">Beginner</span>
          <h4>Four honest movements</h4>
          <p>
            Thank God for one thing. Tell the truth about one thing. Ask for help with one thing.
            Sit quietly for one minute before you move on.
          </p>
        </article>
        <article class="drawer-resource">
          <span class="pill">Jesus</span>
          <h4>Use the Lord's Prayer</h4>
          <p>
            Jesus gave his disciples a prayer that begins with God as Father, asks for his kingdom,
            daily provision, forgiveness, and deliverance from evil.
          </p>
        </article>
        <article class="drawer-resource">
          <span class="pill">Scripture</span>
          <h4>Approved prayer patterns</h4>
          <p>
            The Bible gives good forms for prayer: praise, confession, lament, thanksgiving, request,
            and intercession. The Psalms and apostolic prayers are a safe place to begin.
          </p>
        </article>
      </div>

      <div class="drawer-section drawer-note">
        <h3>Try this today</h3>
        <ol class="steps">
          <li>Read Matthew 6:9-13 slowly.</li>
          <li>Pray one line in your own words.</li>
          <li>Ask Jesus to teach you how to follow him.</li>
          <li>Keep it short enough that you will come back tomorrow.</li>
        </ol>
      </div>

      <div class="drawer-section">
        <h3>Read nearby</h3>
        <div class="resource-links">
          <a class="link" href="https://www.biblegateway.com/passage/?search=Matthew+6%3A9-13&version=NIV" target="_blank" rel="noopener noreferrer">Matthew 6:9-13</a>
          <a class="link" href="https://www.biblegateway.com/passage/?search=Psalm+23&version=NIV" target="_blank" rel="noopener noreferrer">Psalm 23</a>
          <a class="link" href="https://www.biblegateway.com/passage/?search=John+17&version=NIV" target="_blank" rel="noopener noreferrer">John 17</a>
        </div>
      </div>
    `,
  },
  sabbath: {
    kicker: "Rest",
    title: "After seven days, pause.",
    body: `
      <p class="drawer-intro">
        The first week should not end with pressure to master everything. Scripture begins with a rhythm
        of work and rest, and Jesus invites tired people to come to him.
      </p>
      ${glossaryLinks(["Sabbath", "Prayer", "Grace"])}

      <div class="drawer-section">
        <h3>What Sabbath means here</h3>
        <article class="drawer-resource">
          <span class="pill">Beginner</span>
          <h4>Stop long enough to receive</h4>
          <p>
            Sabbath is a biblical rhythm of stopping, resting, worshiping, and remembering that life is
            received from God, not earned by constant effort. A beginner can start with one unhurried block
            of time to read, pray, walk, worship, share a meal, or be still.
          </p>
        </article>
      </div>

      <div class="drawer-section drawer-note">
        <h3>A simple Day 7 practice</h3>
        <ol class="steps">
          <li>Read or listen to John 20 again slowly.</li>
          <li>Write one sentence: "What did I see about Jesus this week?"</li>
          <li>Take one unhurried walk, meal, prayer, or quiet hour.</li>
          <li>Do not add more resources until you have rested.</li>
        </ol>
      </div>

      <div class="drawer-section">
        <h3>Passages to hold nearby</h3>
        <div class="resource-links">
          <a class="link" href="https://www.biblegateway.com/passage/?search=Matthew+11%3A28-30&version=NIV" target="_blank" rel="noopener noreferrer">Matthew 11:28-30</a>
          <a class="link" href="https://www.biblegateway.com/passage/?search=Mark+2%3A27&version=NIV" target="_blank" rel="noopener noreferrer">Mark 2:27</a>
          <a class="link" href="https://www.biblegateway.com/passage/?search=Genesis+2%3A1-3&version=NIV" target="_blank" rel="noopener noreferrer">Genesis 2:1-3</a>
        </div>
      </div>
    `,
  },
};

function amazonSearch(query) {
  return `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
}

function youtubeSearch(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

function resourceCard(item) {
  const category = item.category || "general";
  const tagMarkup = item.tags
    .map((tag) => `<span class="pill">${escapeHtml(tag)}</span>`)
    .join("");

  const linkMarkup = item.links
    .map((link) => {
      const isInternal = link.href.startsWith("./") || link.href.startsWith("#");
      const target = isInternal ? "" : ` target="_blank" rel="noopener noreferrer"`;
      return `<a class="link" href="${escapeHtml(link.href)}"${target}>${escapeHtml(link.label)}</a>`;
    })
    .join("");

  return `
    <article class="card resource-card" data-category="${escapeHtml(category)}" data-search="${escapeHtml(searchText(item))}">
      <div class="resource-meta">${tagMarkup}</div>
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.copy)}</p>
      </div>
      <div class="resource-links">${linkMarkup}</div>
    </article>
  `;
}

function poetryCard(item) {
  const scriptureMarkup = item.scripture
    .map((passage) => `<span class="pill">${escapeHtml(passage)}</span>`)
    .join("");
  const linkMarkup = item.links
    .map((link) => `<a class="link" href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`)
    .join("");

  return `
    <article class="card poetry-card">
      <div class="resource-meta">${scriptureMarkup}</div>
      <h3>${escapeHtml(item.title)}</h3>
      <strong>${escapeHtml(item.frame)}</strong>
      <p>${escapeHtml(item.copy)}</p>
      <div class="resource-links">${linkMarkup}</div>
    </article>
  `;
}

function setupPoetry() {
  const grid = document.getElementById("poetry-grid");
  if (!grid) return;

  grid.innerHTML = poetryWorks.map(poetryCard).join("");
}

function searchText(item) {
  return [item.title, item.copy, ...(item.tags || []), ...(item.links || []).map((link) => link.label)]
    .join(" ")
    .toLowerCase();
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderSection(id, items) {
  const target = document.getElementById(id);
  if (!target) return;
  target.innerHTML = items.map(resourceCard).join("");
}

function glossaryCard(item) {
  return `
    <article class="card glossary-card" data-glossary-search="${escapeHtml(searchText({ title: item.term, copy: item.definition, tags: [item.short], links: [] }))}">
      <span class="pill">Term</span>
      <h3>${escapeHtml(item.term)}</h3>
      <strong>${escapeHtml(item.short)}</strong>
      <p>${escapeHtml(item.definition)}</p>
    </article>
  `;
}

function setupGlossary() {
  const grid = document.getElementById("glossary-grid");
  const search = document.getElementById("glossary-search");

  if (!grid) return;

  grid.innerHTML = glossaryTerms.map(glossaryCard).join("");

  const cards = [...grid.querySelectorAll(".glossary-card")];
  const apply = () => {
    const query = (search?.value || "").trim().toLowerCase();
    cards.forEach((card) => {
      const text = card.dataset.glossarySearch || "";
      card.style.display = !query || text.includes(query) ? "" : "none";
    });
  };

  search?.addEventListener("input", apply);
}

function setupGlossaryLinks() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-glossary-term]");
    if (!link) return;

    const search = document.getElementById("glossary-search");
    const glossary = document.getElementById("glossary");
    const closeButton = document.querySelector("[data-drawer-close]");

    if (!glossary || !search) {
      window.location.href = "./reference.html#vocabulary";
      return;
    }

    closeButton?.click();

    window.setTimeout(() => {
      search.value = link.dataset.glossaryTerm || "";
      search.dispatchEvent(new Event("input", { bubbles: true }));
      glossary?.scrollIntoView({ behavior: "smooth", block: "start" });
      search?.focus();
    }, 220);
  });
}

function firstDayCard(item, completedDays) {
  const id = `first-day-${item.day}`;
  const checked = completedDays.has(String(item.day)) ? "checked" : "";
  const noteMarkup = item.note ? `<p class="path-note">${escapeHtml(item.note)}</p>` : "";
  const drawerMarkup = item.drawerTopic ? `
    <button
      class="icon-button path-lightbulb"
      type="button"
      aria-label="Open rest guidance for day ${item.day}"
      aria-controls="guide-drawer"
      aria-expanded="false"
      data-drawer-open="${escapeHtml(item.drawerTopic)}"
    >
      ${lightbulbIcon()}
    </button>
  ` : "";

  return `
    <article class="card path-card ${checked ? "is-complete" : ""}" data-path-day="${item.day}">
      <div class="path-card-head">
        <span class="badge">${item.day}</span>
        <div class="path-card-actions">
          ${drawerMarkup}
          <label class="path-check" for="${id}">
            <input id="${id}" type="checkbox" data-path-check="${item.day}" ${checked} />
            <span>Done</span>
          </label>
        </div>
      </div>
      <h3>Day ${item.day}: ${escapeHtml(item.reading)}</h3>
      <p>${escapeHtml(item.focus)}</p>
      <div class="path-question">
        <span>Ask</span>
        <strong>${escapeHtml(item.question)}</strong>
      </div>
      ${noteMarkup}
      <div class="resource-links">
        <a class="link" href="${escapeHtml(item.readHref)}" target="_blank" rel="noopener noreferrer">Read</a>
        <a class="link" href="${escapeHtml(item.listenHref)}" target="_blank" rel="noopener noreferrer">Listen</a>
      </div>
    </article>
  `;
}

function lightbulbIcon() {
  return `
    <svg
      class="resource-panel-icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      stroke-width="1.5"
      aria-hidden="true"
      focusable="false"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  `;
}

function glossaryLinks(terms) {
  const links = terms
    .map((term) => `<button class="glossary-link" type="button" data-glossary-term="${escapeHtml(term)}">${escapeHtml(term)}</button>`)
    .join("");

  return `
    <div class="drawer-glossary-links" aria-label="Related glossary terms">
      <span>Related words</span>
      <div>${links}</div>
    </div>
  `;
}

function setupStaticLightbulbs() {
  document.querySelectorAll(".text-lightbulb").forEach((target) => {
    target.outerHTML = lightbulbIcon();
  });
}

function setupFirstPath() {
  const grid = document.getElementById("first-days-grid");
  const progress = document.getElementById("path-progress-count");
  const reset = document.getElementById("path-reset");
  const storageKey = "the-way-first-seven-days";

  if (!grid) return;

  const load = () => {
    try {
      return new Set(JSON.parse(localStorage.getItem(storageKey) || "[]"));
    } catch {
      return new Set();
    }
  };

  const save = (completedDays) => {
    localStorage.setItem(storageKey, JSON.stringify([...completedDays]));
  };

  const render = () => {
    const completedDays = load();
    grid.innerHTML = firstSevenDays.map((item) => firstDayCard(item, completedDays)).join("");
    if (progress) progress.textContent = `${completedDays.size} of ${firstSevenDays.length} days`;

    grid.querySelectorAll("[data-path-check]").forEach((input) => {
      input.addEventListener("change", () => {
        const next = load();
        input.checked ? next.add(input.dataset.pathCheck) : next.delete(input.dataset.pathCheck);
        save(next);
        render();
      });
    });
  };

  reset?.addEventListener("click", () => {
    localStorage.removeItem(storageKey);
    render();
  });

  render();
}

function setupTabs() {
  const tabs = [...document.querySelectorAll("[data-tab]")];
  const panels = [...document.querySelectorAll("[data-panel]")];

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const value = tab.dataset.tab;
      tabs.forEach((button) => {
        const active = button === tab;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-selected", String(active));
      });
      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.panel === value);
      });
    });
  });
}

function setupFilters() {
  const search = document.getElementById("resource-search");
  const chips = [...document.querySelectorAll("[data-filter]")];
  const cards = [...document.querySelectorAll(".resource-card")];

  let activeFilter = "all";

  const apply = () => {
    const query = (search?.value || "").trim().toLowerCase();

    cards.forEach((card) => {
      const category = card.dataset.category || "";
      const text = card.dataset.search || "";
      const matchesFilter = activeFilter === "all" || category === activeFilter;
      const matchesQuery = !query || text.includes(query);
      card.style.display = matchesFilter && matchesQuery ? "" : "none";
    });
  };

  search?.addEventListener("input", apply);

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      activeFilter = chip.dataset.filter || "all";
      chips.forEach((button) => button.classList.toggle("is-active", button === chip));
      apply();
    });
  });
}

function setupGuideDrawer() {
  const drawer = document.getElementById("guide-drawer");
  const overlay = document.querySelector(".drawer-overlay");
  const kicker = document.getElementById("guide-drawer-kicker");
  const title = document.getElementById("guide-drawer-title");
  const body = document.getElementById("guide-drawer-body");
  const closeButtons = [...document.querySelectorAll("[data-drawer-close]")];
  let activeTrigger = null;

  if (!drawer || !overlay || !kicker || !title || !body) return;

  const setOpen = (isOpen) => {
    drawer.classList.toggle("is-open", isOpen);
    overlay.classList.toggle("is-open", isOpen);
    drawer.setAttribute("aria-hidden", String(!isOpen));
    drawer.inert = !isOpen;
    document
      .querySelectorAll("[data-drawer-open]")
      .forEach((button) => button.setAttribute("aria-expanded", String(isOpen && button === activeTrigger)));
    document.body.classList.toggle("drawer-open", isOpen);

    if (isOpen) {
      overlay.hidden = false;
      drawer.querySelector("a, button")?.focus();
      return;
    }

    window.setTimeout(() => {
      if (!overlay.classList.contains("is-open")) overlay.hidden = true;
    }, 180);
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-drawer-open]");
    if (!trigger) return;

    const topic = drawerTopics[trigger.dataset.drawerOpen];
    if (!topic) return;

    activeTrigger = trigger;
    kicker.textContent = topic.kicker;
    title.textContent = topic.title;
    body.innerHTML = topic.body;
    setOpen(true);
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setOpen(false);
      activeTrigger?.focus();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawer.classList.contains("is-open")) {
      setOpen(false);
      activeTrigger?.focus();
    }
  });
}

renderSection("overview-grid", sections.overview);
renderSection("listen-grid", sections.listen);
renderSection("study-grid", sections.study);
renderSection("context-grid", sections.context);
renderSection("library-grid", sections.library);

const resourceGrid = document.getElementById("resource-grid");
if (resourceGrid) {
  resourceGrid.innerHTML = resources.map(resourceCard).join("");
}

setupTabs();
setupFilters();
setupFirstPath();
setupPoetry();
setupStaticLightbulbs();
setupGuideDrawer();
setupGlossary();
setupGlossaryLinks();
