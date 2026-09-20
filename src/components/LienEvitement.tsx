'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Le lien d'évitement : il permet à qui navigue au clavier de sauter la
 * navigation et d'atteindre le contenu directement.
 *
 * Il doit rester invisible jusqu'à recevoir le focus. Deux choses pouvaient
 * le montrer alors que personne ne l'avait demandé.
 *
 * 1. La mise hors écran vivait uniquement dans la feuille de style, et le
 *    lien est le premier élément du <body> : sur une connexion lente, il
 *    s'affichait en haut de page le temps que le CSS arrive. Mesuré à plus de
 *    trois secondes en 3G. D'où le style en ligne ci-dessous, appliqué dès le
 *    premier rendu sans dépendre d'aucun fichier externe.
 *
 * 2. Next.js change de page sans recharger le document. Le focus survivait
 *    donc à la navigation : après une tabulation, le lien restait affiché en
 *    haut à gauche de toutes les pages suivantes. Le navigateur restaure de
 *    la même façon le focus au retour arrière et à la réouverture d'un
 *    onglet. On le relâche donc à chaque changement de chemin.
 */
export default function LienEvitement({
  cible = '#contenu',
  children = 'Aller au contenu',
}: {
  cible?: string;
  children?: React.ReactNode;
}) {
  const lien = useRef<HTMLAnchorElement>(null);
  const chemin = usePathname();

  useEffect(() => {
    if (document.activeElement === lien.current) {
      lien.current?.blur();
    }
  }, [chemin]);

  return (
    <a
      ref={lien}
      href={cible}
      className="saute-au-contenu"
      style={{ position: 'absolute', left: -9999, top: 0 }}
    >
      {children}
    </a>
  );
}
