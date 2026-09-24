/**
 * Banc du relais de notifications (public/notifier.php), sans jamais toucher
 * ntfy : le relais tourne sous `php -S`, et ntfy est remplacé par un serveur
 * local qui enregistre ce qu'il aurait reçu.
 *
 * Tourne en intégration continue AVANT le déploiement : si une règle casse,
 * le site n'est pas mis en ligne. Il faut PHP (présent sur les runners
 * Ubuntu de GitHub, absent du Mac de Nadir).
 */
import { spawn, execFileSync } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const attends = (ms) => new Promise((r) => setTimeout(r, ms));
const PORT_NTFY = 8983;
const PORT_PHP = 8984;
const DOSSIER = fs.mkdtempSync(path.join(os.tmpdir(), 'notifier-'));
const DONNEES = path.join(DOSSIER, 'donnees');
const JETON = 'jeton-de-test';

console.log(execFileSync('php', ['-l', 'public/notifier.php']).toString().trim());
fs.copyFileSync('public/notifier.php', path.join(DOSSIER, 'notifier.php'));

async function reconfigure(exclureIp) {
  configure(exclureIp);
  await attends(200);
}

function configure(exclureIp) {
  const config = {
    sujet: 'sujet-de-test',
    ntfy: `http://127.0.0.1:${PORT_NTFY}`,
    domaine: 'nadirbensalah.com',
    jeton: JETON,
    exclure_ip: exclureIp,
    dossier: DONNEES,
  };
  const b64 = Buffer.from(JSON.stringify(config)).toString('base64');
  fs.writeFileSync(
    path.join(DOSSIER, 'notifier-config.php'),
    `<?php return json_decode(base64_decode('${b64}'), true);\n`
  );
}

// Le faux ntfy : garde chaque notification reçue.
let recues = [];
const ntfy = http
  .createServer((req, res) => {
    let corps = '';
    req.on('data', (d) => (corps += d));
    req.on('end', () => {
      try {
        recues.push(JSON.parse(corps));
      } catch {
        recues.push({ illisible: corps });
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('{"id":"test"}');
    });
  })
  .listen(PORT_NTFY, '127.0.0.1');

configure('10.9.9.9');
// Sans cache d'opcodes : le banc réécrit la configuration en cours de route,
// et le cache la servirait périmée pendant quelques secondes.
const php = spawn(
  'php',
  [
    '-d',
    'opcache.enable=0',
    '-d',
    'opcache.enable_cli=0',
    '-S',
    `127.0.0.1:${PORT_PHP}`,
    '-t',
    DOSSIER,
  ],
  { stdio: 'ignore' }
);
for (let i = 0; i < 40; i++) {
  try {
    await fetch(`http://127.0.0.1:${PORT_PHP}/notifier.php?action=etat`);
    break;
  } catch {
    await attends(150);
  }
}

const MEME_SITE = { Origin: 'https://nadirbensalah.com', 'Content-Type': 'application/json' };
const UA = { 'User-Agent': 'Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/140 Safari/537.36' };
async function appel(corps, { entetes = MEME_SITE, action = '', methode = 'POST' } = {}) {
  const r = await fetch(`http://127.0.0.1:${PORT_PHP}/notifier.php${action ? `?${action}` : ''}`, {
    method: methode,
    headers: { ...UA, ...entetes },
    body: methode === 'POST' && corps ? JSON.stringify(corps) : undefined,
  });
  await attends(50);
  return { statut: r.status, corps: await r.json().catch(() => null) };
}

const resultats = [];
const verifie = (nom, ok, detail = '') => resultats.push([nom, Boolean(ok), detail]);
const nouvelles = () => {
  const n = recues;
  recues = [];
  return n;
};

// 1. État
let r = await appel(null, { methode: 'GET', action: 'action=etat' });
verifie(
  'état : répond, stockage accessible',
  r.statut === 200 && r.corps?.stockage === true,
  JSON.stringify(r.corps)
);
verifie('état : un visiteur ordinaire n’est pas exclu', r.corps?.exclu === false);

// 2. Un lead
const PROVENANCE = {
  canal: 'email',
  source: 'prospection',
  campagne: 'ville-albert',
  intention: 'projet',
  landing_page: '/',
};
r = await appel({ type: 'lead', page: '/contact', formulaire: 'contact', ...PROVENANCE });
let n = nouvelles();
verifie(
  'lead : une notification, priorité haute',
  r.statut === 200 && n.length === 1 && n[0].priority === 5,
  JSON.stringify(n)
);
verifie(
  'lead : titre et provenance',
  n[0]?.title === 'Nouveau message reçu' &&
    n[0]?.message.includes('Venu de : email · prospection · ville-albert') &&
    n[0]?.message.includes('Profil : projet')
);
verifie('lead : envoyé sur le bon canal', n[0]?.topic === 'sujet-de-test');
r = await appel({ type: 'lead', page: '/challenge', formulaire: 'challenge' });
verifie('lead du challenge : titre dédié', nouvelles()[0]?.title === 'Nouveau problème soumis');

// 3. Appels refusés
r = await appel({ type: 'lead' }, { entetes: { 'Content-Type': 'application/json' } });
verifie(
  'appel sans origine du site : refusé, rien n’est envoyé',
  r.statut === 403 && nouvelles().length === 0
);
r = await appel(
  { type: 'lead' },
  { entetes: { Origin: 'https://site-malveillant.example', 'Content-Type': 'application/json' } }
);
verifie('appel depuis un autre site : refusé', r.statut === 403 && nouvelles().length === 0);
r = await appel({ type: 'nimporte' });
verifie('type inconnu : refusé', r.statut === 400 && nouvelles().length === 0);
r = await fetch(`http://127.0.0.1:${PORT_PHP}/notifier.php`, {
  method: 'POST',
  headers: { ...MEME_SITE, 'User-Agent': 'Googlebot/2.1' },
  body: JSON.stringify({ type: 'lead' }),
});
verifie('robot : ignoré', r.status === 202 && nouvelles().length === 0);
r = await appel({ type: 'lead', source: 'verification_deploiement' });
verifie(
  'visite de contrôle (verification_…) : ignorée',
  r.corps?.ignore === 'verification' && nouvelles().length === 0
);

// 4. Le CV
r = await appel({ type: 'cv', page: '/cdi', canal: 'recherche', intention: 'recruteur' });
n = nouvelles();
verifie(
  'CV : une notification',
  n.length === 1 && n[0].title === 'CV téléchargé' && n[0].message.includes('Depuis : /cdi'),
  JSON.stringify(n)
);

// 5. Les prospects : une notification par page, pas de doublon
await appel({ type: 'prospect', page: '/', ...PROVENANCE });
await appel({ type: 'prospect', page: '/', ...PROVENANCE });
await appel({ type: 'prospect', page: '/realisations', ...PROVENANCE });
n = nouvelles();
verifie(
  'prospect : une notification par page, doublon écarté',
  n.length === 2,
  JSON.stringify(n.map((x) => x.title))
);
verifie(
  'prospect : nommé par sa campagne',
  n[0]?.title === 'Prospect sur votre site : ville-albert'
);

// 6. Visites et lectures : comptées, jamais notifiées une par une
for (let i = 0; i < 3; i++)
  await appel({ type: 'visite', page: '/', canal: i === 0 ? 'social' : 'recherche' });
await appel({ type: 'lecture', page: '/realisations' });
verifie('visites et lectures : aucune notification', nouvelles().length === 0);

// 7. Le résumé du soir
r = await appel(null, { action: 'action=resume', entetes: { 'Content-Type': 'application/json' } });
verifie('résumé sans jeton : refusé', r.statut === 403 && nouvelles().length === 0);
const autreHeure = (new Date().getUTCHours() + 6) % 24;
r = await appel(null, {
  action: `action=resume&si_heure=${autreHeure}`,
  entetes: { 'X-Jeton': JETON },
});
verifie(
  'résumé hors de l’heure prévue : rien',
  r.corps?.envoye === false && nouvelles().length === 0
);
r = await appel(null, { action: 'action=resume', entetes: { 'X-Jeton': JETON } });
n = nouvelles();
const resume = n[0]?.message ?? '';
verifie(
  'résumé : envoyé',
  r.statut === 200 && n.length === 1 && n[0].title.startsWith('Résumé du jour'),
  resume
);
verifie(
  'résumé : les bons chiffres',
  resume.includes('3 visites') &&
    resume.includes('1 a regardé vos réalisations') &&
    resume.includes('1 CV téléchargé') &&
    resume.includes('2 messages reçus') &&
    resume.includes('1 prospect est venu'),
  resume
);
verifie(
  'résumé : d’où viennent les visiteurs',
  resume.includes('D’où : recherche 2 · social 1'),
  resume
);

// 8. Aucune coordonnée ne passe, même glissée dans une propriété
await appel({
  type: 'lead',
  formulaire: 'contact',
  campagne: 'jean.dupont@exemple.fr 06 12 34 56 78',
});
n = nouvelles();
verifie(
  'coordonnées masquées dans la notification',
  n.length === 1 &&
    !JSON.stringify(n).includes('exemple.fr') &&
    !JSON.stringify(n).includes('06 12 34 56 78'),
  JSON.stringify(n)
);

// 9. Nadir chez lui : rien ne compte, rien ne sonne
await reconfigure('127.0.0.1');
r = await appel({ type: 'lead', formulaire: 'contact' });
verifie('IP de Nadir : lead ignoré', r.corps?.ignore === 'nadir' && nouvelles().length === 0);
r = await appel(null, { methode: 'GET', action: 'action=etat' });
verifie('IP de Nadir : l’état le dit', r.corps?.exclu === true);
r = await appel(
  { type: 'cv', page: '/cdi' },
  { action: 'action=test', entetes: { ...MEME_SITE, 'X-Jeton': JETON } }
);
n = nouvelles();
verifie(
  'test manuel avec le jeton : passe malgré l’exclusion, marqué [TEST]',
  n.length === 1 && n[0].title.startsWith('[TEST]')
);
await reconfigure('2001:db8:1:2:');
r = await appel(
  { type: 'lead' },
  { entetes: { ...MEME_SITE, 'X-Forwarded-For': '2001:db8:1:2:1234:5678:9abc:def0' } }
);
verifie(
  'IPv6 par préfixe, derrière un proxy : ignorée',
  r.corps?.ignore === 'nadir' && nouvelles().length === 0
);
r = await appel(
  { type: 'lead' },
  { entetes: { ...MEME_SITE, 'X-Forwarded-For': '2001:db8:ffff:1::1' } }
);
verifie('une autre IPv6 du même opérateur : notifiée', r.statut === 200 && nouvelles().length === 1);

// 10. La limite anti-abus
await reconfigure('10.9.9.9');
let limite = false;
for (let i = 0; i < 70 && !limite; i++)
  limite = (await appel({ type: 'visite', page: '/' })).statut === 429;
verifie('limite par appelant : au-delà de 60 appels par heure, refus', limite);

php.kill();
ntfy.close();
fs.rmSync(DOSSIER, { recursive: true, force: true });

let echecs = 0;
for (const [nom, ok, detail] of resultats) {
  if (!ok) echecs++;
  console.log(`${ok ? '✓' : '✗'} ${nom}${ok ? '' : `  ${detail}`}`);
}
console.log(
  echecs
    ? `\n${echecs} échec(s)`
    : `\nRelais de notifications : ${resultats.length} vérifications, tout est vert.`
);
process.exit(echecs ? 1 : 0);
