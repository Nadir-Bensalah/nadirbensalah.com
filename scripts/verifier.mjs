/**
 * Vérification de l'export statique.
 *
 * Ce script lit out/ et échoue si quelque chose de vérifiable est cassé :
 * lien interne mort, image absente, page sans titre ou sans description,
 * donnée structurée invalide, titre trop long, texte alternatif manquant.
 *
 * Il tourne après le build, en local comme en intégration continue. Une
 * vérification qui n'échoue jamais ne prouve rien : celle-ci doit pouvoir
 * faire échouer un déploiement.
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const racine = new URL('..', import.meta.url).pathname;
const sortie = join(racine, 'out');

if (!existsSync(sortie)) {
  console.error('ERREUR : out/ est absent. Lancer `npm run build` d’abord.');
  process.exit(1);
}

const problemes = [];
const avertissements = [];

function htmls(dossier) {
  const trouves = [];
  for (const e of readdirSync(dossier)) {
    // _next : ressources compilées. assets : le HTML source du CV, qui n'est
    // pas une page du site mais le document ayant servi à produire le PDF.
    if (e === '_next' || e === 'assets') continue;
    const complet = join(dossier, e);
    if (statSync(complet).isDirectory()) trouves.push(...htmls(complet));
    else if (e.endsWith('.html')) trouves.push(complet);
  }
  return trouves;
}

const pages = htmls(sortie);
console.log(`${pages.length} pages exportées.\n`);

/** L'ensemble des chemins servis, pour valider les liens internes. */
const cheminsServis = new Set(['/']);
for (const p of pages) {
  const slug = relative(sortie, p).replace(/\.html$/, '');
  cheminsServis.add(slug === 'index' ? '/' : `/${slug}`);
}

for (const fichier of pages) {
  const nom = relative(sortie, fichier);
  const html = readFileSync(fichier, 'utf8');
  const est404 = nom === '404.html';
  // La langue decide des regles typographiques : le tiret long est proscrit
  // en francais et parfaitement normal en anglais, et « integration » est un
  // mot anglais autant qu'un mot francais mal accentue.
  const estAnglais = nom.startsWith('en/') || nom === 'en.html' || /<html lang="en"/.test(html);

  // ── Titre ───────────────────────────────────────────────────────────
  const titre = html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1]?.trim();
  if (!titre) {
    problemes.push(`${nom} : aucun <title>`);
  } else if (titre.length > 65) {
    avertissements.push(`${nom} : <title> de ${titre.length} caractères (> 65) : « ${titre} »`);
  }

  // ── Description ─────────────────────────────────────────────────────
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc && !est404) {
    problemes.push(`${nom} : aucune meta description`);
  } else if (desc && desc.length > 160) {
    avertissements.push(`${nom} : description de ${desc.length} caractères (> 160)`);
  }

  // ── Canonique ───────────────────────────────────────────────────────
  // Une page en noindex n'a pas à porter de canonique : les deux signaux
  // se contrediraient. On ne l'exige donc que sur les pages indexables.
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  if (!/<link rel="canonical"/.test(html) && !est404 && !noindex) {
    avertissements.push(`${nom} : pas de balise canonique`);
  }

  // ── Un seul H1 ──────────────────────────────────────────────────────
  const h1 = html.match(/<h1[\s>]/g)?.length || 0;
  if (h1 === 0 && !est404) problemes.push(`${nom} : aucun <h1>`);
  if (h1 > 1) problemes.push(`${nom} : ${h1} balises <h1> (une seule attendue)`);

  // ── Liens internes ──────────────────────────────────────────────────
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const cible = m[1].replace(/\/$/, '') || '/';
    if (cible.startsWith('/_next') || cible.startsWith('/assets')) {
      // Ressource : on vérifie le fichier sur le disque.
      if (!existsSync(join(sortie, cible))) {
        problemes.push(`${nom} : ressource absente ${cible}`);
      }
      continue;
    }
    if (!cheminsServis.has(cible)) {
      problemes.push(`${nom} : lien interne mort vers ${cible}`);
    }
  }

  // ── Images ──────────────────────────────────────────────────────────
  for (const m of html.matchAll(/<img[^>]*>/g)) {
    const balise = m[0];
    const src = balise.match(/src="([^"]+)"/)?.[1];
    if (src?.startsWith('/') && !existsSync(join(sortie, src))) {
      problemes.push(`${nom} : image absente ${src}`);
    }
    if (!/alt="/.test(balise)) {
      problemes.push(`${nom} : <img> sans attribut alt : ${balise.slice(0, 90)}`);
    }
  }

  // ── Données structurées ─────────────────────────────────────────────
  for (const m of html.matchAll(
    /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
  )) {
    try {
      const donnees = JSON.parse(m[1]);
      const serialise = JSON.stringify(donnees);
      // Interdiction ferme : aucune note ni avis ne doit apparaître, les
      // effectifs réels sont trop faibles pour être honnêtement affichés.
      if (/aggregateRating|"review"|"Review"/.test(serialise)) {
        problemes.push(`${nom} : donnée structurée de type note ou avis`);
      }
    } catch (e) {
      problemes.push(`${nom} : JSON-LD invalide : ${e.message}`);
    }
  }

  // ── Typographie : le tiret long est proscrit sur ce site ────────────
  // Il se glisse facilement dans un texte rédigé, et il ne se lit pas comme
  // du français écrit. On le remplace par deux-points, une virgule, des
  // parenthèses ou un point médian selon le sens.
  const corpsVisible = html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '');
  if (!estAnglais && corpsVisible.includes('—')) {
    const extrait = corpsVisible
      .slice(Math.max(0, corpsVisible.indexOf('—') - 45), corpsVisible.indexOf('—') + 45)
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    problemes.push(`${nom} : tiret long (—) dans le texte : « …${extrait}… »`);
  }

  // ── Caracteres non decodes ──────────────────────────────────────────
  // Une sequence \uXXXX visible dans la page signale un texte ecrit par un
  // script qui a echappe ses antislashs. C'est arrive, et ca ne se voit pas
  // au build : seul le rendu le revele.
  if (/\\u[0-9a-fA-F]{4}/.test(corpsVisible)) {
    const m = corpsVisible.match(/.{0,40}\\u[0-9a-fA-F]{4}.{0,40}/);
    problemes.push(
      `${nom} : sequence d'echappement non decodee : « ${m?.[0].replace(/<[^>]*>/g, ' ').trim()} »`
    );
  }
  // Mojibake classique : de l'UTF-8 relu en latin-1.
  if (/Ã©|Ã¨|Ã\u00a0|â€™|Ã§/.test(corpsVisible)) {
    problemes.push(`${nom} : caracteres mal encodes (mojibake)`);
  }

  // ── Français sans accents ───────────────────────────────────────────
  // Des mots courants écrits sans accent trahissent un texte tapé par un
  // script ou copié depuis un terminal. Liste volontairement courte : elle
  // ne contient que des formes qui n'existent pas en français correct.
  // \\b ne convient pas : en JavaScript, une lettre accentuee compte comme
  // une frontiere de mot, donc « autres » declencherait la regle « tres ».
  // On encadre donc par « pas une lettre, accentuee ou non ».
  // Uniquement des formes qui n'existent pas en francais correct : « ajoute »
  // ou « cout » sont de vrais mots, ils n'ont rien a faire ici.
  const sansAccent = [
    'developpeur',
    'developpement',
    'realisation',
    'realisations',
    'experience',
    'systeme',
    'integration',
    'probleme',
    'telephone',
    'reellement',
    'concretement',
    'coutera',
    'evitait',
    'connaitre',
    'plutot',
    'prevu',
    'entraine',
    'declenchees',
    'partagee',
    'affiche sans',
  ];
  const LETTRE = 'A-Za-z\u00c0-\u024f';
  const texteSeul = corpsVisible.replace(/<[^>]*>/g, ' ');
  for (const mot of estAnglais ? [] : sansAccent) {
    const re = new RegExp(`(^|[^${LETTRE}])${mot}([^${LETTRE}]|$)`, 'i');
    if (re.test(texteSeul)) {
      problemes.push(`${nom} : « ${mot} » écrit sans accent dans le texte visible`);
      break;
    }
  }

  // ── Apostrophes droites ─────────────────────────────────────────────
  // En francais typographique l'apostrophe est courbe. Une droite dans le
  // texte rendu trahit un passage ecrit hors du reste du site. On tolere
  // quelques unites : un nom propre ou un extrait de code peut en porter.
  // L'anglais utilise l'apostrophe droite couramment ; le francais non.
  const droites = (texteSeul.match(/\w'\w/g) || []).length;
  if (!estAnglais && droites > 2) {
    problemes.push(`${nom} : ${droites} apostrophes droites dans le texte (attendu : courbes)`);
  }

  // ── Une seule identite : le pluriel de societe est banni ────────────
  // Nadir exerce en entrepreneur individuel. « Nous » suggere une equipe
  // qui n'existe pas, et sur une page juridique c'est trompeur.
  const pluriel = estAnglais
    ? null
    : texteSeul.match(/\b[Nn]ous (ne |n'|avons|sommes|proposons|utilisons|collectons|recevons|voyons)/g);
  if (pluriel) {
    problemes.push(`${nom} : « ${pluriel[0].trim()} » : le site parle a la premiere personne du singulier`);
  }

  // ── Fuite de langue ─────────────────────────────────────────────────
  // Un composant partagé entre les deux versions du site peut laisser passer
  // du français sur une page anglaise, y compris dans un aria-label invisible
  // à l'écran. Liste de mots qui n'existent pas en anglais.
  if (estAnglais) {
    const fuites = [
      'étude de cas', 'en ligne depuis', 'Style de vie', 'Divertissement',
      'Productivité', 'Éducation', 'Télécharger', 'Me contacter',
      'applications publiées', 'Réalisations',
    ];
    const trouvee = fuites.find((f) => texteSeul.includes(f) || html.includes(`aria-label="${f}`));
    if (trouvee) {
      problemes.push(`${nom} : texte français sur une page anglaise : « ${trouvee} »`);
    }
  }

  // ── Restes de la refonte ────────────────────────────────────────────
  if (/lorem ipsum/i.test(html)) problemes.push(`${nom} : « lorem ipsum » présent`);
  if (/href="#"/.test(html)) problemes.push(`${nom} : lien vide href="#"`);
  if (/\bTODO\b/.test(html)) avertissements.push(`${nom} : « TODO » visible dans le HTML`);
}

// ── Cohérence bilingue ────────────────────────────────────────────────
// Le hreflang doit être réciproque : si le français déclare l'anglais,
// l'anglais doit déclarer le français en retour. Sans cette réciprocité
// Google ignore SILENCIEUSEMENT toutes les déclarations du site.
const declarations = new Map();
for (const fichier of pages) {
  const nom = relative(sortie, fichier);
  const html = readFileSync(fichier, 'utf8');
  const chemin = nom === 'index.html' ? '/' : `/${nom.replace(/\.html$/, '')}`;

  // Une page anglaise doit déclarer lang="en" dans le HTML statique :
  // Googlebot ne l'obtiendra pas d'un script.
  const estAnglaise = nom.startsWith('en/') || nom === 'en.html';
  if (estAnglaise && !/<html lang="en"/.test(html)) {
    problemes.push(`${nom} : page anglaise déclarée lang="fr"`);
  }

  const liens = [...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/gi)];
  if (liens.length) {
    declarations.set(
      chemin,
      liens.map((m) => ({ langue: m[1], href: new URL(m[2]).pathname }))
    );
  }
}

for (const [chemin, liens] of declarations) {
  for (const l of liens) {
    if (l.langue === 'x-default') continue;
    const cible = l.href.replace(/\/$/, '') || '/';
    if (cible === chemin) continue;
    const retour = declarations.get(cible);
    if (!retour) {
      problemes.push(
        `${chemin} : déclare ${cible} en hreflang, mais ${cible} ne déclare rien en retour`
      );
      continue;
    }
    if (!retour.some((r) => (r.href.replace(/\/$/, '') || '/') === chemin)) {
      problemes.push(`${chemin} ↔ ${cible} : hreflang non réciproque`);
    }
  }
}
console.log(`hreflang : ${declarations.size} page(s) traduites, réciprocité vérifiée.`);

// ── Fichiers attendus à la racine ─────────────────────────────────────
for (const attendu of [
  'sitemap.xml',
  'robots.txt',
  '.htaccess',
  'assets/cv/cv-nadir-ben-salah.pdf',
]) {
  if (!existsSync(join(sortie, attendu))) problemes.push(`Fichier manquant : ${attendu}`);
}

// ── Le sitemap ne doit lister que des pages réelles ───────────────────
const sitemap = join(sortie, 'sitemap.xml');
if (existsSync(sitemap)) {
  const xml = readFileSync(sitemap, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    const chemin = new URL(loc).pathname.replace(/\/$/, '') || '/';
    if (!cheminsServis.has(chemin)) problemes.push(`sitemap.xml : URL inexistante ${chemin}`);
  }
  console.log(`sitemap.xml : ${locs.length} URL, toutes vérifiées.`);
}

// ── Poids des ressources ──────────────────────────────────────────────
const lourdes = [];
function pese(dossier) {
  for (const e of readdirSync(dossier)) {
    const complet = join(dossier, e);
    const s = statSync(complet);
    if (s.isDirectory()) pese(complet);
    else if (s.size > 400 * 1024 && !e.endsWith('.pdf')) {
      lourdes.push(`${relative(sortie, complet)} : ${Math.round(s.size / 1024)} Ko`);
    }
  }
}
pese(sortie);
if (lourdes.length) {
  avertissements.push(`Ressources de plus de 400 Ko :\n    ${lourdes.join('\n    ')}`);
}

// ── Verdict ───────────────────────────────────────────────────────────
console.log('');
if (avertissements.length) {
  console.log(`${avertissements.length} avertissement(s) :`);
  avertissements.forEach((a) => console.log(`  ~ ${a}`));
  console.log('');
}

if (problemes.length) {
  console.error(`${problemes.length} problème(s) bloquant(s) :`);
  problemes.forEach((p) => console.error(`  ✕ ${p}`));
  process.exit(1);
}

console.log('Vérification passée : aucun problème bloquant.');
