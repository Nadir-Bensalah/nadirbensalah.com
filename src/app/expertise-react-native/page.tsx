import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import Apparait from '@/components/Apparait';
import CarteApp from '@/components/CarteApp';
import { apps } from '@/content/apps';
import { profil } from '@/content/profil';
import { alternatives } from '@/lib/langues';
import LienEvitement from '@/components/LienEvitement';

export const metadata: Metadata = {
  title: 'Expert React Native : audit et reprise',
  description:
    'Expertise React Native : audit de code, reprise de projet en difficulté, optimisation des performances et publication sur l’App Store.',
  alternates: alternatives('/expertise-react-native'),
  openGraph: {
    title: 'Expertise React Native · audit, conseil, reprise de projet',
    description:
      'Applications React Native publiées, dont plusieurs avec des modules natifs en Swift. Audit, reprise de code, accompagnement.',
    url: '/expertise-react-native',
    images: ['/assets/images/og.png'],
  },
};

const interventions = [
  {
    titre: 'Reprendre un projet en difficulté',
    texte:
      'Une application React Native commencée par quelqu’un d’autre, jamais publiée, ou bloquée en revue. C’est le cas le plus fréquent, et le plus urgent.',
  },
  {
    titre: 'Auditer une base de code',
    texte:
      'Architecture, dette technique, performances, conformité aux règles de l’App Store. Un rapport écrit, avec des priorités, pas une liste de reproches.',
  },
  {
    titre: 'Débloquer une publication',
    texte:
      'Refus Apple répétés, signature qui échoue, questionnaire de confidentialité contradictoire. Ce sont des problèmes connus, avec des solutions connues.',
  },
  {
    titre: 'Ajouter ce que le framework ne fait pas',
    texte:
      'Widgets, Live Activities, App Intents, Apple Watch, NFC. Ce sont des modules natifs à écrire en Swift ou en Kotlin, puis à relier proprement au reste de l’application.',
  },
  {
    titre: 'Renforcer une équipe',
    texte:
      'Revue de code, montée en compétence, mise en place des tests et de la chaîne de publication. Le but est que l’équipe continue sans moi.',
  },
  {
    titre: 'Arbitrer un choix technique',
    texte:
      'React Native, natif, ou autre chose. Un avis argumenté sur les conséquences à un an, y compris quand la réponse ne m’arrange pas.',
  },
];

export default function Expertise() {
  const vitrine = [apps[0], apps[2], apps[5]];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Expertise et audit React Native',
    provider: { '@type': 'Person', name: profil.nom, url: profil.site },
    areaServed: { '@type': 'Country', name: 'France' },
    description:
      'Audit de code React Native, reprise de projet, optimisation des performances et accompagnement jusqu’à la publication.',
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
              <span>Expertise React Native</span>
            </nav>

            <div style={{ maxWidth: 740 }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Expertise
              </p>
              <h1 className="t-h1">Expertise React Native : audit, conseil, reprise de projet.</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Huit applications mobiles publiées sur l’App&nbsp;Store : six en React Native, deux
                entièrement en Swift. Trois des applications React Native embarquent du code natif
                Swift ou Kotlin. Quand un projet React Native se bloque, c’est presque toujours à
                l’un des endroits que je connais bien.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--e-3)',
                  marginTop: 'var(--e-6)',
                }}
              >
                <Link
                  href="/audit-application-react-native"
                  className="btn btn-principal btn-large"
                >
                  L’audit d’application
                </Link>
                <Link href="/challenge" className="btn btn-secondaire btn-large">
                  Me soumettre un problème
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections">
            <section className="section" aria-labelledby="t-interventions">
              <div className="section-tete">
                <p className="etiquette">Les interventions</p>
                <h2 id="t-interventions" className="t-h2">
                  Là où j’interviens le plus souvent.
                </h2>
              </div>
              <div className="grille grille-3">
                {interventions.map((x, i) => (
                  <Apparait key={x.titre} retard={(i % 3) as 0 | 1 | 2} className="carte">
                    <h3 className="t-h3" style={{ marginBottom: 'var(--e-2)', fontSize: 17 }}>
                      {x.titre}
                    </h3>
                    <p className="t-petit t-2">{x.texte}</p>
                  </Apparait>
                ))}
              </div>
            </section>

            <section className="section" aria-labelledby="t-natif">
              <div className="section-tete">
                <p className="etiquette">Le point qui fait la différence</p>
                <h2 id="t-natif" className="t-h2">
                  React Native s’arrête là où le système commence.
                </h2>
                <p className="t-lead" style={{ maxWidth: 680 }}>
                  Dynamic Island, Live Activities, App Intents, Apple Watch, widgets : rien de tout
                  cela n’a d’équivalent en JavaScript. Il faut écrire le module en Swift ou en
                  Kotlin, décider ce qui traverse le pont et ce qui reste côté natif, et gérer le
                  cas où l’application est fermée pendant que l’extension, elle, continue de
                  tourner. C’est ce travail-là que j’ai fait sur les applications ci-dessous.
                </p>
              </div>

              <div className="grille grille-3">
                {vitrine.map((app, i) => (
                  <Apparait key={app.slug} retard={(i % 3) as 0 | 1 | 2}>
                    <CarteApp app={app} prioritaire />
                  </Apparait>
                ))}
              </div>

              <p className="t-petit t-3" style={{ maxWidth: 680 }}>
                Ticket pilote la Dynamic Island, le Centre de contrôle et Siri en 3,3 Mo : celui-là
                est entièrement natif, parce que tout ce qu’il fait vit en dehors de l’application.
                Qindil et Amiens sont en React Native et embarquent une application Apple Watch en
                SwiftUI.
              </p>
            </section>

            <Apparait as="section" className="creux">
              <div style={{ maxWidth: 640 }}>
                <h2 className="t-h2" style={{ marginBottom: 'var(--e-4)' }}>
                  Commencer par un regard extérieur.
                </h2>
                <p className="t-lead" style={{ marginBottom: 'var(--e-5)' }}>
                  Avant d’engager une mission longue, un audit permet de savoir où en est réellement
                  le projet, et ce qu’il faut traiter en premier.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)' }}>
                  <Link
                    href="/audit-application-react-native"
                    className="btn btn-principal btn-large"
                  >
                    Voir l’audit
                  </Link>
                  <Link href="/contact" className="btn btn-secondaire btn-large">
                    Me contacter
                  </Link>
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
