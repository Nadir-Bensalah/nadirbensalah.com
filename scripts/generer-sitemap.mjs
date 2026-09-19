/**
 * Génère sitemap.xml et robots.txt dans out/, après l'export Next.
 *
 * Pourquoi un script plutôt que src/app/sitemap.ts : avec `output: 'export'`,
 * Next produit le sitemap dans un dossier `sitemap.xml/`, et la règle de
 * réécriture du .htaccess (DirectorySlash Off + page.html) ne sert alors pas
 * le fichier attendu. C'est pour cette raison que le sitemap.ts avait été
 * désactivé, et que robots.txt annonçait depuis des mois quatre sitemaps qui
 * répondaient tous 404. Écrire les fichiers directement règle le problème.
 *
 * Les URL sont dérivées des fichiers .html réellement présents dans out/ :
 * le sitemap ne peut donc pas annoncer une page qui n'existe pas.
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const racine = new URL('..', import.meta.url).pathname;
const dossierSortie = join(racine, 'out');
const site = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nadirbensalah.com').replace(/\/$/, '');

/** Pages volontairement absentes du sitemap. */
const exclues = new Set(['404', 'plan-du-site', 'mentions-legales']);

/** Prefixes entierement exclus : pages de prospection, jamais referencees. */
const prefixesExclus = ['hello/'];

/** Priorité et fréquence par page, du plus stratégique au plus stable. */
function reglage(chemin) {
  if (chemin === '/') return { priorite: '1.0', frequence: 'weekly' };
  if (chemin === '/realisations') return { priorite: '0.9', frequence: 'monthly' };
  if (chemin.startsWith('/realisations/')) return { priorite: '0.8', frequence: 'monthly' };
  if (chemin === '/contact') return { priorite: '0.9', frequence: 'yearly' };
  if (['/cdi', '/freelance', '/recruter-developpeur', '/challenge'].includes(chemin))
    return { priorite: '0.85', frequence: 'monthly' };
  if (chemin.startsWith('/guides/')) return { priorite: '0.7', frequence: 'monthly' };
  if (chemin === '/guides') return { priorite: '0.75', frequence: 'weekly' };
  if (chemin.startsWith('/ose-plus')) return { priorite: '0.3', frequence: 'yearly' };
  return { priorite: '0.7', frequence: 'monthly' };
}

function fichiersHtml(dossier) {
  const trouves = [];
  for (const entree of readdirSync(dossier)) {
    if (entree === '_next' || entree === 'assets') continue;
    const complet = join(dossier, entree);
    if (statSync(complet).isDirectory()) {
      trouves.push(...fichiersHtml(complet));
    } else if (entree.endsWith('.html')) {
      trouves.push(complet);
    }
  }
  return trouves;
}

const aujourdhui = new Date().toISOString().slice(0, 10);

const urls = fichiersHtml(dossierSortie)
  .map((f) => relative(dossierSortie, f).replace(/\.html$/, ''))
  .filter((slug) => !exclues.has(slug) && !prefixesExclus.some((p) => slug.startsWith(p)))
  .map((slug) => (slug === 'index' ? '/' : `/${slug}`))
  // Une page dont le HTML ne contient pas de balise canonique n'a rien à
  // faire dans le sitemap : c'est le signe d'un export incomplet.
  .sort((a, b) => {
    const pa = Number(reglage(a).priorite);
    const pb = Number(reglage(b).priorite);
    return pb - pa || a.localeCompare(b);
  });

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => {
    const { priorite, frequence } = reglage(u);
    return `  <url>
    <loc>${site}${u === '/' ? '/' : u}</loc>
    <lastmod>${aujourdhui}</lastmod>
    <changefreq>${frequence}</changefreq>
    <priority>${priorite}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

writeFileSync(join(dossierSortie, 'sitemap.xml'), sitemap, 'utf8');

const robots = `# robots.txt · ${site}

User-agent: *
Allow: /
Disallow: /_next/

Sitemap: ${site}/sitemap.xml
`;

writeFileSync(join(dossierSortie, 'robots.txt'), robots, 'utf8');

console.log(`sitemap.xml : ${urls.length} URL`);
console.log('robots.txt : écrit, une seule déclaration de sitemap');

// Garde-fou : le CV est référencé sur presque toutes les pages. S'il manque
// dans l'export, autant que le build échoue plutôt que de livrer un 404.
const cv = join(dossierSortie, 'assets', 'cv', 'cv-nadir-ben-salah.pdf');
try {
  const taille = statSync(cv).size;
  if (taille < 1024) throw new Error('fichier suspect');
  console.log(`CV présent : ${Math.round(taille / 1024)} Ko`);
} catch {
  console.error(`ERREUR : le CV est absent de l'export (${cv}).`);
  process.exit(1);
}

// Garde-fou : une page sans <title> signale un export cassé.
const sansTitre = fichiersHtml(dossierSortie).filter(
  (f) => !/<title[^>]*>[^<]+<\/title>/.test(readFileSync(f, 'utf8'))
);
if (sansTitre.length > 0) {
  console.error(`ERREUR : ${sansTitre.length} page(s) sans <title>.`);
  sansTitre.forEach((f) => console.error(`  ${relative(dossierSortie, f)}`));
  process.exit(1);
}
console.log('Toutes les pages ont un <title>.');
