'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Révélation au défilement. Une seule fois, jamais rejouée.
 *
 * Le contenu est rendu dans le HTML quoi qu'il arrive : seule l'opacité est
 * animée. Un lecteur d'écran, un moteur de recherche ou un navigateur sans
 * IntersectionObserver voient le texte normalement.
 */
export default function Apparait({
  children,
  retard = 0,
  as: Balise = 'div',
  className = '',
  ...reste
}: {
  children: React.ReactNode;
  retard?: 0 | 1 | 2 | 3 | 4;
  as?: 'div' | 'section' | 'li' | 'article';
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement | null>(null);
  const [vu, setVu] = useState(false);

  useEffect(() => {
    const noeud = ref.current;
    if (!noeud) return;

    // Mouvement réduit demandé : on affiche sans animer.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVu(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setVu(true);
      return;
    }

    const observateur = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((e) => {
          if (e.isIntersecting) {
            setVu(true);
            observateur.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observateur.observe(noeud);
    return () => observateur.disconnect();
  }, []);

  return React.createElement(
    Balise,
    {
      ref: ref as React.Ref<never>,
      className: `apparait ${vu ? 'vu' : ''} ${className}`.trim(),
      'data-retard': retard || undefined,
      style: retard ? { transitionDelay: `${retard * 60}ms` } : undefined,
      ...reste,
    },
    children
  );
}
