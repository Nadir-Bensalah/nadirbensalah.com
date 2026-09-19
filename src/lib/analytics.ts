'use client';

/**
 * Couche analytics, volontairement neutre.
 *
 * Aucun traceur n'est chargé tant qu'aucun identifiant n'est fourni : le site
 * fonctionne sans, et ne dépose aucun cookie par défaut. Quand un identifiant
 * Plausible ou GA4 est renseigné, les événements partent vers lui.
 *
 * Les événements sont nommés une seule fois, ici, pour qu'un tableau de bord
 * puisse être construit sans relire le code page par page.
 */

export const EVENEMENTS = {
  vueAccueil: 'view_home',
  intentionRecrute: 'select_intent_recruiter',
  intentionProjet: 'select_intent_project',
  intentionTravaux: 'select_intent_work',
  vueProjet: 'view_project',
  vueEtudeDeCas: 'view_case_study',
  vueCv: 'view_cv',
  telechargeCv: 'download_cv',
  clicAppStore: 'click_app_store',
  clicGithub: 'click_github',
  clicLinkedin: 'click_linkedin',
  clicCapmedia: 'click_capmedia',
  clicEmail: 'click_email',
  clicTelephone: 'click_phone',
  ouvreContact: 'open_contact',
  envoieContact: 'submit_contact',
  debuteChallenge: 'challenge_start',
  envoieChallenge: 'challenge_submit',
} as const;

export type NomEvenement = (typeof EVENEMENTS)[keyof typeof EVENEMENTS];

type Proprietes = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (evenement: string, options?: { props?: Proprietes }) => void;
    gtag?: (commande: string, cible: string, parametres?: Proprietes) => void;
    dataLayer?: unknown[];
  }
}

const CLE_UTM = 'nbs:origine';

/**
 * Retient d'où vient le visiteur à sa première page, pour pouvoir l'attribuer
 * même s'il convertit trois pages plus loin. Stocké en session : rien ne
 * survit à la fermeture de l'onglet, et rien ne part vers un serveur tiers.
 */
export function memoriseOrigine(): void {
  if (typeof window === 'undefined') return;
  try {
    if (sessionStorage.getItem(CLE_UTM)) return;
    const p = new URLSearchParams(window.location.search);
    const origine = {
      source: p.get('utm_source') || undefined,
      medium: p.get('utm_medium') || undefined,
      campagne: p.get('utm_campaign') || undefined,
      referent: document.referrer || undefined,
    };
    if (origine.source || origine.referent) {
      sessionStorage.setItem(CLE_UTM, JSON.stringify(origine));
    }
  } catch {
    /* navigation privée, stockage refusé : on continue sans attribution */
  }
}

function origine(): Proprietes {
  if (typeof window === 'undefined') return {};
  try {
    const brut = sessionStorage.getItem(CLE_UTM);
    if (!brut) return {};
    const o = JSON.parse(brut) as Record<string, string | undefined>;
    return { source: o.source, medium: o.medium, campagne: o.campagne };
  } catch {
    return {};
  }
}

/** Envoie un événement. Sans traceur configuré, la fonction ne fait rien. */
export function suit(evenement: NomEvenement, proprietes?: Proprietes): void {
  if (typeof window === 'undefined') return;
  const props = { ...origine(), ...proprietes };
  try {
    window.plausible?.(evenement, { props });
    window.gtag?.('event', evenement, props);
  } catch {
    /* un traceur qui échoue ne doit jamais casser une interaction */
  }
}
