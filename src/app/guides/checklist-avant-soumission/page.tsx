import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageGuide from '@/components/PageGuide';
import { guideParSlug } from '@/content/guides';

const guide = guideParSlug('checklist-avant-soumission')!;

export const metadata: Metadata = {
  title: 'La check-list avant soumission à l’App Store',
  description: guide.description,
  alternates: { canonical: '/guides/checklist-avant-soumission' },
  openGraph: {
    title: 'Ce que je vérifie avant chaque soumission à l’App Store',
    description: guide.description,
    url: '/guides/checklist-avant-soumission',
    type: 'article',
  },
};

export default function Article() {
  return (
    <PageGuide guide={guide}>
      <p>
        Cette liste n’est pas théorique. Chaque point correspond à un aller-retour que j’ai
        réellement subi, ou que j’ai évité de justesse. Je la parcours entièrement avant chaque
        soumission, y compris pour une mise à jour mineure.
      </p>

      <h2>1. L’accès du relecteur</h2>
      <p>
        S’il y a une connexion, fournir un compte de démonstration{' '}
        <strong>avec des données dedans</strong>. Une application vide ne montre rien, et le
        relecteur ne devinera pas ce qu’elle sait faire.
      </p>
      <p>
        Si l’authentification passe par un SMS ou un e-mail, prévoir un code de contournement et
        l’écrire dans les notes de revue. Sinon, le relecteur est bloqué à l’écran un, et le refus
        est automatique.
      </p>

      <h2>2. Le fonctionnement hors contexte</h2>
      <p>Le relecteur n’est pas chez vous. Je teste systématiquement dans ces trois conditions :</p>
      <ul>
        <li>En mode avion, pour voir ce qui s’affiche quand il n’y a rien.</li>
        <li>
          Sur un réseau volontairement lent, pour vérifier que les écrans de chargement existent.
        </li>
        <li>Avec une position hors de France, quand l’application dépend de la localisation.</li>
      </ul>
      <p>
        C’est ce test qui m’a poussé à embarquer la fiche horaire complète dans{' '}
        <Link href="/realisations/amiens-bus-velam">Amiens</Link> : sans réseau, l’application
        devait continuer à répondre.
      </p>

      <h2>3. Le questionnaire de confidentialité</h2>
      <p>
        Le remplir <strong>après</strong> avoir listé les dépendances réellement embarquées, pas de
        mémoire. Un SDK oublié qui collecte un identifiant publicitaire contredit une déclaration «
        aucune collecte », et cette contradiction est détectable.
      </p>
      <p>
        Vérifier aussi que chaque chaîne d’autorisation explique l’usage en langage clair, et pas en
        jargon juridique.
      </p>

      <h2>4. Les achats intégrés</h2>
      <ul>
        <li>Le bouton « Restaurer un achat » existe et fonctionne, sur un appareil vierge.</li>
        <li>Les produits sont en statut « Prêt à soumettre » dans App Store Connect.</li>
        <li>
          Le prix affiché dans l’application correspond à celui d’App Store Connect, y compris après
          un changement de devise.
        </li>
        <li>
          Pour un abonnement : la durée, le prix et les conditions de renouvellement sont visibles
          avant l’achat, pas après.
        </li>
      </ul>

      <h2>5. Les cas limites de l’interface</h2>
      <p>
        C’est le point le plus souvent négligé, et celui qui fait le plus mauvais effet en revue.
      </p>
      <ul>
        <li>Le plus petit appareil supporté : le texte déborde-t-il ?</li>
        <li>La plus grande taille de texte du système : l’écran reste-t-il utilisable ?</li>
        <li>
          Les états vides : que voit un utilisateur au tout premier lancement, avant d’avoir rien
          créé ?
        </li>
        <li>
          Les erreurs : que se passe-t-il quand une requête échoue ? Un message, ou un écran figé ?
        </li>
      </ul>

      <h2>6. L’accessibilité</h2>
      <p>
        VoiceOver au moins sur le parcours principal. Chaque bouton doit avoir un libellé, chaque
        image informative un texte alternatif. Ce n’est pas seulement une question de conformité :
        c’est aussi ce qui révèle des boutons non libellés qu’on n’aurait jamais vus autrement.
      </p>

      <h2>7. La fiche et les captures</h2>
      <ul>
        <li>
          Les captures montrent l’application réelle, pas une maquette embellie qui n’existe pas.
        </li>
        <li>Le texte de la fiche ne promet rien que l’application ne fait pas.</li>
        <li>
          Aucune mention d’une autre plateforme (« disponible aussi sur Android ») : c’est refusé.
        </li>
        <li>L’URL de support répond, et l’URL de confidentialité aussi.</li>
      </ul>
      <p>
        Ce dernier point est la raison pour laquelle{' '}
        <Link href="/ose-plus">les pages de support d’Ose+</Link> vivent sur ce site : une URL qui
        tombe en 404 est un motif de refus à elle seule.
      </p>

      <h2>8. La version et le build</h2>
      <p>
        Le numéro de version a bien été incrémenté, le build est monté sur le bon identifiant, et
        les notes de version décrivent ce qui a changé. Une note « corrections de bugs » sur une
        mise à jour qui ajoute une fonctionnalité majeure attire l’attention, et rarement dans le
        bon sens.
      </p>

      <h2>Combien de temps ça prend</h2>
      <p>
        Une heure, à peu près, sur une application que je connais. Un refus coûte rarement moins
        d’une semaine. L’arbitrage est vite fait.
      </p>
      <p>
        Si vous préparez une première soumission et que vous voulez un regard extérieur avant
        d’envoyer, c’est exactement ce que couvre{' '}
        <Link href="/audit-application-react-native">l’audit</Link>.
      </p>
    </PageGuide>
  );
}
