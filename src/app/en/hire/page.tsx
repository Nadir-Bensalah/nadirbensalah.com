import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/en/Header';
import Footer from '@/components/en/Footer';
import Apparait from '@/components/Apparait';
import CarteApp from '@/components/CarteApp';
import { appParSlug } from '@/content/apps';
import { objectionsEn, profileEn } from '@/content/en/profil';
import { alternatives } from '@/lib/langues';
import LienEvitement from '@/components/LienEvitement';

export const metadata: Metadata = {
  title: 'Hire a React Native Developer, Remote',
  description:
    'Freelance or full-time React Native developer, available remotely. European invoicing, overlapping hours with the UK and US East Coast.',
  alternates: alternatives('/en/hire'),
  openGraph: {
    title: 'Available for React Native contracts and full-time roles',
    description:
      'Remote from France. European invoicing, UK hours, four hours of overlap with New York.',
    url: '/en/hire',
    images: ['/assets/images/og.png'],
    locale: 'en_GB',
  },
};

const fits = [
  {
    title: 'A native feature nobody on the team can build',
    body: 'Live Activities, App Intents, a widget, a Watch app. Usually a short, sharply defined engagement: I write the Swift, bridge it, and hand it back documented.',
  },
  {
    title: 'A React Native codebase in trouble',
    body: 'Inherited, stalled, or repeatedly rejected by App Review. Start with an audit, then decide together what is worth doing.',
  },
  {
    title: 'Reinforcing a team that already exists',
    body: 'Code review, pairing on the native layer, setting up the release pipeline. The aim is that the team keeps going without me.',
  },
  {
    title: 'A full product, from nothing',
    body: 'Scoping, interface, mobile, backend, release. This is what I do on my own apps, so it is the shape I know best. It suits a small company more than a large one.',
  },
];

export default function Hire() {
  const showcase = ['ticket', 'pilou', 'amiens-bus-velam']
    .map(appParSlug)
    .filter((a) => a !== undefined);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'en',
    mainEntity: objectionsEn.map((o) => ({
      '@type': 'Question',
      name: o.q,
      acceptedAnswer: { '@type': 'Answer', text: o.a },
    })),
  };

  return (
    <>
      <LienEvitement cible="#content">Skip to content</LienEvitement>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main id="content">
        <section style={{ paddingTop: 'clamp(40px, 7vw, 80px)', paddingBottom: 'var(--e-7)' }}>
          <div className="enveloppe">
            <nav
              aria-label="Breadcrumb"
              className="t-petit t-3"
              style={{ marginBottom: 'var(--e-5)' }}
            >
              <Link href="/en" className="lien-sobre">
                Home
              </Link>
              <span aria-hidden> › </span>
              <span>Hire me</span>
            </nav>

            <div style={{ maxWidth: 760 }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Availability
              </p>
              <h1 className="t-h1">Available for React Native contracts and full-time roles.</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Remote from France. One hour ahead of London, four usable hours with New York. I
                invoice as a registered European sole trader, which for a UK or US company is an
                ordinary international supplier invoice.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--e-3)',
                  marginTop: 'var(--e-6)',
                }}
              >
                <Link href="/en/contact" className="btn btn-principal btn-large">
                  Tell me about the role
                </Link>
                <a href={profileEn.cv} download className="btn btn-secondaire btn-large">
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections">
            <section className="section" aria-labelledby="t-fits">
              <div className="section-tete">
                <p className="etiquette">Where I fit</p>
                <h2 id="t-fits" className="t-h2">
                  Four shapes of engagement.
                </h2>
              </div>
              <div className="grille grille-2">
                {fits.map((f, i) => (
                  <Apparait key={f.title} retard={(i % 2) as 0 | 1} className="carte">
                    <h3 className="t-h3" style={{ marginBottom: 'var(--e-2)' }}>
                      {f.title}
                    </h3>
                    <p className="t-corps t-2">{f.body}</p>
                  </Apparait>
                ))}
              </div>
            </section>

            <section className="section" aria-labelledby="t-proof">
              <div className="section-tete">
                <p className="etiquette">Verifiable now</p>
                <h2 id="t-proof" className="t-h2">
                  Install one while you read this.
                </h2>
                <p className="t-lead" style={{ maxWidth: 660 }}>
                  A technical test measures what somebody does in an hour, under pressure, on an
                  artificial problem. This measures what I ship, in production, to strangers.
                </p>
              </div>
              <div className="grille grille-3">
                {showcase.map((app, i) => (
                  <Apparait key={app.slug} retard={(i % 3) as 0 | 1 | 2}>
                    <CarteApp app={app} prioritaire langue="en" />
                  </Apparait>
                ))}
              </div>
            </section>

            <section className="section" aria-labelledby="t-questions">
              <div className="section-tete">
                <p className="etiquette">The practical questions</p>
                <h2 id="t-questions" className="t-h2">
                  Answered before you have to ask.
                </h2>
              </div>
              <div style={{ maxWidth: 780 }}>
                {objectionsEn.map((o, i) => (
                  <details key={o.q} className="acc" open={i === 0}>
                    <summary>
                      {o.q}
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
                    <div className="corps-acc">{o.a}</div>
                  </details>
                ))}
              </div>
            </section>

            <Apparait as="section" className="creux">
              <div style={{ maxWidth: 620 }}>
                <h2 className="t-h2" style={{ marginBottom: 'var(--e-4)' }}>
                  What are you working on?
                </h2>
                <p className="t-lead" style={{ marginBottom: 'var(--e-5)' }}>
                  A few lines is enough. I reply within a day, and I say so when it is not for me.
                </p>
                <Link href="/en/contact" className="btn btn-principal btn-large">
                  Get in touch
                </Link>
              </div>
            </Apparait>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
