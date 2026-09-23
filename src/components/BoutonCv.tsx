import React from 'react';
import { profil } from '@/content/profil';

/**
 * Le bouton de téléchargement du CV. Le clic est mesuré par l'écouteur global,
 * et `depuis` devient l'emplacement rapporté avec l'événement.
 * Le fichier existe réellement dans public/assets/cv/ : ce lien ne peut pas
 * tomber en 404 sans que le build le signale.
 */
export default function BoutonCv({
  depuis,
  variante = 'principal',
  libelle = 'Télécharger le CV (PDF)',
}: {
  depuis: string;
  variante?: 'principal' | 'secondaire' | 'fantome';
  libelle?: string;
}) {
  const classes = {
    principal: 'btn btn-principal btn-large',
    secondaire: 'btn btn-secondaire btn-large',
    fantome: 'btn btn-fantome',
  }[variante];

  return (
    <a href={profil.cv} download data-emplacement={depuis} className={classes}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      {libelle}
    </a>
  );
}
