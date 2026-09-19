import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import Apparait from '@/components/Apparait';
import CarteApp from '@/components/CarteApp';
import { apps, appsClient, appsPersonnelles } from '@/content/apps';
import { profil } from '@/content/profil';
import { alternatives } from '@/lib/langues';

export const metadata: Metadata = {
  title: 'Les 8 applications publiées sur l’App Store',
  description:
    'Ce que j’ai conçu, développé et publié sur l’App Store : contexte, contraintes techniques et choix d’architecture, application par application.',
  alternates: alternatives('/realisations'),
  openGraph: {
    title: 'Ce que j’ai conçu, développé et publié',
    description:
      'Contexte, contraintes techniques et choix d’architecture, application par application.',
    url: '/realisations',
    images: ['/assets/images/og.png'],
  },
};

export default function Realisations() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Les applications publiées',
    description:
      'Les applications conçues, développées et publiées sur l’App Store par Nadir Ben Salah.',
    url: `${profil.site}/realisations`,
    hasPart: apps.map((a) => ({
      '@type': 'SoftwareApplication',
      name: a.nom,
      applicationCategory: 'MobileApplication',
      operatingSystem: `iOS ${a.iosMini}+`,
      url: `${profil.site}/realisations/${a.slug}`,
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
        <section style={{ paddingTop: 'clamp(40px, 7vw, 80px)', paddingBottom: 'var(--e-7)' }}>
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
              <span>Réalisations</span>
            </nav>

            <div style={{ maxWidth: 720 }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Les réalisations
              </p>
              <h1 className="t-h1">Huit applications conçues, développées et publiées.</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Sept sous mon propre compte développeur, une pour un client. Toutes sont
                téléchargeables aujourd’hui. Chaque étude de cas raconte la contrainte de départ, ce
                qu’elle a imposé à l’architecture, et ce que le projet démontre.
              </p>
              <p className="t-petit t-3" style={{ marginTop: 'var(--e-4)' }}>
                Données relevées sur l’App&nbsp;Store le 19 septembre 2026. Aucune note ni aucun
                chiffre de téléchargement n’est affiché : l’effectif réel est trop faible pour
                signifier quoi que ce soit.
              </p>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections">
            <section className="section" aria-labelledby="titre-perso">
              <div className="section-tete">
                <h2 id="titre-perso" className="t-h2">
                  Mes produits
                </h2>
                <p className="t-lead" style={{ maxWidth: 620 }}>
                  Conçus, développés, publiés et maintenus seul. Personne d’autre pour arbitrer,
                  dessiner, corriger ou répondre à la revue Apple.
                </p>
              </div>
              <div className="grille grille-3">
                {appsPersonnelles.map((app, i) => (
                  <Apparait key={app.slug} retard={(i % 3) as 0 | 1 | 2}>
                    <CarteApp app={app} prioritaire={i < 3} />
                  </Apparait>
                ))}
              </div>
            </section>

            <section className="section" aria-labelledby="titre-client">
              <div className="section-tete">
                <h2 id="titre-client" className="t-h2">
                  Pour un client
                </h2>
                <p className="t-lead" style={{ maxWidth: 620 }}>
                  Le même travail, avec les contraintes de quelqu’un d’autre : son calendrier, son
                  périmètre et ses arbitrages.
                </p>
              </div>
              <div className="grille grille-3">
                {appsClient.map((app) => (
                  <Apparait key={app.slug}>
                    <CarteApp app={app} />
                  </Apparait>
                ))}
              </div>
            </section>

            <Apparait as="section" className="creux">
              <div style={{ maxWidth: 620 }}>
                <h2 className="t-h2" style={{ marginBottom: 'var(--e-3)' }}>
                  Vous voulez voir comment je raisonne sur votre cas ?
                </h2>
                <p className="t-lead" style={{ marginBottom: 'var(--e-5)' }}>
                  Décrivez un problème technique ou produit. Je vous réponds avec la manière dont je
                  l’aborderais, sans engagement.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)' }}>
                  <Link href="/challenge" className="btn btn-principal btn-large">
                    Me soumettre un problème
                  </Link>
                  <Link href="/contact" className="btn btn-secondaire btn-large">
                    Me contacter
                  </Link>
                </div>
              </div>
            </Apparait>
          </div>
        </div>
      </main>

      <Pied />
    </>
  );
}
