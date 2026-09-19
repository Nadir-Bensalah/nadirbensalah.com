import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/en/Header';
import Footer from '@/components/en/Footer';
import Apparait from '@/components/Apparait';
import { profileEn } from '@/content/en/profil';
import { alternatives } from '@/lib/langues';

export const metadata: Metadata = {
  title: 'React Native Code Audit — Fixed Scope, One Week',
  description:
    'An independent audit of your React Native codebase: architecture, performance, native modules and App Store risk. A prioritised report, not a sales pitch.',
  alternates: alternatives('/en/react-native-audit'),
  openGraph: {
    title: 'An independent audit of your React Native codebase',
    description:
      'Architecture, performance, technical debt and App Store risk. A written report ordered by priority, with effort estimates.',
    url: '/en/react-native-audit',
    images: ['/assets/images/og.png'],
    locale: 'en_GB',
  },
};

const axes = [
  {
    title: 'Architecture',
    points: [
      'How state moves through the app, and where it leaks',
      'Coupling between screens and business logic',
      'What will make the next feature expensive',
      'Native modules: how they are bridged, and whether they survive an upgrade',
    ],
  },
  {
    title: 'Performance',
    points: [
      'Start-up time and bundle size',
      'Long lists, images, renders that fire for nothing',
      'Network calls: how many, how large, cached or not',
      'Behaviour on the oldest device you claim to support',
    ],
  },
  {
    title: 'Technical debt',
    points: [
      'Dependencies abandoned or several major versions behind',
      'Dead code, duplication, workarounds that became permanent',
      'What the tests actually prove, as opposed to how many there are',
      'What breaks at the next iOS release',
    ],
  },
  {
    title: 'App Store risk',
    points: [
      'Privacy manifest against the SDKs really bundled',
      'In-app purchases and restore flow',
      'Permission strings and empty states',
      'SiriKit usage, which since iOS 27 makes an app invisible to Siri',
    ],
  },
];

export default function Audit() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'React Native code audit',
    provider: { '@type': 'Person', name: profileEn.name, url: `${profileEn.site}/en` },
    description:
      'Independent audit of a React Native codebase covering architecture, performance, technical debt and App Store compliance.',
    areaServed: { '@type': 'Place', name: 'Remote' },
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
              <span>Code audit</span>
            </nav>

            <div style={{ maxWidth: 760 }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Fixed scope, one week
              </p>
              <h1 className="t-h1">An independent audit of your React Native codebase.</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                You inherited an app. Or your team says it needs a rewrite and you want a second
                opinion. Or a submission keeps getting rejected and nobody can say why. A week of
                reading, and a written report that says what to fix first.
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
                  Request an audit
                </Link>
                <Link href="/en/apps" className="btn btn-secondaire btn-large">
                  See what I&apos;ve built
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections">
            <section className="section" aria-labelledby="t-axes">
              <div className="section-tete">
                <p className="etiquette">What gets read</p>
                <h2 id="t-axes" className="t-h2">
                  Four axes, in that order.
                </h2>
              </div>

              <div className="grille grille-2">
                {axes.map((a, i) => (
                  <Apparait key={a.title} retard={(i % 2) as 0 | 1} className="carte">
                    <h3 className="t-h3" style={{ marginBottom: 'var(--e-4)' }}>
                      {a.title}
                    </h3>
                    <ul className="liste-marque">
                      {a.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </Apparait>
                ))}
              </div>
            </section>

            <section className="section" aria-labelledby="t-deliverable">
              <div className="section-tete">
                <p className="etiquette">What you get</p>
                <h2 id="t-deliverable" className="t-h2">
                  A document your team can act on.
                </h2>
              </div>

              <div style={{ maxWidth: 740 }}>
                <ul className="liste-marque">
                  <li style={{ fontSize: 16.5 }}>
                    A written report ordered by priority: what blocks you, what gets expensive
                    later, what can wait.
                  </li>
                  <li style={{ fontSize: 16.5 }}>
                    For each finding: the observation, the concrete consequence, and the fix I would
                    apply.
                  </li>
                  <li style={{ fontSize: 16.5 }}>
                    An effort estimate per item, so you can decide for yourself what is worth doing.
                  </li>
                  <li style={{ fontSize: 16.5 }}>
                    An hour together to walk through it and answer questions.
                  </li>
                </ul>

                <div className="encadre encadre--astuce" style={{ marginTop: 'var(--e-5)' }}>
                  <div>
                    <strong style={{ color: 'var(--texte)' }}>What the audit is not.</strong> It is
                    not a proposal in disguise. If the report concludes your app is in good shape
                    and needs nobody, that is what it will say. The report is yours, including to
                    hand to somebody else for the work.
                  </div>
                </div>
              </div>
            </section>

            <section className="section" aria-labelledby="t-when">
              <div className="section-tete">
                <p className="etiquette">When it helps</p>
                <h2 id="t-when" className="t-h2">
                  The situations that bring people here.
                </h2>
              </div>
              <div style={{ maxWidth: 740 }}>
                <ul className="liste-marque">
                  <li style={{ fontSize: 16.5 }}>
                    You inherited an app from a developer or agency who is no longer around.
                  </li>
                  <li style={{ fontSize: 16.5 }}>
                    A submission keeps getting rejected and the reason is never clear.
                  </li>
                  <li style={{ fontSize: 16.5 }}>
                    Your team wants to rewrite from scratch and you are not sure that is right.
                  </li>
                  <li style={{ fontSize: 16.5 }}>
                    You are about to hire, and you want to know what the role actually needs to
                    cover.
                  </li>
                  <li style={{ fontSize: 16.5 }}>
                    The app got slow and nobody can say where the time goes.
                  </li>
                </ul>
              </div>
            </section>

            <Apparait as="section" className="creux">
              <div style={{ maxWidth: 640 }}>
                <h2 className="t-h2" style={{ marginBottom: 'var(--e-4)' }}>
                  Tell me about the codebase.
                </h2>
                <p className="t-lead" style={{ marginBottom: 'var(--e-5)' }}>
                  A few lines about the situation is enough for me to say whether an audit is the
                  right move, and what I would look at first.
                </p>
                <Link href="/en/contact" className="btn btn-principal btn-large">
                  Request an audit
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
