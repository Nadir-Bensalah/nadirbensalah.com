/**
 * Les pages de prospection nominatives : /hello/<entreprise>.
 *
 * RÈGLE ABSOLUE : ce tableau ne contient AUCUNE entreprise réelle tant que
 * Nadir n'en ajoute pas lui-même. Inventer une page « Bonjour Doctolib »
 * fabriquerait une relation qui n'existe pas, et la page serait indexable.
 *
 * Le système est donc livré vide et fonctionnel. Pour créer une page :
 *
 *   1. ajouter une entrée ci-dessous ;
 *   2. relancer `npm run build`.
 *
 * L'URL devient /hello/<slug>. Ces pages portent `noindex` : elles sont faites
 * pour être envoyées par e-mail, par QR code ou en message direct, jamais pour
 * être trouvées par un moteur de recherche.
 *
 * Suivi : /hello/slug?utm_source=physical&utm_medium=qr fonctionne sans rien
 * de plus, l'origine est mémorisée par la couche analytics.
 */

export type Prospect = {
  /** Le slug de l'URL, en minuscules et sans accent. */
  slug: string;
  /** Le nom affiché, tel que l'entreprise l'écrit. */
  entreprise: string;
  /**
   * Pourquoi cette entreprise, en une ou deux phrases.
   * À écrire comme on parlerait à quelqu'un : ce qu'on a remarqué chez eux,
   * et ce qu'on pense pouvoir y faire. Jamais de flatterie générique.
   */
  accroche: string;
  /** Les 2 ou 3 applications les plus pertinentes pour eux, par slug. */
  appsMisesEnAvant: string[];
  /** Ce qu'on propose concrètement, en points courts. */
  propositions: string[];
};

export const prospects: Prospect[] = [
  // Volontairement vide. Voir le commentaire en tête de fichier.
];

export function prospectParSlug(slug: string): Prospect | undefined {
  return prospects.find((p) => p.slug === slug);
}
