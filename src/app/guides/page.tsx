import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import Apparait from '@/components/Apparait';
import { dateFrCourte, guides } from '@/content/guides';
import { profil } from '@/content/profil';

export const metadata: Metadata = {
  title: 'Guides',
  description:
    'Ce que huit applications publiées sur l’App Store m’ont appris : choix de technologie, revue Apple, préparation d’une soumission.',
  alternates: { canonical: '/guides' },
  openGraph: {
    title: 'Guides · Nadir Ben Salah',
    description: 'Ce que huit applications publiées m’ont appris, écrit pour être utile.',
    url: '/guides',
  },
};

export default function Guides() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Guides',
    url: `${profil.site}/guides`,
    hasPart: guides.map((g) => ({
      '@type': 'Article',
      headline: g.titre,
      datePublished: g.publieLe,
      url: `${profil.site}/guides/${g.slug}`,
      author: { '@type': 'Person', name: profil.nom },
    })),
  };

  return (
    <>
      <a href="#contenu" className="saute-au-contenu">
        Aller au contenu
      </a>
      <Entete />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main id="contenu">
        <section style={{ paddingTop: 'clamp(40px, 7vw, 80px)', paddingBottom: 'var(--e-8)' }}>
          <div className="enveloppe">
            <nav
              aria-label="Fil d’ariane"
              className="t-petit t-3"
              style={{ marginBottom: 'var(--e-5)' }}
            >
              <Link href="/" className="lien-sobre">
                Accueil
              </Link>
              <span aria-hidden> › </span>
              <span>Guides</span>
            </nav>

            <div style={{ maxWidth: 680, marginBottom: 'var(--e-8)' }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Guides
              </p>
              <h1 className="t-h1">Ce qu’on apprend en publiant, on l’écrit.</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Pas de contenu générique : chaque guide part de quelque chose que huit applications
                publiées m’ont réellement appris. Quand un chiffre est cité, sa source est dite.
              </p>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, maxWidth: 'var(--colonne-lecture)' }}>
              {guides.map((g, i) => (
                <Apparait
                  key={g.slug}
                  as="li"
                  retard={(i % 3) as 0 | 1 | 2}
                  style={{ borderTop: i === 0 ? 'none' : '1px solid var(--trait)' }}
                >
                  <Link
                    href={`/guides/${g.slug}`}
                    style={{ display: 'block', paddingBlock: 'var(--e-5)', color: 'var(--texte)' }}
                    className="lien-guide"
                  >
                    <p className="t-micro t-3" style={{ marginBottom: 8 }}>
                      <time dateTime={g.publieLe}>{dateFrCourte(g.publieLe)}</time> · {g.minutes}{' '}
                      min
                    </p>
                    <h2 className="t-h3" style={{ fontSize: 21, marginBottom: 8 }}>
                      {g.titre}
                    </h2>
                    <p className="t-corps t-2">{g.chapeau}</p>
                  </Link>
                </Apparait>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Pied />

      <style>{`
        .lien-guide:hover { text-decoration: none; color: var(--texte); }
        .lien-guide:hover h2 { text-decoration: underline; text-underline-offset: 3px; }
      `}</style>
    </>
  );
}
