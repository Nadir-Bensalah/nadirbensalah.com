import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import Apparait from '@/components/Apparait';
import CarteApp from '@/components/CarteApp';
import { appParSlug, apps } from '@/content/apps';
import { disponibilite, profil } from '@/content/profil';

export const metadata: Metadata = {
  title: 'Développeur application mobile à Amiens',
  description:
    'Développeur mobile indépendant à Amiens. Applications iOS et Android en React Native, dont une sur le réseau de bus amiénois.',
  alternates: { canonical: '/developpeur-application-mobile-amiens' },
  openGraph: {
    title: 'Développeur d’applications mobiles à Amiens',
    description:
      'Des applications publiées sur l’App Store, dont une construite sur les données ouvertes du réseau amiénois.',
    url: '/developpeur-application-mobile-amiens',
    images: ['/assets/images/og.png'],
  },
};

export default function AmiensMobile() {
  const amiens = appParSlug('amiens-bus-velam')!;
  const autres = [apps[0], apps[1]];

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: `${profil.nom} · développeur d’applications mobiles`,
      url: `${profil.site}/developpeur-application-mobile-amiens`,
      description:
        'Développeur d’applications mobiles indépendant basé à Amiens. Applications iOS et Android en React Native, de la conception à la publication.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Amiens',
        addressRegion: 'Hauts-de-France',
        postalCode: '80000',
        addressCountry: 'FR',
      },
      areaServed: [
        { '@type': 'City', name: 'Amiens' },
        { '@type': 'AdministrativeArea', name: 'Hauts-de-France' },
        { '@type': 'Country', name: 'France' },
      ],
      provider: { '@type': 'Person', name: profil.nom, url: profil.site },
      email: `mailto:${profil.email}`,
      telephone: profil.telephone,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: profil.site },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Développeur mobile à Amiens',
          item: `${profil.site}/developpeur-application-mobile-amiens`,
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
              <span>Développeur mobile à Amiens</span>
            </nav>

            <div style={{ maxWidth: 740 }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Amiens · Hauts-de-France
              </p>
              <h1 className="t-h1">Développeur d’applications mobiles à Amiens.</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Je vis à Amiens, j’y ai fait mes études, et l’une de mes applications est construite
                sur les données ouvertes du réseau de bus amiénois. Si vous cherchez quelqu’un de
                joignable, avec qui on peut prendre un café pour cadrer un projet, c’est faisable.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--e-3)',
                  marginTop: 'var(--e-6)',
                }}
              >
                <Link href="/contact" className="btn btn-principal btn-large">
                  Parler de votre projet
                </Link>
                <Link href="/realisations" className="btn btn-secondaire btn-large">
                  Voir les réalisations
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections">
            {/* ── LA PREUVE LOCALE ─────────────────────────────────────── */}
            <section className="section" aria-labelledby="t-local">
              <div className="section-tete">
                <p className="etiquette">La preuve locale</p>
                <h2 id="t-local" className="t-h2">
                  J’ai développé une application pour le réseau de bus d’Amiens.
                </h2>
                <p className="t-lead" style={{ maxWidth: 680 }}>
                  Pas une démonstration : une application publiée sur l’App&nbsp;Store, utilisée par
                  des Amiénois, construite sur les données ouvertes du réseau et la fiche horaire
                  embarquée pour fonctionner sans réseau. Elle affiche aussi les vélos Vélam en
                  temps réel.
                </p>
              </div>

              <div className="grille grille-3">
                <Apparait>
                  <CarteApp app={amiens} prioritaire />
                </Apparait>
                {autres.map((app, i) => (
                  <Apparait key={app.slug} retard={((i + 1) % 3) as 0 | 1 | 2}>
                    <CarteApp app={app} prioritaire />
                  </Apparait>
                ))}
              </div>

              <div className="encadre" style={{ maxWidth: 760 }}>
                <div>
                  L’application Amiens · Bus &amp; Vélam est indépendante : elle n’est affiliée ni à
                  l’exploitant du réseau, ni à Amiens Métropole. Elle s’appuie sur les données
                  publiées sur transport.data.gouv.fr sous Licence Ouverte 2.0.
                </div>
              </div>
            </section>

            {/* ── CE QUE JE FAIS ───────────────────────────────────────── */}
            <section className="section" aria-labelledby="t-fais">
              <div className="section-tete">
                <p className="etiquette">Pour les entreprises du territoire</p>
                <h2 id="t-fais" className="t-h2">
                  Ce que je peux construire.
                </h2>
              </div>
              <div style={{ maxWidth: 720 }}>
                <ul className="liste-marque">
                  <li style={{ fontSize: 16.5 }}>
                    Une application mobile iOS et Android, de la première maquette à la publication
                    sur les stores.
                  </li>
                  <li style={{ fontSize: 16.5 }}>
                    Un outil métier pour vos équipes : saisie terrain, suivi d’intervention,
                    consultation hors ligne.
                  </li>
                  <li style={{ fontSize: 16.5 }}>
                    Une plateforme web, un espace client ou un back-office adossé à la même base de
                    données.
                  </li>
                  <li style={{ fontSize: 16.5 }}>
                    La reprise d’une application existante, bloquée ou abandonnée par un prestataire
                    précédent.
                  </li>
                </ul>
              </div>
            </section>

            {/* ── POURQUOI UN INDÉPENDANT ──────────────────────────────── */}
            <section className="section" aria-labelledby="t-pourquoi">
              <div className="section-tete">
                <p className="etiquette">Ce que ça change</p>
                <h2 id="t-pourquoi" className="t-h2">
                  Vous parlez à la personne qui écrit le code.
                </h2>
              </div>
              <div className="grille grille-3">
                {[
                  [
                    'Pas d’intermédiaire',
                    'Ce que vous dites en réunion arrive sans déformation jusqu’au code, parce que c’est la même personne qui écoute et qui développe.',
                  ],
                  [
                    'Des arbitrages rapides',
                    'Une question technique trouve sa réponse dans l’heure, pas après un aller-retour entre un chef de projet et une équipe.',
                  ],
                  [
                    'Une limite assumée',
                    'Je suis seul. Sur un projet qui demande cinq développeurs en parallèle, je vous le dirai plutôt que d’accepter et de tenir un an.',
                  ],
                ].map(([titre, texte], i) => (
                  <Apparait key={titre} retard={(i % 3) as 0 | 1 | 2} className="carte-creuse">
                    <h3 className="t-h3" style={{ marginBottom: 'var(--e-2)', fontSize: 17 }}>
                      {titre}
                    </h3>
                    <p className="t-petit t-2">{texte}</p>
                  </Apparait>
                ))}
              </div>
            </section>

            <Apparait as="section" className="creux">
              <div style={{ maxWidth: 620 }}>
                <h2 className="t-h2" style={{ marginBottom: 'var(--e-4)' }}>
                  On peut se voir.
                </h2>
                <p className="t-lead" style={{ marginBottom: 'var(--e-5)' }}>
                  À Amiens, un café suffit pour un premier cadrage. Ailleurs, un appel de trente
                  minutes fait le même travail. Je réponds sous {disponibilite.delaiReponse}.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)' }}>
                  <Link href="/contact" className="btn btn-principal btn-large">
                    Me contacter
                  </Link>
                  <Link
                    href="/developpeur-freelance-amiens"
                    className="btn btn-secondaire btn-large"
                  >
                    Développeur freelance à Amiens
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
