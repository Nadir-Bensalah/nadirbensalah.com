'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  EVENEMENTS,
  declareIntention,
  suit,
  type Intention as IntentionMesuree,
} from '@/lib/analytics';

/**
 * Le routage par intention.
 *
 * Trois portes, jamais une fenêtre modale : c'est une bande posée dans le flux
 * de la page. Le contenu reste entièrement accessible si on ne clique rien,
 * et le choix n'est mémorisé que pour adapter l'appel à l'action de la barre
 * collante. Rien ne se déclenche automatiquement, rien ne bloque la lecture.
 */

type Intention = 'recrute' | 'projet' | 'travaux';

const CLE = 'nbs:intention';

const portes: {
  cle: Intention;
  libelle: string;
  sous: string;
  href: string;
  /** Le nom de l'intention dans la mesure, commun à tout le site. */
  mesure: IntentionMesuree;
}[] = [
  {
    cle: 'recrute',
    libelle: 'Je recrute',
    sous: 'Poste, CDI, mission longue',
    href: '/cdi',
    mesure: 'recruteur',
  },
  {
    cle: 'projet',
    libelle: 'J’ai un projet',
    sous: 'Une application à construire',
    href: '/freelance',
    mesure: 'projet',
  },
  {
    cle: 'travaux',
    libelle: 'Je regarde son travail',
    sous: 'Ce qui est déjà en ligne',
    href: '/realisations',
    mesure: 'portfolio',
  },
];

export function useIntention(): Intention | null {
  const [intention, setIntention] = useState<Intention | null>(null);
  useEffect(() => {
    try {
      const v = localStorage.getItem(CLE) as Intention | null;
      if (v === 'recrute' || v === 'projet' || v === 'travaux') setIntention(v);
    } catch {
      /* stockage refusé : on reste sur l'affichage par défaut */
    }
  }, []);
  return intention;
}

export default function SelecteurIntention() {
  const choisir = (p: (typeof portes)[number]) => {
    try {
      localStorage.setItem(CLE, p.cle);
    } catch {
      /* sans stockage, le lien fonctionne quand même */
    }
    // L'intention est posée AVANT l'événement : il la porte déjà, comme toutes
    // les pages vues et tous les clics qui suivront dans la session.
    declareIntention(p.mesure);
    suit(EVENEMENTS.intention, { intention_choisie: p.mesure, destination: p.href });
  };

  return (
    <section aria-labelledby="titre-intention" className="section">
      <div className="section-tete">
        <p className="etiquette">Pour aller au plus court</p>
        <h2 id="titre-intention" className="t-h2">
          Qu’est-ce qui vous amène ?
        </h2>
        <p className="t-lead" style={{ maxWidth: 560 }}>
          Trois portes vers la même personne. Aucune n’est obligatoire : tout est lisible en
          défilant.
        </p>
      </div>

      <div className="grille grille-3">
        {portes.map((p) => (
          <Link
            prefetch={false}
            key={p.cle}
            href={p.href}
            onClick={() => choisir(p)}
            data-porte-intention={p.mesure}
            className="porte-intention"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              background: 'var(--bg-2)',
              borderRadius: 'var(--r-3)',
              padding: 'var(--e-5)',
              color: 'var(--texte)',
              minHeight: 108,
              justifyContent: 'center',
              transition: 'background var(--t-survol)',
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--e-2)',
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              {p.libelle}
              <svg
                className="fleche-porte"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                style={{ transition: 'transform var(--t-apparition)' }}
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
            <span className="t-petit t-2">{p.sous}</span>
          </Link>
        ))}
      </div>

      <style>{`
        .porte-intention:hover { background: var(--bg-3); text-decoration: none; color: var(--texte); }
        .porte-intention:hover .fleche-porte { transform: translateX(3px); }
      `}</style>
    </section>
  );
}
