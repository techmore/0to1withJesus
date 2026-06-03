import { glossaryLinks } from './render-utils.js';

export const drawerTopics = {
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
          <a class="link" href="./reference.html#prayer">Open Prayer section</a>
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
