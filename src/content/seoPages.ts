export type SeoPage = {
  slug: string;
  market?: string;
  locale?: 'fr' | 'en';
  path?: string;
  alternatePaths?: Record<string, string>;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: string;
  offer: string[];
  sections: Array<{
    heading: string;
    body: string[];
  }>;
  benefits: string[];
  process: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
  cta: string;
};

const commonMobileFaq = [
  {
    question: 'Combien de temps faut-il pour lancer une première version ?',
    answer: 'Une première version exploitable peut souvent être cadrée et développée en quelques semaines lorsque le périmètre est priorisé. Les projets avec paiement, marketplace, géolocalisation ou back-office demandent davantage de conception, de tests et de sécurisation.',
  },
  {
    question: 'Pouvez-vous m’aider à définir le MVP avant de développer ?',
    answer: 'Oui. Le cadrage produit fait partie de l’accompagnement : clarification des utilisateurs, priorisation des fonctionnalités, estimation du budget, risques techniques et plan de lancement.',
  },
  {
    question: 'Travaillez-vous avec des clients en France, Tunisie et à distance ?',
    answer: 'Oui. La collaboration est structurée pour fonctionner efficacement à distance avec des points réguliers, une feuille de route claire et une communication directe.',
  },
];

export const servicePages: SeoPage[] = [
  {
    slug: 'creation-application-mobile',
    title: 'Création application mobile sur mesure – iOS, Android, React Native',
    description: 'Développez une application mobile iOS et Android rentable avec un expert React Native : MVP, marketplace, SaaS mobile, app métier et publication stores.',
    eyebrow: 'Service premium',
    h1: 'Création application mobile sur mesure pour startup, PME et entrepreneur',
    primaryKeyword: 'création application mobile',
    secondaryKeywords: ['application mobile sur mesure', 'développeur application mobile freelance', 'application iOS Android', 'MVP mobile', 'React Native freelance'],
    intent: 'Prospect prêt à cadrer, budgéter ou lancer une application mobile.',
    intro: [
      'Créer une application mobile performante ne consiste pas à empiler des écrans. Une bonne application doit résoudre un problème précis, offrir une expérience fluide, soutenir un modèle économique clair et pouvoir évoluer sans refaire toute la base technique.',
      'J’accompagne les fondateurs, startups, PME et dirigeants dans la conception et le développement d’applications iOS et Android sur mesure, avec une approche orientée produit, conversion et retour sur investissement.',
      'L’objectif est de vous aider à lancer vite, proprement et intelligemment : une application utile pour vos utilisateurs, crédible pour vos clients et suffisamment robuste pour évoluer après les premiers retours terrain.',
    ],
    offer: [
      'Cadrage stratégique de l’idée, du modèle économique et du MVP.',
      'Développement React Native pour iOS et Android avec une base de code maintenable.',
      'Backend, authentification, base de données, paiements, notifications et back-office si nécessaire.',
      'Accompagnement jusqu’à la publication App Store et Google Play.',
    ],
    sections: [
      {
        heading: 'Une application pensée comme un produit business',
        body: [
          'Avant de développer, il faut comprendre ce que l’application doit réellement produire comme résultat : acquisition de clients, automatisation d’un service, génération de revenus récurrents, amélioration de la fidélisation ou réduction de coûts internes.',
          'Cette étape permet d’éviter les fonctionnalités inutiles, les budgets mal maîtrisés et les applications qui semblent complètes mais ne convertissent pas. Le développement commence par les parcours critiques : inscription, première action, achat, réservation, interaction ou rétention.',
        ],
      },
      {
        heading: 'React Native pour accélérer le lancement iOS et Android',
        body: [
          'React Native permet de créer une application mobile compatible iOS et Android avec une base technique commune. Pour une startup, un SaaS mobile, une marketplace ou une application métier, c’est souvent le meilleur équilibre entre qualité, rapidité et budget.',
          'La priorité reste la qualité d’expérience : interfaces fluides, navigation claire, formulaires simples, performances maîtrisées, gestion propre des états et architecture pensée pour recevoir de nouvelles fonctionnalités.',
        ],
      },
      {
        heading: 'Applications mobiles développées',
        body: [
          'Les projets peuvent prendre plusieurs formes : application de réservation, application communautaire, marketplace mobile, application SaaS, outil terrain pour équipes internes, portail client mobile, application avec abonnement, paiement, géolocalisation, messagerie ou notifications push.',
          'Chaque projet est traité comme un produit unique. Le niveau de complexité, le choix des technologies, le back-office et les intégrations sont définis selon vos objectifs, votre budget et votre stratégie de lancement.',
        ],
      },
      {
        heading: 'De l’idée à la publication',
        body: [
          'L’accompagnement couvre le cadrage, la priorisation, la conception UX, le développement, les tests, la préparation des stores et les évolutions post-lancement. Vous gardez une vision claire de ce qui est développé, pourquoi et dans quel ordre.',
          'L’approche est volontairement pragmatique : lancer une première version solide, mesurer les retours, améliorer les fonctionnalités qui créent réellement de la valeur et éviter la dette technique qui bloque la croissance.',
        ],
      },
    ],
    benefits: ['Budget mieux maîtrisé grâce au MVP', 'Application iOS et Android avec une expérience premium', 'Architecture évolutive', 'Vision produit et technique dans un seul accompagnement', 'Communication directe avec le développeur'],
    process: ['Audit de l’idée et des objectifs business', 'Définition du MVP et des parcours utilisateurs', 'Architecture technique et choix de stack', 'Développement mobile, backend et back-office', 'Tests, publication stores et plan d’évolution'],
    faq: commonMobileFaq,
    cta: 'Demander un audit gratuit de mon application mobile',
  },
  {
    slug: 'developpement-saas',
    title: 'Développement SaaS sur mesure – Créer un logiciel en ligne rentable',
    description: 'Création de SaaS B2B/B2C sur mesure : MVP, abonnement, dashboard, paiement Stripe, architecture scalable, back-office et accompagnement produit.',
    eyebrow: 'SaaS & revenu récurrent',
    h1: 'Développement SaaS sur mesure pour lancer un logiciel rentable',
    primaryKeyword: 'développement SaaS',
    secondaryKeywords: ['création SaaS', 'MVP SaaS', 'développeur SaaS freelance', 'SaaS B2B', 'logiciel en ligne sur mesure'],
    intent: 'Fondateur ou entreprise souhaitant créer un logiciel par abonnement.',
    intro: [
      'Un SaaS rentable ne se résume pas à une interface web. Il doit résoudre un problème suffisamment important pour justifier un abonnement, convertir les utilisateurs, gérer les paiements, sécuriser les données et évoluer avec la croissance.',
      'J’accompagne les entrepreneurs et PME dans la création de SaaS sur mesure, depuis la stratégie produit jusqu’au développement technique : MVP, dashboard, abonnement, back-office, automatisations et intégrations.',
      'La priorité est de construire une première version vendable, pas une usine à gaz. Le produit doit être clair, fiable, mesurable et suffisamment différenciant pour convaincre ses premiers clients.',
    ],
    offer: [
      'Cadrage du positionnement, de la cible et de l’offre SaaS.',
      'Développement du MVP SaaS avec parcours d’inscription et dashboard.',
      'Intégration des paiements, abonnements, rôles, permissions et back-office.',
      'Architecture évolutive pour ajouter IA, API, mobile ou multi-tenant.',
    ],
    sections: [
      {
        heading: 'Construire un SaaS autour d’un problème rentable',
        body: [
          'Le développement commence par une question simple : quel problème votre SaaS résout-il mieux qu’une solution existante ou qu’un processus manuel ? Cette clarté influence toute la suite : fonctionnalités, pricing, onboarding, design, stack technique et stratégie d’acquisition.',
          'Un SaaS B2B doit souvent prouver un gain de temps, une réduction d’erreurs ou une augmentation de revenus. Un SaaS B2C doit convaincre rapidement avec une promesse évidente et une expérience ultra simple.',
        ],
      },
      {
        heading: 'Les fonctionnalités essentielles d’un SaaS moderne',
        body: [
          'Un SaaS peut intégrer authentification, gestion des organisations, rôles utilisateurs, tableau de bord, abonnement Stripe, facturation, emails transactionnels, statistiques, exports, API, espace admin et support client.',
          'La difficulté n’est pas de tout développer, mais de choisir ce qui doit exister dans la première version pour vendre. Un bon MVP SaaS garde uniquement les fonctionnalités qui démontrent la valeur et déclenchent l’usage.',
        ],
      },
      {
        heading: 'Architecture SaaS évolutive',
        body: [
          'Même un MVP doit être construit avec une architecture saine : séparation claire des responsabilités, modèle de données cohérent, sécurité des accès, gestion des erreurs, monitoring, sauvegardes et possibilité d’ajouter de nouveaux modules sans tout casser.',
          'Selon le projet, la stack peut intégrer Next.js, React, Node.js, Firebase, Supabase, PostgreSQL, Stripe, API externes et services d’IA. Le choix se fait selon le budget, la scalabilité attendue et la rapidité de lancement.',
        ],
      },
      {
        heading: 'Du MVP aux premiers clients',
        body: [
          'Le développement doit servir la commercialisation. Cela signifie : landing page claire, onboarding court, proposition de valeur visible, suivi des conversions, démonstration du bénéfice utilisateur et capacité à itérer rapidement après les premiers retours.',
          'L’objectif est de transformer votre idée en logiciel utilisable, vendable et améliorable, avec une base technique suffisamment fiable pour supporter les premières ventes.',
        ],
      },
    ],
    benefits: ['MVP SaaS plus rapide à lancer', 'Paiement et abonnement intégrés', 'Dashboard utilisateur clair', 'Back-office administrable', 'Architecture prête pour l’évolution'],
    process: ['Cadrage produit et modèle économique', 'Priorisation du MVP vendable', 'Conception UX et architecture de données', 'Développement SaaS et intégrations', 'Lancement, mesure et itérations'],
    faq: [
      { question: 'Quel budget prévoir pour développer un SaaS ?', answer: 'Le budget dépend du périmètre : nombre de rôles, paiement, reporting, automatisations, API, mobile et niveau de sécurité. La meilleure approche consiste à estimer un MVP vendable puis à faire évoluer le produit par phases.' },
      { question: 'Faut-il intégrer Stripe dès le MVP ?', answer: 'Si l’objectif est de vendre rapidement un abonnement, oui. Stripe permet de gérer paiements, plans, facturation et abonnements de manière fiable.' },
      { question: 'Peut-on ajouter une application mobile ensuite ?', answer: 'Oui. Un SaaS peut commencer en web puis évoluer vers une application mobile iOS/Android en réutilisant une partie de la logique backend.' },
    ],
    cta: 'Planifier un échange stratégique pour mon SaaS',
  },
  {
    slug: 'logiciel-metier-sur-mesure',
    title: 'Logiciel métier sur mesure pour PME – Automatisation et digitalisation',
    description: 'Développement de logiciels métier sur mesure pour PME : dashboard, CRM interne, portail client, automatisation, application web/mobile et API.',
    eyebrow: 'Digitalisation PME',
    h1: 'Logiciel métier sur mesure pour digitaliser et automatiser votre entreprise',
    primaryKeyword: 'logiciel métier sur mesure',
    secondaryKeywords: ['développement logiciel métier', 'outil métier sur mesure', 'digitalisation PME', 'automatisation processus entreprise', 'CRM sur mesure'],
    intent: 'Dirigeant ou responsable métier souhaitant remplacer Excel et automatiser ses process.',
    intro: [
      'Quand une entreprise grandit, les fichiers Excel, outils dispersés et tâches manuelles deviennent des freins. Les informations se perdent, les validations ralentissent, les erreurs augmentent et les équipes passent trop de temps sur des opérations répétitives.',
      'Un logiciel métier sur mesure permet de centraliser vos données, automatiser vos processus, donner de la visibilité aux équipes et améliorer l’expérience client. Il s’adapte à votre organisation au lieu de vous forcer à rentrer dans un outil standard.',
      'J’aide les PME et dirigeants à transformer leurs processus en solutions web ou mobiles simples, fiables et mesurables.',
    ],
    offer: [
      'Analyse des processus internes et identification des gains rapides.',
      'Création de dashboard, CRM interne, portail client ou outil opérationnel.',
      'Automatisation des tâches répétitives, exports, notifications et validations.',
      'Développement progressif par modules pour maîtriser budget et adoption.',
    ],
    sections: [
      {
        heading: 'Remplacer les processus manuels par un outil adapté',
        body: [
          'Un logiciel métier devient pertinent lorsque vos outils actuels bloquent la performance : double saisie, absence de suivi, données dispersées, erreurs récurrentes, manque de visibilité ou dépendance à une personne clé.',
          'Le sur mesure permet de construire exactement les parcours dont vos équipes ont besoin : gestion clients, planning, interventions, documents, reporting, stocks, validations, portail client ou suivi commercial.',
        ],
      },
      {
        heading: 'Des modules utiles dès la première version',
        body: [
          'La meilleure approche consiste à commencer par un module à fort impact. Par exemple : remplacer un fichier Excel critique, automatiser une validation, centraliser les demandes clients ou créer un tableau de bord de pilotage.',
          'Cette logique réduit le risque, facilite l’adoption interne et permet de mesurer rapidement le retour sur investissement avant d’ajouter d’autres fonctionnalités.',
        ],
      },
      {
        heading: 'Une solution connectée à votre écosystème',
        body: [
          'Un logiciel métier peut se connecter à vos outils existants : CRM, ERP, solution de facturation, email, API métier, signature électronique, paiement, stockage de documents ou outils internes.',
          'L’enjeu est de créer un système cohérent, pas un outil isolé. Les données doivent circuler proprement, les droits doivent être sécurisés et les utilisateurs doivent gagner du temps dès les premiers jours.',
        ],
      },
    ],
    benefits: ['Réduction des tâches manuelles', 'Moins d’erreurs opérationnelles', 'Données centralisées', 'Meilleure visibilité dirigeant', 'Outil adapté à vos règles métier'],
    process: ['Audit des workflows actuels', 'Identification du module prioritaire', 'Conception des rôles et parcours', 'Développement web/mobile', 'Déploiement, formation et évolutions'],
    faq: [
      { question: 'Un logiciel sur mesure est-il plus rentable qu’un outil standard ?', answer: 'Oui lorsque vos processus sont spécifiques ou que les outils standard vous obligent à bricoler. Le sur mesure devient rentable s’il réduit les erreurs, automatise du temps humain ou améliore le pilotage.' },
      { question: 'Peut-on commencer avec un seul module ?', answer: 'Oui. C’est même recommandé. Un premier module permet de valider l’usage, former les équipes et mesurer le ROI avant d’étendre la solution.' },
      { question: 'Pouvez-vous remplacer un fichier Excel existant ?', answer: 'Oui. Beaucoup de projets commencent par transformer un fichier Excel critique en application web sécurisée, collaborative et automatisée.' },
    ],
    cta: 'Demander un diagnostic digitalisation PME',
  },
  {
    slug: 'creation-marketplace',
    title: 'Création marketplace sur mesure – Plateforme vendeurs acheteurs',
    description: 'Développement de marketplace B2B, services ou produits : comptes utilisateurs, annonces, paiement, commission, messagerie, avis et back-office.',
    eyebrow: 'Plateforme transactionnelle',
    h1: 'Création marketplace sur mesure pour connecter vendeurs, clients et prestataires',
    primaryKeyword: 'création marketplace',
    secondaryKeywords: ['développement marketplace sur mesure', 'marketplace B2B', 'plateforme vendeurs acheteurs', 'marketplace de services'],
    intent: 'Porteur de projet souhaitant lancer une plateforme transactionnelle.',
    intro: ['Une marketplace doit inspirer confiance, fluidifier la mise en relation et sécuriser les transactions.', 'Je développe des plateformes marketplace sur mesure avec une logique produit, paiement, modération et croissance.'],
    offer: ['Comptes vendeurs et acheteurs', 'Annonces, recherche et filtres', 'Paiement, commission et facturation', 'Messagerie, avis, modération et back-office'],
    sections: [{ heading: 'Une marketplace doit gérer plusieurs parcours', body: ['Le succès dépend de la qualité des parcours côté offre et côté demande. Les vendeurs doivent publier facilement, les acheteurs doivent trouver vite, et l’administrateur doit piloter la qualité.', 'Le développement intègre les règles de commission, les statuts, les notifications et la modération pour sécuriser l’expérience.'] }, { heading: 'Lancer un MVP marketplace crédible', body: ['La priorité est de créer un premier noyau fonctionnel : inscription, profils, catalogue, demande ou commande, paiement si nécessaire, avis et back-office.', 'Les fonctionnalités avancées peuvent être ajoutées après validation du marché.'] }],
    benefits: ['Parcours multi-utilisateurs', 'Paiement et commission', 'Back-office complet', 'Scalabilité progressive'],
    process: ['Cadrage du modèle marketplace', 'Définition des rôles', 'MVP transactionnel', 'Back-office et modération', 'Optimisation conversion'],
    faq: commonMobileFaq,
    cta: 'Cadrer ma marketplace',
  },
  {
    slug: 'plateforme-web-sur-mesure',
    title: 'Plateforme web sur mesure – Portail client, outil métier, SaaS',
    description: 'Création de plateforme web sur mesure pour startup et PME : portail client, dashboard, espace membre, outil métier, SaaS et API.',
    eyebrow: 'Web app premium',
    h1: 'Développement de plateforme web sur mesure pour votre business',
    primaryKeyword: 'plateforme web sur mesure',
    secondaryKeywords: ['développement plateforme web', 'portail client sur mesure', 'application web métier', 'dashboard web'],
    intent: 'Entreprise cherchant une plateforme web spécifique et évolutive.',
    intro: ['Une plateforme web sur mesure permet de créer un espace digital parfaitement adapté à votre activité.', 'Elle peut servir de portail client, dashboard, SaaS, outil interne ou plateforme collaborative.'],
    offer: ['Architecture frontend/backend', 'Espaces utilisateurs sécurisés', 'Dashboard et back-office', 'API et intégrations métier'],
    sections: [{ heading: 'Un outil web aligné sur vos opérations', body: ['Le développement commence par vos workflows réels : utilisateurs, données, validations, notifications et objectifs business.', 'L’objectif est de construire une plateforme qui simplifie le travail, améliore la conversion et peut évoluer par modules.'] }, { heading: 'Une base technique maintenable', body: ['Une plateforme web doit rester rapide, claire et sécurisée. La structure du code, les droits utilisateurs et le modèle de données sont pensés pour éviter les blocages futurs.', 'Chaque module est priorisé selon son impact métier.'] }],
    benefits: ['UX claire', 'Données centralisées', 'Évolutivité', 'Sécurité des accès'],
    process: ['Audit du besoin', 'Architecture', 'UX des parcours', 'Développement', 'Déploiement et itérations'],
    faq: commonMobileFaq,
    cta: 'Discuter de ma plateforme web',
  },
  {
    slug: 'developpeur-react-native-freelance',
    title: 'Développeur React Native freelance – Application iOS Android',
    description: 'Développeur React Native freelance pour créer, maintenir ou refondre une application mobile iOS et Android performante.',
    eyebrow: 'Expert React Native',
    h1: 'Développeur React Native freelance pour application mobile performante',
    primaryKeyword: 'développeur React Native freelance',
    secondaryKeywords: ['React Native iOS Android', 'freelance mobile', 'app cross-platform', 'maintenance React Native'],
    intent: 'Client cherchant un expert React Native opérationnel.',
    intro: ['React Native est idéal pour lancer rapidement une application iOS et Android sans doubler les coûts.', 'J’interviens sur la création, la refonte, l’optimisation et la maintenance d’applications React Native.'],
    offer: ['Développement d’app mobile', 'Audit technique', 'Optimisation performance', 'Maintenance et nouvelles fonctionnalités'],
    sections: [{ heading: 'Un expert pour accélérer sans sacrifier la qualité', body: ['React Native permet d’aller vite, mais exige une architecture propre pour éviter les problèmes de performance, navigation, état et compatibilité.', 'L’intervention peut couvrir tout le projet ou renforcer une équipe existante.'] }],
    benefits: ['Code TypeScript propre', 'Livraison iOS/Android', 'Optimisation UI', 'Maintenance facilitée'],
    process: ['Audit', 'Priorisation', 'Développement', 'Tests devices', 'Publication'],
    faq: commonMobileFaq,
    cta: 'Parler à un expert React Native',
  },
  {
    slug: 'creation-mvp-startup',
    title: 'Création MVP startup – Valider une idée rapidement',
    description: 'Conception et développement de MVP pour startup : application mobile, SaaS, marketplace ou plateforme web pour tester vite le marché.',
    eyebrow: 'MVP startup',
    h1: 'Création MVP startup pour valider votre idée sans surdévelopper',
    primaryKeyword: 'création MVP startup',
    secondaryKeywords: ['MVP application mobile', 'MVP SaaS', 'prototype startup', 'lancer une startup digitale'],
    intent: 'Fondateur souhaitant lancer une première version vendable.',
    intro: ['Un MVP n’est pas une version bâclée. C’est une version concentrée sur la valeur principale.', 'Je vous aide à transformer une idée en produit testable, utilisable et présentable à des clients ou investisseurs.'],
    offer: ['Cadrage du problème', 'Priorisation fonctionnelle', 'Développement rapide', 'Plan d’itération post-lancement'],
    sections: [{ heading: 'Réduire le risque produit', body: ['Le MVP évite d’investir dans des fonctionnalités non validées. Il permet d’apprendre vite, de signer les premiers utilisateurs et de décider sur des données réelles.', 'La qualité reste importante : un MVP doit être simple, mais crédible.'] }],
    benefits: ['Lancement plus rapide', 'Budget maîtrisé', 'Feedback réel', 'Meilleure levée de fonds'],
    process: ['Cadrage', 'Fonctionnalité cœur', 'Design utile', 'Développement', 'Mesure'],
    faq: commonMobileFaq,
    cta: 'Cadrer mon MVP',
  },
  {
    slug: 'developpement-site-web-sur-mesure',
    title: 'Développement site web sur mesure – Site professionnel orienté conversion',
    description: 'Création de site web professionnel, rapide, SEO et orienté conversion pour indépendant, startup, SaaS ou PME.',
    eyebrow: 'Site conversion',
    h1: 'Développement site web sur mesure pour générer des clients',
    primaryKeyword: 'développement site web sur mesure',
    secondaryKeywords: ['création site web professionnel', 'site vitrine premium', 'site web SEO', 'refonte site web'],
    intent: 'Entreprise voulant un site premium qui convertit.',
    intro: ['Un site professionnel doit vendre votre expertise, rassurer et générer des demandes qualifiées.', 'Je développe des sites rapides, structurés SEO et pensés pour transformer le trafic en prospects.'],
    offer: ['Structure SEO', 'Design premium', 'Développement Next.js', 'CTA et conversion'],
    sections: [{ heading: 'Un site orienté acquisition', body: ['Chaque section doit répondre à une objection : qui vous êtes, ce que vous faites, pour qui, avec quelles preuves et comment vous contacter.', 'La performance technique et le contenu SEO travaillent ensemble pour attirer et convertir.'] }],
    benefits: ['Image premium', 'SEO propre', 'Chargement rapide', 'Conversion améliorée'],
    process: ['Positionnement', 'Arborescence', 'Design', 'Développement', 'Optimisation'],
    faq: commonMobileFaq,
    cta: 'Créer mon site premium',
  },
  {
    slug: 'refonte-site-web',
    title: 'Refonte site web – SEO, performance et conversion',
    description: 'Refonte de site web pour améliorer image, vitesse, SEO, UX et génération de leads.',
    eyebrow: 'Refonte growth',
    h1: 'Refonte site web pour améliorer SEO, crédibilité et conversion',
    primaryKeyword: 'refonte site web',
    secondaryKeywords: ['refonte site internet', 'améliorer conversion site web', 'optimisation SEO site', 'site web premium'],
    intent: 'Entreprise avec un site existant qui ne convertit pas assez.',
    intro: ['Un site dépassé coûte des opportunités : image faible, SEO limité, chargement lent, messages flous.', 'La refonte permet de repositionner l’offre, clarifier les parcours et créer un site plus performant commercialement.'],
    offer: ['Audit site existant', 'Nouvelle structure SEO', 'Refonte design', 'Développement performant'],
    sections: [{ heading: 'Refondre pour convertir', body: ['La refonte ne doit pas être uniquement visuelle. Elle doit améliorer la compréhension de l’offre, la confiance et le passage à l’action.', 'Les contenus, titres, CTA, preuves et performances sont retravaillés ensemble.'] }],
    benefits: ['Meilleure image', 'SEO renforcé', 'CTA plus visibles', 'Performance accrue'],
    process: ['Audit', 'Positionnement', 'Wireframes', 'Développement', 'Suivi'],
    faq: commonMobileFaq,
    cta: 'Auditer mon site actuel',
  },
  {
    slug: 'dashboard-admin-back-office',
    title: 'Dashboard admin et back-office sur mesure',
    description: 'Création de dashboard admin, back-office, CRM interne et outils de pilotage pour gérer utilisateurs, données, commandes et contenus.',
    eyebrow: 'Back-office',
    h1: 'Création de dashboard admin et back-office sur mesure',
    primaryKeyword: 'dashboard admin sur mesure',
    secondaryKeywords: ['back-office sur mesure', 'CRM interne', 'outil admin', 'dashboard entreprise'],
    intent: 'Entreprise ayant besoin de piloter une application ou des données.',
    intro: ['Un bon back-office permet de piloter l’activité sans dépendre d’un développeur pour chaque action.', 'Je crée des interfaces admin claires pour gérer utilisateurs, contenus, commandes, paiements, données et statistiques.'],
    offer: ['Gestion utilisateurs', 'Tableaux de bord', 'CRUD métier', 'Exports et permissions'],
    sections: [{ heading: 'Donner le contrôle aux équipes', body: ['Le back-office doit être simple, sécurisé et adapté aux rôles internes. Il réduit les opérations manuelles et accélère le support client.', 'Les actions sensibles sont encadrées par des permissions, statuts et validations.'] }],
    benefits: ['Autonomie métier', 'Moins de support technique', 'Pilotage données', 'Permissions sécurisées'],
    process: ['Rôles', 'Données', 'Interfaces', 'Sécurité', 'Déploiement'],
    faq: commonMobileFaq,
    cta: 'Créer mon back-office',
  },
  {
    slug: 'developpement-api-backend',
    title: 'Développement backend et API sur mesure',
    description: 'Développement backend, API, authentification, base de données, paiements, notifications et intégrations pour apps mobiles, SaaS et plateformes.',
    eyebrow: 'Backend & API',
    h1: 'Développement backend et API sur mesure pour applications, SaaS et plateformes',
    primaryKeyword: 'développement API sur mesure',
    secondaryKeywords: ['backend Node.js', 'API application mobile', 'backend SaaS', 'architecture backend'],
    intent: 'Projet nécessitant une base technique serveur fiable.',
    intro: ['Le backend est le moteur invisible de votre produit digital.', 'Il gère les données, utilisateurs, droits, paiements, notifications, automatisations et connexions avec des services externes.'],
    offer: ['Architecture API', 'Base de données', 'Authentification', 'Intégrations externes'],
    sections: [{ heading: 'Un backend fiable pour évoluer', body: ['Une bonne API doit être claire, sécurisée et maintenable. Les modèles de données sont conçus pour les usages présents et les évolutions probables.', 'Le backend peut alimenter une application mobile, un SaaS, une marketplace ou un back-office.'] }],
    benefits: ['Données structurées', 'Sécurité', 'Scalabilité', 'Intégrations propres'],
    process: ['Modèle données', 'Endpoints', 'Sécurité', 'Tests', 'Monitoring'],
    faq: commonMobileFaq,
    cta: 'Discuter de mon backend',
  },
  {
    slug: 'automatisation-metier',
    title: 'Automatisation métier – Processus, workflows et outils internes',
    description: 'Automatisez vos processus métier : workflows, emails, documents, validations, synchronisation de données et outils internes.',
    eyebrow: 'Automatisation',
    h1: 'Automatisation métier pour gagner du temps et réduire les erreurs',
    primaryKeyword: 'automatisation métier',
    secondaryKeywords: ['automatisation processus entreprise', 'workflow sur mesure', 'digitalisation processus métier', 'outil interne PME'],
    intent: 'PME cherchant à automatiser des tâches répétitives.',
    intro: ['Les tâches répétitives coûtent cher lorsqu’elles sont faites manuellement.', 'Je conçois des automatisations métier pour fluidifier vos opérations, réduire les erreurs et libérer du temps aux équipes.'],
    offer: ['Audit des tâches', 'Workflows automatisés', 'Emails et documents', 'Connexions API'],
    sections: [{ heading: 'Automatiser ce qui ralentit la croissance', body: ['Les automatisations utiles ciblent les frictions concrètes : relances, validations, génération de documents, synchronisation de données, notifications ou reporting.', 'Elles doivent rester contrôlables et compréhensibles par les équipes.'] }],
    benefits: ['Gain de temps', 'Moins d’erreurs', 'Process plus fiables', 'Meilleure productivité'],
    process: ['Audit', 'Priorités', 'Workflow', 'Développement', 'Mesure ROI'],
    faq: commonMobileFaq,
    cta: 'Identifier mes automatisations prioritaires',
  },
  {
    slug: 'integration-ia-application',
    title: 'Intégration IA dans application, SaaS ou logiciel métier',
    description: 'Ajoutez des fonctionnalités IA utiles à votre application : assistant, chatbot, génération de contenu, analyse de données et automatisations intelligentes.',
    eyebrow: 'IA appliquée',
    h1: 'Intégration IA dans application, SaaS ou logiciel métier',
    primaryKeyword: 'intégration IA application',
    secondaryKeywords: ['chatbot IA sur mesure', 'assistant IA entreprise', 'IA SaaS', 'automatisation IA'],
    intent: 'Entreprise souhaitant intégrer l’IA de manière utile et rentable.',
    intro: ['L’IA doit résoudre un vrai problème, pas seulement servir d’effet marketing.', 'Je vous aide à intégrer des fonctionnalités IA utiles : assistants, suggestions, analyse, automatisation, génération de contenu ou support client.'],
    offer: ['Cadrage cas d’usage IA', 'Intégration API IA', 'UX conversationnelle', 'Sécurité et limites'],
    sections: [{ heading: 'De l’IA utile, intégrée au produit', body: ['Les meilleurs cas d’usage IA sont proches du workflow utilisateur : aider à décider, rédiger, classer, résumer, rechercher ou automatiser.', 'L’intégration doit être contrôlée, mesurable et sécurisée.'] }],
    benefits: ['Produit plus différenciant', 'Automatisation intelligente', 'Meilleure expérience utilisateur', 'Gain opérationnel'],
    process: ['Cas d’usage', 'Prototype', 'Intégration', 'Tests', 'Optimisation'],
    faq: commonMobileFaq,
    cta: 'Explorer une fonctionnalité IA',
  },
  {
    slug: 'maintenance-application-mobile-saas',
    title: 'Maintenance application mobile, SaaS et plateforme web',
    description: 'Maintenance corrective et évolutive pour application mobile, SaaS, site web ou plateforme : bugs, mises à jour, performance et nouvelles fonctionnalités.',
    eyebrow: 'Maintenance évolutive',
    h1: 'Maintenance application mobile, SaaS et plateforme web',
    primaryKeyword: 'maintenance application mobile',
    secondaryKeywords: ['maintenance SaaS', 'support application mobile', 'correction bugs application', 'évolution plateforme web'],
    intent: 'Client ayant un produit existant à stabiliser ou faire évoluer.',
    intro: ['Un produit digital doit évoluer pour rester fiable, compatible et compétitif.', 'J’interviens pour corriger, stabiliser, optimiser et ajouter des fonctionnalités à des applications mobiles, SaaS et plateformes web.'],
    offer: ['Audit code', 'Correction bugs', 'Mises à jour dépendances', 'Évolutions produit'],
    sections: [{ heading: 'Stabiliser avant d’accélérer', body: ['La maintenance efficace commence par comprendre l’existant : architecture, dette technique, bugs récurrents, performances et priorités business.', 'Ensuite, les corrections et évolutions sont planifiées pour réduire les risques.'] }],
    benefits: ['Produit plus stable', 'Moins de bugs', 'Évolutions maîtrisées', 'Meilleure performance'],
    process: ['Audit', 'Priorisation', 'Corrections', 'Tests', 'Roadmap'],
    faq: commonMobileFaq,
    cta: 'Auditer mon application existante',
  },
  {
    slug: 'transformation-digitale-pme',
    title: 'Transformation digitale PME – Applications, SaaS et automatisation',
    description: 'Accompagnement transformation digitale pour PME : audit, automatisation, logiciel métier, application mobile, SaaS interne et plateforme web sur mesure.',
    eyebrow: 'Transformation digitale',
    h1: 'Transformation digitale PME pour moderniser vos outils et accélérer votre croissance',
    primaryKeyword: 'transformation digitale PME',
    secondaryKeywords: ['digitalisation PME', 'automatisation PME', 'logiciel métier PME', 'application métier entreprise'],
    intent: 'Dirigeant de PME cherchant à moderniser ses outils et gagner en efficacité.',
    intro: ['La transformation digitale ne consiste pas à ajouter des outils au hasard. Elle doit améliorer vos opérations, réduire les frictions, centraliser les données et créer un avantage concret pour vos équipes et vos clients.', 'J’accompagne les PME dans la définition et le développement de solutions digitales utiles : logiciel métier, portail client, application mobile, automatisation, dashboard ou SaaS interne.', 'L’objectif est de prioriser les chantiers qui génèrent un retour mesurable au lieu de multiplier les projets techniques sans impact business.'],
    offer: ['Audit des processus et outils existants', 'Identification des gains rapides', 'Développement logiciel, web ou mobile', 'Automatisation et amélioration continue'],
    sections: [
      { heading: 'Prioriser les projets digitaux qui créent du ROI', body: ['Une PME n’a pas besoin de tout digitaliser immédiatement. Elle doit commencer par les processus qui coûtent le plus de temps, d’erreurs ou d’opportunités perdues.', 'La transformation digitale efficace part du terrain : équipes, clients, données, validations, documents, reporting et outils déjà utilisés.'] },
      { heading: 'Des solutions sur mesure plutôt que des outils empilés', body: ['Les logiciels standards peuvent être utiles, mais ils deviennent limitants lorsque vos règles métier sont spécifiques. Une solution sur mesure permet de créer un flux cohérent adapté à votre organisation.', 'Le développement peut commencer par un module simple puis évoluer vers une plateforme complète.'] },
      { heading: 'Un accompagnement produit, technique et business', body: ['Le rôle n’est pas seulement de développer. Il faut comprendre les enjeux métier, cadrer la feuille de route, sécuriser les choix techniques et faciliter l’adoption interne.', 'Chaque décision est orientée vers un objectif concret : gagner du temps, vendre plus, mieux piloter ou améliorer l’expérience client.'] },
    ],
    benefits: ['Gain de temps opérationnel', 'Réduction des erreurs', 'Outils adaptés à vos équipes', 'Meilleur pilotage dirigeant', 'Digitalisation progressive et maîtrisée'],
    process: ['Audit digital', 'Cartographie des irritants', 'Priorisation ROI', 'Développement par modules', 'Mesure et itérations'],
    faq: commonMobileFaq,
    cta: 'Lancer mon diagnostic transformation digitale',
  },
];

export const pricePages: SeoPage[] = [
  {
    slug: 'application-mobile',
    title: 'Prix application mobile : combien coûte une app iOS Android ?',
    description: 'Découvrez le prix d’une application mobile : MVP, app complète, marketplace, SaaS mobile, fonctionnalités, délais et facteurs de coût.',
    eyebrow: 'Budget application',
    h1: 'Prix application mobile : combien coûte la création d’une app ?',
    primaryKeyword: 'prix application mobile',
    secondaryKeywords: ['coût application mobile', 'devis application mobile', 'budget application iOS Android', 'prix MVP mobile'],
    intent: 'Prospect qui compare les budgets avant de demander un devis.',
    intro: ['Le prix d’une application mobile dépend du périmètre, des fonctionnalités, du design, du backend, des intégrations et du niveau de qualité attendu.', 'Une application simple n’a pas le même budget qu’une marketplace, un SaaS mobile ou une application métier avec back-office et paiements.', 'La bonne question n’est pas seulement “combien ça coûte”, mais “quelle première version permet de valider le marché sans gaspiller le budget”.'],
    offer: ['Estimation par périmètre fonctionnel', 'Découpage MVP puis V1', 'Identification des fonctionnalités coûteuses', 'Plan de développement par phases'],
    sections: [
      { heading: 'Les principaux facteurs de prix', body: ['Le budget varie selon le nombre d’écrans, l’authentification, la base de données, les paiements, la géolocalisation, les notifications, la messagerie, le mode offline, le back-office et la publication stores.', 'Le design, les tests, la sécurité et la maintenance doivent aussi être anticipés pour éviter les mauvaises surprises.'] },
      { heading: 'MVP, application complète ou plateforme avancée', body: ['Un MVP mobile vise à tester une promesse avec les fonctionnalités essentielles. Une application complète ajoute plus de parcours, d’automatisations et de robustesse.', 'Les marketplaces et SaaS mobiles demandent généralement plus de budget car elles combinent plusieurs rôles utilisateurs, paiements, permissions et administration.'] },
      { heading: 'Comment réduire le budget sans perdre en qualité', body: ['La meilleure stratégie consiste à prioriser. On développe d’abord ce qui prouve la valeur : inscription, parcours principal, paiement ou réservation, puis on ajoute les fonctionnalités secondaires après les premiers retours.', 'Cette méthode protège votre budget et accélère le lancement.'] },
    ],
    benefits: ['Budget clarifié', 'Périmètre priorisé', 'Moins de risque', 'Décision plus rapide'],
    process: ['Analyse de l’idée', 'Liste des fonctionnalités', 'Priorisation MVP', 'Estimation', 'Planning par phases'],
    faq: commonMobileFaq,
    cta: 'Obtenir une estimation personnalisée',
  },
  {
    slug: 'saas',
    title: 'Prix développement SaaS – Budget pour créer un logiciel en ligne',
    description: 'Estimez le prix d’un SaaS : MVP, abonnement, dashboard, paiement Stripe, back-office, rôles utilisateurs et maintenance.',
    eyebrow: 'Budget SaaS',
    h1: 'Prix développement SaaS : quel budget prévoir pour lancer un logiciel en ligne ?',
    primaryKeyword: 'prix développement SaaS',
    secondaryKeywords: ['coût SaaS', 'devis SaaS', 'budget MVP SaaS'],
    intent: 'Fondateur comparant les coûts de création d’un SaaS.',
    intro: ['Un SaaS coûte selon sa complexité fonctionnelle et commerciale.', 'Les rôles, abonnements, dashboards, facturation, intégrations et exigences de sécurité influencent fortement le budget.'],
    offer: ['Estimation MVP SaaS', 'Découpage par modules', 'Priorisation business', 'Plan d’évolution'],
    sections: [{ heading: 'Ce qui fait varier le prix', body: ['Les éléments les plus structurants sont l’authentification, le modèle multi-utilisateur, les abonnements, le reporting, les API et le back-office.', 'Un MVP vendable coûte moins cher qu’un SaaS complet mais doit rester fiable et crédible.'] }],
    benefits: ['Vision claire du budget', 'MVP vendable', 'Architecture évolutive', 'ROI mieux anticipé'],
    process: ['Cadrage', 'Fonctionnalités', 'Stack', 'Estimation', 'Roadmap'],
    faq: commonMobileFaq,
    cta: 'Estimer mon SaaS',
  },
  {
    slug: 'marketplace',
    title: 'Prix création marketplace – Budget, fonctionnalités et délais',
    description: 'Comprendre le coût d’une marketplace : comptes utilisateurs, paiement, commission, messagerie, avis, modération et back-office.',
    eyebrow: 'Budget marketplace',
    h1: 'Prix création marketplace : budget, fonctionnalités et délais',
    primaryKeyword: 'prix création marketplace',
    secondaryKeywords: ['coût marketplace', 'devis marketplace', 'budget plateforme marketplace'],
    intent: 'Porteur de projet marketplace cherchant un budget.',
    intro: ['Une marketplace est plus complexe qu’un site classique car elle gère plusieurs types d’utilisateurs et des transactions.', 'Le budget dépend du niveau de confiance, de paiement, de modération et d’automatisation attendu.'],
    offer: ['Cadrage modèle économique', 'MVP marketplace', 'Paiement et commission', 'Back-office de pilotage'],
    sections: [{ heading: 'Les modules qui impactent le budget', body: ['Comptes vendeurs, comptes acheteurs, catalogue, recherche, paiement, commission, litiges, avis, messagerie et modération sont les grands postes de coût.', 'Il est possible de lancer une première version plus simple pour valider l’offre et la demande.'] }],
    benefits: ['Périmètre maîtrisé', 'MVP transactionnel', 'Scalabilité', 'Meilleure visibilité des coûts'],
    process: ['Modèle marketplace', 'Rôles', 'MVP', 'Paiement', 'Lancement'],
    faq: commonMobileFaq,
    cta: 'Estimer ma marketplace',
  },
  {
    slug: 'site-web',
    title: 'Prix site web sur mesure – Site professionnel premium',
    description: 'Quel prix pour un site web professionnel sur mesure : design, SEO, performance, pages, contenus et conversion.',
    eyebrow: 'Budget site web',
    h1: 'Prix site web sur mesure : combien investir pour générer des clients ?',
    primaryKeyword: 'prix site web sur mesure',
    secondaryKeywords: ['coût site web professionnel', 'devis site internet', 'prix site vitrine premium'],
    intent: 'Client prêt à investir dans un site professionnel.',
    intro: ['Le prix d’un site dépend de son objectif : simple présence, acquisition SEO, crédibilité premium ou génération de leads.', 'Un site orienté conversion demande un vrai travail de positionnement, contenu, design et performance.'],
    offer: ['Arborescence SEO', 'Rédaction orientée conversion', 'Design premium', 'Développement performant'],
    sections: [{ heading: 'Ce qui influence le coût', body: ['Nombre de pages, niveau de design, rédaction, animations, SEO technique, formulaires, tracking et intégrations influencent le budget.', 'Le vrai enjeu est de construire un site qui rapporte plus qu’il ne coûte.'] }],
    benefits: ['Image premium', 'SEO', 'Leads', 'Performance'],
    process: ['Positionnement', 'Structure', 'Contenu', 'Design', 'Déploiement'],
    faq: commonMobileFaq,
    cta: 'Estimer mon site web',
  },
  {
    slug: 'logiciel-metier',
    title: 'Prix logiciel métier sur mesure – Budget PME et entreprise',
    description: 'Estimer le prix d’un logiciel métier sur mesure : modules, workflows, utilisateurs, intégrations, dashboard et maintenance.',
    eyebrow: 'Budget logiciel métier',
    h1: 'Prix logiciel métier sur mesure : combien prévoir pour digitaliser vos processus ?',
    primaryKeyword: 'prix logiciel métier',
    secondaryKeywords: ['coût logiciel sur mesure', 'devis logiciel métier', 'budget digitalisation PME'],
    intent: 'Dirigeant qui veut chiffrer une solution interne.',
    intro: ['Le prix dépend surtout du nombre de modules, de rôles utilisateurs, de workflows et d’intégrations.', 'La meilleure approche est progressive : commencer par le processus qui crée le plus de gain opérationnel.'],
    offer: ['Audit processus', 'Estimation par module', 'Priorisation ROI', 'Roadmap évolutive'],
    sections: [{ heading: 'Calculer le ROI avant le budget', body: ['Un logiciel métier doit réduire du temps, des erreurs ou des coûts. Le budget doit être comparé au gain opérationnel annuel.', 'Un premier module peut suffire pour générer rapidement un retour mesurable.'] }],
    benefits: ['ROI visible', 'Budget progressif', 'Adoption facilitée', 'Process automatisés'],
    process: ['Audit', 'Module prioritaire', 'Estimation', 'Développement', 'Mesure'],
    faq: commonMobileFaq,
    cta: 'Chiffrer mon logiciel métier',
  },
];

const frenchCities = ['paris', 'lyon', 'marseille', 'lille', 'bordeaux', 'toulouse', 'nantes', 'nice', 'strasbourg', 'montpellier'] as const;

const cityLabels: Record<(typeof frenchCities)[number], string> = {
  paris: 'Paris',
  lyon: 'Lyon',
  marseille: 'Marseille',
  lille: 'Lille',
  bordeaux: 'Bordeaux',
  toulouse: 'Toulouse',
  nantes: 'Nantes',
  nice: 'Nice',
  strasbourg: 'Strasbourg',
  montpellier: 'Montpellier',
};

const localizedFrancePages: SeoPage[] = frenchCities.flatMap((slug) => {
  const city = cityLabels[slug];
  const frPath = `/fr-fr/${slug}`;
  const enPath = `/en-fr/${slug}`;

  return [
    {
      slug,
      market: 'fr-fr',
      locale: 'fr',
      path: frPath,
      alternatePaths: { 'fr-FR': frPath, 'en-FR': enPath },
      title: `Développeur application mobile ${city} – SaaS, web et logiciel sur mesure`,
      description: `Développeur expert pour projets à ${city} : application mobile, SaaS, plateforme web, marketplace, logiciel métier et site professionnel orienté conversion.`,
      eyebrow: `France · ${city}`,
      h1: `Développeur application mobile à ${city} pour startups et PME`,
      primaryKeyword: `développeur application mobile ${city}`,
      secondaryKeywords: [`création application mobile ${city}`, `développement SaaS ${city}`, `développeur web freelance ${city}`, `logiciel métier ${city}`],
      intent: `Prospect localisé à ${city} cherchant un expert digital premium.`,
      intro: [
        `Vous cherchez un expert pour créer une application mobile, un SaaS, une marketplace, une plateforme web ou un logiciel métier à ${city} ?`,
        'J’accompagne les fondateurs, dirigeants et PME avec une approche directe, premium et orientée résultats : cadrage produit, développement technique, lancement et évolution.',
        'La collaboration peut se faire à distance avec des points réguliers, une roadmap claire et un accompagnement de bout en bout.',
      ],
      offer: ['Création application mobile iOS/Android', 'Développement SaaS et plateforme web', 'Marketplace et logiciel métier sur mesure', 'Site professionnel SEO et conversion'],
      sections: [
        { heading: `Un accompagnement digital premium à ${city}`, body: [`Les entreprises de ${city} ont besoin de solutions digitales capables d’aller vite sans sacrifier la qualité. L’objectif est de construire un produit utile, crédible et rentable.`, 'Chaque projet commence par un cadrage précis : cible, objectifs, parcours utilisateur, budget, fonctionnalités prioritaires et stratégie de lancement.'] },
        { heading: 'Freelance expert plutôt qu’une prestation impersonnelle', body: ['Vous échangez directement avec le développeur qui comprend le produit et prend les décisions techniques. Cette proximité accélère les arbitrages, limite les incompréhensions et améliore la qualité du résultat.', 'L’approche est adaptée aux startups, PME et porteurs de projet qui veulent un partenaire fiable, pas seulement un exécutant.'] },
        { heading: 'Applications, SaaS, plateformes et logiciels métier', body: ['Les projets peuvent inclure React Native, Next.js, backend, API, Firebase, Supabase, Stripe, dashboard admin, automatisations et intégrations IA.', 'Le choix technique dépend toujours de l’objectif business, du budget et de la trajectoire du produit.'] },
      ],
      benefits: ['Expertise mobile, web et SaaS', 'Collaboration à distance structurée', 'Vision produit et business', 'Développement sur mesure', 'Accompagnement long terme'],
      process: ['Appel de cadrage', 'Priorisation du périmètre', 'Estimation budget/délais', 'Développement', 'Lancement et suivi'],
      faq: commonMobileFaq,
      cta: `Discuter de mon projet à ${city}`,
    },
    {
      slug,
      market: 'en-fr',
      locale: 'en',
      path: enPath,
      alternatePaths: { 'fr-FR': frPath, 'en-FR': enPath },
      title: `Mobile App Developer in ${city} – SaaS, Web Platforms and Custom Software`,
      description: `Senior developer for projects in ${city}: mobile apps, SaaS products, web platforms, marketplaces, business software and conversion-focused websites.`,
      eyebrow: `France · ${city}`,
      h1: `Mobile app developer in ${city} for startups and growing companies`,
      primaryKeyword: `mobile app developer ${city}`,
      secondaryKeywords: [`mobile app development ${city}`, `SaaS developer ${city}`, `freelance web developer ${city}`, `custom software ${city}`],
      intent: `Founder or company based in ${city} looking for a premium digital product expert.`,
      intro: [
        `Looking for an expert to build a mobile app, SaaS product, marketplace, web platform or custom business software in ${city}?`,
        'I help founders, startups and companies turn ideas into reliable digital products with a direct, premium and business-oriented approach.',
        'The collaboration is structured for remote execution with clear milestones, product strategy, technical development and post-launch evolution.',
      ],
      offer: ['iOS and Android mobile app development', 'SaaS and custom web platform development', 'Marketplace and business software development', 'SEO and conversion-focused professional websites'],
      sections: [
        { heading: `Premium digital product development in ${city}`, body: [`Companies in ${city} need digital solutions that move fast without compromising quality. The goal is to build a product that is useful, credible and commercially effective.`, 'Every project starts with precise framing: target users, business goals, user journeys, budget, feature priorities and launch strategy.'] },
        { heading: 'A senior freelance partner, not an anonymous delivery team', body: ['You work directly with the person who understands the product, makes the technical decisions and builds the solution. This reduces friction and speeds up execution.', 'The approach is designed for founders and companies that need a reliable product partner, not just code delivery.'] },
        { heading: 'Mobile apps, SaaS, platforms and custom software', body: ['Projects may include React Native, Next.js, backend APIs, Firebase, Supabase, Stripe, admin dashboards, automation and AI integrations.', 'The technical stack is always chosen according to business goals, budget and long-term product trajectory.'] },
      ],
      benefits: ['Mobile, web and SaaS expertise', 'Structured remote collaboration', 'Product and business thinking', 'Custom development', 'Long-term product support'],
      process: ['Discovery call', 'Scope prioritization', 'Budget and timeline estimate', 'Development', 'Launch and iteration'],
      faq: [
        { question: 'Can you work with clients in France remotely?', answer: 'Yes. The process is built for remote collaboration with clear communication, regular updates and structured milestones.' },
        { question: 'Can you help define the MVP before development?', answer: 'Yes. Product framing, feature prioritization and technical risk assessment are part of the initial work.' },
        { question: 'Do you build both mobile and backend?', answer: 'Yes. A complete mobile or SaaS product can include frontend, backend, database, authentication, payments and admin dashboard.' },
      ],
      cta: `Discuss my project in ${city}`,
    },
  ];
});

const tunisianCities = ['tunis', 'sousse', 'sfax', 'ariana', 'la-marsa', 'nabeul', 'monastir', 'bizerte', 'hammamet', 'ben-arous', 'manouba', 'gabes', 'djerba', 'kairouan'] as const;

const tunisianCityLabels: Record<(typeof tunisianCities)[number], string> = {
  tunis: 'Tunis',
  sousse: 'Sousse',
  sfax: 'Sfax',
  ariana: 'Ariana',
  'la-marsa': 'La Marsa',
  nabeul: 'Nabeul',
  monastir: 'Monastir',
  bizerte: 'Bizerte',
  hammamet: 'Hammamet',
  'ben-arous': 'Ben Arous',
  manouba: 'Manouba',
  gabes: 'Gabès',
  djerba: 'Djerba',
  kairouan: 'Kairouan',
};

const localizedTunisiaPages: SeoPage[] = tunisianCities.flatMap((slug) => {
  const city = tunisianCityLabels[slug];
  const frPath = `/fr-tn/${slug}`;
  const enPath = `/en-tn/${slug}`;

  return [
    {
      slug,
      market: 'fr-tn',
      locale: 'fr',
      path: frPath,
      alternatePaths: { 'fr-TN': frPath, 'en-TN': enPath },
      title: `Développeur application mobile ${city} – SaaS, web et logiciel sur mesure`,
      description: `Développeur expert à ${city} pour applications mobiles, SaaS, plateformes web, marketplaces, logiciels métier et projets digitaux internationaux.`,
      eyebrow: `Tunisie · ${city}`,
      h1: `Développeur application mobile à ${city} pour startups, PME et projets internationaux`,
      primaryKeyword: `développeur application mobile ${city}`,
      secondaryKeywords: [`création application mobile ${city}`, `développement SaaS ${city}`, `développeur web ${city}`, `logiciel métier ${city}`, `freelance développeur ${city}`],
      intent: `Prospect à ${city} ou en Tunisie cherchant un développeur premium mobile, SaaS ou web.`,
      intro: [
        `Vous cherchez un développeur pour créer une application mobile, un SaaS, une marketplace, une plateforme web ou un logiciel métier à ${city} ?`,
        'J’accompagne les entrepreneurs, startups, PME et équipes internationales avec une approche produit, business et technique orientée lancement réel.',
        'La collaboration peut se faire à distance ou avec une proximité Tunisie/France, avec cadrage, estimation, développement, lancement et évolution long terme.',
      ],
      offer: ['Application mobile iOS/Android', 'SaaS et plateforme web sur mesure', 'Marketplace, dashboard et back-office', 'Logiciel métier et automatisation PME'],
      sections: [
        { heading: `Créer un produit digital sérieux à ${city}`, body: [`Le marché digital à ${city} évolue vite : entrepreneurs, commerces, services, startups et PME ont besoin d’outils fiables pour vendre, automatiser et fidéliser.`, 'L’objectif n’est pas de coder une simple vitrine, mais de construire un produit utile, rapide, crédible et capable d’évoluer.'] },
        { heading: 'Une approche premium adaptée au marché tunisien et international', body: ['La Tunisie permet de travailler avec une forte proximité francophone, une bonne culture technique et une collaboration efficace avec la France, l’Europe et les marchés internationaux.', 'Le cadrage évite les budgets mal utilisés : on priorise le MVP, les parcours critiques, la conversion et les fonctionnalités qui créent réellement de la valeur.'] },
        { heading: 'Mobile, SaaS, web, IA et logiciel métier', body: ['Les projets peuvent inclure React Native, Next.js, backend, API, authentification, paiements, notifications, géolocalisation, admin dashboard, automatisations et intégrations IA.', 'Le choix technique dépend toujours de l’objectif business, du budget, du délai et de la trajectoire du produit.'] },
      ],
      benefits: ['Positionnement local et international', 'Communication francophone directe', 'Expertise mobile, SaaS et web', 'Cadrage MVP pour maîtriser le budget', 'Accompagnement long terme'],
      process: ['Appel de cadrage', 'Définition MVP', 'Estimation budget/délais', 'Développement', 'Lancement et amélioration'],
      faq: commonMobileFaq,
      cta: `Discuter de mon projet à ${city}`,
    },
    {
      slug,
      market: 'en-tn',
      locale: 'en',
      path: enPath,
      alternatePaths: { 'fr-TN': frPath, 'en-TN': enPath },
      title: `Mobile App Developer in ${city} – SaaS, Web Platforms and Custom Software`,
      description: `Senior developer in ${city}, Tunisia for mobile apps, SaaS products, marketplaces, web platforms, custom software and international digital projects.`,
      eyebrow: `Tunisia · ${city}`,
      h1: `Mobile app developer in ${city} for startups, SMEs and international projects`,
      primaryKeyword: `mobile app developer ${city}`,
      secondaryKeywords: [`mobile app development ${city}`, `SaaS developer ${city}`, `web developer ${city}`, `custom software ${city}`, `freelance developer ${city}`],
      intent: `Founder or company looking for a premium mobile, SaaS or web developer in ${city}.`,
      intro: [
        `Looking for a developer to build a mobile app, SaaS product, marketplace, web platform or custom business software in ${city}?`,
        'I help founders, startups, SMEs and international teams turn ideas into reliable digital products with a product, business and technical approach.',
        'The collaboration is structured for remote execution, with clear scope, estimates, development milestones, launch support and long-term evolution.',
      ],
      offer: ['iOS and Android mobile app development', 'Custom SaaS and web platform development', 'Marketplace, dashboard and back-office development', 'Business software and SME automation'],
      sections: [
        { heading: `Building serious digital products in ${city}`, body: [`The digital market in ${city} is growing across startups, services, commerce, tourism, operations and B2B companies.`, 'The goal is not to ship a generic website, but to build a useful, credible and scalable product.'] },
        { heading: 'A premium approach for Tunisia and international markets', body: ['Tunisia offers strong technical talent, French-speaking collaboration and efficient remote work with Europe and international clients.', 'The process keeps the budget focused on the MVP, core user journeys, conversion and features that create real business value.'] },
        { heading: 'Mobile, SaaS, web, AI and custom software', body: ['Projects may include React Native, Next.js, backend APIs, authentication, payments, notifications, geolocation, admin dashboards, automation and AI integrations.', 'The technical stack is always selected according to business goals, budget, timeline and long-term product roadmap.'] },
      ],
      benefits: ['Local and international positioning', 'French and English collaboration', 'Mobile, SaaS and web expertise', 'MVP framing to control budget', 'Long-term product support'],
      process: ['Discovery call', 'MVP definition', 'Budget and timeline estimate', 'Development', 'Launch and iteration'],
      faq: [
        { question: 'Can you work with clients in Tunisia and abroad?', answer: 'Yes. The workflow is designed for remote collaboration with clear communication, regular updates and structured delivery milestones.' },
        { question: 'Can you help define the MVP before development?', answer: 'Yes. Product framing, feature prioritization, budget estimation and technical risk assessment are part of the process.' },
        { question: 'Do you build complete products?', answer: 'Yes. Projects can include mobile app, frontend, backend, database, authentication, payments, notifications and admin dashboard.' },
      ],
      cta: `Discuss my project in ${city}`,
    },
  ];
});

export const locationPages: SeoPage[] = [
  ...localizedFrancePages,
  ...localizedTunisiaPages,
  {
    slug: 'tunisie',
    market: 'fr-tn',
    locale: 'fr',
    path: '/fr-tn/tunisie',
    alternatePaths: { 'fr-TN': '/fr-tn/tunisie', 'en-TN': '/en-tn/tunisia' },
    title: 'Développeur application mobile Tunisie – SaaS, web et projets internationaux',
    description: 'Développeur expert en Tunisie pour projets France, Europe et international : application mobile, SaaS, plateforme web, marketplace et logiciel métier.',
    eyebrow: 'Tunisie · Marché francophone',
    h1: 'Développeur application mobile en Tunisie pour projets France et international',
    primaryKeyword: 'développeur application mobile Tunisie',
    secondaryKeywords: ['développement web Tunisie', 'création SaaS Tunisie', 'freelance développeur Tunisie', 'développeur offshore Tunisie'],
    intent: 'Prospect en Tunisie, France ou Europe cherchant un expert premium et compétitif.',
    intro: ['Vous cherchez un développeur en Tunisie capable de gérer un projet mobile, SaaS, web ou logiciel métier avec un niveau d’exigence international ?', 'J’accompagne les entrepreneurs, startups et PME avec une approche produit, business et technique adaptée aux projets France, Europe, Tunisie et international.', 'L’objectif est de combiner qualité, réactivité, communication directe et vision long terme.'],
    offer: ['Applications mobiles iOS/Android', 'SaaS et plateformes web', 'Marketplaces et logiciels métier', 'Accompagnement France, Europe et international'],
    sections: [
      { heading: 'Un pont entre la Tunisie, la France et l’international', body: ['La Tunisie offre un excellent positionnement pour accompagner des projets digitaux ambitieux avec une forte culture technique, une proximité francophone et une capacité à collaborer efficacement à distance.', 'L’enjeu n’est pas seulement le coût, mais la qualité d’exécution, la compréhension business et la fiabilité dans la durée.'] },
      { heading: 'Des produits digitaux conçus pour vendre et évoluer', body: ['Application mobile, SaaS, marketplace, logiciel métier ou plateforme web : chaque projet est cadré autour d’un objectif business clair.', 'La priorité est de lancer une solution crédible, maintenable et capable d’évoluer après les premiers retours utilisateurs.'] },
    ],
    benefits: ['Positionnement international', 'Communication francophone', 'Expertise mobile, SaaS et web', 'Collaboration structurée', 'Rapport qualité/exécution compétitif'],
    process: ['Appel de cadrage', 'Périmètre MVP', 'Estimation', 'Développement', 'Lancement'],
    faq: commonMobileFaq,
    cta: 'Discuter de mon projet en Tunisie',
  },
  {
    slug: 'tunisia',
    market: 'en-tn',
    locale: 'en',
    path: '/en-tn/tunisia',
    alternatePaths: { 'fr-TN': '/fr-tn/tunisie', 'en-TN': '/en-tn/tunisia' },
    title: 'Mobile App Developer Tunisia – SaaS, Web and International Projects',
    description: 'Senior developer in Tunisia for France, Europe and international projects: mobile apps, SaaS platforms, marketplaces, web platforms and business software.',
    eyebrow: 'Tunisia · International market',
    h1: 'Mobile app developer in Tunisia for France, Europe and international projects',
    primaryKeyword: 'mobile app developer Tunisia',
    secondaryKeywords: ['web development Tunisia', 'SaaS developer Tunisia', 'freelance developer Tunisia', 'offshore developer Tunisia'],
    intent: 'Founder or company looking for a senior Tunisia-based developer with international execution standards.',
    intro: ['Looking for a developer in Tunisia who can build a mobile app, SaaS product, marketplace, web platform or custom business software with international standards?', 'I help founders, startups and companies in Tunisia, France, Europe and abroad turn ideas into reliable digital products.', 'The focus is quality, speed, direct communication and long-term product thinking.'],
    offer: ['iOS and Android mobile apps', 'SaaS and web platforms', 'Marketplaces and custom software', 'France, Europe and international collaboration'],
    sections: [
      { heading: 'A strong bridge between Tunisia, France and international markets', body: ['Tunisia is a strong base for ambitious digital projects thanks to technical talent, French-speaking collaboration and efficient remote execution.', 'The objective is not only competitive pricing, but senior-level product thinking, reliability and long-term maintainability.'] },
      { heading: 'Digital products designed to sell and scale', body: ['Mobile apps, SaaS platforms, marketplaces, web products and internal tools are framed around clear business goals.', 'The priority is to launch a credible, maintainable and scalable first version that can evolve based on real user feedback.'] },
    ],
    benefits: ['International positioning', 'French and English collaboration', 'Mobile, SaaS and web expertise', 'Structured remote process', 'Strong quality-to-execution ratio'],
    process: ['Discovery call', 'MVP scope', 'Estimate', 'Development', 'Launch'],
    faq: [
      { question: 'Can you work with clients in Europe and internationally?', answer: 'Yes. The workflow is structured for remote international collaboration with clear communication and delivery milestones.' },
      { question: 'Do you build complete products?', answer: 'Yes. Projects can include mobile apps, frontend, backend, database, payments, admin dashboard and integrations.' },
      { question: 'Can you help with strategy before development?', answer: 'Yes. Product strategy, MVP definition, technical architecture and prioritization are part of the process.' },
    ],
    cta: 'Discuss my Tunisia-based project',
  },
];

export const allSeoPages = [...servicePages, ...pricePages, ...locationPages];

export function findSeoPage(collection: SeoPage[], slug: string) {
  return collection.find((page) => page.slug === slug);
}

export function findLocalizedPage(market: string, slug: string) {
  return locationPages.find((page) => page.market === market && page.slug === slug);
}
