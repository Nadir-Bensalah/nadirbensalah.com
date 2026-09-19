'use client';

import React from 'react';
import { EVENEMENTS, suit } from '@/lib/analytics';

/**
 * Un lien vers l'App Store, avec le suivi attaché.
 *
 * Isolé dans son propre composant client pour que les cartes et les pages qui
 * l'utilisent restent des composants serveur : seul ce bouton embarque du
 * JavaScript, pas la grille entière.
 */
export default function LienAppStore({
  url,
  app,
  children,
  className = 't-petit lien-sobre',
  style,
}: {
  url: string;
  /** Le nom de l'application, pour savoir laquelle a été cliquée. */
  app: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => suit(EVENEMENTS.clicAppStore, { app })}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
