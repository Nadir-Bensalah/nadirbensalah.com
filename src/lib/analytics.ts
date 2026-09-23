'use client';

/**
 * La mesure d'audience, en une seule couche : PostHog, hébergé dans l'UE.
 *
 * Ce fichier remplace l'ancienne couche neutre (Plausible ou GA4, jamais
 * branchés) qui déclarait dix-huit événements dont cinq n'étaient envoyés
 * nulle part, et dont l'attribution ne fonctionnait que sur mobile et sur
 * l'accueil. Tout ce qui part vers PostHog passe par ici.
 *
 * Quatre règles, qui priment sur toute envie de mesurer davantage :
 *
 * 1. Aucune donnée personnelle. Jamais le contenu d'un champ, jamais une
 *    adresse, jamais un numéro. `form_error` envoie le NOM du champ en erreur,
 *    pas sa valeur. Un dernier filtre (`nettoie`) remplace de toute façon
 *    toute valeur qui ressemble à un e-mail ou à un téléphone.
 * 2. Aucun cookie et aucun stockage durable : PostHog garde son identifiant
 *    dans le sessionStorage, effacé à la fermeture de l'onglet. Un visiteur
 *    qui revient demain est un nouveau visiteur, c'est le prix assumé.
 * 3. Un lead n'est compté qu'une fois l'envoi CONFIRMÉ par le service
 *    d'envoi. Jamais au clic sur « Envoyer ».
 * 4. Peu d'événements, chacun lié à une décision. La navigation est décrite
 *    par les pages vues automatiques ; les événements nommés ne servent qu'à
 *    ce que la page vue ne dit pas.
 */

import type { CaptureResult, PostHog, Properties } from 'posthog-js';

/* ------------------------------------------------------------------------ */
/* Configuration                                                            */
/* ------------------------------------------------------------------------ */

/**
 * Clé de projet PostHog. Elle est publique par nature : elle voyage dans le
 * code envoyé à chaque navigateur, et ne permet que d'ENVOYER des événements,
 * jamais d'en lire. Une variable d'environnement peut la remplacer.
 */
const CLE_POSTHOG =
  process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_yiL6ushuLpAKseqNyjgr92fnyUPXbeBKrUgFs7BeZ8L2';

/** Point d'ingestion européen (Francfort). */
const HOTE_POSTHOG = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com';

/** Interrupteur général : `NEXT_PUBLIC_MESURE=off` coupe toute mesure. */
export const MESURE_ACTIVE = process.env.NEXT_PUBLIC_MESURE !== 'off' && Boolean(CLE_POSTHOG);

/**
 * Part des sessions enregistrées en replay. Toutes, tant que le trafic est
 * faible : chaque session compte, et l'offre gratuite couvre 5 000
 * enregistrements par mois. À baisser vers 0,5 au-delà de 3 000 sessions.
 */
export const TAUX_REPLAY = 1;

/* ------------------------------------------------------------------------ */
/* Le dictionnaire                                                          */
/* ------------------------------------------------------------------------ */

/**
 * Tous les événements nommés du site. Les pages vues ($pageview) et les
 * sorties de page ($pageleave) sont capturées automatiquement par PostHog.
 */
export const EVENEMENTS = {
  /** Le visiteur choisit une des trois portes de l'accueil. */
  intention: 'intent_select',
  /** Clic sur un appel à l'action interne, ou sur tout lien vers le contact. */
  cta: 'cta_click',
  /** Téléchargement du CV. */
  cv: 'cv_download',
  /** Sortie vers une fiche App Store ou la page développeur. */
  appStore: 'app_store_click',
  /** Clic sur l'adresse e-mail ou le numéro de téléphone. */
  contactDirect: 'contact_click',
  /** Sortie vers GitHub, LinkedIn, Capmedia ou le site d'un produit. */
  sortie: 'outbound_click',
  /** Premier caractère saisi dans un formulaire. */
  formulaireCommence: 'form_start',
  /** Clic sur « Envoyer », avant validation. */
  formulaireTentative: 'form_submit_attempt',
  /** La validation a refusé l'envoi. */
  formulaireErreur: 'form_error',
  /** Le service d'envoi a échoué : réseau, refus, réponse inattendue. */
  formulaireEchec: 'form_submit_failed',
  /** La messagerie du visiteur a été ouverte à la place d'un envoi direct. */
  formulaireMessagerie: 'form_mailto_fallback',
  /** LEAD : message de contact reçu, confirmé par le service d'envoi. */
  leadContact: 'submit_contact',
  /** LEAD : problème soumis via /challenge, confirmé par le service d'envoi. */
  leadChallenge: 'challenge_submit',
  /** Profondeur de lecture, secondaire : 50 puis 90 % d'une page de contenu. */
  defilement: 'scroll_depth',
} as const;

export type NomEvenement = (typeof EVENEMENTS)[keyof typeof EVENEMENTS];

type Valeur = string | number | boolean | null | undefined | string[];
export type Proprietes = Record<string, Valeur>;

/* ------------------------------------------------------------------------ */
/* Le contexte d'une page                                                   */
/* ------------------------------------------------------------------------ */

export type Intention = 'recruteur' | 'projet' | 'portfolio';

type ContextePage = {
  page_type: string;
  langue: 'fr' | 'en';
  /** L'étude de cas, le guide ou l'article consulté. */
  contenu_id?: string;
  /** L'intention qu'une page révèle quand le visiteur ne l'a pas déclarée. */
  signal?: Intention;
};

/**
 * Chaque chemin rangé dans un type de page, pour comparer des familles de
 * pages plutôt que trente-quatre adresses. Le type sert aussi à déduire
 * l'intention d'un visiteur qui n'a pas cliqué sur les portes de l'accueil.
 */
export function contextePage(chemin: string): ContextePage {
  const p = (chemin.replace(/\.html$/, '').replace(/\/+$/, '') || '/').toLowerCase();
  const en = p === '/en' || p.startsWith('/en/');
  const langue = en ? 'en' : 'fr';
  const sous = en ? p.slice(3) || '/' : p;
  const [premier, second] = sous.split('/').filter(Boolean);

  // Le 404 est servi à l'adresse demandée : seule la page elle-même le sait.
  if (typeof document !== 'undefined' && document.querySelector('[data-page-404]')) {
    return { page_type: 'erreur_404', langue };
  }

  if (sous === '/') return { page_type: 'accueil', langue };

  if (en) {
    if (premier === 'blog') {
      return second
        ? { page_type: 'guide', langue, contenu_id: second }
        : { page_type: 'guides', langue };
    }
    const table: Record<string, ContextePage> = {
      apps: { page_type: 'realisations', langue, signal: 'portfolio' },
      hire: { page_type: 'recrutement', langue, contenu_id: 'hire', signal: 'recruteur' },
      'react-native-audit': {
        page_type: 'service',
        langue,
        contenu_id: 'react-native-audit',
        signal: 'projet',
      },
      'ios-native-modules': { page_type: 'expertise', langue, signal: 'projet' },
      about: { page_type: 'a_propos', langue },
      contact: { page_type: 'contact', langue },
    };
    return table[premier] ?? { page_type: 'autre', langue };
  }

  switch (premier) {
    case 'realisations':
      return second
        ? { page_type: 'etude_de_cas', langue, contenu_id: second, signal: 'portfolio' }
        : { page_type: 'realisations', langue, signal: 'portfolio' };
    case 'cdi':
    case 'recruter-developpeur':
      return { page_type: 'recrutement', langue, contenu_id: premier, signal: 'recruteur' };
    case 'freelance':
    case 'audit-application-react-native':
      return { page_type: 'service', langue, contenu_id: premier, signal: 'projet' };
    case 'expertise-react-native':
      return { page_type: 'expertise', langue, signal: 'projet' };
    case 'developpeur-application-mobile-amiens':
    case 'developpeur-freelance-amiens':
      return { page_type: 'local', langue, contenu_id: premier, signal: 'projet' };
    case 'guides':
      return second
        ? { page_type: 'guide', langue, contenu_id: second }
        : { page_type: 'guides', langue };
    case 'contact':
      return { page_type: 'contact', langue };
    case 'challenge':
      return { page_type: 'challenge', langue, signal: 'projet' };
    case 'a-propos':
      return { page_type: 'a_propos', langue };
    case 'hello':
      return { page_type: 'prospection', langue, contenu_id: second, signal: 'projet' };
    case 'mentions-legales':
    case 'plan-du-site':
      return { page_type: 'legal', langue };
    case 'ose-plus':
    case 'ose-plus-confidentialite':
    case 'runeo':
      return { page_type: 'produit_annexe', langue, contenu_id: premier };
    default:
      return { page_type: 'autre', langue };
  }
}

/* ------------------------------------------------------------------------ */
/* Le contexte d'une session : d'où vient le visiteur, ce qu'il cherche     */
/* ------------------------------------------------------------------------ */

type ContexteSession = {
  canal: string;
  source?: string;
  medium?: string;
  campagne?: string;
  utm_contenu?: string;
  utm_terme?: string;
  referrer_domaine?: string;
  landing_page: string;
  landing_type: string;
  intention_declaree?: Intention;
  intention_deduite?: Intention;
};

const CLE_SESSION = 'nbs:mesure';

const MOTEURS =
  /(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com|qwant\.com|ecosia\.org|yahoo\.[a-z.]+|yandex\.[a-z.]+|baidu\.com|search\.brave\.com|startpage\.com|lilo\.org)$/;
const RESEAUX =
  /(^|\.)(linkedin\.com|lnkd\.in|facebook\.com|fb\.me|instagram\.com|t\.co|twitter\.com|x\.com|youtube\.com|reddit\.com|threads\.net|bsky\.app|malt\.fr|malt\.com|tiktok\.com)$/;
const ASSISTANTS =
  /(^|\.)(chatgpt\.com|chat\.openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|chat\.mistral\.ai)$/;

/** Range une arrivée dans un canal lisible, sans jamais garder l'adresse complète. */
export function canalDe(
  referrer: string | undefined,
  utm: { source?: string; medium?: string },
  clicPub: boolean,
  landingType: string
): string {
  const medium = utm.medium?.toLowerCase();
  const source = utm.source?.toLowerCase();
  if (clicPub || (medium && /^(cpc|ppc|paid|ads?|display|paid_social)$/.test(medium))) {
    return 'payant';
  }
  if (medium === 'email' || medium === 'e-mail' || source === 'prospection') return 'email';
  if (medium === 'social') return 'social';
  if (source || medium) return 'campagne';
  if (landingType === 'prospection') return 'prospection';
  if (!referrer) return 'direct';
  // Les assistants avant les moteurs : gemini.google.com est aussi un google.
  if (ASSISTANTS.test(referrer)) return 'assistant_ia';
  if (MOTEURS.test(referrer)) return 'recherche';
  if (RESEAUX.test(referrer)) return 'social';
  return 'referral';
}

function lisSession(): ContexteSession | null {
  try {
    const brut = sessionStorage.getItem(CLE_SESSION);
    return brut ? (JSON.parse(brut) as ContexteSession) : null;
  } catch {
    return null;
  }
}

function ecrisSession(c: ContexteSession): void {
  try {
    sessionStorage.setItem(CLE_SESSION, JSON.stringify(c));
  } catch {
    /* navigation privée, stockage refusé : la mesure continue sans mémoire */
  }
}

let contexteMemoire: ContexteSession | null = null;

/**
 * Fige l'origine de la visite dès la première page, quelle qu'elle soit.
 * C'est la correction du défaut de l'ancienne couche : l'origine n'était
 * mémorisée que par la barre collante, montée sur l'accueil et masquée
 * au-dessus de 860 px. Un visiteur sur ordinateur, ou arrivé par une étude
 * de cas, n'avait donc aucune source.
 */
export function memoriseOrigine(): ContexteSession {
  const existant = contexteMemoire ?? lisSession();
  const p = new URLSearchParams(window.location.search);
  const utm = {
    source: p.get('utm_source') || undefined,
    medium: p.get('utm_medium') || undefined,
    campagne: p.get('utm_campaign') || undefined,
    contenu: p.get('utm_content') || undefined,
    terme: p.get('utm_term') || undefined,
  };

  // Une nouvelle campagne dans la même visite remplace l'ancienne ; sinon
  // l'origine reste celle de la première page.
  if (existant && !utm.source && !utm.medium) {
    contexteMemoire = existant;
    return existant;
  }

  let referrer: string | undefined;
  try {
    const r = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, '') : '';
    referrer = r && r !== window.location.hostname.replace(/^www\./, '') ? r : undefined;
  } catch {
    referrer = undefined;
  }

  const clicPub = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'li_fat_id', 'ttclid'].some(
    (k) => p.has(k)
  );
  const landing = contextePage(window.location.pathname);

  const nouveau: ContexteSession = {
    canal: canalDe(referrer, utm, clicPub, landing.page_type),
    source: utm.source,
    medium: utm.medium,
    campagne: utm.campagne,
    utm_contenu: utm.contenu,
    utm_terme: utm.terme,
    referrer_domaine: referrer,
    landing_page: window.location.pathname.replace(/\.html$/, '') || '/',
    landing_type: landing.page_type,
    intention_declaree: existant?.intention_declaree,
    intention_deduite: existant?.intention_deduite,
  };
  contexteMemoire = nouveau;
  ecrisSession(nouveau);
  return nouveau;
}

function contexte(): ContexteSession | null {
  return contexteMemoire ?? lisSession();
}

/** L'intention déclarée par une porte de l'accueil l'emporte toujours sur la déduite. */
export function declareIntention(intention: Intention): void {
  if (typeof window === 'undefined') return;
  const c = contexte() ?? memoriseOrigine();
  c.intention_declaree = intention;
  contexteMemoire = c;
  ecrisSession(c);
}

function intentionCourante(c: ContexteSession | null): {
  intention: string;
  intention_origine: string;
} {
  if (c?.intention_declaree) {
    return { intention: c.intention_declaree, intention_origine: 'declaree' };
  }
  if (c?.intention_deduite) return { intention: c.intention_deduite, intention_origine: 'deduite' };
  return { intention: 'inconnue', intention_origine: 'inconnue' };
}

/* ------------------------------------------------------------------------ */
/* Le filtre de confidentialité                                             */
/* ------------------------------------------------------------------------ */

const RE_EMAIL = /[^\s@<>"'()/:]+@[^\s@<>"'()/]+\.[a-z]{2,}/gi;
// Un numéro commence par 0 ou par un indicatif, jamais au milieu d'un mot :
// un identifiant App Store à dix chiffres n'est pas un téléphone.
const RE_TEL =
  /(?<![\w+])(?:\+\d{1,3}[\s.-]?\(?0?\)?[\s.-]?[1-9](?:[\s.-]?\d{2}){4}|0[1-9](?:[\s.-]?\d{2}){4})(?!\w)/g;

/** Remplace tout ce qui ressemble à une coordonnée. Utilisé aussi par le replay. */
export function masqueCoordonnees(texte: string): string {
  return texte.replace(RE_EMAIL, '[e-mail masqué]').replace(RE_TEL, '[numéro masqué]');
}

function contientCoordonnee(texte: string): boolean {
  RE_EMAIL.lastIndex = 0;
  RE_TEL.lastIndex = 0;
  const oui = RE_EMAIL.test(texte) || RE_TEL.test(texte);
  RE_EMAIL.lastIndex = 0;
  RE_TEL.lastIndex = 0;
  return oui;
}

/** Dernière barrière : aucune propriété envoyée ne peut contenir une coordonnée. */
export function nettoie(props: Properties): Properties {
  for (const [cle, valeur] of Object.entries(props)) {
    if (typeof valeur === 'string' && contientCoordonnee(valeur)) {
      props[cle] = masqueCoordonnees(valeur);
    }
  }
  return props;
}

/**
 * Appliqué à CHAQUE événement avant l'envoi, y compris les pages vues
 * automatiques : c'est ici que la page, l'origine et l'intention rejoignent
 * l'événement, et ici qu'est déduite l'intention d'une page consultée.
 */
function enrichit(evenement: CaptureResult | null): CaptureResult | null {
  if (!evenement) return evenement;
  // Les images de replay portent déjà leur propre contexte.
  if (evenement.event === '$snapshot') return evenement;

  const props = evenement.properties ?? {};
  let chemin = window.location.pathname;
  try {
    if (typeof props.$current_url === 'string') chemin = new URL(props.$current_url).pathname;
  } catch {
    /* URL illisible : on garde celle de la fenêtre */
  }
  const page = contextePage(chemin);
  const c = contexte();

  // La première page qui trahit une intention la fixe pour la session, tant
  // que le visiteur n'en a pas déclaré une lui-même.
  if (c && evenement.event === '$pageview' && page.signal && !c.intention_deduite) {
    c.intention_deduite = page.signal;
    contexteMemoire = c;
    ecrisSession(c);
  }

  evenement.properties = nettoie({
    ...props,
    page_type: page.page_type,
    langue: page.langue,
    contenu_id: page.contenu_id,
    canal: c?.canal,
    source: c?.source,
    medium: c?.medium,
    campagne: c?.campagne,
    utm_contenu: c?.utm_contenu,
    utm_terme: c?.utm_terme,
    referrer_domaine: c?.referrer_domaine,
    landing_page: c?.landing_page,
    landing_type: c?.landing_type,
    ...intentionCourante(c),
  });
  return evenement;
}

/* ------------------------------------------------------------------------ */
/* Le chargement de PostHog                                                 */
/* ------------------------------------------------------------------------ */

const CLE_REFUS = 'nbs:mesure-refusee';

/**
 * Le visiteur a-t-il refusé la mesure ? Trois façons de le dire : le bouton
 * des mentions légales, le signal Global Privacy Control, ou l'ancien
 * « Do Not Track ». Dans ces trois cas PostHog n'est même pas téléchargé.
 */
export function refusParLeNavigateur(): boolean {
  if (typeof window === 'undefined') return false;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return nav.globalPrivacyControl === true || nav.doNotTrack === '1';
}

export function mesureRefusee(): boolean {
  if (typeof window === 'undefined') return true;
  if (refusParLeNavigateur()) return true;
  try {
    return localStorage.getItem(CLE_REFUS) === '1';
  } catch {
    return false;
  }
}

/** Enregistre le choix du visiteur. Le seul stockage durable de la mesure : le refus. */
export function changeRefusMesure(refus: boolean): void {
  try {
    if (refus) {
      localStorage.setItem(CLE_REFUS, '1');
    } else {
      localStorage.removeItem(CLE_REFUS);
      // Le refus a deux mémoires : la nôtre, et celle que PostHog écrit lui-même
      // quand on l'arrête. Tant que la sienne reste à « 0 », PostHog se charge
      // mais n'envoie plus rien : la réactivation n'avait donc aucun effet.
      localStorage.removeItem(`__ph_opt_in_out_${CLE_POSTHOG}`);
    }
  } catch {
    /* stockage refusé : le choix vaudra pour cette page seulement */
  }

  if (refus) {
    if (client) {
      client.stopSessionRecording();
      client.opt_out_capturing();
    }
    return;
  }

  if (client) {
    // PostHog déjà chargé sur cette page, arrêté par un refus : on efface son
    // refus et on relance le replay.
    client.clear_opt_in_out_capturing();
    client.startSessionRecording();
  } else {
    // Refus venu d'une page précédente : PostHog n'a jamais été chargé ici.
    void initialiseMesure();
  }
}

let client: PostHog | null = null;
let chargement: Promise<PostHog | null> | null = null;
const enAttente: [NomEvenement, Proprietes | undefined][] = [];

/**
 * Charge PostHog après l'affichage de la page, dans un fichier à part : la
 * mesure ne doit jamais retarder le premier rendu. Les événements émis avant
 * la fin du chargement attendent dans une file, rien n'est perdu.
 */
export function initialiseMesure(): Promise<PostHog | null> {
  if (!MESURE_ACTIVE || typeof window === 'undefined' || mesureRefusee()) {
    return Promise.resolve(null);
  }
  if (chargement) return chargement;

  memoriseOrigine();

  chargement = import('posthog-js')
    .then(({ default: posthog }) => {
      posthog.init(CLE_POSTHOG, {
        api_host: HOTE_POSTHOG,
        ui_host: 'https://eu.posthog.com',
        defaults: '2026-05-30',

        // Aucun profil de personne : on n'identifie jamais personne.
        person_profiles: 'identified_only',
        // Aucun cookie, aucun stockage qui survit à l'onglet.
        persistence: 'sessionStorage',
        // Le trafic local est marqué « test » et exclu des tableaux de bord.
        internal_or_test_user_hostname: /^(localhost|127\.0\.0\.1)$/,

        // Pages vues à chaque navigation, y compris sans rechargement, et
        // sortie de page pour le temps passé et les pages de sortie.
        capture_pageview: 'history_change',
        capture_pageleave: true,

        // Pas de capture automatique des clics : elle collecte le texte des
        // éléments et noierait le dictionnaire. Les clics utiles sont
        // qualifiés à la main, par délégation (voir Mesure.tsx).
        autocapture: false,
        rageclick: false,
        capture_dead_clicks: false,
        // Carte de chaleur : positions des clics, sans aucun texte.
        enable_heatmaps: true,

        // Rien de ce que ce site n'utilise pas. Les feature flags sont coupés
        // tant qu'aucun test A/B ne tourne : une requête de moins par page.
        advanced_disable_feature_flags: true,
        disable_surveys: true,
        disable_web_experiments: true,
        capture_exceptions: false,
        // Web Vitals oui, chronologie réseau non : elle listerait les appels
        // du formulaire dans les replays.
        capture_performance: { network_timing: false, web_vitals: true },

        // Identifiants publicitaires et coordonnées masqués dans les URL.
        mask_personal_data_properties: true,
        custom_personal_data_properties: ['email', 'mail', 'tel', 'telephone', 'phone', 'nom'],

        enable_recording_console_log: false,
        session_recording: {
          sampleRate: TAUX_REPLAY,
          // Tout champ, quel que soit son type, zone de texte comprise.
          maskAllInputs: true,
          maskInputOptions: {
            text: true,
            textarea: true,
            email: true,
            tel: true,
            password: true,
            search: true,
            url: true,
            number: true,
            select: true,
          },
          maskInputFn: (texte) => '*'.repeat(Math.min(texte.length, 12)),
          // Textes masqués : l'écran de confirmation du formulaire, qui
          // réaffiche le message, le nom et l'adresse du visiteur, et tout
          // lien e-mail ou téléphone. Le masquage d'un texte ne s'applique
          // qu'aux éléments désignés ici : maskTextFn seul ne suffit pas.
          maskTextSelector: '[data-ph-masque], a[href^="mailto:"], a[href^="tel:"]',
          maskTextFn: (texte) => masqueCoordonnees(texte),
          // Les coordonnées vivent aussi dans des attributs (mailto:, tel:),
          // que le masquage du texte ne voit pas.
          maskAttributeFn: (nom, valeur) =>
            /^(mailto|tel):/i.test(valeur)
              ? valeur.replace(/:.*/, ':[masqué]')
              : masqueCoordonnees(valeur),
          blockClass: 'ph-no-capture',
          recordHeaders: false,
          recordBody: false,
        },

        before_send: enrichit,
      });
      client = posthog;
      for (const [nom, props] of enAttente.splice(0)) posthog.capture(nom, props);
      return posthog;
    })
    .catch(() => null);

  return chargement;
}

/**
 * Envoie un événement nommé. Sans PostHog chargé, il attend ; mesure coupée,
 * il ne fait rien. Une erreur de mesure ne casse jamais une interaction.
 */
export function suit(evenement: NomEvenement, proprietes?: Proprietes): void {
  if (!MESURE_ACTIVE || typeof window === 'undefined' || mesureRefusee()) return;
  try {
    if (client) client.capture(evenement, proprietes);
    else {
      enAttente.push([evenement, proprietes]);
      void initialiseMesure();
    }
  } catch {
    /* la mesure ne doit jamais casser le site */
  }
}
