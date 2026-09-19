import type { Metadata } from 'next';

/**
 * Les correspondances entre les pages françaises et anglaises.
 *
 * Le hreflang doit être BIDIRECTIONNEL : si la page française déclare son
 * équivalent anglais, l'anglaise doit déclarer le français en retour. Sans
 * cette réciprocité, Google ignore l'ensemble des déclarations, silencieusement.
 * Cette table est donc la source unique, et les deux côtés la lisent.
 *
 * Toutes les pages n'ont pas de jumelle, et c'est voulu. « Développeur à
 * Amiens » n'a aucun sens pour un lecteur anglophone : aucun Britannique ne
 * cherche un développeur amiénois. Ces pages restent monolingues, sans
 * hreflang, plutôt que d'exister en double sans lecteur.
 */

export type Paire = {
  fr: string;
  en: string;
};

export const paires: Paire[] = [
  { fr: '/', en: '/en' },
  { fr: '/realisations', en: '/en/apps' },
  { fr: '/expertise-react-native', en: '/en/ios-native-modules' },
  { fr: '/audit-application-react-native', en: '/en/react-native-audit' },
  { fr: '/freelance', en: '/en/hire' },
  { fr: '/a-propos', en: '/en/about' },
  { fr: '/contact', en: '/en/contact' },
  { fr: '/guides', en: '/en/blog' },
];

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nadirbensalah.com').replace(/\/$/, '');

/**
 * Construit le bloc `alternates` d'une page, canonique et hreflang compris.
 *
 * `x-default` pointe toujours vers l'anglais quand une version anglaise
 * existe : ce lien sert les visiteurs dont la langue ne correspond à aucune
 * version déclarée. Un Allemand, un Espagnol ou un Néerlandais lira l'anglais,
 * pas le français. Mettre le français en x-default fermerait le site à tout le
 * marché non francophone.
 */
export function alternatives(chemin: string): NonNullable<Metadata['alternates']> {
  const paire = paires.find((p) => p.fr === chemin || p.en === chemin);

  // Page monolingue : canonique seule, aucun hreflang. Déclarer une langue
  // sans contrepartie est pire que de ne rien déclarer.
  if (!paire) {
    return { canonical: chemin };
  }

  return {
    canonical: chemin,
    languages: {
      fr: `${SITE}${paire.fr}`,
      en: `${SITE}${paire.en}`,
      'x-default': `${SITE}${paire.en}`,
    },
  };
}

/** La page équivalente dans l'autre langue, pour le sélecteur de langue. */
export function equivalent(chemin: string): { href: string; langue: 'fr' | 'en' } | null {
  const paire = paires.find((p) => p.fr === chemin || p.en === chemin);
  if (!paire) return null;
  return paire.fr === chemin ? { href: paire.en, langue: 'en' } : { href: paire.fr, langue: 'fr' };
}
