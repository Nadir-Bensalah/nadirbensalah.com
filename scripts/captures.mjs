/**
 * Captures d'écran des pages, à plusieurs largeurs.
 *
 * Passe par Emulation.setDeviceMetricsOverride plutôt que par --window-size :
 * seule cette méthode fixe réellement la fenêtre CSS, donc les media queries.
 * Avec --window-size seul, la page se rend en largeur bureau puis se fait
 * recadrer, ce qui donne une capture trompeuse.
 *
 * Usage : node scripts/captures.mjs <dossier> [base]
 */

import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import http from 'node:http';

const DOSSIER = process.argv[2] || './captures';
const BASE = process.argv[3] || 'http://localhost:8899';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const VUES = [
  { nom: 'mobile', l: 390, h: 844, mobile: true },
  { nom: 'petit', l: 320, h: 780, mobile: true },
  { nom: 'tablette', l: 834, h: 1112, mobile: false },
  { nom: 'bureau', l: 1440, h: 900, mobile: false },
];

const PAGES = process.env.PAGES
  ? process.env.PAGES.split(',')
  : ['index', 'realisations', 'realisations/ticket', 'cdi', 'freelance', 'contact', 'challenge'];

let id = 0;
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

async function cible(port) {
  for (let i = 0; i < 25; i++) {
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
      // Choisir explicitement une cible de type « page » : les autres cibles
      // n'acceptent pas Emulation.setDeviceMetricsOverride.
      const t = liste.find((x) => x.type === 'page' && x.webSocketDebuggerUrl);
      if (t) return t.webSocketDebuggerUrl;
    } catch {
      /* pas encore prêt */
    }
    await attendre(300);
  }
  throw new Error('Chrome injoignable.');
}

function envoyer(ws, methode, params = {}) {
  const n = ++id;
  return new Promise((res, rej) => {
    const surMessage = (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id === n) {
        ws.removeEventListener('message', surMessage);
        m.error ? rej(new Error(m.error.message)) : res(m.result);
      }
    };
    ws.addEventListener('message', surMessage);
    ws.send(JSON.stringify({ id: n, method: methode, params }));
  });
}

async function principal() {
  mkdirSync(DOSSIER, { recursive: true });
  const port = 9455;
  const chrome = spawn(CHROME, [
    '--headless',
    '--disable-gpu',
    '--no-first-run',
    '--hide-scrollbars',
    `--remote-debugging-port=${port}`,
    'about:blank',
  ]);

  const ws = new WebSocket(await cible(port));
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  await envoyer(ws, 'Page.enable');

  for (const v of VUES) {
    for (const page of PAGES) {
      await envoyer(ws, 'Emulation.setDeviceMetricsOverride', {
        width: v.l,
        height: v.h,
        deviceScaleFactor: 2,
        mobile: v.mobile,
      });
      await envoyer(ws, 'Page.navigate', { url: `${BASE}/${page}.html` });
      await attendre(700);

      // Les revelations au defilement sont neutralisees pour la capture :
      // sinon les sections basses sortent transparentes. On force l'etat vu
      // plutot que de simuler un defilement, qui est long et peu fiable.
      await envoyer(ws, 'Runtime.evaluate', {
        expression: `document.querySelectorAll('.apparait').forEach(e => e.classList.add('vu')); true`,
        returnByValue: true,
      });
      await attendre(250);

      // Hauteur reelle de la page, plafonnee. On ne redimensionne PAS la
      // fenetre pour capturer : agrandir la fenetre a plusieurs milliers de
      // pixels bloque Page.captureScreenshot. Le cadrage se fait par `clip`,
      // avec captureBeyondViewport, ce qui rend la page entiere sans toucher
      // aux media queries.
      const { result: mesure } = await envoyer(ws, 'Runtime.evaluate', {
        expression: 'Math.min(document.body.scrollHeight, 4200)',
        returnByValue: true,
      });

      const { data } = await envoyer(ws, 'Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true,
        clip: { x: 0, y: 0, width: v.l, height: mesure.value, scale: 1 },
      });
      const nom = `${page.replace(/\//g, '_')}-${v.nom}.png`;
      writeFileSync(join(DOSSIER, nom), Buffer.from(data, 'base64'));
      console.log(`  ${nom}`);
    }
  }

  ws.close();
  chrome.kill();
  console.log(`\nCaptures dans ${DOSSIER}`);
}

principal().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
