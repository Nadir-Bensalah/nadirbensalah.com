import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import Apparait from '@/components/Apparait';
import CarteApp from '@/components/CarteApp';
import BoutonCv from '@/components/BoutonCv';
import { appParSlug } from '@/content/apps';
import { prospectParSlug, prospects } from '@/content/prospects';
import { disponibilite } from '@/content/profil';

/**
 * La page de prospection nominative.
 *
 * Aucune entreprise réelle n'y figure tant que src/content/prospects.ts est
 * vide : seul un gabarit `/hello/exemple` est produit, en noindex et hors
 * sitemap. Le système est prêt, sans fabriquer de fausse relation
 * commerciale.
 */

type Params = Promise<{ slug: string }>;

// `output: 'export'` refuse une route dynamique dont generateStaticParams
// renvoie un tableau vide. Tant qu'aucun prospect n'est déclaré, on expose
// donc un slug factice, exclu du sitemap et marqué noindex, qui sert aussi de
// démonstration du gabarit. Dès la première entrée réelle dans prospects.ts,
// ce slug disparaît automatiquement.
const SLUG_GABARIT = 'exemple';

export function generateStaticParams() {
  if (prospects.length === 0) return [{ slug: SLUG_GABARIT }];
  return prospects.map((p) => ({ slug: p.slug }));
}

/** Le contenu du gabarit, affiché uniquement quand aucun prospect n'existe. */
const GABARIT = {
  slug: SLUG_GABARIT,
  entreprise: 'votre entreprise',
  accroche:
    'Ceci est le gabarit des pages de prospection. Il s’affiche parce qu’aucune entreprise n’est encore déclarée dans src/content/prospects.ts. Ajoutez-y une entrée, relancez le build, et cette page laisse la place aux vraies.',
  appsMisesEnAvant: ['ticket', 'pilou', 'amiens-bus-velam'],
  propositions: [
    'Remplacer ce texte par ce que l’on propose réellement à cette entreprise.',
    'Deux ou trois points, pas davantage : la page se lit en une minute.',
    'Chaque ligne doit être vraie et vérifiable.',
  ],
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = prospectParSlug(slug) ?? (slug === SLUG_GABARIT ? GABARIT : undefined);
  if (!p) return {};
  return {
    title: `Bonjour ${p.entreprise}`,
    description: `Une page écrite pour ${p.entreprise}.`,
    // Ces pages sont envoyées, jamais référencées.
    robots: { index: false, follow: false },
  };
}

export default async function Hello({ params }: { params: Params }) {
  const { slug } = await params;
  const p = prospectParSlug(slug) ?? (slug === SLUG_GABARIT ? GABARIT : undefined);
  if (!p) notFound();

  const apps = p.appsMisesEnAvant.map(appParSlug).filter((a) => a !== undefined);

  return (
    <>
      <a href="#contenu" className="saute-au-contenu">
        Aller au contenu
      </a>
      <Entete />

      <main id="contenu">
        <section style={{ paddingTop: 'clamp(48px, 8vw, 88px)', paddingBottom: 'var(--e-7)' }}>
          <div className="enveloppe">
            <div style={{ maxWidth: 740 }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Une page écrite pour vous
              </p>
              <h1 className="t-h1">Bonjour {p.entreprise}.</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Cette page existe parce que j’aimerais travailler avec vous. Elle n’est pas référencée et
                n’est envoyée à personne d’autre.
              </p>
              <p className="t-lead" style={{ marginTop: 'var(--e-3)' }}>
                {p.accroche}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)', marginTop: 'var(--e-6)' }}>
                <Link href="/contact" className="btn btn-principal btn-large">
                  Prendre contact
                </Link>
                <BoutonCv depuis={`hello_${p.slug}`} variante="secondaire" />
              </div>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections">
            {apps.length > 0 && (
              <section className="section" aria-labelledby="t-apps">
                <div className="section-tete">
                  <p className="etiquette">Ce qui me semble le plus parlant pour vous</p>
                  <h2 id="t-apps" className="t-h2">
                    Des applications en ligne, que vous pouvez installer.
                  </h2>
                </div>
                <div className="grille grille-3">
                  {apps.map((app, i) => (
                    <Apparait key={app.slug} retard={(i % 3) as 0 | 1 | 2}>
                      <CarteApp app={app} prioritaire />
                    </Apparait>
                  ))}
                </div>
              </section>
            )}

            {p.propositions.length > 0 && (
              <section className="section" aria-labelledby="t-propositions">
                <div className="section-tete">
                  <p className="etiquette">Ce que je propose</p>
                  <h2 id="t-propositions" className="t-h2">
                    Concrètement.
                  </h2>
                </div>
                <ul className="liste-marque" style={{ maxWidth: 720 }}>
                  {p.propositions.map((x) => (
                    <li key={x} style={{ fontSize: 16.5 }}>
                      {x}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <Apparait as="section" className="creux">
              <div style={{ maxWidth: 620 }}>
                <h2 className="t-h2" style={{ marginBottom: 'var(--e-4)' }}>
                  Si ça vous parle, un message suffit.
                </h2>
                <p className="t-lead" style={{ marginBottom: 'var(--e-5)' }}>
                  Et si ce n’est pas le moment, ça se dit aussi. Je réponds sous{' '}
                  {disponibilite.delaiReponse}.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)' }}>
                  <Link href="/contact" className="btn btn-principal btn-large">
                    Me contacter
                  </Link>
                  <Link href="/realisations" className="btn btn-secondaire btn-large">
                    Voir les huit applications
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
