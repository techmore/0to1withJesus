import { amazonSearch } from './link-helpers.js';

export const sections = {
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
