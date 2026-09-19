/**
 * Les guides : métadonnées seulement.
 *
 * Le corps de chaque article vit dans son propre fichier de page, sous
 * src/app/guides/<slug>/page.tsx, parce qu'un article est du contenu rédigé
 * et non de la donnée. Ce fichier sert à lister, ordonner et relier.
 *
 * Principe éditorial : chaque guide s'appuie sur quelque chose de réellement
 * vécu en publiant huit applications. Quand un chiffre est cité, il vient
 * soit d'une source publique nommée, soit d'une application de ce site.
 */

export type Guide = {
  slug: string;
  titre: string;
  description: string;
  /** L'intention de recherche visée, pour la cohérence du maillage. */
  intention: string;
  publieLe: string;
  majLe?: string;
  minutes: number;
  /** Le chapeau affiché sous le titre et dans la liste. */
  chapeau: string;
};

export const guides: Guide[] = [
  {
    slug: 'react-native-ou-natif',
    titre: 'React Native ou natif : ce que j’ai constaté après huit applications',
    description:
      'Pas un comparatif de fonctionnalités : ce qui a réellement exigé du natif sur huit applications publiées, et ce qui ne l’a pas exigé.',
    intention:
      'Fondateur ou CTO qui doit choisir une technologie avant de lancer un développement.',
    publieLe: '2026-09-19',
    minutes: 5,
    chapeau:
      'La question revient à chaque cadrage. La plupart des réponses en ligne comparent des tableaux de fonctionnalités. Voici plutôt ce que la contrainte réelle a imposé, application par application.',
  },
  {
    slug: 'refus-app-store',
    titre: 'Pourquoi Apple refuse une application, et comment le corriger',
    description:
      'Ce qu’Apple regarde réellement pendant la revue, les motifs de refus les plus fréquents et la façon de les traiter.',
    intention: 'Développeur ou porteur de projet dont la soumission est refusée sans motif clair.',
    publieLe: '2026-09-19',
    minutes: 4,
    chapeau:
      'Le motif invoqué par Apple est souvent laconique. Voici comment je le traduis, et ce que je vérifie désormais avant chaque soumission.',
  },
  {
    slug: 'checklist-avant-soumission',
    titre: 'Ce que je vérifie avant chaque soumission à l’App Store',
    description:
      'La liste que je parcours avant d’envoyer une application en revue : confidentialité, comptes de test, cas limites, accessibilité.',
    intention:
      'Équipe qui prépare une première soumission et veut éviter un aller-retour de deux semaines.',
    publieLe: '2026-09-19',
    minutes: 4,
    chapeau:
      'Un refus coûte rarement moins d’une semaine. Chaque ligne de cette liste correspond à quelque chose qui m’a déjà valu un aller-retour.',
  },
];

export function guideParSlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function dateFrCourte(iso: string): string {
  const mois = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ];
  const [a, m, j] = iso.split('-').map(Number);
  return `${j} ${mois[m - 1]} ${a}`;
}
