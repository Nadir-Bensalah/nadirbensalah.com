export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  intent: 'achat' | 'info' | 'mixte';
  difficulty: 'faible' | 'moyenne' | 'élevée';
  volume: 'faible' | 'moyen' | 'élevé';
  angle: string;
  sections: Array<{ heading: string; body: string[] }>;
};

const makePost = (slug: string, title: string, keyword: string, intent: BlogPost['intent'], angle: string): BlogPost => ({
  slug,
  title,
  description: `${title}. Guide business par Nadir Ben Salah pour cadrer, budgéter et lancer un projet digital rentable.`,
  keyword,
  intent,
  difficulty: intent === 'achat' ? 'moyenne' : 'faible',
  volume: intent === 'achat' ? 'moyen' : 'élevé',
  angle,
  sections: [
    {
      heading: 'Ce qu’il faut comprendre avant de décider',
      body: [
        `La recherche “${keyword}” cache souvent une question business plus profonde : quel investissement est nécessaire, quelles fonctionnalités prioriser et comment éviter de perdre du temps sur une mauvaise première version ?`,
        'La bonne approche consiste à partir de l’objectif commercial, puis à définir le produit, la stack, le budget et la roadmap. Le développement doit servir la traction, pas seulement produire du code.',
      ],
    },
    {
      heading: 'Les critères qui changent vraiment le budget et les délais',
      body: [
        'Les principaux facteurs sont le nombre de rôles utilisateurs, les paiements, la base de données, les intégrations externes, le niveau de design, la sécurité, le back-office et les contraintes de performance.',
        'Un MVP bien priorisé permet souvent de lancer plus vite, de tester le marché et de transformer les premiers retours en décisions concrètes.',
      ],
    },
    {
      heading: 'Comment transformer ce sujet en opportunité business',
      body: [
        angle,
        'Si vous avez un projet concret, le plus important est de clarifier le périmètre initial, les fonctionnalités indispensables et le résultat attendu dans les 90 premiers jours.',
      ],
    },
  ],
});

export const blogPosts: BlogPost[] = [
  makePost('prix-application-mobile', 'Combien coûte une application mobile en 2026 ?', 'prix application mobile', 'achat', 'Convertir les prospects qui comparent les budgets en leur montrant comment cadrer un MVP rentable.'),
  makePost('creer-application-mobile', 'Créer une application mobile : les étapes de A à Z', 'créer application mobile', 'info', 'Éduquer les fondateurs puis les orienter vers un audit projet.'),
  makePost('react-native-ou-flutter', 'React Native ou Flutter : que choisir pour votre application ?', 'React Native ou Flutter', 'mixte', 'Positionner Nadir comme expert mobile capable d’arbitrer selon le business, pas selon la mode.'),
  makePost('freelance-ou-agence-application-mobile', 'Freelance ou agence pour créer une application mobile ?', 'freelance ou agence application mobile', 'mixte', 'Montrer les avantages d’un expert senior direct pour les startups et PME.'),
  makePost('mvp-application-mobile-startup', 'Comment créer un MVP mobile pour startup ?', 'MVP application mobile', 'achat', 'Capter les fondateurs qui veulent lancer vite sans gaspiller leur budget.'),
  makePost('delai-developpement-application-mobile', 'Combien de temps faut-il pour développer une application mobile ?', 'délai développement application mobile', 'info', 'Qualifier les prospects sur la complexité réelle d’un projet mobile.'),
  makePost('cahier-des-charges-application-mobile', 'Cahier des charges application mobile : modèle et conseils', 'cahier des charges application mobile', 'info', 'Créer un contenu lead magnet pour attirer des prospects en phase de cadrage.'),
  makePost('erreurs-creation-application-mobile', 'Les erreurs à éviter avant de créer une application mobile', 'erreurs création application mobile', 'info', 'Rassurer par l’expertise et pousser vers un audit avant développement.'),
  makePost('creer-saas-rentable', 'Comment créer un SaaS rentable ?', 'créer SaaS rentable', 'info', 'Attirer les fondateurs SaaS avec une lecture produit, pricing et acquisition.'),
  makePost('prix-developpement-saas', 'Prix développement SaaS : budget complet pour lancer un logiciel', 'prix développement SaaS', 'achat', 'Convertir les recherches budget SaaS vers une estimation personnalisée.'),
  makePost('mvp-saas', 'MVP SaaS : que faut-il développer en premier ?', 'MVP SaaS', 'achat', 'Aider les fondateurs à prioriser la fonctionnalité cœur vendable.'),
  makePost('saas-b2b', 'SaaS B2B : modèle économique, fonctionnalités et stack', 'SaaS B2B', 'info', 'Construire l’autorité sur les logiciels B2B par abonnement.'),
  makePost('creer-marketplace', 'Comment créer une marketplace ?', 'créer marketplace', 'info', 'Capter les projets complexes et expliquer les rôles, paiements et commissions.'),
  makePost('prix-creation-marketplace', 'Prix marketplace : combien prévoir pour créer une plateforme ?', 'prix création marketplace', 'achat', 'Convertir les porteurs de projet marketplace à forte valeur.'),
  makePost('marketplace-de-services', 'Marketplace de services : fonctionnalités clés et modèle économique', 'marketplace de services', 'mixte', 'Cibler une longue traîne business avec forte intention projet.'),
  makePost('logiciel-metier-sur-mesure-guide', 'Logiciel métier sur mesure : guide complet pour PME', 'logiciel métier sur mesure', 'achat', 'Capter les dirigeants PME qui veulent remplacer Excel et automatiser.'),
  makePost('remplacer-excel-logiciel-metier', 'Quand remplacer Excel par un logiciel métier ?', 'remplacer Excel logiciel', 'info', 'Déclencher une prise de conscience sur les pertes de temps opérationnelles.'),
  makePost('digitalisation-pme', 'Digitalisation PME : par où commencer ?', 'digitalisation PME', 'mixte', 'Amener les dirigeants vers un diagnostic transformation digitale.'),
  makePost('dashboard-admin-sur-mesure', 'Créer un dashboard admin sur mesure : usages, coût et erreurs', 'dashboard admin sur mesure', 'achat', 'Capter les besoins back-office liés aux apps, SaaS et plateformes.'),
  makePost('application-mobile-paiement', 'Application mobile avec paiement : ce qu’il faut savoir', 'application mobile paiement', 'info', 'Rassurer sur Stripe, sécurité, commissions et parcours de paiement.'),
  makePost('application-mobile-geolocalisation', 'Application mobile avec géolocalisation : usages et coût', 'application mobile géolocalisation', 'info', 'Cibler les projets réservation, livraison, terrain et marketplace.'),
  makePost('back-office-application-mobile', 'Back-office : pourquoi il est indispensable dans une application', 'back-office application mobile', 'info', 'Créer un upsell naturel vers dashboard admin et logiciel métier.'),
  makePost('integrer-ia-application', 'Comment intégrer l’IA dans une application ?', 'intégrer IA dans application', 'achat', 'Positionner Nadir sur IA utile, assistants, automatisation et SaaS.'),
  makePost('chatbot-ia-sur-mesure', 'Chatbot IA sur mesure : usages, limites et budget', 'chatbot IA sur mesure', 'achat', 'Attirer les entreprises qui veulent automatiser support et opérations.'),
  makePost('site-web-oriente-conversion', 'Site web orienté conversion : structure idéale pour générer des leads', 'site web orienté conversion', 'achat', 'Relier développement web, SEO et CRO pour générer des demandes qualifiées.'),
  makePost('refonte-site-web-seo', 'Refonte site web SEO : comment éviter de perdre son trafic ?', 'refonte site web SEO', 'achat', 'Capter les entreprises avec site existant et enjeux migration SEO.'),
  makePost('developpeur-web-freelance-paris', 'Développeur web freelance Paris : comment choisir le bon profil ?', 'développeur web freelance Paris', 'achat', 'Renforcer le cluster local Paris et orienter vers les pages services.'),
  makePost('creation-application-mobile-tunisie', 'Création application mobile Tunisie : qualité, budget et collaboration', 'création application mobile Tunisie', 'achat', 'Cibler Tunisie + projets France/international avec positionnement premium.'),
  makePost('no-code-ou-developpement-sur-mesure', 'No-code ou développement sur mesure : que choisir ?', 'no-code ou développement sur mesure', 'mixte', 'Aider à choisir selon risque, budget, scalabilité et propriété technique.'),
  makePost('roadmap-lancement-produit-digital', 'Roadmap de lancement produit digital sur 90 jours', 'lancement produit digital', 'info', 'Donner un plan clair et convertir vers un accompagnement cadrage + développement.'),
];

export function findBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
