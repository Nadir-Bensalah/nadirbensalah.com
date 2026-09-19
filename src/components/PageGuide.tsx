import React from 'react';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import { Guide, dateFrCourte, guides } from '@/content/guides';
import { profil } from '@/content/profil';

/** L'enveloppe commune à tous les guides : fil d'ariane, en-tête, corps, suite. */
export default function PageGuide({
  guide,
  children,
}: {
  guide: Guide;
  children: React.ReactNode;
}) {
  const autres = guides.filter((g) => g.slug !== guide.slug).slice(0, 2);

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.titre,
      description: guide.description,
      datePublished: guide.publieLe,
      dateModified: guide.majLe || guide.publieLe,
      inLanguage: 'fr-FR',
      author: { '@type': 'Person', name: profil.nom, url: profil.site },
      publisher: { '@type': 'Person', name: profil.nom, url: profil.site },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${profil.site}/guides/${guide.slug}` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: profil.site },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${profil.site}/guides` },
        {
          '@type': 'ListItem',
          position: 3,
          name: guide.titre,
          item: `${profil.site}/guides/${guide.slug}`,
        },
      ],
    },
  ];

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
        <article>
          <header style={{ paddingTop: 'clamp(40px, 7vw, 72px)', paddingBottom: 'var(--e-6)' }}>
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
                <Link href="/guides" className="lien-sobre">
                  Guides
                </Link>
              </nav>

              <div style={{ maxWidth: 'var(--colonne-lecture)' }}>
                <h1 className="t-h1">{guide.titre}</h1>
                <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                  {guide.chapeau}
                </p>
                <p className="t-petit t-3" style={{ marginTop: 'var(--e-4)' }}>
                  <time dateTime={guide.publieLe}>{dateFrCourte(guide.publieLe)}</time> ·{' '}
                  {guide.minutes} min de lecture · {profil.nom}
                </p>
              </div>
            </div>
          </header>

          <div className="enveloppe">
            <div className="article-corps">{children}</div>
          </div>
        </article>

        <div className="enveloppe">
          <section
            className="creux"
            style={{ marginTop: 'clamp(56px, 8vw, 96px)', maxWidth: 'var(--colonne-lecture)' }}
          >
            <h2 className="t-h3" style={{ marginBottom: 'var(--e-3)' }}>
              Un projet qui ressemble à ça ?
            </h2>
            <p className="t-corps t-2" style={{ marginBottom: 'var(--e-5)' }}>
              Décrivez-moi votre cas. Je vous réponds avec la manière dont je l’aborderais, sans
              engagement.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)' }}>
              <Link href="/challenge" className="btn btn-principal">
                Me soumettre un problème
              </Link>
              <Link href="/realisations" className="btn btn-secondaire">
                Voir les huit applications
              </Link>
            </div>
          </section>

          {autres.length > 0 && (
            <section
              style={{ marginTop: 'clamp(48px, 7vw, 80px)', maxWidth: 'var(--colonne-lecture)' }}
            >
              <h2 className="etiquette" style={{ marginBottom: 'var(--e-4)' }}>
                À lire ensuite
              </h2>
              <ul
                style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' }}
              >
                {autres.map((g, i) => (
                  <li
                    key={g.slug}
                    style={{ borderTop: i === 0 ? 'none' : '1px solid var(--trait)' }}
                  >
                    <Link
                      href={`/guides/${g.slug}`}
                      style={{
                        display: 'block',
                        paddingBlock: 'var(--e-4)',
                        color: 'var(--texte)',
                      }}
                      className="lien-sobre"
                    >
                      <span className="t-h3" style={{ display: 'block', marginBottom: 4 }}>
                        {g.titre}
                      </span>
                      <span className="t-petit t-2">{g.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>

      <Pied />
    </>
  );
}
