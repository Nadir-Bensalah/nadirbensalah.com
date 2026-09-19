import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/en/Header';
import Footer from '@/components/en/Footer';
import Apparait from '@/components/Apparait';
import CarteApp from '@/components/CarteApp';
import { apps, appsClient, appsPersonnelles } from '@/content/apps';
import { profileEn } from '@/content/en/profil';
import { alternatives } from '@/lib/langues';

export const metadata: Metadata = {
  title: 'Apps I’ve Shipped on the App Store',
  description:
    'Eight apps published on the App Store, from ActivityKit and App Intents to Core NFC and a SwiftUI Watch companion. What each one demanded.',
  alternates: alternatives('/en/apps'),
  openGraph: {
    title: 'Eight apps on the App Store',
    description:
      'Designed, built and shipped end to end. Live Activities, App Intents, widgets, Watch, NFC, offline-first.',
    url: '/en/apps',
    images: ['/assets/images/og.png'],
    locale: 'en_GB',
  },
};

export default function Apps() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    inLanguage: 'en',
    name: 'Apps shipped on the App Store',
    url: `${profileEn.site}/en/apps`,
    hasPart: apps.map((a) => ({
      '@type': 'SoftwareApplication',
      name: a.nom,
      applicationCategory: 'MobileApplication',
      operatingSystem: `iOS ${a.iosMini}+`,
      url: a.appStoreUrl,
      author: { '@type': 'Person', name: profileEn.name },
    })),
  };

  return (
    <>
      <a href="#content" className="saute-au-contenu">
        Skip to content
      </a>
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
              <span>Apps</span>
            </nav>

            <div style={{ maxWidth: 740 }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                The proof
              </p>
              <h1 className="t-h1">Eight apps on the App&nbsp;Store.</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Seven under my own developer account, one for a client. All of them downloadable
                today. Each case study covers the constraint it started from, what that forced on
                the architecture, and what the project demonstrates.
              </p>
              <p className="t-petit t-3" style={{ marginTop: 'var(--e-4)' }}>
                Figures taken from the App&nbsp;Store on 19 September 2026. No ratings and no
                download numbers are shown: the real sample is far too small to mean anything, and
                inventing one would be worse than showing nothing.
              </p>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections">
            <section className="section" aria-labelledby="t-own">
              <div className="section-tete">
                <h2 id="t-own" className="t-h2">
                  My own products
                </h2>
                <p className="t-lead" style={{ maxWidth: 640 }}>
                  Designed, built, shipped and maintained alone. Nobody else to arbitrate, draw, fix
                  or answer App Review.
                </p>
              </div>
              <div className="grille grille-3">
                {appsPersonnelles.map((app, i) => (
                  <Apparait key={app.slug} retard={(i % 3) as 0 | 1 | 2}>
                    <CarteApp app={app} prioritaire={i < 3} langue="en" />
                  </Apparait>
                ))}
              </div>
            </section>

            <section className="section" aria-labelledby="t-client">
              <div className="section-tete">
                <h2 id="t-client" className="t-h2">
                  For a client
                </h2>
                <p className="t-lead" style={{ maxWidth: 640 }}>
                  The same work, with somebody else&apos;s calendar, scope and trade-offs.
                </p>
              </div>
              <div className="grille grille-3">
                {appsClient.map((app) => (
                  <Apparait key={app.slug}>
                    <CarteApp app={app} langue="en" />
                  </Apparait>
                ))}
              </div>
            </section>

            <Apparait as="section" className="creux">
              <div style={{ maxWidth: 640 }}>
                <h2 className="t-h2" style={{ marginBottom: 'var(--e-4)' }}>
                  Want the same for your app?
                </h2>
                <p className="t-lead" style={{ marginBottom: 'var(--e-5)' }}>
                  Whether it is a native feature you cannot get working, or a codebase somebody left
                  behind, tell me where you are stuck.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)' }}>
                  <Link href="/en/contact" className="btn btn-principal btn-large">
                    Get in touch
                  </Link>
                  <Link href="/en/ios-native-modules" className="btn btn-secondaire btn-large">
                    Native iOS modules
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
