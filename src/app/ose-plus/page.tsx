import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';

export const metadata: Metadata = {
  title: 'Ose+ – Aide et support',
  description:
    'Support de l’application Ose+ : achat unique, restauration d’achat, notifications, langues, suppression des données et contact.',
  alternates: { canonical: '/ose-plus' },
};

const questions: [string, React.ReactNode][] = [
  [
    'J’ai payé et l’application est toujours limitée',
    <>
      Ouvrez l&apos;écran d&apos;achat et touchez <strong>Restaurer un achat</strong>. Ose+
      redemande alors à Apple ce que votre identifiant a acheté. Assurez-vous d&apos;être connecté
      au même identifiant Apple que le jour de l&apos;achat.
    </>,
  ],
  [
    'J’ai changé d’iPhone, dois-je racheter ?',
    <>
      Non. L&apos;achat est lié à votre identifiant Apple, pas à l&apos;appareil. Sur le nouvel
      iPhone, touchez <strong>Restaurer un achat</strong>. Le partage familial est activé : les
      membres de votre famille Apple y ont accès sans repayer.
    </>,
  ],
  [
    'Est-ce un abonnement ?',
    <>
      Non. Ose+ se paie une seule fois et reste débloqué. Il n&apos;y a rien à résilier et rien à
      renouveler.
    </>,
  ],
  [
    'Comment demander un remboursement ?',
    <>
      Les remboursements sont gérés par Apple, pas par moi. Rendez-vous sur{' '}
      <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a> avec votre identifiant
      Apple.
    </>,
  ],
  [
    'L’application n’est pas dans ma langue',
    <>
      Ose+ existe en treize langues et suit celle de votre iPhone. Vous pouvez aussi en choisir une
      autre dans Réglages, à l&apos;intérieur de l&apos;application.
    </>,
  ],
  [
    'Comment couper les notifications ?',
    <>
      Dans Ose+, ouvrez Réglages et désactivez Notifications. Vous pouvez aussi passer par
      l&apos;app Réglages de l&apos;iPhone, rubrique Notifications, puis Ose+.
    </>,
  ],
  [
    'Comment supprimer mes données ?',
    <>
      Désinstallez l&apos;application. Tout ce qu&apos;Ose+ conserve est stocké sur votre appareil
      et disparaît avec elle. Aucun compte n&apos;est créé, aucune donnée n&apos;est gardée sur un
      serveur.
    </>,
  ],
];

export default function OsePlusSupportPage() {
  return (
    <>
      <a href="#contenu" className="saute-au-contenu">
        Aller au contenu
      </a>
      <Entete />

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
              <span>Ose+, aide et support</span>
            </nav>

            <div style={{ maxWidth: 'var(--colonne-lecture)' }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Support de l’application
              </p>
              <h1 className="t-h1">Ose+, aide et support</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Ose+ est un jeu de soirée : dix catégories de vérités et de défis, à jouer à deux ou
                à vingt. Cette page répond aux questions les plus fréquentes. Si la vôtre n’y est
                pas, écrivez-moi, je réponds.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--e-3)',
                  marginTop: 'var(--e-6)',
                }}
              >
                <a
                  href="mailto:contact@capmedia.app?subject=Ose%2B%20-%20demande%20de%20support"
                  className="btn btn-principal btn-large"
                >
                  Écrire au support
                </a>
                <Link href="/ose-plus-confidentialite" className="btn btn-secondaire btn-large">
                  Politique de confidentialité
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections">
            <section className="section" aria-labelledby="t-questions">
              <div className="section-tete">
                <h2 id="t-questions" className="t-h2">
                  Les questions fréquentes
                </h2>
              </div>

              <div style={{ maxWidth: 'var(--colonne-lecture)' }}>
                {questions.map(([titre, reponse], i) => (
                  <details key={titre} className="acc" open={i === 0}>
                    <summary>
                      {titre}
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
                    <div className="corps-acc">{reponse}</div>
                  </details>
                ))}
              </div>
            </section>

            <section className="creux" style={{ maxWidth: 'var(--colonne-lecture)' }}>
              <h2 className="t-h3" style={{ marginBottom: 'var(--e-3)' }}>
                Éditeur
              </h2>
              <p className="t-corps t-2">
                Nadir Ben Salah, entrepreneur individuel.
                <br />
                76 rue du Professeur Christian Cabrol, 80000 Amiens, France.
                <br />
                SIRET 814 051 769 00036, RCS Amiens.
                <br />
                <a href="mailto:contact@capmedia.app">contact@capmedia.app</a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Pied />
    </>
  );
}
