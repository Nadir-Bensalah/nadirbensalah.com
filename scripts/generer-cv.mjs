/**
 * Fabrique le PDF du CV depuis sa source HTML, avec Chrome.
 *
 * Le PDF etait fabrique a la main. Il a donc diverge : il annoncait « Sept
 * applications » quand tout le site en annoncait huit, sur le chiffre qui
 * porte l'argumentaire entier. Un recruteur qui lit les deux voit une
 * approximation.
 *
 * Usage : node scripts/generer-cv.mjs
 */

import { spawn } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import http from 'node:http';

const SOURCE = resolve('public/assets/cv/source.html');
const SORTIE = resolve('public/assets/cv/cv-nadir-ben-salah.pdf');

function trouverChrome() {
  const candidats = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ].filter(Boolean);
  for (const c of candidats) if (existsSync(c)) return c;
  return null;
}

const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

async function cible(port) {
  for (let i = 0; i < 40; i++) {
    try {
      const liste = await new Promise((res, rej) => {
        http
          .get(`http://127.0.0.1:${port}/json/list`, (r) => {
            let d = '';
            r.on('data', (c) => (d += c));
            r.on('end', () => res(JSON.parse(d)));
          })
          .on('error', rej);
      });
      const t = liste.find((x) => x.type === 'page' && x.webSocketDebuggerUrl);
      if (t) return t.webSocketDebuggerUrl;
    } catch {
      /* Chrome n'est pas encore pret */
    }
    await attendre(250);
  }
  throw new Error('Chrome injoignable sur le port de debogage.');
}

const CHROME = trouverChrome();
if (!CHROME) {
  console.error('Chrome introuvable. Installer Chrome ou definir CHROME_PATH.');
  process.exit(1);
}
if (!existsSync(SOURCE)) {
  console.error(`Source introuvable : ${SOURCE}`);
  process.exit(1);
}

const port = 9466;
const chrome = spawn(CHROME, [
  '--headless',
  '--disable-gpu',
  '--no-first-run',
  `--remote-debugging-port=${port}`,
  'about:blank',
]);

const ws = new WebSocket(await cible(port));
await new Promise((r) => ws.addEventListener('open', r, { once: true }));

let id = 0;
const envoyer = (methode, params = {}) => {
  const i = ++id;
  return new Promise((res, rej) => {
    const surMessage = (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id !== i) return;
      ws.removeEventListener('message', surMessage);
      m.error ? rej(new Error(m.error.message)) : res(m.result);
    };
    ws.addEventListener('message', surMessage);
    ws.send(JSON.stringify({ id: i, method: methode, params }));
  });
};

await envoyer('Page.enable');
await envoyer('Page.navigate', { url: `file://${SOURCE}` });
// Laisser les polices et la mise en page se poser avant l'impression.
await attendre(1200);

const { data } = await envoyer('Page.printToPDF', {
  printBackground: true,
  preferCSSPageSize: true,
  marginTop: 0.4,
  marginBottom: 0.4,
  marginLeft: 0.4,
  marginRight: 0.4,
});

writeFileSync(SORTIE, Buffer.from(data, 'base64'));
ws.close();
chrome.kill();

const ko = Math.round(Buffer.from(data, 'base64').length / 1024);
console.log(`CV genere : ${SORTIE} (${ko} ko)`);
