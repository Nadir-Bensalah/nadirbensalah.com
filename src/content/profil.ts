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
  linkedin: 'https://www.linkedin.com/in/nadir-ben-salah/',
  github: 'https://github.com/Nadir-Bensalah',
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
      'Entreprise individuelle en France, doublée d’une SUARL en Tunisie. Créée en juillet 2024, pendant mes derniers mois chez Decayeux, et devenue mon activité principale à mon départ en octobre.',
      'Conception et développement d’applications mobiles en React Native et TypeScript, de l’idée à la publication sur les stores.',
      'Applications publiées sur l’App Store, conçues et développées de l’idée à la mise en vente.',
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
      'Application Android installée sur les écrans tactiles que Decayeux pose dans les halls d’immeubles et d’entreprises, à côté de ses boîtes aux lettres connectées. Le résident y consulte la météo, les actualités et les informations de sa résidence, ouvre sa boîte, dépose ou récupère un colis.',
      'Écran d’accueil composé de widgets indépendants, réordonnables par appui long : météo, actualités, trafic, colis, casiers, résidents, contacts, documents, réservation d’espaces communs.',
      'Refonte visuelle complète et travail de fluidité sur une application devenue lente et datée. C’est la contribution dont je suis le plus satisfait : le produit était fonctionnel mais pénible à utiliser sur un écran mural, là où l’utilisateur ne patiente pas.',
      'Un écran de hall n’a pas le droit d’afficher une page blanche : l’état du réseau est traité comme un cas normal, pas comme une erreur, chaque widget continuant d’afficher ce qu’il a en mémoire.',
      'Équipe de cinq personnes, avec suivi et maintenance en production sur deux ans.',
    ],
  },
  {
    poste: 'Développeur web & mobile · indépendant',
    entreprise: 'Fast-Way, puis Fast Way Development',
    debut: 'Novembre 2015',
    fin: 'Août 2022',
    faits: [
      'Entreprise individuelle déclarée en novembre 2015 (SIREN 814 051 769), d’abord pour quelques missions ponctuelles. L’activité devient régulière à partir de 2020, avec la reprise d’études en développement web et mobile.',
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
    diplome: 'Concepteur développeur d’applications · titre RNCP niveau 6',
    ecole: 'LA MANU · Amiens',
    periode: 'Oct. 2022 – Nov. 2023',
    precision: 'Conception et développement d’applications, du besoin à la mise en production.',
  },
  {
    diplome: 'Développeur d’applications mobiles',
    ecole: 'LA MANU · Amiens',
    periode: 'Juin 2022 – Oct. 2022',
    precision: 'Spécialisation mobile : React Native, iOS et Android.',
  },
  {
    diplome: 'Développeur web et web mobile · titre RNCP niveau 5',
    ecole: 'LA MANU · Amiens',
    periode: 'Déc. 2020 – Juin 2022',
    precision:
      'Reprise d’études pour passer du développement web au développement mobile, puis spécialisation progressive jusqu’au titre de concepteur développeur.',
  },
  {
    diplome: 'Master MIAGE · informatique appliquée à la gestion des entreprises',
    ecole: 'Université de Picardie Jules Verne · Amiens',
    periode: 'Oct. 2013 – Juin 2015',
    precision:
      'Développement logiciel et systèmes d’information. Les formations suivantes, à partir de 2020, sont une spécialisation choisie vers le développement mobile.',
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
      'Mes applications sont passées par la revue Apple et sont téléchargeables aujourd’hui. Ce n’est pas un dépôt Git : c’est un produit que n’importe qui peut installer.',
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
