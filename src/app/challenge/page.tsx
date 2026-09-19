import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import Apparait from '@/components/Apparait';
import Formulaire from '@/components/Formulaire';
import { disponibilite } from '@/content/profil';

export const metadata: Metadata = {
  title: 'Ne me croyez pas sur parole',
  description:
    'Décrivez-moi un problème technique, une architecture ou un bug. Je vous réponds avec la manière dont je l’aborderais, sans engagement.',
  alternates: { canonical: '/challenge' },
  openGraph: {
    title: 'Ne me croyez pas sur parole',
    description: 'Un problème, et ma manière de l’aborder. Sans engagement.',
    url: '/challenge',
  },
};

const exemples = [
  [
    'Une architecture',
    'Vous hésitez entre deux approches et vous voulez un avis argumenté sur les conséquences à un an.',
  ],
  [
    'Un bug tenace',
    'Quelque chose échoue uniquement en production, ou seulement sur certains appareils.',
  ],
  ['Un refus Apple', 'Votre soumission est rejetée et le motif invoqué reste obscur.'],
  [
    'Une performance',
    'Une liste qui saccade, un démarrage trop lent, une application trop lourde.',
  ],
  ['Un choix de pile', 'React Native, natif, ou autre chose : lequel sert réellement votre cas.'],
  ['Un cadrage', 'Vous avez une idée et vous voulez savoir ce qu’elle implique vraiment.'],
];

const ceQueJeFais = [
  'Je lis le problème et je pose les questions qui manquent.',
  'Je vous écris comment je l’aborderais : la piste que je suivrais en premier, et pourquoi celle-là.',
  'Je vous dis honnêtement si je pense que ce n’est pas mon domaine.',
];

const ceQueJeNeFaisPas = [
  'Je ne livre pas plusieurs jours de travail gratuit.',
  'Je ne promets pas de résoudre le problème à distance sans voir le code.',
  'Je ne transforme pas la réponse en argumentaire commercial.',
];

export default function Challenge() {
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
              <span>Un problème à regarder</span>
            </nav>

            <div style={{ maxWidth: 740 }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Une autre façon de me jauger
              </p>
              <h1 className="t-h1">Ne me croyez pas sur parole. Donnez-moi un problème.</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Un portfolio montre ce qui a marché. Il ne montre jamais comment quelqu’un réfléchit
                face à une situation qu’il n’a pas choisie. Alors choisissez-en une.
              </p>
              <p className="t-lead" style={{ marginTop: 'var(--e-3)' }}>
                Décrivez-moi un problème technique ou produit. Je vous réponds avec la manière dont
                je l’aborderais. C’est tout, et c’est déjà beaucoup plus parlant qu’un CV.
              </p>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections">
            <section className="section" aria-labelledby="t-exemples">
              <div className="section-tete">
                <p className="etiquette">Par exemple</p>
                <h2 id="t-exemples" className="t-h2">
                  Le genre de chose qui m’intéresse.
                </h2>
              </div>
              <div className="grille grille-3">
                {exemples.map(([titre, texte], i) => (
                  <Apparait key={titre} retard={(i % 3) as 0 | 1 | 2} className="carte">
                    <h3 className="t-h3" style={{ marginBottom: 'var(--e-2)', fontSize: 17 }}>
                      {titre}
                    </h3>
                    <p className="t-petit t-2">{texte}</p>
                  </Apparait>
                ))}
              </div>
            </section>

            <section className="section" aria-labelledby="t-regles">
              <div className="section-tete">
                <p className="etiquette">Les règles du jeu</p>
                <h2 id="t-regles" className="t-h2">
                  Pour que ce soit clair des deux côtés.
                </h2>
              </div>

              <div className="grille grille-2">
                <Apparait className="carte-creuse">
                  <h3 className="t-h3" style={{ marginBottom: 'var(--e-4)' }}>
                    Ce que je fais
                  </h3>
                  <ul className="liste-marque">
                    {ceQueJeFais.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </Apparait>

                <Apparait retard={1} className="carte-creuse">
                  <h3 className="t-h3" style={{ marginBottom: 'var(--e-4)' }}>
                    Ce que je ne fais pas
                  </h3>
                  <ul className="liste-marque liste-non">
                    {ceQueJeNeFaisPas.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </Apparait>
              </div>

              <div className="encadre" style={{ maxWidth: 760 }}>
                <div>
                  Si l’échange est utile des deux côtés, la suite peut prendre la forme d’un audit,
                  d’une preuve de concept ou d’une mission pilote cadrée. Mais ça ne se décide pas
                  ici, et rien ne vous y engage.
                </div>
              </div>
            </section>

            <section className="section" aria-labelledby="t-form">
              <div className="section-tete">
                <p className="etiquette">À vous</p>
                <h2 id="t-form" className="t-h2">
                  Le problème.
                </h2>
                <p className="t-lead" style={{ maxWidth: 620 }}>
                  Plus le contexte est précis, plus la réponse sera utile. Je réponds sous{' '}
                  {disponibilite.delaiReponse}.
                </p>
              </div>

              <div style={{ maxWidth: 720 }}>
                <Formulaire
                  variante="challenge"
                  titreChamp="Le problème, tel qu’il se pose"
                  placeholder="Le contexte, ce qui se passe, ce que vous avez déjà essayé, et ce qui vous bloque. N’hésitez pas à être technique."
                />
              </div>
            </section>
          </div>
        </div>
      </main>

      <Pied />

      <style>{`
        .liste-non li::before { color: var(--texte-3); content: '✕'; }
      `}</style>
    </>
  );
}
