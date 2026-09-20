import React from 'react';

/**
 * Le lien d'évitement : il permet à qui navigue au clavier de sauter la
 * navigation et d'atteindre le contenu directement.
 *
 * Il doit rester invisible jusqu'à recevoir le focus. Or la règle qui le
 * cachait vivait uniquement dans la feuille de style, et le lien est le tout
 * premier élément du <body> : sur une connexion lente, le navigateur affichait
 * donc « Aller au contenu » en haut de page pendant plusieurs secondes, le
 * temps que le CSS arrive. Mesuré à plus de trois secondes en 3G.
 *
 * La position hors écran est donc posée en style en ligne, qui s'applique dès
 * le premier rendu sans dépendre d'aucun fichier externe. La feuille de style
 * ne gère plus que l'apparition au focus, qui elle peut attendre : personne
 * ne tabule avant que la page soit chargée.
 */
export default function LienEvitement({
  cible = '#contenu',
  children = 'Aller au contenu',
}: {
  cible?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={cible}
      className="saute-au-contenu"
      style={{ position: 'absolute', left: -9999, top: 0 }}
    >
      {children}
    </a>
  );
}
