import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import Apparait from '@/components/Apparait';
import RangeeApps from '@/components/RangeeApps';
import CarteApp from '@/components/CarteApp';
import SelecteurIntention from '@/components/SelecteurIntention';
import BarreCollante from '@/components/BarreCollante';
import { apps } from '@/content/apps';
import { competences, disponibilite, experiences, preuves, profil } from '@/content/profil';

export const metadata: Metadata = {
  title: 'Nadir Ben Salah · Développeur mobile & full-stack à Amiens',
  description:
    'Développeur mobile et full-stack à Amiens. Huit applications conçues, développées et publiées sur l’App Store. React Native, TypeScript, iOS et Android.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Nadir Ben Salah · Développeur mobile & full-stack',
    description:
      'Huit applications publiées sur l’App Store, conçues et développées de bout en bout. React Native, TypeScript, iOS et Android.',
    url: '/',
    type: 'profile',
  },
};

const etapes = [
  {
    titre: 'Cadrer',
    texte:
      'Ce que le produit doit faire, et surtout ce qu’il ne fera pas. C’est là que se décide le budget, pas au moment de coder.',
  },
  {
    titre: 'Dessiner',
    texte:
      'Les écrans, les parcours, les cas limites. Une interface se teste sur un vrai téléphone, dans une vraie main, avant d’être développée.',
  },
  {
    titre: 'Construire',
    texte:
      'React Native pour le tronc commun, Swift ou Kotlin pour ce que le framework ne sait pas faire. Backend, API, base de données, règles de sécurité.',
  },
  {
    titre: 'Publier',
    texte:
      'Signature, fiche store, captures, revue Apple. C’est l’étape que la plupart des projets sous-estiment, et celle qui fait échouer les premières soumissions.',
  },
  {
    titre: 'Suivre',
    texte:
      'Ce qui casse en production, les retours, les mises à jour. Une application livrée n’est pas une application finie.',
  },
];

export default function Accueil() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        '@id': `${profil.site}/#personne`,
        name: profil.nom,
        jobTitle: profil.titre,
        url: profil.site,
        email: `mailto:${profil.email}`,
        telephone: profil.telephone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: profil.ville,
          addressRegion: profil.region,
          addressCountry: 'FR',
        },
        sameAs: [profil.linkedin, profil.capmedia],
        knowsAbout: [
          'React Native',
          'TypeScript',
          'React',
          'Node.js',
          'Swift',
          'Kotlin',
          'Firebase',
          'Supabase',
          'PostgreSQL',
          'Développement iOS',
          'Développement Android',
          'Publication App Store',
        ],
        worksFor: {
          '@type': 'Organization',
          name: profil.enseigne,
          url: profil.capmedia,
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${profil.site}/#site`,
      url: profil.site,
      name: `${profil.nom} · Développeur mobile`,
      inLanguage: 'fr-FR',
      publisher: { '@id': `${profil.site}/#personne` },
    },
  ];

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
        {/* ── HÉROS ───────────────────────────────────────────────────── */}
        <section
          style={{
            paddingTop: 'clamp(40px, 8vw, 88px)',
            paddingBottom: 'clamp(40px, 6vw, 72px)',
          }}
        >
          <div className="enveloppe">
            <div style={{ maxWidth: 780, marginInline: 'auto', textAlign: 'center' }}>
              <Apparait>
                <RangeeApps />
              </Apparait>

              <Apparait retard={1}>
                <p
                  className="t-petit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    color: 'var(--texte-2)',
                    marginTop: 'var(--e-5)',
                  }}
                >
                  <span className="point-vert" aria-hidden />
                  Huit applications en ligne sur l’App&nbsp;Store
                </p>
              </Apparait>

              <Apparait retard={1}>
                <h1 className="t-display" style={{ marginTop: 'var(--e-4)' }}>
                  Vous cherchez un développeur.
                  <br />
                  Voici ce que j’ai déjà construit.
                </h1>
              </Apparait>

              <Apparait retard={2}>
                <p
                  className="t-lead"
                  style={{ marginTop: 'var(--e-5)', maxWidth: 620, marginInline: 'auto' }}
                >
                  Je conçois et je développe des applications mobiles, de l’idée jusqu’à la mise en
                  ligne. Pas des maquettes, pas des dépôts Git : huit produits que vous pouvez
                  installer maintenant.
                </p>
              </Apparait>

              <Apparait retard={3}>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--e-3)',
                    justifyContent: 'center',
                    marginTop: 'var(--e-6)',
                  }}
                >
                  <Link href="/realisations" className="btn btn-principal btn-large">
                    Voir les huit applications
                  </Link>
                  <Link href="/contact" className="btn btn-secondaire btn-large">
                    Parler d’un projet
                  </Link>
                </div>
              </Apparait>

              <Apparait retard={4}>
                <p className="t-petit t-3" style={{ marginTop: 'var(--e-5)' }}>
                  {profil.ville}, {profil.pays} · {disponibilite.ouvertA.join(' · ')}
                </p>
              </Apparait>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections" style={{ paddingBottom: 'var(--e-8)' }}>
            {/* ── INTENTION ────────────────────────────────────────────── */}
            <SelecteurIntention />

            {/* ── PREUVES ──────────────────────────────────────────────── */}
            <section className="section" aria-labelledby="titre-preuves">
              <div className="section-tete">
                <p className="etiquette">Ce qui me distingue</p>
                <h2 id="titre-preuves" className="t-h2">
                  Livrer, c’est un métier à part entière.
                </h2>
                <p className="t-lead" style={{ maxWidth: 620 }}>
                  Beaucoup de développeurs écrivent du code. Le travail commence vraiment au moment
                  où il faut le mettre entre les mains de quelqu’un.
                </p>
              </div>

              <div className="grille grille-2">
                {preuves.map((p, i) => (
                  <Apparait key={p.titre} retard={(i % 2) as 0 | 1} className="carte-creuse">
                    <h3 className="t-h3" style={{ marginBottom: 'var(--e-2)' }}>
                      {p.titre}
                    </h3>
                    <p className="t-corps t-2">{p.texte}</p>
                  </Apparait>
                ))}
              </div>
            </section>

            {/* ── LES APPLICATIONS ─────────────────────────────────────── */}
            <section className="section" aria-labelledby="titre-apps">
              <div className="section-tete">
                <p className="etiquette">Les réalisations</p>
                <h2 id="titre-apps" className="t-h2">
                  Huit applications, huit contraintes différentes.
                </h2>
                <p className="t-lead" style={{ maxWidth: 640 }}>
                  Un calculateur de vol qui ne passe aucun appel réseau. Un horodateur de 3,3 Mo qui
                  vit dans la Dynamic Island. Un carnet de santé qu’on peut vérifier en mode avion.
                  Chacune a été conçue, développée et publiée de bout en bout.
                </p>
              </div>

              <div className="grille grille-3">
                {apps.map((app, i) => (
                  <Apparait key={app.slug} retard={(i % 3) as 0 | 1 | 2}>
                    <CarteApp app={app} prioritaire={i < 3} />
                  </Apparait>
                ))}
              </div>

              <div>
                <Link href="/realisations" className="btn btn-secondaire">
                  Toutes les études de cas
                </Link>
              </div>
            </section>

            {/* ── COMPÉTENCES ──────────────────────────────────────────── */}
            <section className="section" aria-labelledby="titre-competences">
              <div className="section-tete">
                <p className="etiquette">Les compétences</p>
                <h2 id="titre-competences" className="t-h2">
                  Ce que je sais faire, et ce que ça permet.
                </h2>
                <p className="t-lead" style={{ maxWidth: 620 }}>
                  Une liste de technologies ne dit rien. Voici plutôt ce que chaque bloc rend
                  possible.
                </p>
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

            {/* ── MÉTHODE ──────────────────────────────────────────────── */}
            <section className="section" aria-labelledby="titre-methode">
              <div className="section-tete">
                <p className="etiquette">La méthode</p>
                <h2 id="titre-methode" className="t-h2">
                  De l’idée à l’App&nbsp;Store, en cinq temps.
                </h2>
              </div>

              <ol
                style={{
                  listStyle: 'none',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                }}
              >
                {etapes.map((e, i) => (
                  <Apparait
                    key={e.titre}
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
                        {e.titre}
                      </h3>
                      <p className="t-corps t-2" style={{ maxWidth: 620 }}>
                        {e.texte}
                      </p>
                    </div>
                  </Apparait>
                ))}
              </ol>
            </section>

            {/* ── PARCOURS ─────────────────────────────────────────────── */}
            <section className="section" aria-labelledby="titre-parcours">
              <div className="section-tete">
                <p className="etiquette">Le parcours</p>
                <h2 id="titre-parcours" className="t-h2">
                  Dix ans de métier, dont deux à publier mes propres produits.
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

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)' }}>
                <Link href="/a-propos" className="btn btn-secondaire">
                  Le parcours complet
                </Link>
                <a href={profil.cv} className="btn btn-fantome" download>
                  Télécharger le CV (PDF)
                </a>
              </div>
            </section>

            {/* ── DISPONIBILITÉ & CONTACT ──────────────────────────────── */}
            <Apparait as="section" className="creux" aria-labelledby="titre-contact">
              <div style={{ maxWidth: 620 }}>
                <p className="etiquette" style={{ marginBottom: 'var(--e-2)' }}>
                  Disponibilité
                </p>
                <h2 id="titre-contact" className="t-h2" style={{ marginBottom: 'var(--e-4)' }}>
                  Si vous cherchez quelqu’un comme moi, parlons-en.
                </h2>
                <p className="t-lead" style={{ marginBottom: 'var(--e-5)' }}>
                  Ouvert à une mission freelance, à un CDI pertinent ou à une collaboration produit.
                  Basé à {profil.ville}, à distance sans difficulté, et mobile si le poste le
                  justifie. Je réponds sous {disponibilite.delaiReponse}.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)' }}>
                  <Link href="/contact" className="btn btn-principal btn-large">
                    Me contacter
                  </Link>
                  <Link href="/challenge" className="btn btn-secondaire btn-large">
                    Me soumettre un problème
                  </Link>
                </div>
              </div>
            </Apparait>
          </div>
        </div>
      </main>

      <Pied />
      <BarreCollante />
    </>
  );
}
