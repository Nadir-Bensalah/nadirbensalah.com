import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import { profil } from '@/content/profil';
import LienEvitement from '@/components/LienEvitement';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    'Éditeur du site, hébergement, propriété intellectuelle et traitement des données personnelles.',
  alternates: { canonical: '/mentions-legales' },
  robots: { index: false, follow: true },
};

export default function MentionsLegales() {
  return (
    <>
      <LienEvitement />
      <Entete />

      <main id="contenu">
        <section style={{ paddingTop: 'clamp(40px, 7vw, 80px)', paddingBottom: 'var(--e-8)' }}>
          <div className="enveloppe">
            <nav
              aria-label="Fil d’ariane"
              className="t-petit t-3"
              style={{ marginBottom: 'var(--e-5)' }}
            >
              <Link href="/" className="lien-sobre">
                Accueil
              </Link>
              <span aria-hidden> › </span>
              <span>Mentions légales</span>
            </nav>

            <div style={{ maxWidth: 'var(--colonne-lecture)' }}>
              <h1 className="t-h1" style={{ marginBottom: 'var(--e-6)' }}>
                Mentions légales
              </h1>

              <div className="article-corps">
                <h2>Éditeur du site</h2>
                <p>
                  Ce site est édité par {profil.nom}, entrepreneur individuel exerçant sous
                  l’enseigne {profil.enseigne}, immatriculé sous le numéro SIREN {profil.siren}.
                </p>
                <p>
                  Siège : {profil.ville}, {profil.pays}.
                  <br />
                  Contact : <a href={`mailto:${profil.email}`}>{profil.email}</a>
                  <br />
                  Téléphone : <a href={profil.telephoneLien}>{profil.telephone}</a>
                </p>
                <p>Directeur de la publication : {profil.nom}.</p>

                <h2>Hébergement</h2>
                <p>
                  Le site est hébergé par Hostinger International Ltd., 61 Lordou Vironos Street,
                  6023 Larnaca, Chypre.
                </p>

                <h2>Propriété intellectuelle</h2>
                <p>
                  Les textes, le code et la structure de ce site sont la propriété de {profil.nom},
                  sauf mention contraire.
                </p>
                <p>
                  Les captures d’écran et les icônes des applications présentées proviennent de
                  leurs fiches App&nbsp;Store respectives. L’application ForgeMe est publiée par
                  Perseus Capital ; elle est présentée ici au titre d’une prestation de
                  développement.
                </p>
                <p>
                  Les données du réseau de transport amiénois utilisées par l’application Amiens ·
                  Bus &amp; Vélam proviennent de transport.data.gouv.fr et sont diffusées sous
                  Licence Ouverte 2.0. Cette application est indépendante et n’est affiliée ni à
                  l’exploitant du réseau, ni à Amiens Métropole.
                </p>
                <p>
                  App Store, iOS, iPhone, Apple Watch, Siri et Dynamic Island sont des marques
                  d’Apple Inc. Leur mention sur ce site est descriptive et n’implique aucun
                  partenariat.
                </p>

                <h2>Données personnelles</h2>
                <p>
                  Ce site est entièrement statique. Il ne comporte aucun formulaire qui
                  transmettrait vos données à un serveur : le formulaire de contact compose un
                  message et l’ouvre dans votre propre logiciel de messagerie. Rien n’est stocké
                  ici.
                </p>
                <p>
                  Le choix que vous exprimez éventuellement dans la section « Qu’est-ce qui vous
                  amène ? » est conservé dans le stockage local de votre navigateur, sur votre
                  appareil uniquement. Il sert à adapter un bouton, et il n’est jamais transmis.
                  Vider les données du site dans votre navigateur l’efface.
                </p>
                <p>
                  Aucun cookie publicitaire n’est déposé, et aucun traceur tiers n’est chargé par
                  défaut. Si une mesure d’audience respectueuse de la vie privée est ajoutée
                  ultérieurement, cette page sera mise à jour avant sa mise en service.
                </p>
                <p>
                  Lorsque vous m’écrivez, votre message et votre adresse électronique sont traités
                  uniquement pour vous répondre, et conservés le temps de l’échange puis de la
                  relation qui en découle éventuellement. Conformément au règlement général sur la
                  protection des données, vous disposez d’un droit d’accès, de rectification,
                  d’effacement et d’opposition, qui s’exerce à l’adresse{' '}
                  <a href={`mailto:${profil.email}`}>{profil.email}</a>. Vous pouvez également
                  introduire une réclamation auprès de la CNIL.
                </p>

                <h2>Polices de caractères</h2>
                <p>
                  Le site charge la police Inter depuis Google Fonts. Cette requête transmet votre
                  adresse IP à Google. Si vous souhaitez l’éviter, un bloqueur de contenu suffit :
                  le site reste entièrement lisible avec la police système de votre appareil.
                </p>

                <h2>Liens externes</h2>
                <p>
                  Ce site renvoie vers l’App&nbsp;Store, LinkedIn et capmedia.app. Je n’ai aucun
                  contrôle sur le contenu ni sur les pratiques de ces services.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Pied />
    </>
  );
}
