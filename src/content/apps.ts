/**
 * Les 8 applications publiées sur l'App Store.
 *
 * SOURCE DE VÉRITÉ : API iTunes Lookup, relevée le 19 septembre 2026.
 * Chaque champ factuel (prix, date, version, taille, iOS minimum) vient de
 * la fiche App Store réelle. Les descriptions sont reformulées à partir du
 * texte de la fiche, jamais inventées.
 *
 * RÈGLE : aucune note, aucun téléchargement, aucun revenu n'est affiché.
 * Les 8 apps totalisent 6 notes réelles (1, 2 et 3 sur trois apps, 0 sur les
 * cinq autres). Afficher « 5/5 » sur un effectif pareil tromperait le lecteur.
 */

export type App = {
  slug: string;
  nom: string;
  nomCourt: string;
  baseline: string;
  /** La même promesse, écrite en anglais et non traduite mot à mot. */
  baselineEn: string;
  categorie: string;
  /** La catégorie telle qu'Apple la nomme sur l'App Store anglophone. */
  categoryEn: string;
  appStoreId: string;
  appStoreUrl: string;
  /** Date de première mise en ligne sur l'App Store (ISO). */
  sortie: string;
  version: string;
  /** Date de la dernière mise à jour publiée (ISO). */
  majLe: string;
  prix: string;
  tailleMo: number;
  iosMini: string;
  langues: string[];
  icone: string;
  captures: string[];
  /** Ce que l'app résout, en une phrase. */
  probleme: string;
  /** Pour qui. */
  pourQui: string;
  /** Les briques techniques réellement présentes dans l'app. */
  technique: string[];
  /** La pile technique. */
  stack: string[];
  /** Ce que ce projet démontre, côté compétence. */
  demontre: string[];
  /** Le fait saillant, celui qu'on retient. */
  saillant: string;
  /**
   * Ce qui s'est passé après la mise en ligne : un défaut remonté par les
   * utilisateurs, l'arbitrage retenu, et comment on sait qu'il tient.
   * Optionnel : ne se remplit que sur un fait public et vérifiable.
   */
  apresPublication?: {
    /** Le problème tel qu'il s'est manifesté chez les utilisateurs. */
    constat: string;
    /** La décision prise, et ce qu'elle coûte. */
    decision: string;
    /** Ce qui permet d'affirmer que c'est réglé. */
    verification: string;
  };
  /** Site officiel du produit, s'il existe. */
  site?: string;
};

export const apps: App[] = [
  {
    slug: 'ticket',
    nom: 'Ticket · Horodateur & Parking',
    nomCourt: 'Ticket',
    baseline: 'Vous vous garez, vous touchez une durée. C’est tout.',
    baselineEn: 'You park, you tap a duration. That is all.',
    categorie: 'Navigation',
    categoryEn: 'Navigation',
    appStoreId: '6803202760',
    appStoreUrl: 'https://apps.apple.com/fr/app/id6803202760',
    sortie: '2026-09-02',
    version: '1.0',
    majLe: '2026-09-02',
    prix: 'Gratuit, avec option payante',
    tailleMo: 3.3,
    iosMini: '18.0',
    langues: ['Français', 'Anglais'],
    icone: '/assets/apps/ticket.webp',
    captures: [
      '/assets/shots/ticket-1.webp',
      '/assets/shots/ticket-2.webp',
      '/assets/shots/ticket-3.webp',
      '/assets/shots/ticket-4.webp',
    ],
    probleme:
      'Ne plus dépasser son temps de stationnement. On touche une durée en se garant, le compte à rebours vit hors de l’application et prévient avant l’échéance.',
    pourQui:
      'Automobilistes qui se garent à l’horodateur ou en parking, sans vouloir créer de compte.',
    technique: [
      'Live Activity native en Swift : le compte à rebours vit dans la Dynamic Island et sur l’écran verrouillé',
      'Boutons « +15 min », « +30 min » et « Je repars » actionnables depuis l’écran verrouillé, via App Intents',
      'Bouton dans le Centre de contrôle : démarrer un stationnement sans déverrouiller le téléphone',
      'Démarrage par Siri et par tag NFC collé au tableau de bord',
      'Rappels qui traversent les modes de concentration, et qui fonctionnent en mode avion',
      'Retour à la voiture : position, niveau de parking, photo de la place, flèche boussole, repères même sans GPS en souterrain',
      'Aucun serveur, aucun compte : photos et positions chiffrées par iOS et exclues de la sauvegarde iCloud',
      'Compatible VoiceOver, grandes tailles de texte et mode sombre',
    ],
    stack: ['Swift', 'SwiftUI', 'ActivityKit', 'App Intents', 'WidgetKit', 'StoreKit'],
    demontre: [
      'Choisir la pile au lieu de la subir : tout se passant hors de l’application, celle-ci est écrite entièrement en Swift',
      'Maîtriser les intégrations système iOS les plus récentes : Dynamic Island, Centre de contrôle, App Intents',
      'Tenir 3,3 Mo, quand l’app moyenne du lot en pèse dix fois plus',
    ],
    saillant:
      'L’application la plus légère du lot : 3,3 Mo, pour un produit qui pilote la Dynamic Island, le Centre de contrôle, Siri et le NFC.',
  },
  {
    slug: 'pilou',
    nom: 'Pilou · Carnet de santé animal',
    nomCourt: 'Pilou',
    baseline: 'Le carnet de santé du chien ou du chat, toujours dans la poche.',
    baselineEn: 'Your dog or cat’s health record, always in your pocket.',
    categorie: 'Style de vie',
    categoryEn: 'Lifestyle',
    appStoreId: '6803716462',
    appStoreUrl: 'https://apps.apple.com/fr/app/id6803716462',
    sortie: '2026-08-24',
    version: '1.0',
    majLe: '2026-08-24',
    prix: 'Gratuit, avec option payante',
    tailleMo: 7.3,
    iosMini: '18.0',
    langues: ['Français', 'Anglais'],
    icone: '/assets/apps/pilou.webp',
    captures: [
      '/assets/shots/pilou-1.webp',
      '/assets/shots/pilou-2.webp',
      '/assets/shots/pilou-3.webp',
      '/assets/shots/pilou-4.webp',
    ],
    probleme:
      'Le carnet papier de l’animal finit au fond d’un tiroir, et la question tombe pile chez le vétérinaire : « son dernier rappel, c’était quand ? »',
    pourQui:
      'Propriétaires de chiens et de chats en France : calendrier vaccinal et centres antipoison français.',
    technique: [
      'Vaccins et vermifuges calés sur le calendrier habituel en France, au rythme conseillé selon l’âge',
      'Poids avec courbe et tendance ; journal des observations (appétit, boisson, selles, boiterie) avec courbes',
      'Notifications programmées localement : elles fonctionnent hors ligne',
      'Widget d’accueil avec la tête de l’animal et son programme du jour',
      'Export PDF : carnet complet pour le vétérinaire, fiche de garde pour les vacances, fiche d’urgence en gros caractères',
      'Centres antipoison vétérinaires français avec horaires et coût de l’appel, aliments et plantes toxiques',
      'Aucun serveur, aucun compte, aucun traqueur : la fiche App Store invite à le vérifier en mode avion',
    ],
    stack: ['Swift', 'SwiftUI', 'SwiftData', 'WidgetKit', 'Swift Charts', 'StoreKit'],
    demontre: [
      'Concevoir un modèle de données médical avec des règles métier réelles (calendrier vaccinal français)',
      'Générer des PDF exploitables depuis une application mobile',
      'Assumer une architecture sans serveur jusqu’au bout, et la rendre vérifiable par l’utilisateur',
    ],
    saillant:
      'Zéro serveur, et c’est vérifiable : la fiche invite l’utilisateur à passer en mode avion pour constater que tout continue de fonctionner.',
  },
  {
    slug: 'amiens-bus-velam',
    nom: 'Amiens · Bus & Vélam',
    nomCourt: 'Amiens',
    baseline: 'Il pleut, vous êtes à l’arrêt, vous voulez une réponse tout de suite.',
    baselineEn: 'It is raining, you are at the stop, you want an answer now.',
    categorie: 'Navigation',
    categoryEn: 'Navigation',
    appStoreId: '6802407427',
    appStoreUrl: 'https://apps.apple.com/fr/app/id6802407427',
    sortie: '2026-08-18',
    version: '1.3.1',
    majLe: '2026-09-08',
    prix: 'Gratuit, avec achat unique',
    tailleMo: 36.5,
    iosMini: '15.1',
    langues: ['Français'],
    icone: '/assets/apps/bus-amiens.webp',
    captures: [
      '/assets/shots/amiens-1.webp',
      '/assets/shots/amiens-2.webp',
      '/assets/shots/amiens-3.webp',
      '/assets/shots/amiens-4.webp',
    ],
    probleme:
      'Savoir tout de suite quand passe son bus à Amiens, et où en sont les vélos Vélam, sans chercher dans une application générique.',
    pourQui: 'Usagers quotidiens du réseau de bus d’Amiens et du service de vélos Vélam.',
    technique: [
      'Fiche horaire complète embarquée dans l’application : elle fonctionne sans réseau',
      'Trajets réguliers classés selon l’heure et le jour : l’aller le matin, le retour le soir',
      'Les 42 lignes, leurs deux sens, et les bus à leur position réelle sur le tracé',
      'Passages séparés par ligne et par sens, jamais mélangés',
      'Correspondances en un seul changement, uniquement celles qui existent à la fiche horaire',
      'Live Activity, widget toutes tailles, application Apple Watch et raccourci Siri',
      'Pluie annoncée croisée avec l’heure du bus, via Open-Meteo et le modèle AROME',
      'Données ouvertes transport.data.gouv.fr sous Licence Ouverte 2.0',
    ],
    stack: [
      'React Native',
      'TypeScript',
      'GTFS',
      'SwiftUI (Watch)',
      'ActivityKit',
      'Données ouvertes',
    ],
    demontre: [
      'Ingérer et exploiter un jeu de données ouvert normalisé (GTFS) et le rendre utilisable hors ligne',
      'Porter une expérience sur trois surfaces : iPhone, Apple Watch et écran verrouillé',
      'Dire la vérité au lecteur : quand le temps réel manque, l’horaire théorique s’affiche et c’est signalé',
    ],
    saillant:
      'Construite sur les données ouvertes du réseau, sans dépendre d’une API privée, et honnête sur ses propres limites.',
    apresPublication: {
      constat:
        'Après la mise en ligne, des utilisateurs ont reçu beaucoup trop de notifications : l’alerte se redéclenchait à chaque passage de bus de la plage horaire au lieu de sonner une fois. Un second défaut est apparu en déplacement : les alertes suivaient le fuseau du téléphone, et non l’heure d’Amiens.',
      decision:
        'Une alerte ne sonne plus qu’une seule fois par plage, avant le premier bus, et affiche l’heure du suivant plutôt que de resonner pour lui. Les horaires d’alerte sont ancrés sur l’heure d’Amiens, quel que soit le fuseau du téléphone. Le compromis est assumé : on perd le rappel pour un bus plus tardif dans la même plage, au profit d’une notification qu’on ne coupe pas.',
      verification:
        'Correctif publié dans la version 1.3.1 le 8 septembre 2026, et décrit dans les notes de version de la fiche App Store.',
    },
    site: undefined,
  },
  {
    slug: 'cocomind',
    nom: 'CocoMind · Assistant vocal',
    nomCourt: 'CocoMind',
    baseline: 'Une pensée vous traverse l’esprit. Vous appuyez, vous parlez. C’est rangé.',
    baselineEn: 'A thought crosses your mind. You press, you speak. It is filed.',
    categorie: 'Productivité',
    categoryEn: 'Productivity',
    appStoreId: '6795916609',
    appStoreUrl: 'https://apps.apple.com/fr/app/id6795916609',
    sortie: '2026-08-14',
    version: '1.0.1',
    majLe: '2026-08-20',
    prix: 'Gratuit, avec abonnement',
    tailleMo: 65.2,
    iosMini: '15.1',
    langues: ['Français', 'Anglais'],
    icone: '/assets/apps/cocomind.webp',
    captures: [
      '/assets/shots/cocomind-1.webp',
      '/assets/shots/cocomind-2.webp',
      '/assets/shots/cocomind-3.webp',
      '/assets/shots/cocomind-4.webp',
    ],
    probleme:
      'Capturer une pensée sans friction. Pas de formulaire, pas de catégorie à choisir : on parle, et l’assistant range au bon endroit avec la bonne date.',
    pourQui:
      'Toute personne qui veut un second cerveau vocal pour ses tâches, habitudes, projets, notes et rendez-vous.',
    technique: [
      'Capture vocale en un appui : transcription, puis compréhension de l’intention par un modèle de langage',
      'L’assistant distingue une tâche d’une habitude, un projet d’une note, un rendez-vous d’un rappel',
      'Récurrences complexes (« le premier mardi de chaque mois ») et échéances relatives (« dans trois semaines »)',
      'Génération de contenu réel : une recette, un plan d’action, une méthode, rédigés puis classés au bon endroit',
      'Widgets, Dynamic Island et notifications intelligentes',
      'Corbeille récupérable 30 jours et synchronisation entre appareils',
      'Quotas et garde-fous côté serveur : le coût d’un appel au modèle est borné avant d’être facturé',
    ],
    stack: ['React Native', 'TypeScript', 'Firebase', 'Cloud Functions', 'Swift', 'Kotlin', 'LLM'],
    demontre: [
      'Intégrer un modèle de langage dans un produit grand public, avec des garde-fous de coût et de quota',
      'Transformer une intention exprimée en langage naturel en objet structuré et daté',
      'Tenir la même expérience sur iOS et Android avec des modules natifs des deux côtés',
    ],
    saillant:
      'Publiée sous le nom MindDrop pendant son développement, puis renommée CocoMind. Le modèle ne se contente pas de ranger : il rédige.',
  },
  {
    slug: 'qindil',
    nom: 'Qindil · قنديل',
    nomCourt: 'Qindil',
    baseline: 'Une app musulmane pensée en français, gratuite, sans compte et sans serveur.',
    baselineEn: 'A Muslim app written in French. Free, no account, no server.',
    categorie: 'Style de vie',
    categoryEn: 'Lifestyle',
    appStoreId: '6799055303',
    appStoreUrl: 'https://apps.apple.com/fr/app/id6799055303',
    sortie: '2026-08-20',
    version: '1.0',
    majLe: '2026-08-20',
    prix: 'Gratuit',
    tailleMo: 65,
    iosMini: '15.1',
    langues: ['Français', 'Anglais'],
    icone: '/assets/apps/qindil.webp',
    captures: [
      '/assets/shots/qindil-1.webp',
      '/assets/shots/qindil-2.webp',
      '/assets/shots/qindil-3.webp',
      '/assets/shots/qindil-4.webp',
    ],
    probleme:
      'Offrir aux musulmans francophones une application de pratique quotidienne (prières, Coran, dhikr) sans compte, sans publicité et sans serveur.',
    pourQui: 'Musulmans francophones. L’arabe est présent à côté du français sur chaque écran.',
    technique: [
      'Horaires des cinq prières calculés sur l’appareil : la position enregistrée ne quitte jamais le téléphone',
      'Sept méthodes de calcul, choix de l’école pour Asr, ajustements fins par prière',
      'Adhan à l’heure même application fermée, widget et Live Activity sur l’écran verrouillé',
      'Coran complet en texte uthmanien (projet Tanzil, écriture du Complexe du Roi Fahd) et traduction française',
      'Récitation suivie mot à mot avec surlignage du verset, téléchargeable pour l’écoute hors ligne',
      'Dhikr sourcé avec références (Hisn al-Muslim, 99 noms selon Tirmidhî), tasbih',
      'Calendrier hijri, qibla, mode Ramadan, mode dispense',
      'Application Apple Watch',
    ],
    stack: ['React Native', 'TypeScript', 'Audio natif', 'SwiftUI (Watch)', 'ActivityKit'],
    demontre: [
      'Traiter un contenu à forte exigence de rigueur : sources citées, écriture normée, traduction vérifiée',
      'Gérer l’arabe et le français côte à côte, écriture de droite à gauche comprise',
      'Synchroniser un audio avec un texte, mot à mot, hors ligne',
    ],
    saillant:
      'Aucun serveur : la position ne quitte jamais l’appareil. La seule connexion sortante de toute l’application est le téléchargement des récitations.',
  },
  {
    slug: 'isogonic',
    nom: 'Isogonic · Calculateur de vol',
    nomCourt: 'Isogonic',
    baseline: 'Un E6B pour les pilotes qui veulent comprendre le chiffre, pas seulement le lire.',
    baselineEn: 'An E6B for pilots who want to understand the number, not just read it.',
    categorie: 'Éducation',
    categoryEn: 'Education',
    appStoreId: '6799470430',
    appStoreUrl: 'https://apps.apple.com/fr/app/id6799470430',
    sortie: '2026-08-13',
    version: '1.0',
    majLe: '2026-08-13',
    prix: '17,99 € · achat unique',
    tailleMo: 28.2,
    iosMini: '16.0',
    langues: ['Anglais'],
    icone: '/assets/apps/isogonic.webp',
    captures: [
      '/assets/shots/isogonic-1.webp',
      '/assets/shots/isogonic-2.webp',
      '/assets/shots/isogonic-3.webp',
      '/assets/shots/isogonic-4.webp',
    ],
    probleme:
      'Donner aux pilotes un calculateur de vol qui montre son raisonnement, avec une masse et centrage traitée sérieusement là où les concurrents l’ont abandonnée.',
    pourQui: 'Pilotes en préparation de checkride et en vol réel, sur le référentiel FAA/ACS.',
    technique: [
      'Masse et centrage : tracé de l’enveloppe, et suivi du centre de gravité sur toute la consommation carburant, en courbe et non en segment',
      'Lecture des deux conventions d’enveloppe, livres-pouces ou kilos-millimètres',
      '« Show the work » : chaque entrée, chaque valeur intermédiaire, la formule, et la règle empirique avec son erreur exacte',
      'Attente : trajectoire air et trajectoire sol superposées, entrée déduite du cap',
      'Constantes atmosphériques dérivées des premiers principes, zéro exact d’altitude densité en conditions ISA',
      'Plus de 25 calculs : triangle des vents, Mach, PNR, ETP, TOD, interpolation de tables POH',
      'Clavier maison, jamais le clavier système ; la touche déclenche au relâchement, contre les turbulences',
      'Mode nuit plus profond que le mode sombre du système ; portrait et paysage traités à égalité, à cause des lunettes polarisées',
    ],
    stack: ['React Native', 'TypeScript', 'Calcul hors ligne'],
    demontre: [
      'Implémenter un domaine de calcul exigeant, vérifiable, où une erreur d’arrondi se voit',
      'Concevoir une interface pour un contexte hostile : turbulences, lunettes polarisées, vol de nuit',
      'Assumer un positionnement premium en achat unique, sans abonnement',
    ],
    saillant:
      'Zéro appel réseau, jamais, pas même au premier lancement : l’application fonctionne à zéro barre, ce qui est la condition pour être utilisable en vol.',
  },
  {
    slug: 'forgeme',
    nom: 'ForgeMe · Organisation personnelle',
    nomCourt: 'ForgeMe',
    baseline: 'Objectifs, tâches, habitudes, journal et projets au même endroit.',
    baselineEn: 'Goals, tasks, habits, journal and projects in one place.',
    categorie: 'Productivité',
    categoryEn: 'Productivity',
    appStoreId: '6760335253',
    appStoreUrl: 'https://apps.apple.com/fr/app/id6760335253',
    sortie: '2026-08-07',
    version: '1.1.2',
    majLe: '2026-09-10',
    prix: 'Gratuit',
    tailleMo: 64,
    iosMini: '15.1',
    langues: ['Anglais'],
    icone: '/assets/apps/forgeme.webp',
    captures: [
      '/assets/shots/forgeme-1.webp',
      '/assets/shots/forgeme-2.webp',
      '/assets/shots/forgeme-3.webp',
      '/assets/shots/forgeme-4.webp',
    ],
    probleme:
      'Centraliser l’organisation personnelle : tâches, habitudes, objectifs, notes et journal dans un seul espace, au lieu de cinq applications séparées.',
    pourQui:
      'Personnes qui cherchent à gagner en productivité ou à construire des habitudes durables.',
    technique: [
      'Tâches quotidiennes, rituels et habitudes, objectifs avec suivi de progression',
      'Notes d’idées et journal personnel',
      'Visualisation des progrès dans le temps',
      'Synchronisation entre tous les appareils',
      'Écosystème complet : application mobile, interface web et back-office',
    ],
    stack: ['React Native', 'React', 'Firebase', 'Firestore', 'Cloud Functions', 'Node.js'],
    demontre: [
      'Tenir un périmètre imposé, avec son calendrier et ses arbitrages',
      'Tenir un écosystème complet : mobile, web et fonctions serveur',
      'Assurer le suivi après la mise en ligne : l’application a été mise à jour un mois après sa sortie',
    ],
    saillant:
      'Le projet le plus large de cette sélection : mobile, web et back-office, maintenu après la mise en ligne.',
    site: 'https://forgeme.net/fr',
  },
  {
    slug: 'ose-plus',
    nom: 'Ose+',
    nomCourt: 'Ose+',
    baseline: 'Le jeu social qui anime une soirée entre amis.',
    baselineEn: 'A social party game for a night in with friends.',
    categorie: 'Divertissement',
    categoryEn: 'Entertainment',
    appStoreId: '6752605468',
    appStoreUrl: 'https://apps.apple.com/fr/app/id6752605468',
    sortie: '2025-09-25',
    version: '1.0.0',
    majLe: '2025-09-25',
    prix: 'Gratuit, avec option payante',
    tailleMo: 43.2,
    iosMini: '15.1',
    langues: ['Anglais'],
    icone: '/assets/apps/ose.webp',
    captures: [
      '/assets/shots/ose-1.webp',
      '/assets/shots/ose-2.webp',
      '/assets/shots/ose-3.webp',
      '/assets/shots/ose-4.webp',
    ],
    probleme: 'Animer une soirée entre amis : des défis et des questions pour briser la glace.',
    pourQui: 'Groupes d’amis, apéros et soirées. Classée 12+.',
    technique: [
      'Nombre de joueurs illimité',
      'Plusieurs catégories de défis, mélangeables',
      'Contenu ajouté régulièrement',
      'Mode premium qui débloque des catégories supplémentaires',
    ],
    stack: ['React Native', 'TypeScript'],
    demontre: [
      'La première traversée complète de la chaîne : compte développeur, signature, revue Apple, mise en vente',
      'C’est l’application qui m’a appris ce qu’Apple regarde vraiment en revue',
    ],
    saillant:
      'Ma première application publiée, en septembre 2025. Les sept suivantes sont toutes sorties un an plus tard, entre le 7 août et le 2 septembre 2026.',
  },
];

/** Toutes les applications publiées, sans distinction d'origine. */
export const appsPersonnelles = apps;

export function appParSlug(slug: string): App | undefined {
  return apps.find((a) => a.slug === slug);
}

/** Formate une date ISO en anglais : « 2 September 2026 ». */
export function dateEn(iso: string): string {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${months[m - 1]} ${y}`;
}

/** Formate une date ISO en français long : « 2 septembre 2026 ». */
export function dateFr(iso: string): string {
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
