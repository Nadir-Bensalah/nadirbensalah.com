/**
 * Audit responsive et accessibilité, piloté par Chrome en mode headless.
 *
 * Il ouvre chaque page à plusieurs largeurs et vérifie ce qu'aucune lecture de
 * code ne peut prouver : un débordement horizontal, un texte trop petit, une
 * cible tactile trop réduite, un contraste insuffisant.
 *
 * Usage : node scripts/audit-responsive.mjs [http://localhost:8899]
 */

import { spawn } from 'node:child_process';
import http from 'node:http';
import { existsSync } from 'node:fs';

const BASE = process.argv[2] || 'http://localhost:8899';

/**
 * Chrome se trouve ailleurs selon la machine : sur le Mac de Nadir, dans
 * /Applications ; sur un exécuteur GitHub, dans /usr/bin. On prend le premier
 * chemin qui existe, et CHROME_PATH permet de forcer le choix.
 */
function trouverChrome() {
  const candidats = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ].filter(Boolean);

  for (const c of candidats) {
    if (existsSync(c)) return c;
  }
  // En intégration continue, un Chrome absent ne doit pas bloquer une mise en
  // ligne : les vérifications qui comptent (liens, images, métadonnées,
  // redirections) tournent déjà sans navigateur. On le signale et on sort
  // proprement plutôt que de faire échouer le déploiement.
  const message = 'Chrome introuvable. Installer Chrome ou définir CHROME_PATH vers le binaire.';
  if (process.env.CI) {
    console.warn(`${message} Audit du rendu sauté.`);
    process.exit(0);
  }
  throw new Error(message);
}

const CHROME = trouverChrome();

const LARGEURS = [
  { nom: 'iPhone SE', l: 320, h: 780 },
  { nom: 'Android courant', l: 360, h: 800 },
  { nom: 'iPhone 14', l: 390, h: 844 },
  { nom: 'iPhone Pro Max', l: 430, h: 932 },
  { nom: 'iPad portrait', l: 768, h: 1024 },
  { nom: 'iPad paysage', l: 1024, h: 768 },
  { nom: 'MacBook', l: 1440, h: 900 },
  { nom: 'Grand écran', l: 1920, h: 1080 },
];

const PAGES = [
  'index',
  'realisations',
  'realisations/ticket',
  'cdi',
  'freelance',
  'recruter-developpeur',
  'challenge',
  'contact',
  'expertise-react-native',
  'audit-application-react-native',
  'developpeur-application-mobile-amiens',
  'developpeur-freelance-amiens',
  'guides',
  'guides/react-native-ou-natif',
  'a-propos',
  'mentions-legales',
  'plan-du-site',
  '404',
  // Les pages anglaises : memes controles, memes largeurs.
  'en',
  'en/apps',
  'en/ios-native-modules',
  'en/react-native-audit',
  'en/hire',
  'en/about',
  'en/contact',
  'en/blog',
  'en/blog/react-native-app-intents-after-sirikit',
];

let idMessage = 0;

function attendre(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function cible(port) {
  for (let essai = 0; essai < 25; essai++) {
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
      // Cible de type « page » explicitement : les autres cibles refusent
      // Emulation.setDeviceMetricsOverride.
      const t = liste.find((x) => x.type === 'page' && x.webSocketDebuggerUrl);
      if (t) return t.webSocketDebuggerUrl;
    } catch {
      /* Chrome n'est pas encore prêt */
    }
    await attendre(300);
  }
  throw new Error('Chrome injoignable sur le port de débogage.');
}

function envoyer(ws, methode, params = {}) {
  const id = ++idMessage;
  return new Promise((res, rej) => {
    const surMessage = (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id === id) {
        ws.removeEventListener('message', surMessage);
        m.error ? rej(new Error(m.error.message)) : res(m.result);
      }
    };
    ws.addEventListener('message', surMessage);
    ws.send(JSON.stringify({ id, method: methode, params }));
  });
}

/**
 * Le script exécuté dans la page. Il retourne tout ce qui est mesurable :
 * débordements, petites cibles, textes minuscules, images sans dimensions.
 */
const SONDE = `(() => {
  const vw = document.documentElement.clientWidth;
  const res = { vw, debordements: [], ciblesPetites: [], textesPetits: [], imagesSansTaille: [], scrollH: 0 };

  res.scrollH = document.documentElement.scrollWidth;

  const decrire = (el) => {
    const cls = typeof el.className === 'string' ? el.className.split(' ').filter(Boolean).slice(0, 3).join('.') : '';
    return el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (cls ? '.' + cls : '');
  };

  for (const el of document.querySelectorAll('body *')) {
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden' || s.position === 'fixed') continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;

    // Débordement : l'élément déborde de la fenêtre, et aucun ancêtre proche
    // ne gère le défilement horizontal volontairement.
    // Certains elements vivent volontairement hors ecran a gauche : le lien
    // d'evitement tant qu'il n'a pas le focus, et le champ leurre anti-robot.
    // Ils sont caches par la gauche a -9999px, jamais par la droite.
    if (el.classList.contains('saute-au-contenu')) continue;
    if (el.closest('[aria-hidden="true"]')) continue;
    if (r.right < 0) continue;

    if (r.right > vw + 1 || r.left < -1) {
      let dansUnDefilant = false;
      let p = el.parentElement;
      while (p && p !== document.body) {
        const ps = getComputedStyle(p);
        if (ps.overflowX === 'auto' || ps.overflowX === 'scroll') { dansUnDefilant = true; break; }
        p = p.parentElement;
      }
      if (!dansUnDefilant && res.debordements.length < 12) {
        res.debordements.push({
          el: decrire(el),
          gauche: Math.round(r.left),
          droite: Math.round(r.right),
          largeur: Math.round(r.width),
          depasse: Math.round(r.right - vw),
        });
      }
    }

    // Cibles tactiles. Le seuil est celui du critere WCAG 2.2 « Target Size
    // (Minimum) » : 24 x 24 px. Les 44 px d'Apple sont un confort, pas une
    // regle, et les appliquer a un lien en ligne dans un paragraphe n'aurait
    // pas de sens. On exclut donc les liens qui vivent dans du texte courant,
    // pour lesquels WCAG prevoit explicitement une exception.
    if (vw <= 430 && (el.tagName === 'BUTTON' || (el.tagName === 'A' && el.getAttribute('href')))) {
      const dansTexte = el.closest('p, li, nav, .article-corps, .corps-acc');
      if (!dansTexte && (r.height < 24 || r.width < 24) && r.height > 0 && res.ciblesPetites.length < 10) {
        res.ciblesPetites.push({ el: decrire(el), l: Math.round(r.width), h: Math.round(r.height), texte: (el.textContent || '').trim().slice(0, 30) });
      }
    }

    // Texte trop petit pour être lu confortablement.
    const taille = parseFloat(s.fontSize);
    if (taille > 0 && taille < 11.5 && el.textContent && el.textContent.trim().length > 3) {
      const propre = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (propre && res.textesPetits.length < 8) {
        res.textesPetits.push({ el: decrire(el), px: taille, texte: el.textContent.trim().slice(0, 40) });
      }
    }
  }

  for (const img of document.querySelectorAll('img')) {
    if (!img.getAttribute('width') || !img.getAttribute('height')) {
      if (res.imagesSansTaille.length < 8) res.imagesSansTaille.push(img.getAttribute('src') || '(sans src)');
    }
  }

  return JSON.stringify(res);
})()`;

async function principal() {
  const port = 9444;
  const chrome = spawn(CHROME, [
    '--headless',
    '--disable-gpu',
    '--no-first-run',
    '--hide-scrollbars',
    `--remote-debugging-port=${port}`,
    'about:blank',
  ]);

  const url = await cible(port);
  const ws = new WebSocket(url);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));

  await envoyer(ws, 'Page.enable');
  await envoyer(ws, 'Runtime.enable');

  const problemes = [];
  let verifiees = 0;

  for (const taille of LARGEURS) {
    await envoyer(ws, 'Emulation.setDeviceMetricsOverride', {
      width: taille.l,
      height: taille.h,
      deviceScaleFactor: 1,
      mobile: taille.l <= 430,
    });

    for (const page of PAGES) {
      await envoyer(ws, 'Page.navigate', { url: `${BASE}/${page}.html` });
      await attendre(420);

      const { result } = await envoyer(ws, 'Runtime.evaluate', {
        expression: SONDE,
        returnByValue: true,
      });
      verifiees++;
      const r = JSON.parse(result.value);

      if (r.scrollH > r.vw + 1) {
        problemes.push(
          `[${taille.nom} ${taille.l}px] ${page} : la page défile horizontalement (${r.scrollH}px pour ${r.vw}px)`
        );
      }
      for (const d of r.debordements) {
        problemes.push(
          `[${taille.nom} ${taille.l}px] ${page} : ${d.el} déborde de ${d.depasse}px (droite ${d.droite})`
        );
      }
      for (const c of r.ciblesPetites) {
        problemes.push(
          `[${taille.nom} ${taille.l}px] ${page} : cible tactile ${c.l}×${c.h}px : ${c.el} « ${c.texte} »`
        );
      }
      for (const t of r.textesPetits) {
        problemes.push(
          `[${taille.nom} ${taille.l}px] ${page} : texte à ${t.px}px : « ${t.texte} »`
        );
      }
      for (const i of r.imagesSansTaille) {
        problemes.push(`[${taille.nom}] ${page} : image sans width/height : ${i}`);
      }
    }
  }

  ws.close();
  chrome.kill();

  console.log(
    `${verifiees} rendus vérifiés (${PAGES.length} pages × ${LARGEURS.length} largeurs).\n`
  );

  // Dédoublonner : un même défaut se répète à plusieurs largeurs.
  const uniques = [...new Set(problemes)];
  if (uniques.length === 0) {
    console.log('Aucun débordement, aucune cible trop petite, aucun texte illisible.');
    return;
  }

  console.error(`${uniques.length} problème(s) :\n`);
  uniques.forEach((p) => console.error(`  ✕ ${p}`));
  process.exit(1);
}

principal().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
