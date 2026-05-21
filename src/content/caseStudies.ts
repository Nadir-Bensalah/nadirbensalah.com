export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  sector: string;
  result: string;
  challenge: string;
  solution: string[];
  impact: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'application-mobile',
    title: 'Étude de cas application mobile : lancer un MVP iOS/Android crédible',
    description: 'Comment transformer une idée d’application mobile en MVP utilisable, testable et prêt pour les premiers clients.',
    keyword: 'étude de cas application mobile',
    sector: 'Startup mobile',
    result: 'MVP lancé rapidement avec parcours utilisateur priorisé',
    challenge: 'Le porteur de projet avait une idée ambitieuse mais un budget limité. Il fallait éviter de développer trop de fonctionnalités avant validation marché.',
    solution: ['Cadrage du MVP et des parcours critiques', 'Développement mobile cross-platform', 'Backend, authentification et données utilisateur', 'Préparation d’une roadmap V1 orientée retours terrain'],
    impact: ['Budget initial mieux maîtrisé', 'Produit présentable aux premiers utilisateurs', 'Base technique prête pour évoluer', 'Décisions produit basées sur les retours réels'],
  },
  {
    slug: 'saas-b2b',
    title: 'Étude de cas SaaS B2B : créer un logiciel en ligne vendable',
    description: 'Conception d’un SaaS B2B avec dashboard, abonnement, rôles utilisateurs et back-office.',
    keyword: 'étude de cas SaaS',
    sector: 'SaaS B2B',
    result: 'Prototype SaaS structuré pour vendre les premiers abonnements',
    challenge: 'Le projet nécessitait une première version suffisamment complète pour convaincre des clients B2B sans surdimensionner la plateforme.',
    solution: ['Définition de la fonctionnalité cœur', 'Architecture web et backend évolutive', 'Dashboard utilisateur et espace admin', 'Préparation paiement, plans et permissions'],
    impact: ['Offre SaaS clarifiée', 'Parcours utilisateur simplifié', 'Stack technique maintenable', 'Roadmap commerciale alignée au produit'],
  },
  {
    slug: 'marketplace',
    title: 'Étude de cas marketplace : connecter offre et demande sur une plateforme',
    description: 'Création d’un MVP marketplace avec comptes utilisateurs, annonces, recherche, modération et parcours transactionnel.',
    keyword: 'étude de cas marketplace',
    sector: 'Marketplace de services',
    result: 'Plateforme marketplace structurée autour des rôles clés',
    challenge: 'Une marketplace doit gérer plusieurs profils, instaurer la confiance et garder un périmètre MVP réaliste.',
    solution: ['Modélisation vendeurs/acheteurs', 'Catalogue, recherche et filtres', 'Back-office de modération', 'Préparation des règles de paiement et commission'],
    impact: ['Meilleure lisibilité du modèle économique', 'Parcours multi-utilisateurs cohérent', 'Administration facilitée', 'Évolutions futures anticipées'],
  },
  {
    slug: 'logiciel-metier',
    title: 'Étude de cas logiciel métier : remplacer Excel par un outil interne',
    description: 'Digitalisation d’un processus PME avec dashboard, rôles utilisateurs, automatisations et centralisation des données.',
    keyword: 'étude de cas logiciel métier',
    sector: 'PME opérationnelle',
    result: 'Processus métier centralisé dans une application web simple',
    challenge: 'Les équipes perdaient du temps avec des fichiers dispersés, des validations manuelles et un manque de visibilité sur les données.',
    solution: ['Audit des workflows existants', 'Définition du module prioritaire', 'Dashboard et gestion des données', 'Automatisations et exports métier'],
    impact: ['Moins de double saisie', 'Meilleure visibilité dirigeant', 'Réduction des erreurs', 'Base prête pour modules supplémentaires'],
  },
];

export function findCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
