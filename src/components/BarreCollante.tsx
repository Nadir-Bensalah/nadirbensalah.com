'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useIntention } from '@/components/SelecteurIntention';
import { EVENEMENTS, memoriseOrigine, suit } from '@/lib/analytics';
import { profil } from '@/content/profil';

/**
 * La barre d'appel à l'action du mobile.
 *
 * Elle n'apparaît qu'une fois le héros dépassé, pour ne jamais recouvrir la
 * première viewport. Son libellé suit l'intention choisie si le visiteur en a
 * exprimé une : un recruteur se voit proposer le CV, un porteur de projet se
 * voit proposer l'échange.
 */
export default function BarreCollante() {
  const [visible, setVisible] = useState(false);
  const intention = useIntention();

  useEffect(() => {
    memoriseOrigine();
    suit(EVENEMENTS.vueAccueil);
  }, []);

  useEffect(() => {
    const auDefilement = () => {
      // Visible une fois le héros dépassé, mais retirée à l'approche du pied
      // de page : sinon elle recouvre les liens du pied sur mobile.
      const y = window.scrollY;
      const restant = document.body.scrollHeight - (y + window.innerHeight);
      setVisible(y > 640 && restant > 320);
    };
    auDefilement();
    window.addEventListener('scroll', auDefilement, { passive: true });
    window.addEventListener('resize', auDefilement, { passive: true });
    return () => {
      window.removeEventListener('scroll', auDefilement);
      window.removeEventListener('resize', auDefilement);
    };
  }, []);

  const recruteur = intention === 'recrute';

  return (
    <div
      className={`barre-collante ${visible ? 'visible' : ''}`}
      aria-hidden={!visible}
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--e-3)',
        padding: 'var(--e-3) var(--marge-mobile) calc(var(--e-3) + env(safe-area-inset-bottom))',
        background: 'var(--bg)',
        borderTop: '1px solid var(--trait)',
        transform: visible ? 'none' : 'translateY(110%)',
        transition: 'transform 240ms cubic-bezier(.2,.8,.2,1)',
        // Hors écran, la barre ne doit intercepter ni clic ni survol.
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {recruteur ? (
        <>
          <a
            href={profil.cv}
            download
            onClick={() => suit(EVENEMENTS.telechargeCv, { depuis: 'barre_collante' })}
            className="btn btn-secondaire"
            style={{ flex: 1 }}
            tabIndex={visible ? 0 : -1}
          >
            Le CV
          </a>
          <Link
            href="/contact"
            onClick={() => suit(EVENEMENTS.ouvreContact, { depuis: 'barre_collante' })}
            className="btn btn-principal"
            style={{ flex: 1 }}
            tabIndex={visible ? 0 : -1}
          >
            Me contacter
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/realisations"
            className="btn btn-secondaire"
            style={{ flex: 1 }}
            tabIndex={visible ? 0 : -1}
          >
            Réalisations
          </Link>
          <Link
            href="/contact"
            onClick={() => suit(EVENEMENTS.ouvreContact, { depuis: 'barre_collante' })}
            className="btn btn-principal"
            style={{ flex: 1 }}
            tabIndex={visible ? 0 : -1}
          >
            Parler d’un projet
          </Link>
        </>
      )}

      <style>{`
        @media (min-width: 860px) {
          .barre-collante { display: none !important; }
        }
      `}</style>
    </div>
  );
}
