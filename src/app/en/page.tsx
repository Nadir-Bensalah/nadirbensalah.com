import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/en/Header';
import Footer from '@/components/en/Footer';
import Apparait from '@/components/Apparait';
import RangeeApps from '@/components/RangeeApps';
import CarteApp from '@/components/CarteApp';
import { apps, appParSlug } from '@/content/apps';
import { objectionsEn, positioningEn, proofsEn, profileEn, servicesEn } from '@/content/en/profil';
import { alternatives } from '@/lib/langues';
import LienEvitement from '@/components/LienEvitement';

export const metadata: Metadata = {
  title: 'React Native Developer Who Writes the Swift Too',
  description:
    'Live Activities, App Intents, widgets and Watch apps added to React Native projects. Eight apps on the App Store. Remote from France, UK hours.',
  alternates: alternatives('/en'),
  openGraph: {
    title: 'React Native developer who writes the Swift too',
    description:
      'Native iOS features in React Native apps: Live Activities, App Intents, widgets, Watch. Shipped in production.',
    url: '/en',
    images: ['/assets/images/og.png'],
    locale: 'en_GB',
    type: 'profile',
  },
};

export default function EnHome() {
  const showcase = ['ticket', 'qindil', 'isogonic'].map(appParSlug).filter((a) => a !== undefined);

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      inLanguage: 'en',
      mainEntity: {
        '@type': 'Person',
        // Le meme identifiant que la version francaise : c'est la meme
        // personne. Deux @id declareraient deux humains homonymes et
        // diviseraient en deux le seul signal d'entite du site.
        '@id': `${profileEn.site}/#personne`,
        name: profileEn.name,
        jobTitle: profileEn.role,
        url: `${profileEn.site}/en`,
        email: `mailto:${profileEn.email}`,
        address: { '@type': 'PostalAddress', addressLocality: 'Amiens', addressCountry: 'FR' },
        sameAs: [profileEn.linkedin, profileEn.github, 'https://capmedia.app'],
        knowsAbout: [
          'React Native',
          'Swift',
          'ActivityKit',
          'App Intents',
          'WidgetKit',
          'SwiftUI',
          'SwiftData',
          'TypeScript',
          'iOS development',
          'App Store submission',
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: 'en',
      mainEntity: objectionsEn.map((o) => ({
        '@type': 'Question',
        name: o.q,
        acceptedAnswer: { '@type': 'Answer', text: o.a },
      })),
    },
  ];

  return (
    <>
      <LienEvitement cible="#content">Skip to content</LienEvitement>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main id="content">
        <section
          style={{ paddingTop: 'clamp(40px, 8vw, 88px)', paddingBottom: 'clamp(40px, 6vw, 72px)' }}
        >
          <div className="enveloppe">
            <div style={{ maxWidth: 800, marginInline: 'auto', textAlign: 'center' }}>
              <Apparait>
                <RangeeApps langue="en" />
              </Apparait>

              <Apparait retard={1}>
                <p
                  className="t-petit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    color: 'var(--texte-2)',
                    marginTop: 'var(--e-5)',
                  }}
                >
                  <span className="point-vert" aria-hidden />
                  Eight apps on the App&nbsp;Store, four with native Swift modules
                </p>
              </Apparait>

              <Apparait retard={1}>
                <h1 className="t-display" style={{ marginTop: 'var(--e-4)' }}>
                  Most React Native work stops where iOS begins.
                </h1>
              </Apparait>

              <Apparait retard={2}>
                <p
                  className="t-lead"
                  style={{ marginTop: 'var(--e-5)', maxWidth: 660, marginInline: 'auto' }}
                >
                  Live Activities, the Dynamic Island, App Intents, widgets, a Watch companion. None
                  of them have a JavaScript equivalent, and that is usually where a project stalls.
                  I write the Swift, bridge it properly, and ship it through App Review.
                </p>
              </Apparait>

              <Apparait retard={3}>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--e-3)',
                    justifyContent: 'center',
                    marginTop: 'var(--e-6)',
                  }}
                >
                  <Link href="/en/ios-native-modules" className="btn btn-principal btn-large">
                    What I can add to your app
                  </Link>
                  <Link href="/en/apps" className="btn btn-secondaire btn-large">
                    See what I&apos;ve shipped
                  </Link>
                </div>
              </Apparait>

              <Apparait retard={4}>
                <p className="t-petit t-3" style={{ marginTop: 'var(--e-5)' }}>
                  Remote from France · {profileEn.timezone}
                </p>
              </Apparait>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections" style={{ paddingBottom: 'var(--e-8)' }}>
            {/* ── THE PROBLEM I SOLVE ──────────────────────────────────── */}
            <Apparait as="section" className="creux">
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                The short version
              </p>
              <p className="t-h2" style={{ maxWidth: 820, fontWeight: 600 }}>
                {positioningEn}
              </p>
            </Apparait>

            {/* ── PROOF ────────────────────────────────────────────────── */}
            <section className="section" aria-labelledby="t-proof">
              <div className="section-tete">
                <p className="etiquette">Why me</p>
                <h2 id="t-proof" className="t-h2">
                  Shipping is a separate job from building.
                </h2>
                <p className="t-lead" style={{ maxWidth: 640 }}>
                  Plenty of developers write code. The work really starts when it has to reach
                  somebody&apos;s phone.
                </p>
              </div>

              <div className="grille grille-2">
                {proofsEn.map((p, i) => (
                  <Apparait key={p.title} retard={(i % 2) as 0 | 1} className="carte-creuse">
                    <h3 className="t-h3" style={{ marginBottom: 'var(--e-2)' }}>
                      {p.title}
                    </h3>
                    <p className="t-corps t-2">{p.body}</p>
                  </Apparait>
                ))}
              </div>
            </section>

            {/* ── SHOWCASE ─────────────────────────────────────────────── */}
            <section className="section" aria-labelledby="t-showcase">
              <div className="section-tete">
                <p className="etiquette">The proof</p>
                <h2 id="t-showcase" className="t-h2">
                  Three apps, three things React Native cannot do alone.
                </h2>
                <p className="t-lead" style={{ maxWidth: 680 }}>
                  A parking timer living in the Dynamic Island. A prayer app with a SwiftUI Watch
                  companion and a Live Activity. A flight computer that makes no network call, ever.
                </p>
              </div>

              <div className="grille grille-3">
                {showcase.map((app, i) => (
                  <Apparait key={app.slug} retard={(i % 3) as 0 | 1 | 2}>
                    <CarteApp app={app} prioritaire langue="en" />
                  </Apparait>
                ))}
              </div>

              <div>
                <Link href="/en/apps" className="btn btn-secondaire">
                  All eight apps
                </Link>
              </div>
            </section>

            {/* ── SERVICES ─────────────────────────────────────────────── */}
            <section className="section" aria-labelledby="t-services">
              <div className="section-tete">
                <p className="etiquette">What I take on</p>
                <h2 id="t-services" className="t-h2">
                  Four kinds of work.
                </h2>
              </div>
              <div className="grille grille-2">
                {servicesEn.map((s, i) => (
                  <Apparait key={s.title} retard={(i % 2) as 0 | 1} className="carte">
                    <h3 className="t-h3" style={{ marginBottom: 'var(--e-2)' }}>
                      {s.title}
                    </h3>
                    <p className="t-corps t-2">{s.body}</p>
                  </Apparait>
                ))}
              </div>
            </section>

            {/* ── OBJECTIONS ───────────────────────────────────────────── */}
            <section className="section" aria-labelledby="t-objections">
              <div className="section-tete">
                <p className="etiquette">Working with someone in France</p>
                <h2 id="t-objections" className="t-h2">
                  The questions you were going to ask anyway.
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

            {/* ── CTA ──────────────────────────────────────────────────── */}
            <Apparait as="section" className="creux">
              <div style={{ maxWidth: 620 }}>
                <h2 className="t-h2" style={{ marginBottom: 'var(--e-4)' }}>
                  Tell me what you&apos;re building.
                </h2>
                <p className="t-lead" style={{ marginBottom: 'var(--e-5)' }}>
                  A stalled project, a native feature you can&apos;t get working, a codebase
                  somebody left behind. I reply within a day, and I say so when it isn&apos;t for
                  me.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)' }}>
                  <Link href="/en/contact" className="btn btn-principal btn-large">
                    Get in touch
                  </Link>
                  <Link href="/en/react-native-audit" className="btn btn-secondaire btn-large">
                    Start with an audit
                  </Link>
                </div>
              </div>
            </Apparait>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
