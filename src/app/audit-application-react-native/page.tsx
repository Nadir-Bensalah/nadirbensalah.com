import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import Apparait from '@/components/Apparait';
import { profil } from '@/content/profil';

export const metadata: Metadata = {
  title: 'Audit d’application React Native',
  description:
    'Audit complet d’une application React Native : architecture, performances, dette technique et conformité aux règles de l’App Store.',
  alternates: { canonical: '/audit-application-react-native' },
  openGraph: {
    title: 'Audit d’une application React Native',
    description:
      'Architecture, performances, dette technique et conformité App Store. Un rapport écrit et priorisé.',
    url: '/audit-application-react-native',
  },
};

const axes = [
  {
    titre: 'Architecture',
    points: [
      'Structure du projet et séparation des responsabilités',
      'Gestion de l’état et circulation des données',
      'Couplage entre l’interface et la logique métier',
      'Ce qui empêchera d’ajouter la prochaine fonctionnalité',
    ],
  },
  {
    titre: 'Performances',
    points: [
      'Temps de démarrage et taille du paquet',
      'Listes longues, images, rendus inutiles',
      'Requêtes réseau : nombre, taille, mise en cache',
      'Comportement sur le plus petit appareil supporté',
    ],
  },
  {
    titre: 'Dette technique',
    points: [
      'Dépendances abandonnées ou en retard de plusieurs versions majeures',
      'Code mort, duplications, contournements devenus permanents',
      'Couverture de test réelle, et ce que les tests prouvent vraiment',
      'Ce qui cassera à la prochaine version d’iOS',
    ],
  },
  {
    titre: 'Conformité App Store',
    points: [
      'Questionnaire de confidentialité contre dépendances réellement embarquées',
      'Achats intégrés et restauration',
      'Chaînes d’autorisation et cas limites de l’interface',
      'Accessibilité sur le parcours principal',
    ],
  },
];

export default function Audit() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Audit d’application React Native',
    provider: { '@type': 'Person', name: profil.nom, url: profil.site },
    areaServed: { '@type': 'Country', name: 'France' },
    description:
      'Audit d’une application React Native : architecture, performances, dette technique et conformité aux règles de l’App Store.',
  };

  return (
    <>
      <a href="#contenu" className="saute-au-contenu">
        Aller au contenu
      </a>
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
              <Link href="/expertise-react-native" className="lien-sobre">
                Expertise
              </Link>
              <span aria-hidden> › </span>
              <span>Audit</span>
            </nav>

            <div style={{ maxWidth: 740 }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Une prestation à périmètre fermé
              </p>
              <h1 className="t-h1">Savoir où en est vraiment votre application.</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Un rapport écrit qui dit ce qui va, ce qui ne va pas, et dans quel ordre traiter le
                reste. Sans engagement de suite : l’audit se suffit à lui-même, et le rapport vous
                appartient.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--e-3)',
                  marginTop: 'var(--e-6)',
                }}
              >
                <Link href="/contact" className="btn btn-principal btn-large">
                  Demander un audit
                </Link>
                <Link href="/challenge" className="btn btn-secondaire btn-large">
                  Poser une question d’abord
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections">
            <section className="section" aria-labelledby="t-axes">
              <div className="section-tete">
                <p className="etiquette">Ce qui est examiné</p>
                <h2 id="t-axes" className="t-h2">
                  Quatre axes, dans cet ordre.
                </h2>
              </div>

              <div className="grille grille-2">
                {axes.map((a, i) => (
                  <Apparait key={a.titre} retard={(i % 2) as 0 | 1} className="carte">
                    <h3 className="t-h3" style={{ marginBottom: 'var(--e-4)' }}>
                      {a.titre}
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

            <section className="section" aria-labelledby="t-livrable">
              <div className="section-tete">
                <p className="etiquette">Ce que vous recevez</p>
                <h2 id="t-livrable" className="t-h2">
                  Un document utilisable, pas une liste de reproches.
                </h2>
              </div>

              <div style={{ maxWidth: 720 }}>
                <ul className="liste-marque">
                  <li style={{ fontSize: 16.5 }}>
                    Un rapport écrit, organisé par priorité : ce qui bloque, ce qui coûtera cher
                    plus tard, ce qui peut attendre.
                  </li>
                  <li style={{ fontSize: 16.5 }}>
                    Pour chaque point : le constat, la conséquence concrète, et la correction
                    proposée.
                  </li>
                  <li style={{ fontSize: 16.5 }}>
                    Une estimation de l’effort par correction, pour que vous puissiez arbitrer
                    vous-même.
                  </li>
                  <li style={{ fontSize: 16.5 }}>
                    Un échange d’une heure pour parcourir le rapport et répondre à vos questions.
                  </li>
                </ul>

                <div className="encadre encadre--astuce" style={{ marginTop: 'var(--e-5)' }}>
                  <div>
                    <strong style={{ color: 'var(--texte)' }}>Ce que l’audit n’est pas.</strong> Ce
                    n’est pas un devis déguisé. Si le rapport conclut que votre application est en
                    bon état et n’a besoin de personne, c’est ce qu’il dira. Le rapport vous
                    appartient, y compris pour le faire exécuter par quelqu’un d’autre.
                  </div>
                </div>
              </div>
            </section>

            <section className="section" aria-labelledby="t-quand">
              <div className="section-tete">
                <p className="etiquette">Quand c’est utile</p>
                <h2 id="t-quand" className="t-h2">
                  Les situations qui amènent ici.
                </h2>
              </div>
              <div style={{ maxWidth: 720 }}>
                <ul className="liste-marque">
                  <li style={{ fontSize: 16.5 }}>
                    Vous héritez d’une application développée par quelqu’un qui n’est plus là.
                  </li>
                  <li style={{ fontSize: 16.5 }}>
                    Une soumission est refusée plusieurs fois et vous ne savez pas pourquoi.
                  </li>
                  <li style={{ fontSize: 16.5 }}>
                    Vous hésitez entre reprendre l’existant et repartir de zéro.
                  </li>
                  <li style={{ fontSize: 16.5 }}>
                    Vous allez recruter, et vous voulez savoir ce que le poste doit réellement
                    couvrir.
                  </li>
                  <li style={{ fontSize: 16.5 }}>
                    L’application ralentit et personne ne sait dire où part le temps.
                  </li>
                </ul>
              </div>
            </section>

            <Apparait as="section" className="creux">
              <div style={{ maxWidth: 620 }}>
                <h2 className="t-h2" style={{ marginBottom: 'var(--e-4)' }}>
                  Parlons de votre application.
                </h2>
                <p className="t-lead" style={{ marginBottom: 'var(--e-5)' }}>
                  Décrivez-moi la situation en quelques lignes. Je vous dirai si un audit est
                  pertinent, et ce qu’il faudrait regarder en priorité.
                </p>
                <Link href="/contact" className="btn btn-principal btn-large">
                  Demander un audit
                </Link>
              </div>
            </Apparait>
          </div>
        </div>
      </main>

      <Pied />
    </>
  );
}
