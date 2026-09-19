import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';

export const metadata: Metadata = {
  title: 'Ose+ – Aide et support',
  description:
    "Support de l'application Ose+ : achat unique, restauration d'achat, notifications, langues, suppression des données et contact.",
  alternates: { canonical: '/ose-plus' },
};

const questions: [string, React.ReactNode][] = [
  [
    "J'ai payé et l'application est toujours limitée",
    <>
      Ouvrez l&apos;écran d&apos;achat et touchez <strong>Restaurer un achat</strong>. Ose+
      redemande alors à Apple ce que votre identifiant a acheté. Assurez-vous d&apos;être connecté
      au même identifiant Apple que le jour de l&apos;achat.
    </>,
  ],
  [
    "J'ai changé d'iPhone, dois-je racheter ?",
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
      Les remboursements sont gérés par Apple, pas par nous. Rendez-vous sur{' '}
      <a href="https://reportaproblem.apple.com" className="text-cyan-400 underline">
        reportaproblem.apple.com
      </a>{' '}
      avec votre identifiant Apple.
    </>,
  ],
  [
    "L'application n'est pas dans ma langue",
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
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Entete />

      <section className="relative pt-36 pb-16 md:pt-44 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[520px] rounded-full opacity-20 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse, rgba(123,47,247,0.45) 0%, rgba(6,182,212,0.16) 42%, transparent 72%)',
          }}
        />
        <div className="noise-bg absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <span className="text-xs font-700 tracking-widest text-indigo-400 uppercase">
            Support application
          </span>
          <h1 className="text-4xl md:text-6xl font-800 text-white tracking-tight leading-[1.05] mt-5">
            Ose+, aide et support
          </h1>
          <p className="text-lg text-[#A1A1AA] leading-relaxed max-w-2xl mt-7">
            Ose+ est un jeu de soirée : dix catégories de vérités et de défis, à jouer à deux ou à
            vingt. Cette page répond aux questions les plus fréquentes. Si la vôtre n&apos;y est
            pas, écrivez-nous, on répond.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:contact@capmedia.app?subject=Ose%2B%20-%20demande%20de%20support"
              className="btn-primary px-7 py-3.5 rounded-full text-base font-700 text-center"
            >
              Écrire au support →
            </a>
            <Link
              href="/ose-plus-confidentialite"
              className="btn-outline px-7 py-3.5 rounded-full text-base font-600 text-center"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 section-gradient">
        <div className="max-w-4xl mx-auto px-6 space-y-5">
          {questions.map(([titre, reponse]) => (
            <div key={titre} className="glass-card rounded-3xl p-7">
              <h2 className="text-xl font-800 text-white mb-3">{titre}</h2>
              <p className="text-[#A1A1AA] leading-relaxed">{reponse}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 glass-card rounded-3xl p-9">
          <h2 className="text-2xl font-800 text-white mb-4">Éditeur</h2>
          <p className="text-[#A1A1AA] leading-relaxed">
            Nadir Ben Salah, entrepreneur individuel.
            <br />
            76 rue du Professeur Christian Cabrol, 80000 Amiens, France.
            <br />
            SIRET 814 051 769 00036, RCS Amiens.
            <br />
            <a href="mailto:contact@capmedia.app" className="text-cyan-400 underline">
              contact@capmedia.app
            </a>
          </p>
        </div>
      </section>

      <Pied />
    </main>
  );
}
