/**
 * Banc de la mesure d'audience : parcours réels dans Chrome, événements lus
 * au moment où ils partent vers PostHog.
 *
 * Usage :
 *   NEXT_PUBLIC_CLE_FORMULAIRE=cle-de-test npm run build
 *   node scripts/tester-mesure.mjs                 (formulaire avec envoi direct)
 *   node scripts/tester-mesure.mjs --sans-cle      (après un build SANS la clé)
 *
 * Ce que le banc fait :
 * - sert ./out comme Hostinger : pages à plat, 404, et la CSP du .htaccess,
 *   pour qu'une origine oubliée dans la politique de sécurité fasse échouer
 *   le test au lieu de casser la production ;
 * - joue chaque parcours dans un contexte de navigation neuf (stockage vide) ;
 * - intercepte chaque requête vers PostHog, en décode le contenu (événements
 *   ET images de replay), puis la laisse partir : les événements arrivent
 *   réellement dans le projet, marqués « test » parce qu'ils viennent de
 *   localhost ;
 * - ne laisse JAMAIS partir un message du formulaire : l'appel au service
 *   d'envoi reçoit une réponse fabriquée ici, succès ou panne selon le
 *   scénario. Aucun faux lead n'atteint une boîte aux lettres ;
 * - cherche partout, événements et replays, les coordonnées saisies pendant
 *   le test. Une seule trouvée, et le banc échoue.
 */
import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const RACINE = path.resolve('out');
const PORT = 8931;
const PORT_CDP = 9555;
const CHROME =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SANS_CLE = process.argv.includes('--sans-cle');
const RAPPORT = process.env.RAPPORT_MESURE || path.resolve('.rapport-mesure.json');

// Les coordonnées tapées pendant le test. Aucune ne doit sortir du navigateur.
const SAISIE = {
  nom: 'Testeur Mesure Automatique',
  email: 'test.mesure.automatique@exemple-banc.fr',
  entreprise: 'Entreprise Banc Mesure',
  message:
    'Message de test automatise du banc de mesure, ne pas traiter. Rappelez-moi au 06 11 22 33 44 merci.',
};
const SECRETS = [
  SAISIE.nom,
  SAISIE.email,
  SAISIE.entreprise,
  'Message de test automatise',
  '06 11 22 33 44',
  'contact@nadirbensalah.com',
  '06 10 35 42 59',
];

/* ------------------------------------------------------------------ */
/* Le serveur : Hostinger en miniature                                  */
/* ------------------------------------------------------------------ */

const htaccess = fs.readFileSync(path.resolve('public/.htaccess'), 'utf8');
const CSP = htaccess.match(/Content-Security-Policy "([^"]+)"/)[1];
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};

const serveur = http.createServer((req, res) => {
  const chemin = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const candidats = [
    path.join(RACINE, chemin),
    path.join(RACINE, chemin.replace(/\/$/, '') + '.html'),
    path.join(RACINE, chemin, 'index.html'),
  ];
  const trouve = candidats.find(
    (c) => c.startsWith(RACINE) && fs.existsSync(c) && fs.statSync(c).isFile()
  );
  const fichier = trouve ?? path.join(RACINE, '404.html');
  res.writeHead(trouve ? 200 : 404, {
    'Content-Type': TYPES[path.extname(fichier)] ?? 'application/octet-stream',
    'Content-Security-Policy': CSP,
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  });
  fs.createReadStream(fichier).pipe(res);
});

/* ------------------------------------------------------------------ */
/* Chrome                                                               */
/* ------------------------------------------------------------------ */

const attends = (ms) => new Promise((r) => setTimeout(r, ms));

async function lanceChrome() {
  const profil = fs.mkdtempSync('/tmp/banc-mesure-');
  const chrome = spawn(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--hide-scrollbars',
    `--user-data-dir=${profil}`,
    `--remote-debugging-port=${PORT_CDP}`,
    'about:blank',
  ]);
  for (let i = 0; i < 60; i++) {
    try {
      const v = await (await fetch(`http://127.0.0.1:${PORT_CDP}/json/version`)).json();
      return { chrome, ws: v.webSocketDebuggerUrl, profil };
    } catch {
      await attends(250);
    }
  }
  throw new Error('Chrome ne répond pas');
}

class Cdp {
  constructor(url) {
    this.ws = new WebSocket(url);
    this.id = 0;
    this.attente = new Map();
    this.ecoutes = [];
    this.pret = new Promise((r) => this.ws.addEventListener('open', r, { once: true }));
    this.ws.addEventListener('message', (e) => {
      const m = JSON.parse(e.data);
      if (m.id && this.attente.has(m.id)) {
        const { ok, ko } = this.attente.get(m.id);
        this.attente.delete(m.id);
        m.error ? ko(new Error(`${m.error.message}`)) : ok(m.result);
      } else if (m.method) {
        for (const f of this.ecoutes) f(m);
      }
    });
  }
  envoie(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((ok, ko) => {
      this.attente.set(id, { ok, ko });
      this.ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  }
}

/* ------------------------------------------------------------------ */
/* Décodage de ce qui part vers PostHog                                 */
/* ------------------------------------------------------------------ */

function decode(corps, url) {
  if (!corps || corps.length === 0) return [];
  let texte;
  try {
    // Compressé en gzip (octets 1f 8b), que l'URL l'annonce ou non.
    texte =
      corps[0] === 0x1f && corps[1] === 0x8b
        ? zlib.gunzipSync(corps).toString('utf8')
        : corps.toString('utf8');
  } catch {
    texte = corps.toString('utf8');
  }
  if (texte.startsWith('data=')) {
    texte = Buffer.from(decodeURIComponent(texte.slice(5)), 'base64').toString('utf8');
  }
  try {
    const j = JSON.parse(texte);
    return Array.isArray(j) ? j : (j.batch ?? [j]);
  } catch {
    return [];
  }
}

/** Déplie les champs que le replay compresse lui-même (gzip en latin1). */
function deplie(valeur) {
  if (typeof valeur === 'string') {
    if (valeur.charCodeAt(0) === 0x1f && valeur.charCodeAt(1) === 0x8b) {
      try {
        const brut = zlib.gunzipSync(Buffer.from(valeur, 'latin1')).toString('utf8');
        try {
          return deplie(JSON.parse(brut));
        } catch {
          return brut;
        }
      } catch {
        return valeur;
      }
    }
    return valeur;
  }
  if (Array.isArray(valeur)) return valeur.map(deplie);
  if (valeur && typeof valeur === 'object') {
    return Object.fromEntries(Object.entries(valeur).map(([k, v]) => [k, deplie(v)]));
  }
  return valeur;
}

/* ------------------------------------------------------------------ */
/* Un scénario                                                          */
/* ------------------------------------------------------------------ */

const IPHONE_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
const BUREAU_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';

async function scenario(cdp, nom, options, parcours) {
  const { browserContextId } = await cdp.envoie('Target.createBrowserContext');
  const { targetId } = await cdp.envoie('Target.createTarget', {
    url: 'about:blank',
    browserContextId,
  });
  const { sessionId: s } = await cdp.envoie('Target.attachToTarget', { targetId, flatten: true });
  const e = (m, p) => cdp.envoie(m, p, s);

  const evenements = [];
  const replays = [];
  const requetes = { posthog: 0, posthogOk: 0, web3forms: 0, bloquees: [] };
  const ecoute = async (m) => {
    if (m.sessionId !== s) return;
    if (m.method === 'Fetch.requestPaused') {
      const { requestId, request } = m.params;
      const u = new URL(request.url);
      if (u.hostname === '127.0.0.1' || u.hostname === 'localhost') {
        return cdp.envoie('Fetch.continueRequest', { requestId }, s).catch(() => {});
      }
      if (u.hostname.endsWith('posthog.com')) {
        requetes.posthog++;
        if (process.env.DEBUG_MESURE && request.postDataEntries) {
          const b = Buffer.from(request.postDataEntries[0].bytes ?? '', 'base64');
          console.log(
            'OCTETS',
            request.url.slice(0, 50),
            b.subarray(0, 4).toString('hex'),
            JSON.stringify(request.headers).slice(0, 200)
          );
        }
        if (process.env.DEBUG_MESURE) {
          console.log(
            'REQ',
            request.method,
            request.url.slice(0, 140),
            'postData?',
            !!request.postData,
            'entries?',
            !!request.postDataEntries,
            request.hasPostData,
            (request.postData ?? '').slice(0, 60)
          );
        }
        const brut = request.postDataEntries
          ? Buffer.concat(request.postDataEntries.map((x) => Buffer.from(x.bytes ?? '', 'base64')))
          : Buffer.from(request.postData ?? '', 'utf8');
        const envoi = /^\/(e|i\/v0\/e|s)\/?(\?|$)/.test(u.pathname + u.search.slice(0, 1));
        for (const ev of envoi ? decode(brut, request.url) : []) {
          if (ev.event === '$snapshot') replays.push(deplie(ev.properties?.$snapshot_data ?? ev));
          else evenements.push(ev);
        }
        return cdp.envoie('Fetch.continueRequest', { requestId }, s).catch(() => {});
      }
      if (u.hostname === 'api.web3forms.com') {
        const cors = [
          { name: 'Access-Control-Allow-Origin', value: '*' },
          { name: 'Access-Control-Allow-Methods', value: 'POST, OPTIONS' },
          { name: 'Access-Control-Allow-Headers', value: 'Content-Type, Accept' },
        ];
        if (request.method === 'OPTIONS') {
          return cdp
            .envoie(
              'Fetch.fulfillRequest',
              { requestId, responseCode: 204, responseHeaders: cors },
              s
            )
            .catch(() => {});
        }
        requetes.web3forms++;
        const panne = options.web3forms === 'panne';
        return cdp
          .envoie(
            'Fetch.fulfillRequest',
            {
              requestId,
              responseCode: panne ? 500 : 200,
              responseHeaders: [{ name: 'Content-Type', value: 'application/json' }, ...cors],
              body: Buffer.from(
                JSON.stringify(
                  panne ? { success: false, message: 'panne simulée' } : { success: true }
                )
              ).toString('base64'),
            },
            s
          )
          .catch(() => {});
      }
      // App Store, GitHub, LinkedIn... : le test ne sort pas du site.
      requetes.bloquees.push(u.hostname);
      return cdp
        .envoie('Fetch.fulfillRequest', { requestId, responseCode: 204, body: '' }, s)
        .catch(() => {});
    }
    if (m.method === 'Network.responseReceived' && m.params.response.url.includes('posthog.com')) {
      if (m.params.response.status >= 200 && m.params.response.status < 300) requetes.posthogOk++;
    }
  };
  cdp.ecoutes.push(ecoute);

  await e('Page.enable');
  await e('Runtime.enable');
  await e('Network.enable');
  await e('Fetch.enable', { patterns: [{ urlPattern: '*', requestStage: 'Request' }] });
  await e('Browser.setDownloadBehavior', { behavior: 'deny', browserContextId }).catch(() => {});
  if (options.mobile) {
    await e('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      mobile: true,
    });
    await e('Emulation.setUserAgentOverride', { userAgent: IPHONE_UA });
    await e('Emulation.setTouchEmulationEnabled', { enabled: true });
  } else {
    await e('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await e('Emulation.setUserAgentOverride', { userAgent: BUREAU_UA });
  }
  await e('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      window.__csp = [];
      document.addEventListener('securitypolicyviolation', (v) =>
        window.__csp.push(v.violatedDirective + ' ' + v.blockedURI));
      // Les liens qui quitteraient le site (nouvel onglet, téléchargement,
      // messagerie) sont neutralisés APRÈS la mesure, en phase de bouillonnement.
      window.addEventListener('click', (ev) => {
        const a = ev.target.closest && ev.target.closest('a');
        if (a && (a.target === '_blank' || a.hasAttribute('download') || /^(mailto|tel):/.test(a.href))) ev.preventDefault();
      });
      ${options.gpc ? "Object.defineProperty(Navigator.prototype, 'globalPrivacyControl', { get: () => true });" : ''}
      ${options.referrer ? `if (!sessionStorage.getItem('banc:referrer-servi')) { sessionStorage.setItem('banc:referrer-servi', '1'); Object.defineProperty(Document.prototype, 'referrer', { get: () => ${JSON.stringify(options.referrer)}, configurable: true }); }` : ''}
    `,
  });

  const page = {
    va: async (chemin, referrer) => {
      await e('Page.navigate', {
        url: `http://127.0.0.1:${PORT}${chemin}`,
        ...(referrer ? { referrer } : {}),
      });
      await attends(2500);
    },
    eval: async (code) =>
      (await e('Runtime.evaluate', { expression: code, awaitPromise: true, returnByValue: true }))
        .result.value,
    clic: async (selecteur, texte) => {
      const ok = await page.eval(`(() => {
        const els = [...document.querySelectorAll(${JSON.stringify(selecteur)})];
        const el = ${texte ? `els.find((x) => x.textContent.includes(${JSON.stringify(texte)}))` : 'els[0]'};
        if (!el) return false;
        el.scrollIntoView({ block: 'center' });
        el.click();
        return true;
      })()`);
      if (!ok) throw new Error(`[${nom}] introuvable : ${selecteur} ${texte ?? ''}`);
      await attends(1800);
    },
    tape: async (selecteur, texte) => {
      await page.eval(`document.querySelector(${JSON.stringify(selecteur)}).focus()`);
      await e('Input.insertText', { text: texte });
      await attends(150);
    },
    vide: async (selecteur) => {
      await page.eval(`(() => { const el = document.querySelector(${JSON.stringify(selecteur)});
        const set = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value').set;
        set.call(el, ''); el.dispatchEvent(new Event('input', { bubbles: true })); })()`);
    },
    defile: async () => {
      for (const f of [0.3, 0.6, 1]) {
        await page.eval(`window.scrollTo(0, document.documentElement.scrollHeight * ${f})`);
        await attends(500);
      }
    },
  };

  let erreur = null;
  try {
    await parcours(page);
  } catch (err) {
    erreur = err.message;
  }

  const csp = (await page.eval('window.__csp').catch(() => [])) ?? [];
  const stockage = await page
    .eval(
      `({ cookies: document.cookie, local: Object.keys(localStorage), session: Object.keys(sessionStorage) })`
    )
    .catch(() => null);

  // Quitter la page déclenche l'envoi des derniers événements ($pageleave).
  await e('Page.navigate', { url: 'about:blank' }).catch(() => {});
  await attends(4000);
  cdp.ecoutes = cdp.ecoutes.filter((f) => f !== ecoute);
  await cdp.envoie('Target.closeTarget', { targetId }).catch(() => {});
  await cdp.envoie('Target.disposeBrowserContext', { browserContextId }).catch(() => {});

  return { nom, erreur, evenements, replays, requetes, csp, stockage };
}

/* ------------------------------------------------------------------ */
/* Les parcours                                                         */
/* ------------------------------------------------------------------ */

async function remplirFormulaire(page, { valide }) {
  await page.tape('input[name="nom"]', SAISIE.nom);
  await page.tape('input[name="entreprise"]', SAISIE.entreprise);
  await page.tape('input[name="email"]', valide ? SAISIE.email : 'adresse-invalide');
  await page.tape('textarea[name="message"]', valide ? SAISIE.message : 'trop court');
}

/* ------------------------------------------------------------------ */
/* Les attentes : ce que chaque parcours DOIT produire, et ne jamais    */
/* produire. Le banc échoue dès qu'une seule n'est pas tenue.           */
/* ------------------------------------------------------------------ */

const P = (ev) => ev.properties ?? {};
const tous = (r, nom) => r.evenements.filter((ev) => ev.event === nom);
const un = (r, nom, test = () => true) => tous(r, nom).some((ev) => test(P(ev)));
const combien = (r, nom) => tous(r, nom).length;

const PARCOURS = SANS_CLE
  ? [
      [
        'sans_cle_contact',
        {},
        async (p) => {
          await p.va('/contact');
          await remplirFormulaire(p, { valide: true });
          await p.clic('form button[type="submit"]');
          await attends(1500);
        },
        (r) => [
          ['aucun appel au service d’envoi', r.requetes.web3forms === 0],
          [
            'tentative marquée sans envoi direct',
            un(r, 'form_submit_attempt', (p) => p.envoi_direct === false),
          ],
          [
            'repli messagerie « sans_cle »',
            un(r, 'form_mailto_fallback', (p) => p.raison === 'sans_cle'),
          ],
          ['AUCUN lead compté', combien(r, 'submit_contact') === 0],
        ],
      ],
    ]
  : [
      [
        'bureau_direct_recruteur',
        {},
        async (p) => {
          await p.va('/');
          await p.clic('[data-porte-intention="recruteur"]');
          await p.clic('a[download]', 'Télécharger');
          await p.va('/realisations/cocomind');
          await p.defile();
          await p.clic('a[data-app]', 'App');
          await p.clic('header a.btn-principal', 'Me contacter');
          await p.clic('a[href^="mailto:"]');
          await remplirFormulaire(p, { valide: false });
          await p.clic('form button[type="submit"]');
          await p.vide('input[name="email"]');
          await p.tape('input[name="email"]', SAISIE.email);
          await p.vide('textarea[name="message"]');
          await p.tape('textarea[name="message"]', SAISIE.message);
          await p.clic('form button[type="submit"]');
          await attends(2500);
        },
        (r) => [
          [
            'arrivée directe',
            un(r, '$pageview', (p) => p.canal === 'direct' && p.landing_page === '/'),
          ],
          ['ordinateur', un(r, '$pageview', (p) => p.$device_type === 'Desktop')],
          [
            'porte « recruteur »',
            un(r, 'intent_select', (p) => p.intention_choisie === 'recruteur'),
          ],
          [
            'CV téléchargé, intention portée',
            un(
              r,
              'cv_download',
              (p) =>
                p.emplacement === 'cdi_heros' &&
                p.intention === 'recruteur' &&
                p.intention_origine === 'declaree'
            ),
          ],
          [
            'étude de cas vue',
            un(
              r,
              '$pageview',
              (p) => p.page_type === 'etude_de_cas' && p.contenu_id === 'cocomind'
            ),
          ],
          [
            'App Store, bonne app',
            un(r, 'app_store_click', (p) => p.app === 'cocomind' && p.type_lien === 'fiche_app'),
          ],
          ['profondeur 90 %', un(r, 'scroll_depth', (p) => p.profondeur === 90)],
          [
            'CTA de l’en-tête vers le contact',
            un(r, 'cta_click', (p) => p.cta_id === 'entete>/contact' && p.vers_contact === true),
          ],
          ['clic e-mail', un(r, 'contact_click', (p) => p.moyen === 'email')],
          ['formulaire commencé une fois', combien(r, 'form_start') === 1],
          [
            'erreur : noms des champs seulement',
            un(
              r,
              'form_error',
              (p) => JSON.stringify(p.champs_en_erreur) === '["email","message"]'
            ),
          ],
          ['deux tentatives', combien(r, 'form_submit_attempt') === 2],
          ['UN lead, après confirmation', combien(r, 'submit_contact') === 1],
          [
            'le lead porte l’origine et l’intention',
            un(
              r,
              'submit_contact',
              (p) =>
                p.canal === 'direct' &&
                p.intention === 'recruteur' &&
                typeof p.duree_saisie_s === 'number'
            ),
          ],
          ['aucun échec d’envoi', combien(r, 'form_submit_failed') === 0],
        ],
      ],
      [
        'bureau_google_etude_de_cas',
        { referrer: 'https://www.google.com/' },
        async (p) => {
          await p.va('/realisations/pilou');
          await p.clic('a[data-app]', 'App');
          await p.clic('footer a[href*="linkedin"]');
          await p.clic('footer a[href*="github"]');
        },
        (r) => [
          [
            'canal « recherche »',
            un(
              r,
              '$pageview',
              (p) => p.canal === 'recherche' && p.referrer_domaine === 'google.com'
            ),
          ],
          [
            'arrivée sur l’étude de cas',
            un(
              r,
              '$pageview',
              (p) => p.landing_type === 'etude_de_cas' && p.landing_page === '/realisations/pilou'
            ),
          ],
          [
            'intention déduite « portfolio »',
            un(
              r,
              '$pageview',
              (p) => p.intention === 'portfolio' && p.intention_origine === 'deduite'
            ),
          ],
          ['App Store Pilou', un(r, 'app_store_click', (p) => p.app === 'pilou')],
          [
            'sortie LinkedIn',
            un(
              r,
              'outbound_click',
              (p) => p.destination === 'linkedin' && p.emplacement === 'pied'
            ),
          ],
          ['sortie GitHub', un(r, 'outbound_click', (p) => p.destination === 'github')],
        ],
      ],
      [
        'mobile_utm_projet_challenge_en_panne',
        { mobile: true, web3forms: 'panne' },
        async (p) => {
          await p.va('/?utm_source=linkedin&utm_medium=social&utm_campaign=banc_mesure');
          await p.eval('window.scrollTo(0, 900)');
          await attends(800);
          await p.clic('.barre-collante a.btn-principal');
          await p.va('/challenge');
          await remplirFormulaire(p, { valide: true });
          await p.clic('form button[type="submit"]');
          await attends(2500);
        },
        (r) => [
          ['mobile', un(r, '$pageview', (p) => p.$device_type === 'Mobile')],
          [
            'UTM retenus',
            un(
              r,
              '$pageview',
              (p) => p.canal === 'social' && p.source === 'linkedin' && p.campagne === 'banc_mesure'
            ),
          ],
          [
            'les UTM suivent jusqu’au formulaire',
            un(r, 'form_start', (p) => p.campagne === 'banc_mesure'),
          ],
          ['barre collante mesurée', un(r, 'cta_click', (p) => p.emplacement === 'barre_collante')],
          [
            'échec du service : http_5xx',
            un(r, 'form_submit_failed', (p) => p.raison === 'http_5xx' && p.statut_http === 500),
          ],
          [
            'repli messagerie « echec_envoi »',
            un(r, 'form_mailto_fallback', (p) => p.raison === 'echec_envoi'),
          ],
          [
            'AUCUN lead compté',
            combien(r, 'challenge_submit') === 0 && combien(r, 'submit_contact') === 0,
          ],
        ],
      ],
      [
        'bureau_portfolio_challenge_reussi',
        {},
        async (p) => {
          await p.va('/');
          await p.clic('[data-porte-intention="portfolio"]');
          await p.clic('a[href^="/realisations/"]');
          await p.va('/challenge');
          await remplirFormulaire(p, { valide: true });
          await p.clic('form button[type="submit"]');
          await attends(2500);
        },
        (r) => [
          [
            'porte « portfolio »',
            un(r, 'intent_select', (p) => p.intention_choisie === 'portfolio'),
          ],
          ['UN challenge, après confirmation', combien(r, 'challenge_submit') === 1],
          ['jamais compté comme contact', combien(r, 'submit_contact') === 0],
          [
            'le lead porte l’intention déclarée',
            un(
              r,
              'challenge_submit',
              (p) => p.intention === 'portfolio' && p.intention_origine === 'declaree'
            ),
          ],
        ],
      ],
      [
        'mobile_projet_contact_reussi',
        { mobile: true },
        async (p) => {
          await p.va('/');
          await p.clic('[data-porte-intention="projet"]');
          await p.va('/contact');
          await p.clic('a[href^="tel:"]');
          await remplirFormulaire(p, { valide: true });
          await p.clic('form button[type="submit"]');
          await attends(2500);
        },
        (r) => [
          ['porte « projet »', un(r, 'intent_select', (p) => p.intention_choisie === 'projet')],
          ['clic téléphone', un(r, 'contact_click', (p) => p.moyen === 'telephone')],
          [
            'UN lead mobile',
            un(r, 'submit_contact', (p) => p.$device_type === 'Mobile' && p.intention === 'projet'),
          ],
        ],
      ],
      [
        'anglais_et_404',
        { referrer: 'https://chatgpt.com/' },
        async (p) => {
          await p.va('/en/apps');
          await p.va('/une-page-qui-nexiste-pas');
        },
        (r) => [
          [
            'canal « assistant_ia »',
            un(
              r,
              '$pageview',
              (p) => p.canal === 'assistant_ia' && p.referrer_domaine === 'chatgpt.com'
            ),
          ],
          [
            'page anglaise',
            un(r, '$pageview', (p) => p.langue === 'en' && p.page_type === 'realisations'),
          ],
          ['404 repérée', un(r, '$pageview', (p) => p.page_type === 'erreur_404')],
        ],
      ],
      [
        'gpc_refus_navigateur',
        { gpc: true },
        async (p) => p.va('/contact'),
        (r) => [['aucune requête vers PostHog', r.requetes.posthog === 0]],
      ],
      [
        'refus_par_le_bouton',
        {},
        async (p) => {
          await p.va('/mentions-legales');
          await p.clic('button', 'Ne plus mesurer');
          await p.va('/');
          await p.va('/realisations');
        },
        (r) => [
          ['la page du refus est mesurée', un(r, '$pageview', (p) => p.page_type === 'legal')],
          [
            'plus rien après le refus',
            !un(r, '$pageview', (p) => p.page_type === 'accueil' || p.page_type === 'realisations'),
          ],
        ],
      ],
    ];

/* ------------------------------------------------------------------ */
/* Exécution                                                            */
/* ------------------------------------------------------------------ */

await new Promise((r) => serveur.listen(PORT, '127.0.0.1', r));
const { chrome, ws, profil } = await lanceChrome();
const cdp = new Cdp(ws);
await cdp.pret;

const resultats = [];
for (const [nom, options, parcours, attentes] of PARCOURS) {
  process.stdout.write(`… ${nom}\n`);
  const r = await scenario(cdp, nom, options, parcours);
  r.attentes = attentes(r);
  resultats.push(r);
}

await new Promise((r) => {
  chrome.once('exit', r);
  chrome.kill();
});
serveur.close();
try {
  fs.rmSync(profil, { recursive: true, force: true });
} catch {
  /* profil temporaire : le système le videra */
}

/* ------------------------------------------------------------------ */
/* Confidentialité : rien ne doit sortir, et le contrôle doit être réel */
/* ------------------------------------------------------------------ */

const aplatit = (x) => JSON.stringify(x).replace(/\\u00a0|\\u202f| | /g, ' ');
const fuites = [];
for (const r of resultats) {
  for (const [ou, contenu] of [
    ['événements', aplatit(r.evenements)],
    ['replay', aplatit(r.replays)],
  ]) {
    for (const secret of SECRETS) {
      const i = contenu.indexOf(secret);
      if (i >= 0) {
        fuites.push(
          `${r.nom} (${ou}) : « ${secret} » dans …${contenu.slice(Math.max(0, i - 160), i + 60)}…`
        );
      }
    }
  }
}

// Contrôles positifs : sans eux, l'absence de fuite ne prouverait rien.
// 1. Le replay est lisible : on y retrouve un texte de page ordinaire.
const replayLisible = resultats.some((r) => aplatit(r.replays).includes('Mission freelance'));
// 2. La saisie a bien été enregistrée, et masquée : des événements de
//    saisie existent, et leur texte n'est fait que d'astérisques.
const saisies = [];
const collecte = (x) => {
  if (Array.isArray(x)) return x.forEach(collecte);
  if (x && typeof x === 'object') {
    // rrweb : type 3 = incrémental, source 5 = saisie dans un champ.
    if (x.type === 3 && x.data?.source === 5 && typeof x.data.text === 'string')
      saisies.push(x.data.text);
    Object.values(x).forEach(collecte);
  }
};
resultats.forEach((r) => collecte(r.replays));
const saisiesMasquees = saisies.length > 0 && saisies.every((t) => /^\*+$/.test(t) || t === '');

const cspKo = resultats.filter((r) => r.csp.length);
const cookies = resultats.filter((r) => r.stockage?.cookies);

/* ------------------------------------------------------------------ */
/* Rapport                                                              */
/* ------------------------------------------------------------------ */

const GARDE =
  /^(page_type|langue|contenu_id|canal|source|medium|campagne|referrer_domaine|landing_page|landing_type|intention|intention_origine|intention_choisie|emplacement|cta_id|cta_texte|cta_style|destination|vers_contact|app|app_store_id|type_lien|moyen|fichier|domaine|formulaire|envoi_direct|champs_en_erreur|nb_erreurs|raison|statut_http|duree_saisie_s|profondeur|\$device_type|\$pathname|\$internal_or_test_user)$/;
const IGNORE = new Set(['$snapshot', '$$heatmap', '$web_vitals', '$set', '$pageleave']);

fs.writeFileSync(
  RAPPORT,
  JSON.stringify(
    {
      fuites,
      replayLisible,
      saisiesMasquees,
      nbSaisies: saisies.length,
      scenarios: resultats.map((r) => ({
        nom: r.nom,
        erreur: r.erreur,
        requetes: r.requetes,
        csp: r.csp,
        stockage: r.stockage,
        attentes: r.attentes,
        evenements: r.evenements.map((ev) => ({
          event: ev.event,
          ...Object.fromEntries(Object.entries(P(ev)).filter(([k]) => GARDE.test(k))),
        })),
      })),
    },
    null,
    2
  )
);

let echecs = 0;
for (const r of resultats) {
  const ko = r.attentes.filter(([, ok]) => !ok);
  echecs += ko.length + (r.erreur ? 1 : 0);
  console.log(
    `\n${ko.length || r.erreur ? '✗' : '✓'} ${r.nom}  ·  ${r.requetes.posthog} requêtes PostHog (${r.requetes.posthogOk} acceptées) · ${r.replays.flat(Infinity).length} images de replay`
  );
  if (r.erreur) console.log(`    ERREUR ${r.erreur}`);
  for (const [desc, ok] of r.attentes) console.log(`    ${ok ? '✓' : '✗'} ${desc}`);
  if (process.env.DETAIL_MESURE) {
    for (const ev of r.evenements) {
      if (!ev.event || IGNORE.has(ev.event)) continue;
      const p = Object.fromEntries(Object.entries(P(ev)).filter(([k]) => GARDE.test(k)));
      console.log(`      ${ev.event.padEnd(22)} ${JSON.stringify(p)}`);
    }
  }
}

const verdicts = [
  ['aucune coordonnée dans les envois', fuites.length === 0],
  ['replay lisible (contrôle positif)', replayLisible],
  [`saisies enregistrées et toutes masquées (${saisies.length})`, saisiesMasquees],
  ['aucune violation de la CSP', cspKo.length === 0],
  ['aucun cookie déposé', cookies.length === 0],
];
console.log('\nConfidentialité');
for (const [desc, ok] of verdicts) console.log(`    ${ok ? '✓' : '✗'} ${desc}`);
for (const f of fuites) console.log(`    FUITE ${f}`);
for (const r of cspKo) console.log(`    CSP ${r.nom} : ${r.csp.join(' ; ')}`);
echecs += verdicts.filter(([, ok]) => !ok).length;

console.log(`\n${echecs ? `${echecs} échec(s)` : 'Tout est vert.'}  Rapport : ${RAPPORT}`);
process.exit(echecs ? 1 : 0);
