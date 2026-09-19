/**
 * Vérifie les règles de redirection du .htaccess, sans serveur Apache.
 *
 * Le .htaccess est le fichier le plus dangereux du dépôt : une erreur de
 * réécriture ne casse pas une page, elle casse le site entier. Et on ne s'en
 * aperçoit qu'une fois en production, six à douze minutes après le push.
 *
 * Ce script relit les règles et vérifie deux choses :
 *   1. toute ancienne URL connue trouve une règle qui la prend en charge ;
 *   2. la cible de chaque redirection existe réellement dans l'export.
 *
 * Il ne remplace pas un test sur le serveur réel, mais il attrape la faute la
 * plus courante : rediriger vers une page qu'on a renommée ou supprimée.
 */

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const racine = new URL('..', import.meta.url).pathname;
const htaccess = readFileSync(join(racine, 'public', '.htaccess'), 'utf8');
const sortie = join(racine, 'out');

/** Les anciennes URL qui étaient indexées, et qui doivent toutes être traitées. */
const anciennes = [
  'cv-numerique',
  'projets',
  'etudes-de-cas',
  'etudes-de-cas/quelque-chose',
  'blog',
  'blog/un-article',
  'tarifs',
  'prix/application-mobile',
  'services/creation-application-mobile',
  'services/developpement-saas',
  'en/services/mobile-app-development',
  'en/pricing/mobile-app',
  'fr-fr/paris',
  'fr-fr/lyon',
  'en-fr/marseille',
  'fr-tn/tunis',
  'en-tn/sousse',
  'sitemap-fr.xml',
];

/**
 * Extrait les règles RewriteRule qui produisent une redirection.
 *
 * On écarte celles précédées d'un RewriteCond : Apache ne les applique que si
 * la condition est vraie, et ce script ne sait pas les évaluer. C'est le cas
 * de la redirection de www, dont le motif `^(.*)$` capterait sinon toutes les
 * URL testées et masquerait les vraies règles.
 */
const lignes = htaccess.split('\n');
const regles = [];
for (let i = 0; i < lignes.length; i++) {
  const m = lignes[i].match(/^RewriteRule\s+(\S+)\s+(\S+)\s+\[R=301[^\]]*\]/);
  if (!m) continue;
  // Une condition juste au-dessus ? Alors la règle est conditionnelle.
  const precedente = (lignes[i - 1] || '').trim();
  if (precedente.startsWith('RewriteCond')) continue;
  regles.push({ motif: m[1], cible: m[2], re: new RegExp(m[1]) });
}

console.log(`${regles.length} règles de redirection lues.\n`);

const problemes = [];

// 1. Chaque ancienne URL doit trouver preneur.
for (const url of anciennes) {
  const regle = regles.find((r) => r.re.test(url));
  if (!regle) {
    problemes.push(`Aucune règle ne prend en charge « /${url} » : elle répondra 404.`);
    continue;
  }

  // 2. La cible doit exister dans l'export.
  const cible = regle.cible.replace(/^\//, '').replace(/\$\d/g, '');
  if (!cible || cible === '') continue; // redirection vers la racine

  const fichier = join(sortie, `${cible}.html`);
  const brut = join(sortie, cible);
  if (!existsSync(fichier) && !existsSync(brut)) {
    problemes.push(`« /${url} » redirige vers « /${cible} », qui n'existe pas dans l'export.`);
  } else {
    console.log(`  /${url}  →  /${cible}`);
  }
}

// 3. La règle de réécriture qui sert les fichiers plats doit être présente :
//    sans elle, aucune URL du site ne fonctionne.
if (!/DirectorySlash Off/.test(htaccess)) {
  problemes.push(
    'DirectorySlash Off est absent : Apache redirigera vers les dossiers et aucune page ne s’affichera.'
  );
}
if (!/RewriteCond %\{DOCUMENT_ROOT\}\/\$1\.html -f/.test(htaccess)) {
  problemes.push(
    'La règle qui sert les fichiers .html à plat est absente : tout le site sera en 404.'
  );
}
if (!/HTTP_HOST.*www\\\./.test(htaccess)) {
  problemes.push('La redirection de www vers le domaine nu est absente.');
}

console.log('');
if (problemes.length) {
  console.error(`${problemes.length} problème(s) :`);
  problemes.forEach((p) => console.error(`  ✕ ${p}`));
  process.exit(1);
}
console.log('Redirections vérifiées : toutes les anciennes URL mènent à une page réelle.');
