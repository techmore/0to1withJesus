import { amazonSearch, youtubeSearch } from './link-helpers.js';

export const resources = [
  {
    title: "BibleProject",
    category: "video",
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
  {
    title: "Yale Old Testament course",
    category: "scholarly",
    copy: "Christine Hayes' Introduction to the Old Testament is a widely respected academic gateway to the Hebrew Bible, especially for historical-critical context.",
    tags: ["Course", "Old Testament", "Academic"],
    links: [
      { label: "YouTube lecture", href: "https://www.youtube.com/watch?v=mo-YL-lv3RY" },
      { label: "YaleCourses channel", href: "https://www.youtube.com/@YaleCourses" },
    ],
  },
  {
    title: "Yale New Testament history and literature",
    category: "scholarly",
    copy: "Dale B. Martin's New Testament course offers rigorous historical study of early Christianity and the New Testament in context.",
    tags: ["Course", "New Testament", "Academic"],
    links: [
      { label: "YouTube playlist", href: "https://www.youtube.com/playlist?list=PL279CFA55C51E75E0" },
      { label: "YaleCourses channel", href: "https://www.youtube.com/@YaleCourses" },
    ],
  },
  {
    title: "Harvard Hebrew Bible",
    category: "scholarly",
    copy: "Shaye J. D. Cohen's Hebrew Bible lectures are useful for seeing major books and themes through the lens of modern scholarship and ancient interpretation.",
    tags: ["Course", "Hebrew Bible", "Academic"],
    links: [
      { label: "Lecture video", href: "https://www.youtube.com/watch?v=Y-lw-_nf_NM" },
      { label: "Harvard online", href: "https://online-learning.harvard.edu/" },
    ],
  },
  {
    title: "Yale Divinity Bible study series",
    category: "scholarly",
    copy: "Focused Bible study lectures by Yale scholars, useful for targeted deep dives on books like Revelation and other difficult texts.",
    tags: ["Video", "Bible Study", "Academic"],
    links: [
      { label: "Playlist", href: "https://www.youtube.com/playlist?list=PLBAB8086DE927F07F" },
      { label: "Yale Divinity School", href: "https://divinity.yale.edu/" },
    ],
  },
  {
    title: "Bart D. Ehrman lectures and podcast",
    category: "scholarly",
    copy: "High-volume critical scholarship on textual criticism, the historical Jesus, the origins of Christianity, and individual New Testament books.",
    tags: ["Video", "Podcast", "Academic"],
    links: [
      { label: "YouTube channel", href: "https://www.youtube.com/user/bartdehrman" },
      { label: "Podcast / site", href: "https://ehrmanblog.org/" },
    ],
  },
  {
    title: "N. T. Wright lectures and courses",
    category: "scholarly",
    copy: "Deep dives into Paul, Jesus, the kingdom of God, and the broader biblical narrative from a leading New Testament scholar.",
    tags: ["Video", "NT Wright", "Academic"],
    links: [
      { label: "NT Wright Online", href: "https://www.youtube.com/c/NTWrightOnline" },
      { label: "N. T. Wright page", href: "https://ntwrightpage.com/" },
    ],
  },
  {
    title: "BibleProject",
    category: "scholarly",
    copy: "Outstanding animated overviews, podcasts, and thematic series for big-picture understanding of the Bible.",
    tags: ["Video", "Bible", "Overview"],
    links: [
      { label: "YouTube channel", href: "https://www.youtube.com/channel/UCVfwlh9XpX2Y_tQfjeln9QA" },
      { label: "Website", href: "https://bibleproject.com/" },
    ],
  },
  {
    title: "The Master's Seminary and other evangelical seminary courses",
    category: "scholarly",
    copy: "Conservative but detailed teaching resources for verse-by-verse exegesis and biblical theology.",
    tags: ["Course", "Seminary", "Bible"],
    links: [
      { label: "The Master's Seminary", href: "https://www.tms.edu/" },
      { label: "TMS YouTube", href: "https://www.youtube.com/@TheMastersSeminary" },
    ],
  },
  {
    title: "DiscipleDojo",
    category: "scholarly",
    copy: "Practical study Bible reviews, scholar interviews, book studies, and jargon explanations that bridge academic and church audiences.",
    tags: ["Video", "Study", "Bible"],
    links: [
      { label: "YouTube channel", href: "https://www.youtube.com/@DiscipleDojo" },
      { label: "Website", href: "https://discipledojo.com/" },
    ],
  },
  {
    title: "Michael S. Heiser legacy content",
    category: "scholarly",
    copy: "Legacy lectures on the unseen realm, divine council, and the Deuteronomy 32 worldview for readers who want a scholarly but accessible angle.",
    tags: ["Video", "Legacy", "Bible"],
    links: [
      { label: "YouTube search", href: youtubeSearch("Michael Heiser unseen realm lecture") },
      { label: "Website archive", href: "https://drmsh.com/" },
    ],
  },
  {
    title: "Carmen Joy Imes",
    category: "scholarly",
    copy: "Shorter but insightful Old Testament themes, especially helpful for covenant, identity, and Exodus-related material.",
    tags: ["Video", "Old Testament", "Academic"],
    links: [
      { label: "YouTube search", href: youtubeSearch("Carmen Joy Imes Old Testament lecture") },
      { label: "Website", href: "https://www.carmenjoyimes.com/" },
    ],
  },
  {
    title: "Israel Institute of Biblical Studies",
    category: "scholarly",
    copy: "Hebrew language and text-focused deep dives for readers who want original-language and context-oriented study.",
    tags: ["Course", "Hebrew", "Bible"],
    links: [
      { label: "Website", href: "https://israelbiblicalstudies.com/" },
      { label: "Courses", href: "https://israelbiblicalstudies.com/course-catalog/" },
    ],
  },
];

export const resourceGroups = [
  { key: "video", label: "Video" },
  { key: "books", label: "Books" },
  { key: "course", label: "Courses" },
  { key: "scholarly", label: "Scholarly" },
  { key: "audio", label: "Audio" },
  { key: "tool", label: "Tools" },
  { key: "general", label: "General" },
];

export const resourceStarterSection = {
  eyebrow: "Start here",
  title: "Best beginner resources",
  copy: "These are the safest first picks if you want a short on-ramp before diving into the larger library.",
};
