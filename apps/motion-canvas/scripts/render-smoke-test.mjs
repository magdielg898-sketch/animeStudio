import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {existsSync, readdirSync, statSync} from 'node:fs';
import {join, resolve} from 'node:path';

const root = process.cwd();
const server = spawn('pnpm', ['dev', '--', '--host', '127.0.0.1', '--port', '5173'], {
  cwd: root, stdio: ['ignore', 'pipe', 'pipe'],
});
let serverLog = '';
server.stdout.on('data', chunk => serverLog += chunk.toString());
server.stderr.on('data', chunk => serverLog += chunk.toString());

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
      const response = await fetch('http://127.0.0.1:5173/');
      if (response.ok) { ready = true; break; }
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  if (!ready) throw new Error('Vite server did not start. ' + serverLog);

  browser = await chromium.launch({headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage']});
  const page = await browser.newPage({viewport: {width: 540, height: 960}});
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') pageErrors.push(message.text()); });

  await page.goto('http://127.0.0.1:5173/?render', {waitUntil: 'networkidle', timeout: 60000});

  let mp4 = [];
  for (let i = 0; i < 150; i++) {
    mp4 = findMp4(join(root, 'output'));
    if (!mp4.length) mp4 = findMp4(join(root, 'public', 'output'));
    if (mp4.some(file => statSync(file).size > 50000)) break;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  mp4 = mp4.filter(file => statSync(file).size > 50000);
  if (!mp4.length) throw new Error('No MP4 produced after 150 seconds. Browser errors: ' + pageErrors.join(' | ') + '\nVite: ' + serverLog);
  console.log('MOTION_CANVAS_MP4=' + resolve(mp4[0]));
  console.log('MOTION_CANVAS_BYTES=' + statSync(mp4[0]).size);
  if (pageErrors.length) console.log('BROWSER_WARNINGS=' + pageErrors.join(' | '));
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
}
