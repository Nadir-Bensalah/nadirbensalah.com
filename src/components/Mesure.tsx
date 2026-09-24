'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  EVENEMENTS,
  MESURE_ACTIVE,
  contextePage,
  initialiseMesure,
  signalePage,
  suit,
  type NomEvenement,
  type Proprietes,
} from '@/lib/analytics';

/**
 * Le point d'entrée de la mesure, monté une seule fois dans le layout racine :
 * toutes les pages, françaises et anglaises, sur tous les écrans.
 *
 * Les clics ne sont pas suivis lien par lien. Un seul écouteur, posé sur le
 * document, qualifie chaque clic sur un lien selon sa destination : CV, App
 * Store, e-mail, téléphone, site externe, appel à l'action interne. Les
 * quarante-six boutons du site sont ainsi couverts sans qu'aucun ne porte de
 * code de suivi, et un bouton ajouté demain est mesuré sans y penser.
 */

/** Les pages où le visiteur vient lire : seules celles-là mesurent la profondeur. */
const PAGES_DE_LECTURE = new Set([
  'accueil',
  'realisations',
  'etude_de_cas',
  'service',
  'expertise',
  'local',
  'recrutement',
  'guide',
  'a_propos',
  'prospection',
]);

/** Les destinations qui mènent à une prise de contact. */
const DESTINATIONS_CONTACT = new Set(['/contact', '/en/contact', '/challenge']);

/** Où se trouvait le lien : l'en-tête, le menu mobile, le pied, ou une section nommée. */
function emplacementDe(el: Element): string {
  const declare = el.closest<HTMLElement>('[data-emplacement]')?.dataset.emplacement;
  if (declare) return declare;
  if (el.closest('.barre-collante')) return 'barre_collante';
  if (el.closest('#menu-mobile, #en-mobile-menu')) return 'menu_mobile';
  if (el.closest('header')) return 'entete';
  if (el.closest('footer')) return 'pied';
  const section = el.closest('section');
  if (section) {
    const premiere = document.querySelector('main section');
    if (section === premiere) return 'hero';
    const nom = section.getAttribute('aria-labelledby') || section.id;
    if (nom) return nom;
  }
  return 'corps';
}

function texteDe(el: Element): string {
  return (el.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 60);
}

function styleDe(a: HTMLAnchorElement): string {
  if (a.classList.contains('btn-principal')) return 'principal';
  if (a.classList.contains('btn-secondaire')) return 'secondaire';
  if (a.classList.contains('btn-fantome')) return 'fantome';
  return 'lien';
}

function destinationSortie(hote: string): string {
  if (/(^|\.)github\.com$/.test(hote)) return 'github';
  if (/(^|\.)linkedin\.com$/.test(hote)) return 'linkedin';
  if (/(^|\.)capmedia\.(app|tn)$/.test(hote)) return 'capmedia';
  return 'autre';
}

/** Transforme un clic sur un lien en au plus UN événement. */
export function qualifieClic(a: HTMLAnchorElement): [NomEvenement, Proprietes] | null {
  const brut = a.getAttribute('href');
  if (!brut || brut.startsWith('#')) return null;
  // Les portes d'intention ont leur propre événement, plus riche.
  if (a.closest('[data-porte-intention]')) return null;

  let url: URL;
  try {
    url = new URL(a.href, window.location.href);
  } catch {
    return null;
  }
  const emplacement = emplacementDe(a);

  // « moyen » et non « canal » : canal désigne déjà l'origine de la visite,
  // et l'enrichissement l'écraserait.
  if (url.protocol === 'mailto:') {
    return [EVENEMENTS.contactDirect, { moyen: 'email', emplacement }];
  }
  if (url.protocol === 'tel:') {
    return [EVENEMENTS.contactDirect, { moyen: 'telephone', emplacement }];
  }

  const interne = url.origin === window.location.origin;

  if (interne && /\/assets\/cv\/[^/]+\.pdf$/.test(url.pathname)) {
    return [EVENEMENTS.cv, { emplacement, fichier: url.pathname.split('/').pop() }];
  }

  if (url.hostname === 'apps.apple.com') {
    const page = contextePage(window.location.pathname);
    const developpeur = url.pathname.includes('/developer/');
    const app =
      a.closest<HTMLElement>('[data-app]')?.dataset.app ??
      (!developpeur && page.page_type === 'etude_de_cas' ? page.contenu_id : undefined);
    return [
      EVENEMENTS.appStore,
      {
        app: developpeur ? undefined : app,
        app_store_id: url.pathname.match(/id(\d+)/)?.[1],
        type_lien: developpeur ? 'page_developpeur' : 'fiche_app',
        emplacement,
      },
    ];
  }

  if (!interne) {
    return [
      EVENEMENTS.sortie,
      {
        destination: a.dataset.sortie ?? destinationSortie(url.hostname),
        domaine: url.hostname.replace(/^www\./, ''),
        emplacement,
      },
    ];
  }

  const destination = url.pathname.replace(/\.html$/, '').replace(/\/+$/, '') || '/';
  const versContact = DESTINATIONS_CONTACT.has(destination);
  const bouton = a.classList.contains('btn') || a.hasAttribute('data-cta');
  if (!bouton && !versContact) return null;

  return [
    EVENEMENTS.cta,
    {
      cta_id: `${emplacement}>${destination}`,
      cta_texte: texteDe(a),
      cta_style: styleDe(a),
      destination,
      vers_contact: versContact,
      emplacement,
    },
  ];
}

export default function Mesure() {
  const chemin = usePathname();

  // Chargement de PostHog et écoute des clics, une fois pour tout le site.
  useEffect(() => {
    if (!MESURE_ACTIVE) return;
    void initialiseMesure();

    const auClic = (e: MouseEvent) => {
      const cible = e.target as Element | null;
      const a = cible?.closest?.('a');
      if (!a) return;
      const resultat = qualifieClic(a as HTMLAnchorElement);
      if (resultat) suit(resultat[0], resultat[1]);
    };
    // Phase de capture : le clic est qualifié avant que la navigation parte.
    document.addEventListener('click', auClic, true);
    return () => document.removeEventListener('click', auClic, true);
  }, []);

  // Chaque page affichée prévient le relais de notifications (visite,
  // lecture des réalisations, prospect), que PostHog soit chargé ou non.
  useEffect(() => {
    if (chemin) signalePage(chemin);
  }, [chemin]);

  // Profondeur de lecture, page par page, seulement sur les pages de lecture.
  useEffect(() => {
    if (!MESURE_ACTIVE || !chemin) return;
    const page = contextePage(chemin);
    if (!PAGES_DE_LECTURE.has(page.page_type)) return;

    const atteints = new Set<number>();
    const auDefilement = () => {
      const hauteur = document.documentElement.scrollHeight;
      // Une page qui tient presque dans l'écran n'a pas de profondeur à mesurer.
      if (hauteur < window.innerHeight * 1.5) return;
      const vu = (window.scrollY + window.innerHeight) / hauteur;
      for (const seuil of [50, 90]) {
        if (vu * 100 >= seuil && !atteints.has(seuil)) {
          atteints.add(seuil);
          suit(EVENEMENTS.defilement, { profondeur: seuil });
        }
      }
    };
    window.addEventListener('scroll', auDefilement, { passive: true });
    return () => window.removeEventListener('scroll', auDefilement);
  }, [chemin]);

  return null;
}
