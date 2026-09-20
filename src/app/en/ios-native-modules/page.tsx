import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/en/Header';
import Footer from '@/components/en/Footer';
import Apparait from '@/components/Apparait';
import CarteApp from '@/components/CarteApp';
import { appParSlug } from '@/content/apps';
import { profileEn } from '@/content/en/profil';
import { alternatives } from '@/lib/langues';
import LienEvitement from '@/components/LienEvitement';

export const metadata: Metadata = {
  title: 'Live Activities and Widgets in React Native',
  description:
    'Live Activities, Dynamic Island, App Intents, widgets and Watch apps added to existing React Native projects. Written in Swift, shipped in production.',
  alternates: alternatives('/en/ios-native-modules'),
  openGraph: {
    title: 'Native iOS features, added to your React Native app',
    description:
      'Live Activities, App Intents, widgets, Watch companions. Written in Swift, bridged properly, shipped through App Review.',
    url: '/en/ios-native-modules',
    images: ['/assets/images/og.png'],
    locale: 'en_GB',
  },
};

/**
 * Chaque module décrit une capacité réellement livrée, avec l'application qui
 * le prouve. Rien ici n'est théorique : les huit apps sont sur l'App Store.
 */
const modules = [
  {
    api: 'ActivityKit',
    title: 'Live Activities and the Dynamic Island',
    body: 'A countdown, a delivery, a match score that stays on the Lock Screen and in the Dynamic Island without anyone reopening the app. Three layouts to get right — compact, minimal, expanded — and update budgets Apple enforces quietly.',
    proof: 'Shipped in Ticket, a parking timer, and in Qindil for prayer times.',
    app: 'ticket',
  },
  {
    api: 'App Intents',
    title: 'Siri, Shortcuts and the Control Center',
    body: 'Actions your app exposes to the system: a Siri phrase, a Shortcuts block, a Control Center button that works without unlocking the phone. Since WWDC 2026 this is the only route — SiriKit is deprecated, and apps still using it are invisible to the new Siri.',
    proof:
      'Ticket starts a parking session from Siri, from an NFC tag, or from the Control Center.',
    app: 'ticket',
  },
  {
    api: 'WidgetKit',
    title: 'Home screen and Lock Screen widgets',
    body: 'The widget itself is straightforward. The part that breaks is data: an App Group, a shared store, and a refresh policy that decides when iOS actually redraws it. Most widgets that show stale data fail here.',
    proof: 'Widgets in Pilou, Amiens and Qindil, each reading data the React Native side writes.',
    app: 'pilou',
  },
  {
    api: 'SwiftUI + WatchConnectivity',
    title: 'An Apple Watch companion',
    body: 'React Native does not run on watchOS. The watch app is SwiftUI, full stop. What can be shared is the model and the logic; what has to be written twice is the interface. Worth knowing before anyone promises otherwise.',
    proof: 'Watch apps in Qindil and in Amiens · Bus & Vélam.',
    app: 'qindil',
  },
  {
    api: 'Core NFC',
    title: 'NFC tags',
    body: 'Reading a tag to trigger an action, with the entitlement and the background reading mode that makes it work without opening the app first.',
    proof: 'Ticket starts a parking session from a tag stuck to the dashboard.',
    app: 'ticket',
  },
  {
    api: 'Offline first',
    title: 'Apps that work with no signal',
    body: 'Not a cache bolted on afterwards, but a decision taken before the first screen: what ships inside the binary, what syncs, and what the app shows when it has nothing.',
    proof: 'Isogonic makes no network call, ever. Amiens embeds the full timetable.',
    app: 'isogonic',
  },
];

export default function NativeModules() {
  const showcase = ['ticket', 'qindil', 'pilou'].map(appParSlug).filter((a) => a !== undefined);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Native iOS module development for React Native apps',
    provider: { '@type': 'Person', name: profileEn.name, url: `${profileEn.site}/en` },
    description:
      'Live Activities, App Intents, widgets, Apple Watch companions and NFC added to existing React Native applications.',
    areaServed: { '@type': 'Place', name: 'Remote' },
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
              <span>Native iOS modules</span>
            </nav>

            <div style={{ maxWidth: 760 }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                The part React Native does not cover
              </p>
              <h1 className="t-h1">Native iOS features, added to your React Native app.</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Your app works. Then someone asks for a Live Activity, a widget, a Siri shortcut or
                a Watch app, and the JavaScript runs out. That is the moment most teams either drop
                the feature or hire an iOS contractor who does not know the codebase.
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
                  Tell me what you need
                </Link>
                <Link href="/en/apps" className="btn btn-secondaire btn-large">
                  See it shipped
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections">
            <section className="section" aria-labelledby="t-modules">
              <div className="section-tete">
                <p className="etiquette">What I add</p>
                <h2 id="t-modules" className="t-h2">
                  Six things, all of them shipped.
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {modules.map((m, i) => (
                  <Apparait
                    key={m.api}
                    style={{
                      paddingBlock: 'var(--e-5)',
                      borderTop: i === 0 ? 'none' : '1px solid var(--trait)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 'var(--e-2)',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        marginBottom: 'var(--e-2)',
                      }}
                    >
                      <h3 className="t-h3">{m.title}</h3>
                      <span className="pastille t-mono">{m.api}</span>
                    </div>
                    <p
                      className="t-corps t-2"
                      style={{ maxWidth: 720, marginBottom: 'var(--e-3)' }}
                    >
                      {m.body}
                    </p>
                    <p className="t-petit" style={{ color: 'var(--action)' }}>
                      {m.proof}
                    </p>
                  </Apparait>
                ))}
              </div>
            </section>

            {/* ── THE SIRIKIT WARNING ──────────────────────────────────── */}
            <Apparait as="section" className="encadre encadre--attention" style={{ maxWidth: 820 }}>
              <div>
                <p className="t-h3" style={{ marginBottom: 'var(--e-2)' }}>
                  If your app still uses SiriKit, it is already invisible to Siri.
                </p>
                <p className="t-corps t-2">
                  Apple deprecated SiriKit at WWDC 2026. Since iOS 27, apps built on it still
                  compile, but receive no voice traffic, no Spotlight indexing and no Apple
                  Intelligence personalisation. The two frameworks are not interchangeable: an
                  existing SiriKit integration has to be deliberately ported to App Intents, not
                  flipped over. If that applies to you, it is worth looking at sooner rather than
                  later.
                </p>
              </div>
            </Apparait>

            <section className="section" aria-labelledby="t-proof">
              <div className="section-tete">
                <p className="etiquette">Installed, not described</p>
                <h2 id="t-proof" className="t-h2">
                  You can download these right now.
                </h2>
              </div>
              <div className="grille grille-3">
                {showcase.map((app, i) => (
                  <Apparait key={app.slug} retard={(i % 3) as 0 | 1 | 2}>
                    <CarteApp app={app} prioritaire langue="en" />
                  </Apparait>
                ))}
              </div>
            </section>

            <Apparait as="section" className="creux">
              <div style={{ maxWidth: 640 }}>
                <h2 className="t-h2" style={{ marginBottom: 'var(--e-4)' }}>
                  Which feature is blocking you?
                </h2>
                <p className="t-lead" style={{ marginBottom: 'var(--e-5)' }}>
                  Describe it in a few lines and I will tell you how I would approach it, including
                  whether it is worth doing at all.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)' }}>
                  <Link href="/en/contact" className="btn btn-principal btn-large">
                    Get in touch
                  </Link>
                  <Link href="/en/react-native-audit" className="btn btn-secondaire btn-large">
                    Or start with an audit
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
