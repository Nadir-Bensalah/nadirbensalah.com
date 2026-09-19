import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import Apparait from '@/components/Apparait';
import CarteApp from '@/components/CarteApp';
import { apps } from '@/content/apps';
import { profil } from '@/content/profil';

export const metadata: Metadata = {
  title: 'Mission freelance · de l’idée à la production',
  description:
    'Développeur freelance mobile et full-stack : application iOS et Android, plateforme web, backend, API et publication sur les stores.',
  alternates: { canonical: '/freelance' },
  openGraph: {
    title: 'Mission freelance · Nadir Ben Salah',
    description: 'Votre produit, de l’idée jusqu’à la mise en ligne sur les stores.',
    url: '/freelance',
    images: ['/assets/images/og.png'],
  },
};

const prestations = [
  {
    titre: 'Application mobile iOS & Android',
    texte:
      'Une seule base de code React Native, et du natif là où c’est nécessaire : widgets, Live Activities, Apple Watch, notifications, NFC. Jusqu’à la publication sur les deux stores.',
  },
  {
    titre: 'Plateforme web & SaaS',
    texte:
      'Interface React ou Next.js, espace client, back-office, tableau de bord. Rapide, indexable, et adossée au même backend que le mobile quand le produit a les deux.',
  },
  {
    titre: 'Backend & API',
    texte:
      'Modèle de données, API REST, authentification, règles de sécurité, tâches planifiées. Node.js, Firebase, Supabase ou PostgreSQL selon ce que le produit impose.',
  },
  {
    titre: 'Reprise de projet',
    texte:
      'Une application React Native existante à reprendre, à stabiliser ou à publier. C’est souvent le cas le plus urgent, et le plus fréquent.',
  },
  {
    titre: 'Publication sur les stores',
    texte:
      'Compte développeur, signature, fiche, captures, questionnaire de confidentialité, revue Apple. L’étape la plus sous-estimée, et celle qui bloque le plus de premières soumissions.',
  },
  {
    titre: 'Maintenance & évolutions',
    texte:
      'Corrections, mises à jour de version iOS, évolutions fonctionnelles. Une application livrée n’est pas une application terminée.',
  },
];

const etapes = [
  [
    'Premier échange',
    'Trente minutes pour comprendre le besoin, le contexte et la contrainte de temps. Gratuit, sans engagement.',
  ],
  [
    'Cadrage écrit',
    'Ce qui est dans le périmètre, ce qui n’y est pas, ce qui est reporté. C’est le document qui protège les deux parties.',
  ],
  [
    'Développement',
    'Par itérations courtes, avec une version installable régulièrement plutôt qu’une livraison unique en fin de parcours.',
  ],
  [
    'Mise en ligne',
    'Publication, vérification, puis correction de ce que la production révèle toujours.',
  ],
];

export default function Freelance() {
  const vitrine = [apps[0], apps[2], apps[5]];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Développement d’applications mobiles et web',
    provider: { '@type': 'Person', name: profil.nom, url: profil.site },
    areaServed: { '@type': 'Country', name: 'France' },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${profil.site}/contact`,
    },
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
              <span>Freelance</span>
            </nav>

            <div style={{ maxWidth: 740 }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Mission freelance
              </p>
              <h1 className="t-h1">
                Vous avez un produit à construire. Je peux le prendre de l’idée à la production.
              </h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Pas seulement le développement : le cadrage, les arbitrages, l’interface, le
                backend, la publication et ce qui vient après. Sur mes huit applications, j’ai fait
                toute la chaîne sans personne d’autre.
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
                  Parler de votre projet
                </Link>
                <Link href="/realisations" className="btn btn-secondaire btn-large">
                  Voir ce que j’ai livré
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections">
            <section className="section" aria-labelledby="t-prestations">
              <div className="section-tete">
                <p className="etiquette">Ce que je prends en charge</p>
                <h2 id="t-prestations" className="t-h2">
                  Un interlocuteur, pas une chaîne de sous-traitance.
                </h2>
                <p className="t-lead" style={{ maxWidth: 640 }}>
                  Vous parlez à la personne qui écrit le code, qui prend les décisions techniques et
                  qui répond quand quelque chose casse.
                </p>
              </div>

              <div className="grille grille-3">
                {prestations.map((p, i) => (
                  <Apparait key={p.titre} retard={(i % 3) as 0 | 1 | 2} className="carte">
                    <h3 className="t-h3" style={{ marginBottom: 'var(--e-2)' }}>
                      {p.titre}
                    </h3>
                    <p className="t-petit t-2">{p.texte}</p>
                  </Apparait>
                ))}
              </div>
            </section>

            <section className="section" aria-labelledby="t-vitrine">
              <div className="section-tete">
                <p className="etiquette">La preuve</p>
                <h2 id="t-vitrine" className="t-h2">
                  Ce que « jusqu’à la production » veut dire concrètement.
                </h2>
              </div>
              <div className="grille grille-3">
                {vitrine.map((app, i) => (
                  <Apparait key={app.slug} retard={(i % 3) as 0 | 1 | 2}>
                    <CarteApp app={app} prioritaire />
                  </Apparait>
                ))}
              </div>
            </section>

            <section className="section" aria-labelledby="t-deroule">
              <div className="section-tete">
                <p className="etiquette">Le déroulé</p>
                <h2 id="t-deroule" className="t-h2">
                  Comment une mission commence.
                </h2>
              </div>
              <ol style={{ listStyle: 'none', padding: 0 }}>
                {etapes.map(([titre, texte], i) => (
                  <Apparait
                    key={titre}
                    as="li"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '40px 1fr',
                      gap: 'var(--e-4)',
                      paddingBlock: 'var(--e-5)',
                      borderTop: i === 0 ? 'none' : '1px solid var(--trait)',
                    }}
                  >
                    <span className="t-mono t-3 t-nb" style={{ fontSize: 13, paddingTop: 4 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="t-h3" style={{ marginBottom: 6 }}>
                        {titre}
                      </h3>
                      <p className="t-corps t-2" style={{ maxWidth: 620 }}>
                        {texte}
                      </p>
                    </div>
                  </Apparait>
                ))}
              </ol>
            </section>

            {/* ── LE PONT VERS CAPMEDIA ────────────────────────────────── */}
            <Apparait as="section" className="carte">
              <div style={{ maxWidth: 680 }}>
                <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                  Une précision utile
                </p>
                <h2 className="t-h3" style={{ marginBottom: 'var(--e-3)', fontSize: 22 }}>
                  Ce site parle de la personne. Capmedia Digital porte l’activité.
                </h2>
                <p className="t-corps t-2" style={{ marginBottom: 'var(--e-4)' }}>
                  J’exerce sous l’enseigne {profil.enseigne}. C’est le cadre qui émet les devis et
                  les factures, et qui porte les projets plus larges, avec les prestations de site
                  web et d’automatisation. Pour une mission de développement, l’interlocuteur reste
                  le même : moi.
                </p>
                <a
                  href={profil.capmedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondaire"
                >
                  Voir Capmedia Digital
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    aria-hidden
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </Apparait>

            {/* Le budget : la question que se pose tout dirigeant, et que la
                page évitait entièrement. On ne publie pas de grille, parce
                qu'un chiffre affiché hors contexte est toujours faux. Mais on
                explique ce qui le fait varier, ce qui est déjà utile. */}
            <section className="section" aria-labelledby="t-budget">
              <div className="section-tete">
                <p className="etiquette">Le budget</p>
                <h2 id="t-budget" className="t-h2">
                  Ce qui fait vraiment varier le prix.
                </h2>
                <p className="t-lead" style={{ maxWidth: 680 }}>
                  Je ne publie pas de grille tarifaire : un chiffre affiché sans connaître le projet
                  serait faux dans les deux sens. En revanche, voici ce qui pèse réellement, pour
                  que vous puissiez situer le vôtre avant même de m&apos;écrire.
                </p>
              </div>

              <div className="grille grille-2">
                <Apparait className="carte">
                  <h3 className="t-h3" style={{ marginBottom: 'var(--e-3)' }}>
                    Ce qui coûte cher
                  </h3>
                  <ul className="liste-marque liste-cher">
                    <li>
                      Un compte utilisateur, et tout ce qu&apos;il entraîne : mot de passe oublié,
                      suppression de compte, données à synchroniser.
                    </li>
                    <li>Le paiement, l&apos;abonnement, la facturation.</li>
                    <li>
                      Le temps réel : messagerie, position partagée, notifications déclenchées par
                      un serveur.
                    </li>
                    <li>Un back-office pour administrer le contenu.</li>
                    <li>
                      Une intégration avec un logiciel existant dont la documentation est pauvre.
                    </li>
                  </ul>
                </Apparait>

                <Apparait retard={1} className="carte">
                  <h3 className="t-h3" style={{ marginBottom: 'var(--e-3)' }}>
                    Ce qui coûte moins qu&apos;on ne croit
                  </h3>
                  <ul className="liste-marque">
                    <li>Avoir les deux plateformes, iOS et Android, plutôt qu&apos;une seule.</li>
                    <li>Un beau design, si les écrans sont décidés avant de développer.</li>
                    <li>
                      Le hors-ligne, quand il est prévu dès le départ plutôt qu&apos;ajouté après.
                    </li>
                    <li>
                      Les widgets et les intégrations système, une fois l&apos;application
                      construite.
                    </li>
                  </ul>
                </Apparait>
              </div>

              <div className="encadre encadre--astuce" style={{ maxWidth: 780 }}>
                <div>
                  <strong style={{ color: 'var(--texte)' }}>
                    La question à se poser avant le prix.
                  </strong>{' '}
                  Une application doit résoudre un problème que votre site ne résout pas : quelque
                  chose qu&apos;on ouvre plusieurs fois par semaine, ou qui a besoin du téléphone
                  lui-même (la position, l&apos;appareil photo, une notification, le fonctionnement
                  sans réseau). Si ce n&apos;est pas le cas, je vous le dirai, et ça vous coûtera le
                  prix d&apos;un appel.
                </div>
              </div>

              <p className="t-petit t-3" style={{ maxWidth: 680 }}>
                Concrètement : un premier échange gratuit, puis un devis écrit avant que quoi que ce
                soit ne commence. Sur les projets longs, la facturation se fait par jalons, jamais
                en une fois à la livraison.
              </p>
            </section>

            <Apparait as="section" className="creux">
              <div style={{ maxWidth: 620 }}>
                <h2 className="t-h2" style={{ marginBottom: 'var(--e-4)' }}>
                  Le premier échange ne coûte rien.
                </h2>
                <p className="t-lead" style={{ marginBottom: 'var(--e-5)' }}>
                  Trente minutes pour comprendre ce que vous voulez construire, et vous dire
                  honnêtement si je suis la bonne personne. Il m’arrive de répondre que non.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)' }}>
                  <Link href="/contact" className="btn btn-principal btn-large">
                    Parler de votre projet
                  </Link>
                  <Link href="/challenge" className="btn btn-secondaire btn-large">
                    Me soumettre un problème d’abord
                  </Link>
                </div>
              </div>
            </Apparait>
          </div>
        </div>
      </main>

      <Pied />

      <style>{`
        .liste-cher li::before { color: var(--texte-3); content: '\u2022'; }
      `}</style>
    </>
  );
}
