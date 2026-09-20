import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import Apparait from '@/components/Apparait';
import CarteApp from '@/components/CarteApp';
import BoutonCv from '@/components/BoutonCv';
import { appParSlug } from '@/content/apps';
import { competences, disponibilite, experiences, formations, profil } from '@/content/profil';
import LienEvitement from '@/components/LienEvitement';

export const metadata: Metadata = {
  title: 'Recrutement & CDI · le dossier complet',
  description:
    'Tout ce qu’un recruteur veut vérifier : parcours, niveau d’autonomie, technologies, produits livrés, disponibilité, mobilité et CV.',
  alternates: { canonical: '/cdi' },
  openGraph: {
    title: 'Recrutement & CDI · Nadir Ben Salah',
    description: 'Parcours, produits livrés, technologies, disponibilité et CV. En une page.',
    url: '/cdi',
    images: ['/assets/images/og.png'],
  },
};

/** Les questions qu'un recruteur se pose vraiment, dans l'ordre où elles viennent. */
const questions = [
  {
    q: 'Pourquoi est-il indépendant aujourd’hui ?',
    r: 'Parce que j’ai voulu vérifier que je savais mener un produit seul, du premier écran jusqu’à la revue Apple. Huit applications plus tard, la réponse est documentée. Ce n’est pas une position de repli : c’est une période où j’ai appris ce qu’un poste salarié ne m’aurait pas appris aussi vite, notamment la publication, la maintenance et l’arbitrage de périmètre.',
  },
  {
    q: 'Quel est son niveau d’autonomie ?',
    r: 'Sur mes propres applications, il n’y a personne d’autre : pas de designer, pas de chef de projet, pas de DevOps. Cadrage, interface, développement mobile et backend, publication, correctifs. Ce que ça prouve, c’est que je sais avancer sans qu’on me débloque. Ce que ça ne prouve pas, c’est que je sais travailler à cinq sur la même base de code : pour ça, il faut regarder les deux ans chez Decayeux, pas les huit applications.',
  },
  {
    q: 'A-t-il déjà travaillé en équipe et en entreprise ?',
    r: 'Oui, deux ans chez Decayeux à Abbeville, sur des applications React Native destinées à des opérateurs en atelier. Le travail s’y faisait avec des gens dont ce n’est pas le métier de rédiger une spécification : il fallait aller voir sur le terrain ce que l’application devait réellement faire, puis revenir défendre les arbitrages techniques devant l’équipe produit. C’est un exercice très différent de celui de mes propres applications, où je suis à la fois celui qui demande et celui qui décide.',
  },
  {
    q: 'Qu’est-ce qui change quand il rejoint une équipe déjà constituée ?',
    r: 'Trois choses, et je préfère les dire franchement. Je pose beaucoup de questions au début, parce que reprendre une base de code sans en comprendre l’historique est la meilleure façon de casser quelque chose. J’écris les décisions, parce qu’un arbitrage qui reste dans une conversation est un arbitrage qu’on refera dans six mois. Et je demande une revue sur ce que j’écris : travailler seul pendant deux ans m’a surtout appris ce que je perds à ne pas en avoir.',
  },
  {
    q: 'Est-il disponible, et où ?',
    r: `Ouvert à une mission freelance, à un CDI pertinent ou à une collaboration produit. Basé à ${profil.ville}, parfaitement à l’aise à distance, et la mobilité géographique est envisageable pour un poste qui le justifie.`,
  },
  {
    q: 'Est-ce qu’il code encore, ou est-ce qu’il gère ?',
    r: 'Je code tous les jours. La dernière mise à jour publiée sur l’App Store date du 10 septembre 2026.',
  },
];

export default function Cdi() {
  // Par slug, jamais par index : un index se décale dès qu'une application
  // est ajoutée au tableau, et la légende ci-dessous cesse d'être vraie.
  const troisApps = ['ticket', 'pilou', 'amiens-bus-velam']
    .map(appParSlug)
    .filter((a) => a !== undefined);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((x) => ({
      '@type': 'Question',
      name: x.q,
      acceptedAnswer: { '@type': 'Answer', text: x.r },
    })),
  };

  return (
    <>
      <LienEvitement />
      <Entete />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

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
              <span>Recrutement</span>
            </nav>

            <div style={{ maxWidth: 740 }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Pour un recruteur
              </p>
              <h1 className="t-h1">
                Vous avez sans doute d’autres CV ouverts. Celui-ci se vérifie en trois minutes.
              </h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Mes applications sont en ligne sur l’App&nbsp;Store. Vous pouvez les installer
                pendant que vous lisez cette page. C’est la forme de preuve la plus rapide que je
                connaisse.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--e-3)',
                  marginTop: 'var(--e-6)',
                }}
              >
                <BoutonCv depuis="cdi_heros" />
                <Link href="/realisations" className="btn btn-secondaire btn-large">
                  Voir les réalisations
                </Link>
                <a
                  href={profil.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-fantome btn-large"
                >
                  Le code sur GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections">
            {/* ── L'ESSENTIEL EN UN COUP D'ŒIL ─────────────────────────── */}
            <Apparait as="section" className="creux">
              <p className="etiquette" style={{ marginBottom: 'var(--e-4)' }}>
                L’essentiel
              </p>
              <dl
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 'var(--e-5)',
                  margin: 0,
                }}
              >
                {[
                  ['Poste', 'Développeur mobile & full-stack'],
                  ['Spécialité', 'React Native, TypeScript, iOS & Android'],
                  ['Expérience', 'Dix ans, dont un à publier mes propres produits'],
                  ['Localisation', `${profil.ville}, ${profil.region}`],
                  ['Mobilité', 'À distance, ou géographique pour un poste pertinent'],
                  ['Ouvert à', disponibilite.ouvertA.join(', ')],
                  ['Formation', 'Master MIAGE · UPJV Amiens'],
                  ['Réponse', `Sous ${disponibilite.delaiReponse}`],
                ].map(([cle, valeur]) => (
                  <div key={cle}>
                    <dt className="etiquette" style={{ marginBottom: 4 }}>
                      {cle}
                    </dt>
                    <dd
                      style={{ margin: 0, fontSize: 15.5, color: 'var(--texte)', fontWeight: 500 }}
                    >
                      {valeur}
                    </dd>
                  </div>
                ))}
              </dl>
            </Apparait>

            {/* ── LA PREUVE ────────────────────────────────────────────── */}
            <section className="section" aria-labelledby="t-preuve">
              <div className="section-tete">
                <p className="etiquette">La preuve, d’abord</p>
                <h2 id="t-preuve" className="t-h2">
                  Trois applications qui montrent trois compétences différentes.
                </h2>
                <p className="t-lead" style={{ maxWidth: 640 }}>
                  Pas les plus jolies : les plus révélatrices. Chacune a exigé quelque chose que les
                  deux autres n’exigeaient pas.
                </p>
              </div>

              <div className="grille grille-3">
                {troisApps.map((app, i) => (
                  <Apparait key={app.slug} retard={(i % 3) as 0 | 1 | 2}>
                    <CarteApp app={app} prioritaire />
                  </Apparait>
                ))}
              </div>

              <div className="encadre encadre--astuce" style={{ maxWidth: 760 }}>
                <div>
                  <strong style={{ color: 'var(--texte)' }}>Comment lire ces trois-là.</strong>{' '}
                  Ticket et Pilou sont écrits entièrement en Swift : ils prouvent que je choisis la
                  pile au lieu de la subir, et Ticket tient en 3,3 Mo. Pilou prouve en plus que je
                  sais modéliser un domaine métier réel et générer des documents exploitables.
                  Amiens, lui, est en React Native avec une application Apple Watch en SwiftUI : il
                  prouve que je sais ingérer un jeu de données ouvert normalisé et le rendre
                  utilisable hors ligne.
                </div>
              </div>

              <div>
                <Link href="/realisations" className="btn btn-secondaire">
                  Les huit études de cas
                </Link>
              </div>
            </section>

            {/* ── LES QUESTIONS ────────────────────────────────────────── */}
            <section className="section" aria-labelledby="t-questions">
              <div className="section-tete">
                <p className="etiquette">Les questions qui viennent</p>
                <h2 id="t-questions" className="t-h2">
                  Autant y répondre tout de suite.
                </h2>
              </div>

              <div style={{ maxWidth: 780 }}>
                {questions.map((x, i) => (
                  <details key={x.q} className="acc" open={i === 0}>
                    <summary>
                      {x.q}
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
                    <div className="corps-acc">{x.r}</div>
                  </details>
                ))}
              </div>
            </section>

            {/* ── COMPÉTENCES ──────────────────────────────────────────── */}
            <section className="section" aria-labelledby="t-comp">
              <div className="section-tete">
                <p className="etiquette">Les compétences</p>
                <h2 id="t-comp" className="t-h2">
                  Ce que je sais faire, et ce que ça permet.
                </h2>
              </div>
              <div className="grille grille-2">
                {competences.map((g, i) => (
                  <Apparait key={g.titre} retard={(i % 2) as 0 | 1} className="carte">
                    <h3 className="t-h3" style={{ marginBottom: 'var(--e-2)' }}>
                      {g.titre}
                    </h3>
                    <p className="t-corps t-2" style={{ marginBottom: 'var(--e-4)' }}>
                      {g.ceQueCaPermet}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {g.outils.map((o) => (
                        <span key={o} className="pastille">
                          {o}
                        </span>
                      ))}
                    </div>
                  </Apparait>
                ))}
              </div>
            </section>

            {/* ── PARCOURS ─────────────────────────────────────────────── */}
            <section className="section" aria-labelledby="t-parcours">
              <div className="section-tete">
                <p className="etiquette">Le parcours</p>
                <h2 id="t-parcours" className="t-h2">
                  Expériences et formations
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {experiences.map((x, i) => (
                  <div
                    key={x.poste}
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
                        marginBottom: 6,
                      }}
                    >
                      <h3 className="t-h3">{x.poste}</h3>
                      <span className="t-mono t-petit t-3 t-nb" style={{ whiteSpace: 'nowrap' }}>
                        {x.debut} – {x.fin}
                      </span>
                    </div>
                    <p
                      className="t-petit t-fort"
                      style={{ color: 'var(--action)', marginBottom: 'var(--e-3)' }}
                    >
                      {x.entreprise}
                      {x.lieu ? ` · ${x.lieu}` : ''}
                    </p>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 7,
                      }}
                    >
                      {x.faits.map((f) => (
                        <li
                          key={f}
                          className="t-corps t-2"
                          style={{ position: 'relative', paddingLeft: 18, maxWidth: 720 }}
                        >
                          <span
                            aria-hidden
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: '0.62em',
                              width: 5,
                              height: 5,
                              borderRadius: '50%',
                              background: 'var(--texte-3)',
                            }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="cadre-tableau" style={{ marginTop: 'var(--e-4)' }}>
                <table>
                  <caption
                    className="etiquette"
                    style={{ textAlign: 'left', paddingBottom: 'var(--e-3)' }}
                  >
                    Formations
                  </caption>
                  <tbody>
                    {formations.map((f) => (
                      <tr key={f.diplome}>
                        <td style={{ color: 'var(--texte)', fontWeight: 500 }}>{f.diplome}</td>
                        <td>{f.ecole}</td>
                        <td className="t-mono t-nb" style={{ whiteSpace: 'nowrap' }}>
                          {f.periode}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── CONTACT ──────────────────────────────────────────────── */}
            <Apparait as="section" className="creux">
              <div style={{ maxWidth: 620 }}>
                <h2 className="t-h2" style={{ marginBottom: 'var(--e-4)' }}>
                  La suite vous appartient.
                </h2>
                <p className="t-lead" style={{ marginBottom: 'var(--e-5)' }}>
                  Un message, un appel, ou le CV en PDF si votre processus l’exige. Je réponds sous{' '}
                  {disponibilite.delaiReponse}.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)' }}>
                  <Link href="/contact" className="btn btn-principal btn-large">
                    Me contacter
                  </Link>
                  <BoutonCv depuis="cdi_bas" variante="secondaire" />
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
