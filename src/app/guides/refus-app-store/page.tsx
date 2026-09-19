import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageGuide from '@/components/PageGuide';
import { guideParSlug } from '@/content/guides';

const guide = guideParSlug('refus-app-store')!;

export const metadata: Metadata = {
  title: 'Pourquoi Apple refuse une application',
  description: guide.description,
  alternates: { canonical: '/guides/refus-app-store' },
  openGraph: {
    title: 'Pourquoi Apple refuse une application, et comment le corriger',
    description: guide.description,
    url: '/guides/refus-app-store',
    type: 'article',
  },
};

export default function Article() {
  return (
    <PageGuide guide={guide}>
      <p>
        Un refus Apple arrive sous la forme d’un message court dans App Store Connect, avec un
        numéro de guideline et parfois une capture d’écran. Le ton est neutre, l’explication
        minimale, et la première réaction est en général : « mais qu’est-ce qu’ils veulent,
        exactement ? »
      </p>
      <p>
        La bonne nouvelle, c’est que les motifs se répètent. Après huit applications publiées, voici
        ceux que je rencontre le plus, et ce qu’ils signifient réellement.
      </p>

      <h2>Guideline 2.1 : « Performance — Informations complémentaires »</h2>
      <p>
        C’est le refus le plus fréquent, et le plus vague. Il veut presque toujours dire l’une de
        ces trois choses.
      </p>
      <p>
        <strong>Le relecteur n’a pas pu entrer dans l’application.</strong> Si votre application a
        un écran de connexion, vous devez fournir un compte de démonstration fonctionnel dans les
        notes de revue. Pas un compte expiré, pas un compte vide : un compte avec des données
        dedans, qui montre l’application en fonctionnement. Si l’accès dépend d’un code SMS, il faut
        prévoir un contournement, sinon le relecteur est bloqué.
      </p>
      <p>
        <strong>Une fonctionnalité annoncée ne marche pas chez lui.</strong> Le relecteur teste
        souvent depuis l’étranger, sur un appareil qui n’est pas le vôtre, parfois sur un réseau
        lent. Une fonctionnalité qui dépend d’une position en France, d’un service tiers, ou d’une
        donnée qui n’existe que chez vous, va échouer.
      </p>
      <p>
        <strong>L’application a planté.</strong> Testez sur le plus petit appareil que vous
        supportez, et sur la version d’iOS minimale que vous déclarez. C’est là que ça casse.
      </p>

      <h2>Guideline 5.1.1 : la confidentialité et les données</h2>
      <p>
        Deux pièges distincts. Le premier : demander une autorisation sans expliquer pourquoi.
        Chaque chaîne d’usage — position, micro, photos, notifications — doit dire ce que vous
        faites de la donnée, en langage clair. « Cette app utilise votre position » est refusé. «
        Votre position sert à calculer les horaires de prière sur votre appareil, et ne quitte
        jamais votre téléphone » passe.
      </p>
      <p>
        Le second piège, plus sournois : le questionnaire de confidentialité que vous remplissez
        dans App Store Connect doit correspondre à ce que l’application fait réellement. Si vous
        déclarez ne collecter aucune donnée mais qu’un SDK d’analytique traîne dans vos dépendances,
        c’est une contradiction, et elle se voit.
      </p>
      <p>
        C’est une des raisons pour lesquelles plusieurs de mes applications n’ont aucun serveur :{' '}
        <Link href="/realisations/pilou">Pilou</Link> et{' '}
        <Link href="/realisations/ticket">Ticket</Link> ne collectent rien, ce qui rend le
        questionnaire trivial à remplir et impossible à contredire.
      </p>

      <h2>Guideline 3.1.1 : les achats intégrés</h2>
      <p>
        Si votre application débloque du contenu numérique, cela doit passer par l’achat intégré
        d’Apple. Pas par un lien vers votre site, pas par un paiement externe. C’est la règle qui
        coûte les 15 ou 30 % de commission, et elle est appliquée strictement.
      </p>
      <p>
        L’autre moitié de cette règle est souvent oubliée : vous devez proposer un bouton{' '}
        <strong>« Restaurer un achat »</strong> visible. Une application payante sans bouton de
        restauration est refusée, parce qu’un utilisateur qui change de téléphone doit pouvoir
        récupérer ce qu’il a payé.
      </p>

      <h2>Guideline 4.2 : « Minimum Functionality »</h2>
      <p>
        Celui-là fait mal, parce qu’il est subjectif. Apple refuse les applications qui ne sont
        qu’un site web encapsulé, ou qui n’apportent rien qu’un navigateur ne ferait aussi bien.
      </p>
      <p>
        La parade n’est pas rhétorique, elle est technique : intégrez quelque chose que seul le
        système peut faire. Un widget, une notification pertinente, un raccourci Siri, un
        fonctionnement hors ligne. C’est exactement ce qui distingue une application d’un signet.
      </p>

      <h2>Ce que je fais quand le refus tombe</h2>
      <p>
        D’abord, je ne resoumets pas immédiatement. Une resoumission identique avec un message
        d’explication est presque toujours refusée une seconde fois, et on perd une semaine de plus.
      </p>
      <p>
        Ensuite, j’utilise le dialogue de revue. On peut répondre dans App Store Connect, poser une
        question précise, demander une capture d’écran du problème constaté. Les relecteurs
        répondent, et souvent la réponse contient l’information qui manquait dans le refus initial.
      </p>
      <p>
        Enfin, quand je pense qu’il s’agit d’une erreur d’appréciation, il existe un recours formel
        auprès de l’App Review Board. À utiliser avec parcimonie, et seulement avec un argument
        solide.
      </p>
      <p>
        Le meilleur remède reste de ne pas se faire refuser. J’ai décrit ailleurs{' '}
        <Link href="/guides/checklist-avant-soumission">
          ce que je vérifie avant chaque soumission
        </Link>{' '}
        : c’est la liste née de mes propres allers-retours.
      </p>
    </PageGuide>
  );
}
