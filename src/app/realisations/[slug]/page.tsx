import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import Apparait from '@/components/Apparait';
import GalerieCaptures from '@/components/GalerieCaptures';
import { App, appParSlug, apps, dateFr } from '@/content/apps';
import { profil } from '@/content/profil';
import LienEvitement from '@/components/LienEvitement';

export function generateStaticParams() {
  return apps.map((a) => ({ slug: a.slug }));
}

/** Next 15 passe les paramètres de route en promesse, y compris à l'export. */
type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const app = appParSlug(slug);
  if (!app) return {};
  return {
    title: `${app.nomCourt} · étude de cas`,
    description: `${app.baseline} ${app.probleme}`.slice(0, 158),
    alternates: { canonical: `/realisations/${app.slug}` },
    openGraph: {
      title: `${app.nomCourt} · étude de cas`,
      description: app.baseline,
      url: `/realisations/${app.slug}`,
      // L'icone fait 256 px : trop petite pour une carte de partage large,
      // et LinkedIn la recadrerait de travers. On reprend l'image du site.
      images: [{ url: '/assets/images/og.png', width: 1200, height: 630, alt: app.nomCourt }],
    },
  };
}

function Fiche({ app }: { app: App }) {
  const lignes: [string, string][] = [
    ['Catégorie', app.categorie],
    ['En ligne depuis', dateFr(app.sortie)],
    ['Version', `${app.version} (mise à jour le ${dateFr(app.majLe)})`],
    ['Prix', app.prix],
    ['Poids', `${app.tailleMo} Mo`],
    ['iOS minimum', app.iosMini],
    ['Langues', app.langues.join(', ')],
    ['Mon rôle', 'Tout : idée, conception, développement, publication, maintenance'],
  ];

  return (
    <dl
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(104px, max-content) minmax(0, 1fr)',
        gap: '12px var(--e-4)',
        margin: 0,
        fontSize: 14.5,
      }}
    >
      {lignes.map(([cle, valeur]) => (
        <React.Fragment key={cle}>
          <dt className="t-3">{cle}</dt>
          <dd style={{ margin: 0, color: 'var(--texte)' }}>{valeur}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

export default async function EtudeDeCas({ params }: { params: Params }) {
  const { slug } = await params;
  const app = appParSlug(slug);
  if (!app) notFound();

  const index = apps.findIndex((a) => a.slug === app.slug);
  const suivante = apps[(index + 1) % apps.length];

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: app.nom,
      applicationCategory: 'MobileApplication',
      operatingSystem: `iOS ${app.iosMini}+`,
      softwareVersion: app.version,
      datePublished: app.sortie,
      dateModified: app.majLe,
      description: app.probleme,
      image: `${profil.site}${app.icone}`,
      url: app.appStoreUrl,
      author: { '@type': 'Person', name: profil.nom, url: profil.site },
      // Aucun aggregateRating : les notes réelles sont trop peu nombreuses
      // pour être affichées, et une donnée structurée inventée est interdite.
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: profil.site },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Réalisations',
          item: `${profil.site}/realisations`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: app.nomCourt,
          item: `${profil.site}/realisations/${app.slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <LienEvitement />
      <Entete />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main id="contenu">
        {/* ── HÉROS ───────────────────────────────────────────────────── */}
        <section style={{ paddingTop: 'clamp(32px, 6vw, 64px)', paddingBottom: 'var(--e-7)' }}>
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
              <Link href="/realisations" className="lien-sobre">
                Réalisations
              </Link>
              <span aria-hidden> › </span>
              <span>{app.nomCourt}</span>
            </nav>

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--e-4)',
                marginBottom: 'var(--e-5)',
              }}
            >
              <img
                src={app.icone}
                alt=""
                width={72}
                height={72}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 16,
                  flex: 'none',
                  border: '1px solid var(--trait)',
                }}
              />
              <div style={{ minWidth: 0 }}>
                <h1 className="t-h1">{app.nomCourt}</h1>
                <p className="t-petit t-3" style={{ marginTop: 6 }}>
                  {app.categorie} · {app.prix}
                </p>
              </div>
            </div>

            <p className="t-lead" style={{ maxWidth: 680, fontSize: 21 }}>
              {app.baseline}
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--e-3)',
                marginTop: 'var(--e-5)',
              }}
            >
              <a
                href={app.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-principal"
              >
                Voir sur l’App&nbsp;Store
              </a>
              {app.site && (
                <a
                  href={app.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondaire"
                >
                  Le site du produit
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ── CAPTURES ────────────────────────────────────────────────── */}
        <GalerieCaptures app={app} />

        <div className="enveloppe">
          <div className="sections" style={{ paddingTop: 'clamp(56px, 8vw, 96px)' }}>
            {/* ── LE PROBLÈME ──────────────────────────────────────────── */}
            <section className="section" aria-labelledby="t-probleme">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) minmax(300px, 360px)',
                  gap: 'var(--e-7)',
                  alignItems: 'start',
                }}
                className="grille-etude"
              >
                <div>
                  <p className="etiquette" style={{ marginBottom: 'var(--e-2)' }}>
                    Le problème
                  </p>
                  <h2 id="t-probleme" className="t-h2" style={{ marginBottom: 'var(--e-4)' }}>
                    Ce que l’application résout
                  </h2>
                  <p className="t-lead" style={{ marginBottom: 'var(--e-4)' }}>
                    {app.probleme}
                  </p>
                  <p className="t-corps t-2">
                    <strong style={{ color: 'var(--texte)' }}>Pour qui :</strong> {app.pourQui}
                  </p>
                </div>

                <aside className="carte">
                  <p className="etiquette" style={{ marginBottom: 'var(--e-4)' }}>
                    La fiche
                  </p>
                  <Fiche app={app} />
                </aside>
              </div>
            </section>

            {/* ── LA TECHNIQUE ─────────────────────────────────────────── */}
            <section className="section" aria-labelledby="t-technique">
              <div className="section-tete">
                <p className="etiquette">Sous le capot</p>
                <h2 id="t-technique" className="t-h2">
                  Ce qui a été construit
                </h2>
              </div>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                }}
              >
                {app.technique.map((t, i) => (
                  <Apparait
                    key={t}
                    as="li"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '28px 1fr',
                      gap: 'var(--e-3)',
                      paddingBlock: 'var(--e-4)',
                      borderTop: i === 0 ? 'none' : '1px solid var(--trait)',
                      alignItems: 'start',
                    }}
                  >
                    <span className="t-mono t-3 t-nb" style={{ fontSize: 12.5, paddingTop: 3 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="t-corps t-2" style={{ maxWidth: 680 }}>
                      {t}
                    </span>
                  </Apparait>
                ))}
              </ul>
            </section>

            {/* ── LE FAIT SAILLANT ─────────────────────────────────────── */}
            <Apparait as="section" className="creux">
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Ce qu’il faut retenir
              </p>
              <p className="t-h2" style={{ maxWidth: 780, fontWeight: 600 }}>
                {app.saillant}
              </p>
            </Apparait>

            {/* ── LA PILE ──────────────────────────────────────────────── */}
            <section className="section" aria-labelledby="t-pile">
              <div className="section-tete">
                <p className="etiquette">La pile</p>
                <h2 id="t-pile" className="t-h2">
                  Les technologies employées
                </h2>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-2)' }}>
                {app.stack.map((s) => (
                  <span
                    key={s}
                    className="pastille"
                    style={{ fontSize: 13.5, padding: '7px 14px' }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>

            {/* ── CE QUE ÇA DÉMONTRE ───────────────────────────────────── */}
            <section className="section" aria-labelledby="t-demontre">
              <div className="section-tete">
                <p className="etiquette">La compétence</p>
                <h2 id="t-demontre" className="t-h2">
                  Ce que ce projet démontre
                </h2>
              </div>
              <ul className="liste-marque" style={{ maxWidth: 720 }}>
                {app.demontre.map((d) => (
                  <li key={d} style={{ fontSize: 16.5 }}>
                    {d}
                  </li>
                ))}
              </ul>
            </section>

            {/* ── APRÈS LA PUBLICATION ─────────────────────────────────── */}
            {app.apresPublication && (
              <section className="section" aria-labelledby="t-apres">
                <div className="section-tete">
                  <p className="etiquette">La décision</p>
                  <h2 id="t-apres" className="t-h2">
                    Le problème, l’arbitrage, et comment je sais qu’il tient
                  </h2>
                </div>
                <div style={{ display: 'grid', gap: 'var(--e-4)', maxWidth: 720 }}>
                  <div>
                    <p className="etiquette" style={{ marginBottom: 6 }}>
                      Le constat
                    </p>
                    <p style={{ fontSize: 16.5 }}>{app.apresPublication.constat}</p>
                  </div>
                  <div>
                    <p className="etiquette" style={{ marginBottom: 6 }}>
                      L’arbitrage
                    </p>
                    <p style={{ fontSize: 16.5 }}>{app.apresPublication.decision}</p>
                  </div>
                  <div>
                    <p className="etiquette" style={{ marginBottom: 6 }}>
                      La vérification
                    </p>
                    <p style={{ fontSize: 16.5 }}>{app.apresPublication.verification}</p>
                  </div>
                </div>
              </section>
            )}

            {/* ── SUITE & CONTACT ──────────────────────────────────────── */}
            <section className="section">
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--e-5)',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid var(--trait)',
                  paddingTop: 'var(--e-6)',
                }}
              >
                <div>
                  <p className="etiquette" style={{ marginBottom: 6 }}>
                    Application suivante
                  </p>
                  <Link
                    href={`/realisations/${suivante.slug}`}
                    className="t-h3 lien-action-carte"
                    style={{ color: 'var(--texte)' }}
                  >
                    {suivante.nomCourt} →
                  </Link>
                </div>
                <Link href="/contact" className="btn btn-principal">
                  Parler d’un projet similaire
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Pied />

      <style>{`
        @media (max-width: 860px) {
          .grille-etude { grid-template-columns: minmax(0, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
