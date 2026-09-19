import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import Apparait from '@/components/Apparait';
import { disponibilite, profil } from '@/content/profil';

export const metadata: Metadata = {
  title: 'Développeur freelance à Amiens',
  description:
    'Développeur freelance à Amiens : applications mobiles, sites et outils métier sur mesure. Un interlocuteur unique, pas d’agence intermédiaire.',
  alternates: { canonical: '/developpeur-freelance-amiens' },
  openGraph: {
    title: 'Développeur freelance à Amiens',
    description: 'Applications mobiles, plateformes web et outils métier. Un seul interlocuteur.',
    url: '/developpeur-freelance-amiens',
    images: ['/assets/images/og.png'],
  },
};

const faq = [
  {
    q: 'Travaillez-vous uniquement avec des entreprises amiénoises ?',
    r: 'Non. Je suis basé à Amiens, ce qui rend les rencontres faciles dans les Hauts-de-France, mais la majorité du travail se fait très bien à distance. J’ai des interlocuteurs ailleurs en France.',
  },
  {
    q: 'Peut-on se rencontrer avant de s’engager ?',
    r: 'Oui, et je le recommande pour un premier projet. Un café à Amiens ou un appel de trente minutes : dans les deux cas, l’objectif est de comprendre votre besoin et de vous dire honnêtement si je suis la bonne personne.',
  },
  {
    q: 'Faites-vous aussi des sites web ?',
    r: 'Oui, notamment quand ils accompagnent une application : site de présentation, espace client, back-office. Pour un site vitrine seul, c’est plutôt l’enseigne Capmedia Digital qui répond, avec le même interlocuteur.',
  },
  {
    q: 'Comment se passe la facturation ?',
    r:
      'Devis avant le début des travaux, puis facturation par jalons sur les projets longs. L’activité est déclarée depuis novembre 2015 (SIREN ' +
      profil.siren +
      ').',
  },
  {
    q: 'Que se passe-t-il si le projet dépasse ce que vous pouvez faire seul ?',
    r: 'Je le dis avant de commencer, pas au milieu. Un projet qui demande plusieurs développeurs en parallèle n’est pas pour moi, et l’annoncer tôt vous fait gagner du temps.',
  },
];

export default function FreelanceAmiens() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: `${profil.nom} · développeur freelance`,
      url: `${profil.site}/developpeur-freelance-amiens`,
      description:
        'Développeur freelance à Amiens : applications mobiles, plateformes web et outils métier sur mesure.',
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
      ],
      email: `mailto:${profil.email}`,
      telephone: profil.telephone,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((x) => ({
        '@type': 'Question',
        name: x.q,
        acceptedAnswer: { '@type': 'Answer', text: x.r },
      })),
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
              <span>Développeur freelance à Amiens</span>
            </nav>

            <div style={{ maxWidth: 740 }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Amiens · Hauts-de-France
              </p>
              <h1 className="t-h1">Développeur freelance à Amiens.</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Applications mobiles, plateformes web et outils métier sur mesure. Vous parlez
                directement à la personne qui développe : pas de commercial, pas de chef de projet
                intermédiaire, pas de sous-traitance.
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
                  Les 8 applications publiées
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections">
            <section className="article-corps">
              <h2>Ce que je fais</h2>
              <p>
                Mon cœur de métier, c’est l’application mobile : iOS et Android, en React Native,
                avec du code natif quand le système l’exige. Huit applications sont aujourd’hui en
                ligne sur l’App Store, conçues, développées et publiées de bout en bout. L’une
                d’elles porte sur le réseau de bus amiénois.
              </p>
              <p>
                Autour de ça, je construis ce que l’application nécessite : une API, une base de
                données, un back-office pour administrer le contenu, un site de présentation. Et
                quand il n’y a pas d’application, mais un outil métier à fabriquer, c’est le même
                travail.
              </p>

              <h2>Pourquoi un indépendant plutôt qu’une agence</h2>
              <p>
                Une agence apporte une capacité : plusieurs personnes en parallèle, une continuité
                si quelqu’un part, des compétences variées. C’est un vrai avantage sur les gros
                projets, et je ne vais pas prétendre le contraire.
              </p>
              <p>
                Ce que j’apporte est différent. Ce que vous dites arrive sans déformation jusqu’au
                code, parce que la personne qui écoute est celle qui développe. Les arbitrages
                techniques se prennent dans l’heure. Et quand quelque chose casse en production,
                vous savez qui appeler.
              </p>
              <p>
                La contrepartie est réelle et je préfère l’annoncer : je suis seul. Un projet qui
                demande cinq développeurs simultanés n’est pas pour moi, et je le dis avant de
                commencer.
              </p>

              <h2>Être à Amiens, concrètement</h2>
              <p>
                Pour une entreprise du territoire, ça veut dire qu’on peut se voir. Un premier
                cadrage se fait bien mieux autour d’une table qu’en visioconférence, surtout quand
                il s’agit de comprendre un métier que je ne connais pas encore.
              </p>
              <p>
                Pour le reste de la France, ça ne change rien : le travail se fait à distance, avec
                des points réguliers et des versions installables tôt.
              </p>
            </section>

            <section className="section" aria-labelledby="t-faq">
              <div className="section-tete">
                <p className="etiquette">Questions fréquentes</p>
                <h2 id="t-faq" className="t-h2">
                  Ce qu’on me demande souvent.
                </h2>
              </div>

              <div style={{ maxWidth: 780 }}>
                {faq.map((x, i) => (
                  <details key={x.q} className="acc" open={i === 0}>
                    <summary>
                      {x.q}
                      <svg
                        className="chevron"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </summary>
                    <div className="corps-acc">{x.r}</div>
                  </details>
                ))}
              </div>
            </section>

            <Apparait as="section" className="creux">
              <div style={{ maxWidth: 620 }}>
                <h2 className="t-h2" style={{ marginBottom: 'var(--e-4)' }}>
                  Le premier échange ne coûte rien.
                </h2>
                <p className="t-lead" style={{ marginBottom: 'var(--e-5)' }}>
                  Décrivez-moi votre besoin en quelques lignes. Je réponds sous{' '}
                  {disponibilite.delaiReponse}, et je vous dis franchement quand ce n’est pas pour
                  moi.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)' }}>
                  <Link href="/contact" className="btn btn-principal btn-large">
                    Me contacter
                  </Link>
                  <Link
                    href="/developpeur-application-mobile-amiens"
                    className="btn btn-secondaire btn-large"
                  >
                    Développeur mobile à Amiens
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
