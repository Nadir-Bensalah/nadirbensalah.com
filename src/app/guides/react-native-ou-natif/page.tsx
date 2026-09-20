import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageGuide from '@/components/PageGuide';
import { guideParSlug } from '@/content/guides';

const guide = guideParSlug('react-native-ou-natif')!;

export const metadata: Metadata = {
  title: 'React Native ou natif : mon retour',
  description: guide.description,
  alternates: { canonical: '/guides/react-native-ou-natif' },
  openGraph: {
    title: 'React Native ou natif : ce que j’ai constaté après huit applications',
    description: guide.description,
    url: '/guides/react-native-ou-natif',
    images: ['/assets/images/og.png'],
    type: 'article',
  },
};

export default function Article() {
  return (
    <PageGuide guide={guide}>
      <p>
        La question est mal posée, et c’est ce qui la rend difficile. « React Native ou natif »
        suppose qu’il existe une bonne réponse générale. Il n’y en a pas. Il existe une bonne
        réponse <strong>pour un produit donné</strong>, et elle se déduit de deux choses : ce que le
        produit doit faire de non trivial avec le système, et qui reprendra le code dans dix-huit
        mois.
      </p>
      <p>
        Voici ce que huit applications publiées m’ont appris, en commençant par le cas où la réponse
        est la moins évidente.
      </p>

      <h2>Ce qui a réellement exigé du natif</h2>
      <p>
        Sur mes huit applications, <strong>six</strong> ont un tronc commun en React Native, et{' '}
        <strong>deux sont écrites entièrement en Swift</strong>. Les six React Native contiennent
        toutes du Swift, à des degrés très différents. Jamais pour des raisons de performance :
        toujours pour des raisons d’accès au système.
      </p>
      <p>
        <Link href="/realisations/ticket">Ticket</Link>, un horodateur de stationnement, doit
        afficher un compte à rebours dans la Dynamic Island et proposer des boutons « +15 min »
        actionnables depuis l’écran verrouillé. Cela passe par ActivityKit et App Intents, qui n’ont
        pas d’équivalent JavaScript.
      </p>
      <p>
        Celui-là, je l’ai écrit <strong>entièrement en Swift</strong>, et c’est l’exemple le plus
        net de l’arbitrage. Presque tout ce que fait Ticket se passe <em>en dehors</em> de
        l’application : la Dynamic Island, le Centre de contrôle, Siri, un tag NFC sur le tableau de
        bord. Il restait trois écrans. Mettre React Native sous trois écrans pour ensuite écrire en
        Swift tout ce qui compte, c’était payer un pont sans rien transporter dessus.
      </p>
      <p>
        <Link href="/realisations/qindil">Qindil</Link> et{' '}
        <Link href="/realisations/amiens-bus-velam">Amiens</Link> embarquent une application Apple
        Watch. Une app Watch s’écrit en SwiftUI, point final. React Native ne cible pas watchOS.
      </p>
      <p>
        Le point important : dans ces quatre cas, le natif représente une <strong>fraction</strong>{' '}
        du code, pas la majorité. L’essentiel de l’application, les écrans, la navigation, la
        logique métier, le stockage, reste en React Native. Écrire un module natif de 300 lignes ne
        justifie pas de réécrire 20 000 lignes d’interface deux fois.
      </p>

      <h2>Ce qui n’a jamais exigé de natif</h2>
      <p>
        La performance, dans mon cas, n’a jamais été l’argument décisif. C’est contre-intuitif,
        parce que c’est l’argument le plus souvent avancé.
      </p>
      <p>
        <Link href="/realisations/isogonic">Isogonic</Link> est un calculateur de vol qui exécute
        plus de vingt-cinq calculs, dont un suivi de centre de gravité sur toute la consommation
        carburant. C’est du calcul trigonométrique en continu, redessiné à chaque frappe. Aucun
        problème de performance, et l’application pèse 28 Mo. Le goulot d’étranglement d’une
        application mobile est presque toujours le réseau, le rendu de listes longues, ou des images
        mal dimensionnées. Rarement le langage.
      </p>
      <p>
        Le cas qui justifie vraiment le natif pour des raisons de performance existe, mais il est
        spécifique : un traitement vidéo en temps réel, un jeu à soixante images par seconde, une
        application de dessin avec détection de pression. Si votre produit n’est pas dans cette
        liste, la performance n’est pas votre critère de choix.
      </p>

      <h2>Le critère qui tranche vraiment</h2>
      <p>
        Après huit applications, mon critère de décision n’est plus technique. Il est le suivant :{' '}
        <strong>qui va maintenir ce code, et combien de personnes faut-il pour le faire ?</strong>
      </p>
      <p>
        Deux bases natives, c’est deux équipes, ou une personne qui maîtrise Swift et Kotlin
        également bien, ce qui est rare. Chaque fonctionnalité s’écrit deux fois, se teste deux
        fois, et diverge lentement. Les bugs apparaissent d’un côté et pas de l’autre.
      </p>
      <p>
        React Native, c’est une base, une équipe, et une compétence qui se recrute plus facilement
        en France parce que le vivier JavaScript est large. Le prix à payer est réel : une
        dépendance à un framework tiers, des montées de version parfois pénibles, et l’obligation de
        savoir descendre en natif quand c’est nécessaire.
      </p>

      <h2>Comment je décide, en pratique</h2>
      <p>Trois questions, dans cet ordre.</p>
      <p>
        <strong>
          Première question : le produit a-t-il besoin d’une fonctionnalité système que React Native
          ne couvre pas ?
        </strong>{' '}
        Si oui, ce n’est pas rédhibitoire, mais il faut quelqu’un capable d’écrire le module natif.
        Si votre équipe n’a personne qui sache le faire, c’est un risque réel, pas une note de bas
        de page.
      </p>
      <p>
        <strong>Deuxième question : combien de développeurs vont travailler dessus ?</strong> En
        dessous de trois, deux bases natives sont presque toujours un mauvais calcul. Au-delà de
        dix, avec des équipes iOS et Android déjà constituées, l’argument s’inverse.
      </p>
      <p>
        <strong>
          Troisième question : le produit est-il l’activité principale de l’entreprise, ou un
          support ?
        </strong>{' '}
        Une application qui <em>est</em> le produit, sur laquelle l’entreprise vivra dix ans, mérite
        qu’on envisage le natif. Une application qui sert une activité existante a presque toujours
        intérêt à coûter moins cher à construire et à maintenir.
      </p>

      <h2>Ce que je répondrais si vous me posiez la question</h2>
      <p>
        Dans la majorité des cas que je rencontre, qu’il s’agisse d’une PME, d’une startup ou d’une
        équipe de moins de cinq personnes, React Native est le bon choix, à une condition : que
        quelqu’un dans le projet sache descendre en natif le jour où il le faudra. Sans cette
        compétence, le framework devient un plafond de verre, et c’est là que les projets
        s’arrêtent.
      </p>
      <p>
        Si vous hésitez sur votre cas précis, <Link href="/challenge">décrivez-le moi</Link> : je
        vous dirai comment je l’aborderais, y compris si la réponse est « du natif, et voilà
        pourquoi ».
      </p>
    </PageGuide>
  );
}
