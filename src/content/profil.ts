/**
 * Le profil. Source unique : si une information change, elle change ici.
 *
 * RÈGLE : rien dans ce fichier n'est inventé. Les expériences, dates et
 * diplômes proviennent du CV réel. Aucune métrique de performance, aucun
 * chiffre d'affaires, aucun nombre de téléchargements n'y figure, parce
 * qu'aucune source vérifiable n'en fournit.
 */

export const profil = {
  nom: 'Nadir Ben Salah',
  titre: 'Développeur mobile & full-stack',
  ville: 'Amiens',
  region: 'Hauts-de-France',
  pays: 'France',
  enseigne: 'Capmedia Digital',
  email: 'contact@nadirbensalah.com',
  telephone: '+33 6 10 35 42 59',
  telephoneLien: 'tel:+33610354259',
  whatsapp: 'https://wa.me/33610354259',
  linkedin: 'https://www.linkedin.com/in/nadir-ben-salah',
  capmedia: 'https://capmedia.app',
  site: 'https://nadirbensalah.com',
  cv: '/assets/cv/cv-nadir-ben-salah.pdf',
  siren: '814 051 769',
} as const;

export const disponibilite = {
  /** Ce qui est ouvert, sans hiérarchie implicite. */
  ouvertA: ['Mission freelance', 'CDI', 'Collaboration produit'],
  mobilite: 'Amiens et à distance. Mobilité géographique envisageable pour un CDI pertinent.',
  delaiReponse: '24 h',
} as const;

export type Experience = {
  poste: string;
  entreprise: string;
  lieu?: string;
  debut: string;
  fin: string;
  courant?: boolean;
  faits: string[];
};

export const experiences: Experience[] = [
  {
    poste: 'Développeur full-stack & mobile · indépendant',
    entreprise: 'Capmedia Digital',
    debut: 'Juillet 2024',
    fin: 'Aujourd’hui',
    courant: true,
    faits: [
      'Conception et développement d’applications mobiles en React Native et TypeScript, de l’idée à la publication sur les stores.',
      'Huit applications publiées sur l’App Store, dont sept sous mon propre compte développeur et une pour un client.',
      'Développement de plateformes web, de solutions SaaS et d’applications métier sur mesure.',
      'Création d’API REST et de services backend avec Node.js, Firebase et Supabase.',
      'Prise en charge complète du cycle : cadrage, architecture, développement, tests, revue Apple, mise en production et maintenance.',
    ],
  },
  {
    poste: 'Développeur d’applications mobiles React Native',
    entreprise: 'Decayeux',
    lieu: 'Abbeville',
    debut: 'Septembre 2022',
    fin: 'Octobre 2024',
    faits: [
      'Développement et évolution d’applications React Native destinées à un environnement industriel.',
      'Participation à la conception technique et à l’amélioration continue des fonctionnalités existantes.',
      'Intégration d’API et de services backend.',
      'Optimisation des performances, de la stabilité et de l’expérience utilisateur.',
      'Contribution aux choix techniques et aux évolutions de l’architecture applicative.',
    ],
  },
  {
    poste: 'Développeur web & mobile · indépendant',
    entreprise: 'Fast-Way, puis Fast Way Development',
    debut: 'Novembre 2015',
    fin: 'Août 2022',
    faits: [
      'Activité indépendante déclarée en novembre 2015 (SIREN 814 051 769).',
      'Développement de sites et d’applications web pour des clients directs : commerces, artisans, associations.',
      'Intégration front-end, back-end PHP et JavaScript, bases de données MySQL.',
      'Gestion complète de la relation client : cadrage du besoin, devis, livraison, maintenance.',
    ],
  },
];

export type Formation = {
  diplome: string;
  ecole: string;
  periode: string;
  precision?: string;
};

export const formations: Formation[] = [
  {
    diplome: 'Concepteur développeur d’applications',
    ecole: 'LA MANU · Amiens',
    periode: 'Oct. 2022 – Nov. 2023',
    precision: 'Programmation informatique, parcours général.',
  },
  {
    diplome: 'Développeur d’applications mobiles',
    ecole: 'LA MANU · Amiens',
    periode: 'Juin 2022 – Oct. 2022',
    precision: 'Développement d’applications mobiles en React Native.',
  },
  {
    diplome: 'Licence · programmation informatique',
    ecole: 'LA MANU · Amiens',
    periode: 'Déc. 2020 – Juin 2022',
  },
  {
    diplome: 'Master MIAGE · informatique appliquée à la gestion des entreprises',
    ecole: 'Université de Picardie Jules Verne · Amiens',
    periode: 'Oct. 2013 – Juin 2015',
    precision: 'Développement logiciel, gestion des systèmes d’information.',
  },
];

export type GroupeCompetences = {
  titre: string;
  /** Ce que ce groupe permet concrètement, pas une liste de mots. */
  ceQueCaPermet: string;
  outils: string[];
};

export const competences: GroupeCompetences[] = [
  {
    titre: 'Mobile',
    ceQueCaPermet:
      'Construire une application iOS et Android depuis une seule base de code, et descendre en natif quand le framework ne suffit plus.',
    outils: [
      'React Native',
      'TypeScript',
      'Swift',
      'Kotlin',
      'SwiftUI',
      'ActivityKit',
      'App Intents',
      'WidgetKit',
    ],
  },
  {
    titre: 'Web & front',
    ceQueCaPermet:
      'Livrer une interface web rapide, accessible et indexable, adossée au même socle produit que le mobile.',
    outils: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind'],
  },
  {
    titre: 'Backend & données',
    ceQueCaPermet:
      'Poser une API, un modèle de données et des règles de sécurité qui tiennent quand le produit grandit.',
    outils: [
      'Node.js',
      'Express',
      'Firebase',
      'Firestore',
      'Cloud Functions',
      'Supabase',
      'PostgreSQL',
      'MongoDB',
      'API REST',
    ],
  },
  {
    titre: 'Livraison',
    ceQueCaPermet:
      'Amener le produit jusqu’aux utilisateurs : signature, revue Apple, publication, mises à jour et suivi après la mise en ligne.',
    outils: [
      'App Store Connect',
      'Google Play Console',
      'CI/CD',
      'GitHub Actions',
      'Tests',
      'Revue de code',
    ],
  },
];

/**
 * Ce qui me distingue, formulé en capacités démontrables et non en adjectifs.
 * Chaque ligne doit pouvoir être prouvée par une application publiée.
 */
export const preuves = [
  {
    titre: 'Je vais jusqu’à la mise en ligne',
    texte:
      'Huit applications sont passées par la revue Apple et sont téléchargeables aujourd’hui. Ce n’est pas un dépôt Git : c’est un produit que n’importe qui peut installer.',
  },
  {
    titre: 'Je descends en natif quand il le faut',
    texte:
      'Dynamic Island, Live Activities, App Intents, Apple Watch, widgets, NFC. React Native couvre l’essentiel, le reste s’écrit en Swift ou en Kotlin.',
  },
  {
    titre: 'Je tiens les contraintes réelles',
    texte:
      'Une application de vol qui ne passe aucun appel réseau. Un horodateur en 3,3 Mo. Un carnet de santé vérifiable en mode avion. La contrainte est décidée avant la première ligne de code.',
  },
  {
    titre: 'Je prends le produit, pas seulement le ticket',
    texte:
      'Cadrage, arbitrages, architecture, interface, backend, publication, puis les mises à jour. Sur mes propres applications, il n’y a personne d’autre pour le faire.',
  },
];
