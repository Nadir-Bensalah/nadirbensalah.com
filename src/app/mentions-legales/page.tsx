import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import { profil } from '@/content/profil';
import LienEvitement from '@/components/LienEvitement';
import RefusMesure from '@/components/RefusMesure';

// Lus ici, au build, et non importés du module de mesure : une constante
// exportée d'un module « use client » vaut undefined côté serveur. La page
// décrit ainsi exactement ce qui est actif dans la version publiée.
const MESURE = process.env.NEXT_PUBLIC_MESURE !== 'off';
const ENVOI_DIRECT = Boolean(process.env.NEXT_PUBLIC_CLE_FORMULAIRE);

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
                  leurs fiches App&nbsp;Store respectives. L’application ForgeMe est éditée par
                  Perseus Capital.
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
                {ENVOI_DIRECT ? (
                  <p>
                    Le formulaire de contact transmet votre nom, votre adresse électronique, votre
                    entreprise si vous l’indiquez et votre message au service d’envoi Web3Forms, qui
                    me les remet par e-mail. Si cet envoi échoue, le message s’ouvre dans votre
                    propre logiciel de messagerie. Rien n’est conservé sur ce site.
                  </p>
                ) : (
                  <p>
                    Ce site est entièrement statique. Le formulaire de contact compose un message et
                    l’ouvre dans votre propre logiciel de messagerie : il ne transmet vos données à
                    aucun serveur, et rien n’est conservé ici.
                  </p>
                )}
                <p>
                  Le choix que vous exprimez éventuellement dans la section « Qu’est-ce qui vous
                  amène ? » est conservé dans le stockage local de votre navigateur, sur votre
                  appareil uniquement. Il sert à adapter un bouton.
                  {MESURE
                    ? ' Pendant la visite, il accompagne aussi les statistiques de fréquentation décrites ci-dessous, sans jamais être relié à votre identité.'
                    : ' Il n’est jamais transmis.'}{' '}
                  Vider les données du site dans votre navigateur l’efface.
                </p>
                {MESURE ? (
                  <>
                    <h3>Mesure d’audience</h3>
                    <p>
                      Pour comprendre comment le site est utilisé et l’améliorer, sa fréquentation
                      est mesurée avec PostHog, hébergé dans l’Union européenne (Francfort). Sont
                      collectés : les pages consultées, la page d’arrivée, le site, le moteur ou la
                      campagne d’où vous venez, le type d’appareil et de navigateur, le pays déduit
                      de la connexion, et les actions sur le site : clic sur un bouton,
                      téléchargement du CV, début et envoi d’un formulaire.
                    </p>
                    <p>
                      Les visites peuvent être rediffusées sous forme d’enregistrement des
                      défilements et des clics. Tous les champs de formulaire, les adresses
                      électroniques et les numéros de téléphone y sont masqués dans votre
                      navigateur, avant tout envoi. Le contenu des formulaires, votre adresse et
                      votre numéro ne sont jamais transmis à cet outil.
                    </p>
                    <p>
                      Aucun cookie n’est déposé. Un identifiant technique, sans lien avec votre
                      identité, est conservé dans le stockage de session du navigateur et s’efface à
                      la fermeture de l’onglet : une nouvelle visite est donc une nouvelle visite.
                      Aucun profil n’est constitué, et ces données ne sont ni vendues, ni utilisées
                      à des fins publicitaires, ni croisées avec d’autres sources.
                    </p>
                    <p>
                      Certaines actions me sont aussi signalées sur mon téléphone, par
                      l’intermédiaire de mon hébergeur et du service de notification ntfy : votre
                      arrivée sur le site, l’envoi d’un message, le téléchargement du CV, et
                      l’arrivée par un lien que je vous ai adressé. Ces signaux ne contiennent ni
                      votre nom, ni votre adresse, ni votre message : seulement la page consultée et
                      la provenance de la visite. Votre adresse IP sert uniquement, sur mon
                      hébergement, à limiter les abus : elle n’est jamais transmise, et seule une
                      empreinte chiffrée en est gardée, vingt-quatre heures.
                    </p>
                    <p>
                      Aucune mesure n’a lieu si votre navigateur envoie le signal Global Privacy
                      Control ou « Do Not Track ». Vous pouvez aussi la refuser ici :
                    </p>
                    <RefusMesure />
                  </>
                ) : (
                  <p>Aucun cookie n’est déposé et aucun outil de mesure d’audience n’est chargé.</p>
                )}
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
