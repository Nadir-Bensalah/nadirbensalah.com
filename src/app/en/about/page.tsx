import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/en/Header';
import Footer from '@/components/en/Footer';
import Apparait from '@/components/Apparait';
import { profileEn } from '@/content/en/profil';
import { alternatives } from '@/lib/langues';

export const metadata: Metadata = {
  title: 'About Nadir Ben Salah — React Native Developer',
  description:
    'Independent developer in France. How I work, my hours relative to London and New York, and what I take on. English and French.',
  alternates: alternatives('/en/about'),
  openGraph: {
    title: 'How I work',
    description: 'Independent React Native developer in France, working remotely.',
    url: '/en/about',
    images: ['/assets/images/og.png'],
    locale: 'en_GB',
  },
};

export default function About() {
  return (
    <>
      <a href="#content" className="saute-au-contenu">
        Skip to content
      </a>
      <Header />

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
              <span>About</span>
            </nav>

            <div style={{ maxWidth: 740 }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                About
              </p>
              <h1 className="t-h1">How I work.</h1>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections">
            <section className="article-corps">
              <p style={{ fontSize: 19 }}>
                I am Nadir Ben Salah. I build mobile apps from Amiens, in northern France, and I
                have been doing this kind of work for about ten years.
              </p>

              <h2>What a year of publishing taught me</h2>
              <p>
                In September 2025 I put my first app on the App Store. It was a party game, and
                honestly there is nothing remarkable about it. What it taught me does not exist in
                any tutorial: the developer account, signing, certificates, the listing, the
                screenshots, the privacy questionnaire, and above all what App Review actually looks
                at.
              </p>
              <p>
                The other seven came out roughly a year later, between 7 August and 2 September
                2026, after eleven months of building them in parallel. Each one was chosen to force
                a constraint the previous ones had not. A flight computer that must make{' '}
                <strong>no network call at all</strong>, because there is no signal in a cockpit. A
                parking timer that has to live in the Dynamic Island, so Swift, and fit in 3.3 MB. A
                pet health record you can verify in airplane mode, because claiming a server does
                not exist is easy and proving it is not.
              </p>
              <p>
                That has become how I work: decide the constraint before the first line of code,
                then hold it all the way to release. A constraint you abandon halfway has taught
                nobody anything.
              </p>

              <h2>The technical part</h2>
              <p>
                React Native and TypeScript for the shared trunk, Swift for everything the framework
                cannot reach: widgets, Live Activities, App Intents, Apple Watch, NFC. On the server
                side, Node.js, Firebase, Supabase or PostgreSQL depending on what the product needs,
                never on what is fashionable.
              </p>
              <p>
                But the technology is not the point. The point is that a product ends up in somebody{' '}
                <em>else&apos;s</em> hands. Between a working repository and an app installed on a
                stranger&apos;s phone there is an entire job that most projects underestimate, and
                it is where most of them stop.
              </p>

              <h2>Working with me</h2>
              <p>
                I say what I do not know how to do. I would rather scope something smaller and ship
                it than promise widely and disappoint. When a project does not justify a mobile app
                at all, I say so, even when that is against my own interest.
              </p>
              <p>
                I like explicit constraints, written decisions, and installable builds early. A
                mockup does not tell the truth about a product; a phone in your hand tells it
                immediately.
              </p>

              <h2>Practicalities</h2>
              <p>
                I am in France, so {profileEn.timezone.toLowerCase()}. I invoice as a registered
                sole trader, which for a UK or US company is an ordinary international supplier
                invoice, with no employer of record and no umbrella company involved.
              </p>
              <p>
                My written English is solid, including for code review, specs and documentation.
                Calls are fine. I am not going to pretend to be a native speaker, and if a role
                needs client-facing presentations in English every day, somebody else is a better
                fit. I would rather say that now than three weeks in.
              </p>
            </section>

            <Apparait as="section" className="creux">
              <div style={{ maxWidth: 620 }}>
                <h2 className="t-h2" style={{ marginBottom: 'var(--e-4)' }}>
                  Next
                </h2>
                <p className="t-lead" style={{ marginBottom: 'var(--e-5)' }}>
                  The apps are there to be inspected. The CV is there if your process needs it. And
                  I answer messages.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)' }}>
                  <Link href="/en/apps" className="btn btn-principal btn-large">
                    See the apps
                  </Link>
                  <a href={profileEn.cv} download className="btn btn-secondaire btn-large">
                    Download CV
                  </a>
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
