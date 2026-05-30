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

const pages = [
  ['http://127.0.0.1:8000/index.html', './app.js?v=20260510-1'],
  ['http://127.0.0.1:8000/resources.html', './app.js?v=20260510-1'],
  ['http://127.0.0.1:8000/poetry.html', './app.js?v=20260510-1'],
  ['http://127.0.0.1:8000/reference.html', './reference.js?v=20260524-1'],
  ['http://127.0.0.1:8000/roadmap.html', './roadmap.js?v=20260509-1'],
];

for (const [url, script] of pages) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
  const html = await response.text();
  if (!html.includes(`src="${script}`)) {
    throw new Error(`${url} is missing ${script}`);
  }
}

cleanup();
console.log('http smoke ok');
