import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import Apparait from '@/components/Apparait';
import CarteApp from '@/components/CarteApp';
import BoutonCv from '@/components/BoutonCv';
import { apps } from '@/content/apps';
import { disponibilite } from '@/content/profil';

export const metadata: Metadata = {
  title: 'Avant de publier votre offre de développeur',
  description:
    'Vous allez recevoir des dizaines de candidatures à trier. Avant ça, soixante secondes : huit applications publiées, vérifiables tout de suite.',
  alternates: { canonical: '/recruter-developpeur' },
  openGraph: {
    title: 'Avant de publier votre offre de développeur',
    description:
      'Soixante secondes, et huit applications que vous pouvez installer pendant que vous lisez.',
    url: '/recruter-developpeur',
  },
};

const coutsCaches = [
  [
    'Le tri',
    'Quelques dizaines à quelques centaines de CV, dont une partie hors sujet, à lire un par un.',
  ],
  [
    'Les entretiens',
    'Plusieurs créneaux mobilisés, souvent à deux ou trois personnes de votre équipe.',
  ],
  [
    'Le test technique',
    'À rédiger, à faire passer, puis à corriger. Et il mesure mal ce qui compte vraiment.',
  ],
  [
    'Le doute',
    'La vraie question — « est-ce qu’il sait finir ? » — reste sans réponse jusqu’à la période d’essai.',
  ],
];

export default function RecruterDeveloppeur() {
  const troisApps = [apps[0], apps[3], apps[5]];

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
              <span>Avant de publier votre offre</span>
            </nav>

            <div style={{ maxWidth: 760 }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Si vous êtes sur le point de recruter
              </p>
              <h1 className="t-h1">
                Vous alliez publier une offre. Accordez-moi soixante secondes d’abord.
              </h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Une offre de développeur, c’est des semaines de tri, d’entretiens et de tests
                techniques, pour répondre à une question simple : est-ce que cette personne sait
                finir ce qu’elle commence ?
              </p>
              <p className="t-lead" style={{ marginTop: 'var(--e-3)' }}>
                Je propose de répondre à cette question tout de suite. Huit applications sont en
                ligne sur l’App&nbsp;Store. Installez-en une pendant que vous lisez cette page.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--e-3)',
                  marginTop: 'var(--e-6)',
                }}
              >
                <Link href="/realisations" className="btn btn-principal btn-large">
                  Voir les huit applications
                </Link>
                <Link href="/cdi" className="btn btn-secondaire btn-large">
                  Le dossier complet
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections">
            {/* ── CE QUE COÛTE UN RECRUTEMENT ──────────────────────────── */}
            <section className="section" aria-labelledby="t-couts">
              <div className="section-tete">
                <p className="etiquette">Le calcul honnête</p>
                <h2 id="t-couts" className="t-h2">
                  Ce qu’une offre vous coûte avant même la première signature.
                </h2>
                <p className="t-lead" style={{ maxWidth: 640 }}>
                  Rien de tout cela n’est évitable si vous recrutez un poste permanent. Mais si
                  votre besoin est un produit à construire, il y a peut-être un chemin plus court.
                </p>
              </div>

              <div className="grille grille-4">
                {coutsCaches.map(([titre, texte], i) => (
                  <Apparait key={titre} retard={(i % 4) as 0 | 1 | 2 | 3} className="carte-creuse">
                    <h3 className="t-h3" style={{ marginBottom: 'var(--e-2)', fontSize: 17 }}>
                      {titre}
                    </h3>
                    <p className="t-petit t-2">{texte}</p>
                  </Apparait>
                ))}
              </div>

              <div className="encadre encadre--attention" style={{ maxWidth: 760 }}>
                <div>
                  <strong style={{ color: 'var(--texte)' }}>Soyons clairs.</strong> Si vous
                  construisez une équipe sur plusieurs années, recrutez. Un salarié et un freelance
                  ne répondent pas au même besoin, et je ne vais pas vous raconter le contraire pour
                  décrocher une mission. Cette page s’adresse à ceux dont le besoin réel est : « ce
                  produit doit exister, et vite ».
                </div>
              </div>
            </section>

            {/* ── LA PREUVE ────────────────────────────────────────────── */}
            <section className="section" aria-labelledby="t-preuve">
              <div className="section-tete">
                <p className="etiquette">Vérifiable maintenant</p>
                <h2 id="t-preuve" className="t-h2">
                  Trois applications, trois compétences différentes.
                </h2>
                <p className="t-lead" style={{ maxWidth: 640 }}>
                  Un test technique mesure ce que quelqu’un sait faire en une heure, sous pression,
                  sur un problème artificiel. Ceci mesure ce que je sais livrer, en production, à
                  des inconnus.
                </p>
              </div>

              <div className="grille grille-3">
                {troisApps.map((app, i) => (
                  <Apparait key={app.slug} retard={(i % 3) as 0 | 1 | 2}>
                    <CarteApp app={app} prioritaire />
                  </Apparait>
                ))}
              </div>
            </section>

            {/* ── CE QUE VOUS OBTENEZ ──────────────────────────────────── */}
            <section className="section" aria-labelledby="t-obtenez">
              <div className="section-tete">
                <p className="etiquette">Concrètement</p>
                <h2 id="t-obtenez" className="t-h2">
                  Ce que je peux prendre en charge.
                </h2>
              </div>
              <ul className="liste-marque" style={{ maxWidth: 720 }}>
                <li style={{ fontSize: 16.5 }}>
                  Une application mobile complète, de la première maquette à la publication sur les
                  deux stores.
                </li>
                <li style={{ fontSize: 16.5 }}>
                  Une application existante à reprendre, stabiliser, ou faire passer la revue Apple.
                </li>
                <li style={{ fontSize: 16.5 }}>
                  Le renfort d’une équipe déjà en place, sur la partie mobile ou sur le backend qui
                  la sert.
                </li>
                <li style={{ fontSize: 16.5 }}>
                  Un audit technique avant de décider de recruter, pour savoir ce que le poste doit
                  réellement couvrir.
                </li>
                <li style={{ fontSize: 16.5 }}>
                  Et si le CDI reste la bonne réponse : je suis aussi ouvert à cette conversation.
                </li>
              </ul>
            </section>

            <Apparait as="section" className="creux">
              <div style={{ maxWidth: 620 }}>
                <h2 className="t-h2" style={{ marginBottom: 'var(--e-4)' }}>
                  Soixante secondes, c’était le marché.
                </h2>
                <p className="t-lead" style={{ marginBottom: 'var(--e-5)' }}>
                  Si vous voulez aller plus loin, le plus simple est de me décrire votre besoin en
                  trois lignes. Je réponds sous {disponibilite.delaiReponse}, et je dis quand ce
                  n’est pas pour moi.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)' }}>
                  <Link href="/contact" className="btn btn-principal btn-large">
                    Me décrire votre besoin
                  </Link>
                  <BoutonCv depuis="recruter_bas" variante="secondaire" />
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
