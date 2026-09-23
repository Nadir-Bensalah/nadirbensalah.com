import React from 'react';

/**
 * Un lien vers l'App Store. Le clic est mesuré par l'écouteur global
 * (Mesure.tsx) ; l'attribut data-app lui dit de quelle application il
 * s'agit, sous le même identifiant que l'étude de cas.
 */
export default function LienAppStore({
  url,
  app,
  children,
  className = 't-petit lien-sobre',
  style,
}: {
  url: string;
  /** L'identifiant de l'application (son slug), pour savoir laquelle a été cliquée. */
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
      data-app={app}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
