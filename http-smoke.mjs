import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const server = spawn('python3', ['-m', 'http.server', '8000'], {
  cwd: new URL('.', import.meta.url),
  stdio: ['ignore', 'pipe', 'pipe'],
});

const cleanup = () => {
  if (!server.killed) server.kill('SIGTERM');
};

process.on('exit', cleanup);
process.on('SIGINT', () => {
  cleanup();
  process.exit(130);
});
process.on('SIGTERM', () => {
  cleanup();
  process.exit(143);
});

let stderr = '';
server.stderr.on('data', (chunk) => {
  stderr += chunk.toString();
});

async function waitForServer() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch('http://127.0.0.1:8000/index.html');
      if (response.ok) return;
    } catch {
      // Retry until the server is up.
    }
    await delay(200);
  }

  throw new Error(`HTTP server did not become ready. ${stderr}`.trim());
}

await waitForServer();

// Every served page must return 200, carry a module entry script, and ship
// the shared stylesheet with a cache-bust stamp.
const pages = [
  'index.html',
  'resources.html',
  'poetry.html',
  'prayer.html',
  'reference.html',
  'quiz-study.html',
  'roadmap.html',
  'quizzes/starter.html',
  'quizzes/intermediate.html',
  'quizzes/expert.html',
];

for (const page of pages) {
  const response = await fetch(`http://127.0.0.1:8000/${page}`);
  if (!response.ok) throw new Error(`Failed to fetch ${page}: ${response.status}`);
  const html = await response.text();
  if (!/<script type="module" src="[^"]+\?v=\d{8}-\d+">/.test(html)) {
    throw new Error(`${page} is missing a stamped module script`);
  }
  if (!/styles\.css\?v=\d{8}-\d+/.test(html)) {
    throw new Error(`${page} is missing a stamped stylesheet link`);
  }
}

// The static quiz hub has no script but must still serve and ship styles.
const hub = await (await fetch('http://127.0.0.1:8000/quizzes.html')).text();
if (!hub.includes('<title>Quiz Hub | Jesus Guide</title>') || !/styles\.css\?v=\d{8}-\d+/.test(hub)) {
  throw new Error('quizzes.html did not serve the expected static shell');
}

cleanup();
console.log('http smoke ok');
