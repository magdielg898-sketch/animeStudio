import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {existsSync, readdirSync, statSync} from 'node:fs';
import {join, resolve} from 'node:path';

const root = process.cwd();
// Start Vite in its own process group so the workflow can stop both pnpm and Vite.
const server = spawn('pnpm', ['dev'], {
  cwd: root, detached: true, stdio: 'ignore',
});

const findMp4 = dir => {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, {withFileTypes: true}).flatMap(entry => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? findMp4(path) : entry.name.endsWith('.mp4') ? [path] : [];
  });
};

let browser;
try {
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try {
      const response = await fetch('http://127.0.0.1:9000/');
      if (response.ok) { ready = true; break; }
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  if (!ready) throw new Error('Vite server did not start.');

  browser = await chromium.launch({headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage']});
  const page = await browser.newPage({viewport: {width: 540, height: 960}});
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') pageErrors.push(message.text()); });

  await page.goto('http://127.0.0.1:9000/?render', {waitUntil: 'networkidle', timeout: 60000});

  let readyFile = null;
  let lastSize = -1;
  let stableChecks = 0;
  for (let i = 0; i < 180; i++) {
    let files = findMp4(join(root, 'output'));
    if (!files.length) files = findMp4(join(root, 'public', 'output'));
    const candidate = files.find(file => statSync(file).size > 50000);
    if (candidate) {
      const size = statSync(candidate).size;
      stableChecks = size === lastSize ? stableChecks + 1 : 0;
      lastSize = size;
      if (stableChecks >= 3) { readyFile = candidate; break; }
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  if (!readyFile) throw new Error('MP4 was not fully written within 180 seconds. Browser errors: ' + pageErrors.join(' | '));
  console.log('MOTION_CANVAS_MP4=' + resolve(readyFile));
  console.log('MOTION_CANVAS_BYTES=' + statSync(readyFile).size);
  if (pageErrors.length) console.log('BROWSER_WARNINGS=' + pageErrors.join(' | '));
} finally {
  if (browser) await browser.close();
  try { process.kill(-server.pid, 'SIGTERM'); } catch {}
}
