import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';

export const metadata: Metadata = {
  title: 'Ose+ – Politique de confidentialité',
  description:
    "Politique de confidentialité de l'application Ose+ : aucune inscription, données conservées sur l'appareil, notifications et achat gérés par Apple.",
  alternates: { canonical: '/ose-plus-confidentialite' },
};

const sections: [string, React.ReactNode][] = [
  [
    "1. L'essentiel",
    <>
      Ose+ ne demande aucune inscription et ne crée aucun compte. Vos prénoms de joueurs, vos
      réglages et votre progression restent sur votre iPhone. Nous ne les recevons pas, nous ne les
      revendons pas, nous ne faisons pas de publicité ciblée.
    </>,
  ],
  [
    '2. Ce qui reste sur votre appareil',
    <>
      Les prénoms saisis pour une partie, la catégorie choisie, la langue, l&apos;état du mode SFW,
      l&apos;état des notifications et le fait que vous ayez terminé l&apos;introduction. Ces
      informations ne quittent jamais l&apos;appareil et disparaissent si vous désinstallez
      l&apos;application.
    </>,
  ],
  [
    '3. Notifications',
    <>
      Si vous acceptez les notifications, Apple et Google génèrent un jeton technique (APNs et FCM)
      qui permet d&apos;envoyer un rappel à votre appareil. Ce jeton ne vous identifie pas
      personnellement. Vous pouvez couper les notifications à tout moment, dans Ose+ ou dans les
      réglages de l&apos;iPhone. Base légale : votre consentement.
    </>,
  ],
  [
    "4. L'achat",
    <>
      Ose+ propose un achat unique, sans abonnement. Il est traité entièrement par l&apos;App Store.
      Nous ne voyons aucune coordonnée bancaire. L&apos;application demande simplement à StoreKit,
      le service d&apos;Apple, si cet identifiant Apple a bien acheté la version complète. Base
      légale : l&apos;exécution du contrat.
    </>,
  ],
  [
    '5. Destinataires',
    <>
      Apple, pour la distribution de l&apos;application, les notifications et la vérification de
      l&apos;achat. Google, uniquement pour l&apos;acheminement technique des notifications
      (Firebase Cloud Messaging). Aucun autre tiers ne reçoit de données, et rien n&apos;est vendu.
    </>,
  ],
  [
    '6. Durées de conservation',
    <>
      Données locales : tant que l&apos;application reste installée. Jeton de notification :
      jusqu&apos;à sa révocation par le système ou à la désinstallation. Informations d&apos;achat :
      selon les politiques d&apos;Apple.
    </>,
  ],
  [
    '7. Vos droits',
    <>
      Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
      d&apos;opposition et de portabilité. En pratique, comme rien n&apos;est stocké chez nous, la
      suppression se fait en désinstallant l&apos;application. Pour toute question, écrivez à{' '}
      <a href="mailto:contact@capmedia.app">contact@capmedia.app</a>. Vous pouvez aussi saisir la
      CNIL.
    </>,
  ],
  [
    '8. Enfants',
    <>
      Ose+ est un jeu de soirée destiné à un public adulte ou adolescent selon la catégorie choisie.
      Un mode SFW permet de filtrer le contenu le plus osé. L&apos;application ne collecte
      volontairement aucune donnée d&apos;enfant.
    </>,
  ],
];

export default function OsePlusConfidentialitePage() {
  return (
    <>
      <a href="#contenu" className="saute-au-contenu">
        Aller au contenu
      </a>
      <Entete />

      <main id="contenu">
        <section style={{ paddingTop: 'clamp(40px, 7vw, 80px)', paddingBottom: 'var(--e-7)' }}>
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
              <Link href="/ose-plus" className="lien-sobre">
                Ose+
              </Link>
              <span aria-hidden> › </span>
              <span>Confidentialité</span>
            </nav>

            <div style={{ maxWidth: 'var(--colonne-lecture)' }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Ose+
              </p>
              <h1 className="t-h1">Politique de confidentialité</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Dernière mise à jour : 6 septembre 2026. Responsable du traitement : Nadir Ben
                Salah, entrepreneur individuel, 76 rue du Professeur Christian Cabrol, 80000 Amiens,
                France.
              </p>
            </div>
          </div>
        </section>

        <div className="enveloppe">
          <div className="sections">
            <section className="article-corps">
              {sections.map(([titre, texte]) => (
                <div key={titre}>
                  <h2>{titre}</h2>
                  <p>{texte}</p>
                </div>
              ))}
            </section>

            <section>
              <Link href="/ose-plus" className="btn btn-secondaire">
                Retour au support Ose+
              </Link>
            </section>
          </div>
        </div>
      </main>

      <Pied />
    </>
  );
}
