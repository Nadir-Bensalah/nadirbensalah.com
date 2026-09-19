/**
 * Typographie française : les espaces insécables, posées après le build.
 *
 * En français, une espace précède « : ; ? ! » et suit « « » et précède « » ».
 * Si c'est une espace ordinaire, le navigateur peut y couper la ligne et
 * laisser un deux-points seul en début de ligne. Le site en comptait plus de
 * deux cents, dont 167 avant un « : » qui est son signe de ponctuation
 * signature.
 *
 * Le traitement se fait sur le HTML exporté plutôt que dans les sources :
 * écrire une insécable dans du JSX est invisible à la relecture, se perd au
 * copier-coller et se fait effacer par un formateur. Ici c'est systématique,
 * vérifiable, et ça ne change rien à la lecture du code.
 *
 * Seul le texte visible est traité : ni les balises, ni les scripts, ni les
 * styles, ni le JSON-LD.
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const racine = new URL('..', import.meta.url).pathname;
const sortie = join(racine, 'out');

const INSECABLE = ' ';
const FINE = ' '; // espace fine insécable, pour ; ? !

function htmls(dossier) {
  const trouves = [];
  for (const e of readdirSync(dossier)) {
    if (e === '_next' || e === 'assets') continue;
    const complet = join(dossier, e);
    if (statSync(complet).isDirectory()) trouves.push(...htmls(complet));
    else if (e.endsWith('.html')) trouves.push(complet);
  }
  return trouves;
}

/** Applique les règles à un fragment de texte visible. */
function corriger(texte) {
  return (
    texte
      // Deux-points : espace insécable pleine.
      .replace(/ +:(\s|$)/g, `${INSECABLE}:$1`)
      // Point-virgule, point d'interrogation, point d'exclamation, pourcent :
      // espace fine insécable.
      .replace(/ +([;?!])/g, `${FINE}$1`)
      .replace(/(\d) +%/g, `$1${INSECABLE}%`)
      // Guillemets français : l'espace se colle au guillemet.
      .replace(/« +/g, `«${INSECABLE}`)
      .replace(/ +»/g, `${INSECABLE}»`)
  );
}

let fichiers = 0;
let remplacements = 0;

for (const fichier of htmls(sortie)) {
  const original = readFileSync(fichier, 'utf8');

  // Découper sur les balises et les blocs à ne jamais toucher, puis ne
  // traiter que les morceaux de texte qui restent.
  const morceaux = original.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>)/);

  let compte = 0;
  const traite = morceaux
    .map((m) => {
      if (!m || m.startsWith('<')) return m;
      const corrige = corriger(m);
      if (corrige !== m) compte++;
      return corrige;
    })
    .join('');

  if (traite !== original) {
    writeFileSync(fichier, traite, 'utf8');
    fichiers++;
    remplacements += compte;
    console.log(`  ${relative(sortie, fichier)} : ${compte} passage(s)`);
  }
}

console.log(`Typographie : ${remplacements} passages corrigés dans ${fichiers} fichier(s).`);
