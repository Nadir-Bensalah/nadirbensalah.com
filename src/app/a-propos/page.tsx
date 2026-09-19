import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import Apparait from '@/components/Apparait';
import BoutonCv from '@/components/BoutonCv';
import { experiences, formations, profil } from '@/content/profil';

export const metadata: Metadata = {
  title: 'Qui je suis',
  description:
    'Développeur mobile et full-stack à Amiens. Le parcours, la façon de travailler, et ce que deux ans à publier mes propres applications m’ont appris.',
  alternates: { canonical: '/a-propos' },
  openGraph: {
    title: 'Qui je suis · Nadir Ben Salah',
    description:
      'Le parcours, la façon de travailler, et ce que publier huit applications m’a appris.',
    url: '/a-propos',
  },
};

export default function APropos() {
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
              <span>À propos</span>
            </nav>

            <div style={{ maxWidth: 740 }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                À propos
              </p>
              <h1 className="t-h1">Je construis des applications, et je vais jusqu’au bout.</h1>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections">
            <section className="article-corps">
              <p style={{ fontSize: 19 }}>
                Je m’appelle Nadir Ben Salah. Je développe des applications mobiles et des
                plateformes web depuis Amiens, et j’exerce sous l’enseigne {profil.enseigne}.
              </p>

              <h2>Ce que deux ans à publier m’ont appris</h2>
              <p>
                En septembre 2025, j’ai publié ma première application sur l’App Store. Elle
                s’appelle Ose+, c’est un jeu de soirée, et honnêtement elle n’a rien
                d’extraordinaire. Ce qu’elle m’a appris, en revanche, ne s’apprend nulle part
                ailleurs : le compte développeur, la signature, les certificats, la fiche, les
                captures, le questionnaire de confidentialité, et surtout ce qu’Apple regarde
                réellement pendant la revue.
              </p>
              <p>
                Les sept suivantes sont sorties en treize mois. Chacune a été choisie pour m’imposer
                une contrainte que les précédentes n’avaient pas. Un calculateur de vol qui ne doit
                passer <strong>aucun appel réseau</strong>, parce qu’en vol il n’y a pas de réseau.
                Un horodateur qui doit vivre dans la Dynamic Island, donc en Swift natif, et tenir
                en 3,3 Mo. Un carnet de santé animal dont on doit pouvoir vérifier, en mode avion,
                qu’il n’envoie rien nulle part.
              </p>
              <p>
                C’est devenu ma façon d’apprendre : décider la contrainte avant la première ligne de
                code, puis tenir cette contrainte jusqu’à la mise en ligne. Une contrainte qu’on
                abandonne en cours de route n’a jamais rien enseigné à personne.
              </p>

              <h2>Ce que je fais, concrètement</h2>
              <p>
                React Native et TypeScript pour le tronc commun, Swift ou Kotlin pour tout ce que le
                framework ne sait pas faire : widgets, Live Activities, App Intents, Apple Watch,
                NFC. Côté serveur, Node.js, Firebase, Supabase ou PostgreSQL selon ce que le produit
                impose, jamais selon la mode.
              </p>
              <p>
                Mais la technologie n’est pas le sujet. Le sujet, c’est qu’un produit arrive entre
                les mains de quelqu’un. Entre un dépôt Git et une application installée sur le
                téléphone d’un inconnu, il y a un travail entier que beaucoup de projets
                sous-estiment : c’est là que la plupart s’arrêtent.
              </p>

              <h2>Comment je travaille</h2>
              <p>
                Je dis ce que je ne sais pas faire. Je préfère cadrer un périmètre plus petit et le
                livrer, plutôt que promettre large et décevoir. Quand un projet ne me semble pas
                justifier une application mobile, je le dis, même si c’est contre mon intérêt
                immédiat.
              </p>
              <p>
                J’aime les contraintes explicites, les décisions écrites, et les versions
                installables tôt. Une maquette ne dit pas la vérité sur un produit : un téléphone
                dans une main la dit tout de suite.
              </p>

              <h2>Où j’en suis</h2>
              <p>
                Je suis indépendant aujourd’hui, et ouvert à trois choses : une mission freelance,
                un CDI qui a du sens, ou une collaboration produit. Je suis basé à {profil.ville},
                parfaitement à l’aise en travail à distance, et la mobilité géographique est
                envisageable pour un poste qui le justifie.
              </p>
            </section>

            <section className="section" aria-labelledby="t-parcours">
              <div className="section-tete">
                <p className="etiquette">Le parcours</p>
                <h2 id="t-parcours" className="t-h2">
                  Expériences
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {experiences.map((x, i) => (
                  <Apparait
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
                  </Apparait>
                ))}
              </div>

              <div className="cadre-tableau">
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

            <Apparait as="section" className="creux">
              <div style={{ maxWidth: 620 }}>
                <h2 className="t-h2" style={{ marginBottom: 'var(--e-4)' }}>
                  La suite
                </h2>
                <p className="t-lead" style={{ marginBottom: 'var(--e-5)' }}>
                  Les huit applications sont là pour être inspectées. Le CV est là si votre
                  processus le demande. Et je réponds aux messages.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)' }}>
                  <Link href="/realisations" className="btn btn-principal btn-large">
                    Voir les réalisations
                  </Link>
                  <BoutonCv depuis="a_propos" variante="secondaire" />
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
