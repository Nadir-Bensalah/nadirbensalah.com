export const trustMetrics = [
  { value: '26+', label: 'clients accompagnés' },
  { value: '22', label: 'applications lancées' },
  { value: '5 ans', label: 'd’expérience produit' },
  { value: '5.0/5', label: 'avis clients' },
];

export const trustProofs = [
  'Collaboration directe avec le développeur, sans intermédiaire ni dilution de responsabilité.',
  'Cadrage MVP avant développement pour éviter les fonctionnalités inutiles et les budgets mal maîtrisés.',
  'Stack moderne orientée maintenance : React Native, Next.js, TypeScript, backend API, Firebase, Supabase ou Stripe selon le besoin.',
  'Approche orientée business : chaque fonctionnalité doit servir acquisition, conversion, rétention, automatisation ou revenu.',
];

export const riskReducers = [
  'Estimation honnête avant engagement',
  'Roadmap découpée par priorité business',
  'Validation progressive des écrans et parcours',
  'Architecture pensée pour évoluer après le MVP',
  'Communication claire sur les risques techniques',
  'Possibilité de démarrer par un audit ou un cadrage court',
];

export const expertComparisons = [
  {
    option: 'Freelance senior',
    bestFor: 'Fondateur, startup ou PME qui veut avancer vite avec un interlocuteur expert.',
    limit: 'Capacité limitée : il faut prioriser les projets sérieux.',
  },
  {
    option: 'Agence classique',
    bestFor: 'Grand projet avec beaucoup de production parallèle et plusieurs expertises séparées.',
    limit: 'Coût souvent plus élevé et échanges parfois moins directs.',
  },
  {
    option: 'Équipe interne',
    bestFor: 'Produit déjà validé nécessitant une équipe permanente.',
    limit: 'Recrutement long et coût fixe important avant validation du marché.',
  },
];

export const moneyPageInsights: Record<string, Array<{ heading: string; body: string[] }>> = {
  'creation-application-mobile': [
    {
      heading: 'Ce qu’une application mobile doit prouver dès le MVP',
      body: [
        'Une première version ne doit pas chercher à tout faire. Elle doit prouver que les utilisateurs comprennent la proposition de valeur, réalisent l’action principale et ont une raison de revenir.',
        'Les fonctionnalités prioritaires sont généralement l’onboarding, le compte utilisateur, le parcours cœur, la notification utile, le paiement ou la réservation si le modèle économique en dépend.',
      ],
    },
    {
      heading: 'Les décisions techniques qui évitent de refaire l’application six mois plus tard',
      body: [
        'Le choix entre React Native, natif, Flutter, Firebase, Supabase ou backend sur mesure dépend du niveau d’ambition, du budget, de la complexité métier et de la roadmap.',
        'Une architecture saine sépare les écrans, les données, les services, l’authentification, les permissions et les intégrations afin de pouvoir ajouter de nouvelles fonctionnalités sans casser l’existant.',
      ],
    },
    {
      heading: 'Budget, délai et niveau de qualité attendu',
      body: [
        'Une application mobile sérieuse demande du temps de cadrage, de design, de développement, de tests, de publication et d’itération. Le prix dépend surtout du nombre de parcours critiques, du backend, des paiements, de la géolocalisation, de la messagerie et du back-office.',
        'Le bon objectif est de construire une version crédible, pas une version énorme. C’est ce qui permet de lancer vite, mesurer les retours et investir ensuite sur les fonctionnalités qui créent réellement de la valeur.',
      ],
    },
  ],
  'developpement-saas': [
    {
      heading: 'Un SaaS doit vendre une transformation, pas seulement une interface',
      body: [
        'Un SaaS performant résout un problème récurrent suffisamment douloureux pour justifier un abonnement. La priorité est donc de clarifier le profil client, le bénéfice mesurable et le moment où l’utilisateur perçoit la valeur.',
        'Le MVP doit contenir le parcours qui déclenche cette valeur : inscription, configuration, usage principal, tableau de bord, paiement, notifications et administration si nécessaire.',
      ],
    },
    {
      heading: 'Les fondations techniques d’un SaaS fiable',
      body: [
        'Un SaaS demande une gestion propre des comptes, rôles, permissions, abonnements, données, sécurité, logs, emails transactionnels et évolutions futures.',
        'L’architecture doit être assez simple pour lancer vite, mais assez robuste pour supporter des clients réels, des offres tarifaires, des intégrations et un support opérationnel.',
      ],
    },
    {
      heading: 'Réduire le risque avant d’investir lourdement',
      body: [
        'La meilleure stratégie consiste à découper le produit en paliers : prototype cliquable, MVP utilisable, version vendable, puis automatisations avancées.',
        'Cela permet d’éviter de développer pendant des mois sans validation commerciale et d’aligner la roadmap technique avec les ventes, les retours utilisateurs et la rentabilité.',
      ],
    },
  ],
  'application-mobile': [
    {
      heading: 'Ce qui fait varier le prix d’une application mobile',
      body: [
        'Le budget dépend du nombre d’écrans, de la qualité UX/UI, du backend, des rôles utilisateurs, des paiements, de la géolocalisation, des notifications, de la publication stores et du niveau de tests attendu.',
        'Deux applications avec le même nombre d’écrans peuvent avoir des budgets très différents si l’une contient une logique métier complexe, une marketplace, une messagerie ou un back-office complet.',
      ],
    },
    {
      heading: 'Comment obtenir un devis fiable',
      body: [
        'Un devis sérieux commence par un périmètre clair : utilisateurs, parcours principaux, fonctionnalités indispensables, contraintes techniques, délai souhaité et niveau de finition attendu.',
        'Sans cadrage, le prix est souvent sous-estimé. Avec un bon découpage MVP, il devient possible de sécuriser le budget et d’éviter les mauvaises surprises.',
      ],
    },
  ],
  saas: [
    {
      heading: 'Les postes de coût d’un SaaS',
      body: [
        'Un SaaS inclut souvent authentication, gestion des organisations, rôles, dashboards, paiements récurrents, emails, base de données, monitoring, back-office, sécurité et hébergement.',
        'Le budget augmente lorsque le produit nécessite des intégrations externes, des workflows complexes, de l’import/export, des permissions avancées ou de l’automatisation métier.',
      ],
    },
    {
      heading: 'Pourquoi commencer par un MVP SaaS',
      body: [
        'Un MVP SaaS permet de tester l’usage, le prix, la proposition de valeur et le canal de vente avant de construire une plateforme trop lourde.',
        'La première version doit surtout permettre de vendre, d’onboarder et de délivrer la valeur promise avec un niveau de fiabilité suffisant.',
      ],
    },
  ],
};
