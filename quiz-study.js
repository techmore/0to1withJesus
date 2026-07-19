import { referenceData } from './reference-data.js';
import { asText, quizTrackForItem, slugify } from './reference-view.js';
import { escapeHtml } from './render-utils.js';

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const params = new URLSearchParams(window.location.search);
  const requestedSlug = asText(params.get('quiz')).trim();
  const quiz = referenceData.quizzes.find((item) => slugify(asText(item.title)) === requestedSlug) || null;

  function trackLabel(track) {
    return {
      starter: 'Starter',
      intermediate: 'Intermediate',
      expert: 'Expert',
    }[track] || 'Quiz';
  }

  function trackDescription(track) {
    return {
      starter: 'Learn the map, order, and major sections before you start.',
      intermediate: 'Move into books and section groupings with a clearer map.',
      expert: 'Use recall practice to keep details sharp.',
    }[track] || 'Study the quiz before you take it.';
  }

  function quizPagePath(track, title) {
    const slug = slugify(title);
    return `./quizzes/${track}.html#${slug}`;
  }

  function renderQuestion(question, index) {
    return `
      <details class="quiz-question" ${index === 0 ? 'open' : ''}>
        <summary>
          <span>Question ${index + 1}</span>
          <strong>${escapeHtml(asText(question?.prompt, 'Question'))}</strong>
        </summary>
        <p>${escapeHtml(asText(question?.answer, ''))}</p>
      </details>
    `;
  }

  function renderNotFound() {
    return `
      <article class="card reference-card quiz-study-card">
        <div class="reference-card-head">
          <span class="pill">Study guide</span>
        </div>
        <h3>Quiz not found</h3>
        <p>Open the quiz hub or pick a track page, then choose a study guide from there.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="./quizzes/starter.html">Starter quizzes</a>
          <a class="button button-secondary" href="./quizzes.html">Quiz hub</a>
        </div>
      </article>
    `;
  }

  if (quiz) {
    const title = asText(quiz.title, 'Study guide');
    const track = quizTrackForItem(quiz);
    const summary = asText(quiz.summary);
    const detail = asText(quiz.detail);
    const start = asText(quiz.start);
    const questions = Array.isArray(quiz.questions) ? quiz.questions : [];
    const quizHref = quizPagePath(track, title);

    document.title = `${title} Study Guide | Jesus Guide`;
    document.getElementById('quiz-study-title').textContent = title;
    document.getElementById('quiz-study-lede').textContent = summary || trackDescription(track);
    document.querySelectorAll('.topnav-reference a').forEach((link) => {
      const isTrackLink = link.getAttribute('href') === `./quizzes/${track}.html`;
      link.classList.toggle('is-active', isTrackLink);
      if (isTrackLink) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
    document.getElementById('quiz-study-actions').innerHTML = `
      <a class="button button-primary" href="${escapeHtml(quizHref)}">Open quiz page</a>
      <a class="button button-secondary" href="./quizzes/${track}.html">Back to ${escapeHtml(trackLabel(track))} track</a>
    `;
    document.getElementById('quiz-study-panel').innerHTML = `
      <article class="reference-mini">
        <span>${escapeHtml(trackLabel(track))}</span>
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(trackDescription(track))}</p>
      </article>
      <article class="reference-mini">
        <span>Read first</span>
        <strong>Summary, detail, and start note</strong>
        <p>${escapeHtml(start || detail || summary)}</p>
      </article>
    `;
    document.getElementById('quiz-study-content').innerHTML = `
      <article class="card reference-card quiz-study-card">
        <div class="reference-card-head">
          <span class="pill">${escapeHtml(trackLabel(track))}</span>
          <span class="pill">${questions.length} questions</span>
        </div>
        <div>
          <h3>${escapeHtml(title)}</h3>
          <strong>${escapeHtml(summary)}</strong>
        </div>
        <p>${escapeHtml(detail)}</p>
        <div class="reference-start">
          <span>How to study</span>
          <p>Read the summary, cover the answers, and try to say the prompts out loud before opening each answer.</p>
        </div>
        <div class="quiz-questions">
          ${questions.map(renderQuestion).join('')}
        </div>
        <div class="resource-meta">
          <span class="pill">${escapeHtml(trackLabel(track))}</span>
          <span class="pill">Study first</span>
        </div>
      </article>
    `;
  } else {
    document.getElementById('quiz-study-title').textContent = 'Quiz not found';
    document.getElementById('quiz-study-lede').textContent = 'Pick a quiz from the hub or a track page and open its study guide first.';
    document.querySelectorAll('.topnav-reference a').forEach((link) => {
      link.classList.remove('is-active');
      if (link.getAttribute('aria-current') === 'page') {
        link.removeAttribute('aria-current');
      }
    });
    document.getElementById('quiz-study-actions').innerHTML = `
      <a class="button button-primary" href="./quizzes.html">Quiz hub</a>
    `;
    document.getElementById('quiz-study-panel').innerHTML = renderNotFound();
    document.getElementById('quiz-study-content').innerHTML = renderNotFound();
  }
}
