import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import LienEvitement from '@/components/LienEvitement';

export const metadata: Metadata = {
  title: 'Runeo – Politique de confidentialité',
  description:
    'Politique de confidentialité de Runeo : aucun compte, aucun serveur, plan d’entraînement calculé sur l’iPhone, position utilisée pendant la séance seulement, synchronisation iCloud privée.',
  alternates: { canonical: '/runeo/confidentialite' },
};

const sections: [string, React.ReactNode][] = [
  [
    '1. L’essentiel',
    <>
      Runeo ne demande aucune inscription et ne crée aucun compte. Votre plan d’entraînement est
      calculé sur votre iPhone, par un moteur local, sans passer par le moindre serveur. Je ne
      reçois aucune de vos données, je ne les revends pas, et il n’y a aucune publicité.
    </>,
  ],
  [
    '2. Ce qui reste sur votre appareil',
    <>
      Votre profil de coureur (objectif, date de course, volume hebdomadaire, jours disponibles,
      records saisis, poids), votre plan complet, vos séances réalisées et vos sorties enregistrées
      avec leur tracé. Ces informations vivent dans la base locale de l’application et disparaissent
      si vous la désinstallez.
    </>,
  ],
  [
    '3. La position',
    <>
      Runeo utilise le GPS <strong>uniquement pendant une séance que vous avez lancée</strong>, pour
      mesurer votre distance, votre allure et votre parcours. Le suivi démarre au départ de la
      séance et s’arrête dès qu’elle est terminée ou abandonnée. L’autorisation de position en
      arrière-plan sert à continuer la mesure quand l’écran est éteint, ce qui est la situation
      normale en courant. Aucun suivi n’a lieu hors séance. Votre tracé reste sur l’appareil et
      n’est envoyé nulle part. Base légale : l’exécution du contrat.
    </>,
  ],
  [
    '4. La synchronisation iCloud',
    <>
      Si iCloud est activé sur votre iPhone, votre plan et vos sorties se synchronisent dans
      <strong> votre espace iCloud privé</strong>, afin que vous les retrouviez en changeant
      d’appareil. Ce stockage appartient à votre compte Apple : je n’y ai aucun accès, et Apple n’y
      accède pas davantage pour mon compte. La synchronisation est automatique, elle se coupe en
      désactivant iCloud pour Runeo dans les réglages de l’iPhone, et l’application continue de
      fonctionner entièrement en local. Base légale : l’exécution du contrat.
    </>,
  ],
  [
    '5. Santé et Apple Watch',
    <>
      L’application Apple Watch lit votre fréquence cardiaque, vos calories actives et votre
      distance pendant la séance, pour vous les afficher au poignet. À la fin, elle enregistre la
      séance dans l’application Santé, comme le ferait n’importe quelle séance de la montre. Ces
      données restent dans votre écosystème Apple : elles ne me sont jamais transmises, et elles ne
      servent à rien d’autre qu’à l’affichage et à cet enregistrement. Vous pouvez refuser l’accès à
      Santé, la séance fonctionne alors sans fréquence cardiaque. Base légale : votre consentement.
    </>,
  ],
  [
    '6. L’abonnement',
    <>
      Runeo propose un abonnement, traité entièrement par l’App Store. Je ne vois aucune coordonnée
      bancaire. L’application demande simplement à StoreKit, le service d’Apple, si cet identifiant
      Apple dispose d’un abonnement actif. Base légale : l’exécution du contrat.
    </>,
  ],
  [
    '7. Les notifications',
    <>
      Si vous les acceptez, Runeo programme des rappels pour vos séances. Ces notifications sont
      <strong> locales</strong> : elles sont créées et déclenchées par votre iPhone, sans serveur et
      sans jeton distant. Vous pouvez les couper à tout moment dans les réglages de l’iPhone. Base
      légale : votre consentement.
    </>,
  ],
  [
    '8. Destinataires',
    <>
      Apple, pour la distribution de l’application, la vérification de l’abonnement et le stockage
      iCloud qui vous appartient. Aucun autre tiers ne reçoit de données. Il n’y a ni outil de
      mesure d’audience, ni traceur publicitaire, ni service d’analyse tiers dans Runeo.
    </>,
  ],
  [
    '9. Durées de conservation',
    <>
      Données locales : tant que l’application reste installée. Données iCloud : tant que vous les
      conservez dans votre espace iCloud, que vous pouvez vider depuis les réglages de l’iPhone.
      Informations d’abonnement : selon les politiques d’Apple.
    </>,
  ],
  [
    '10. Vos droits',
    <>
      Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition et de
      portabilité. En pratique, comme rien n’est stocké de mon côté, la suppression se fait en
      désinstallant l’application et, si vous l’aviez activée, en vidant les données Runeo dans les
      réglages iCloud. Les réglages de l’application proposent aussi un effacement complet. Pour
      toute question, écrivez à <a href="mailto:contact@capmedia.app">contact@capmedia.app</a>. Vous
      pouvez aussi saisir la CNIL.
    </>,
  ],
  [
    '11. Enfants',
    <>
      Runeo s’adresse à des coureurs adultes ou adolescents. L’application ne collecte
      volontairement aucune donnée d’enfant et ne comporte aucun contenu destiné aux enfants.
    </>,
  ],
  [
    '12. Un mot sur la santé',
    <>
      Runeo n’est ni un entraîneur, ni un professionnel de santé, ni un dispositif médical. Les
      plans sont construits à partir de règles d’entraînement publiques. En cas de douleur, de doute
      ou de condition médicale particulière, consultez un médecin avant de suivre un plan.
    </>,
  ],
];

export default function RuneoConfidentialitePage() {
  return (
    <>
      <LienEvitement />
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
              <span>Runeo</span>
              <span aria-hidden> › </span>
              <span>Confidentialité</span>
            </nav>

            <div style={{ maxWidth: 'var(--colonne-lecture)' }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Runeo
              </p>
              <h1 className="t-h1">Politique de confidentialité</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Dernière mise à jour : 20 septembre 2026. Responsable du traitement : Nadir Ben
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
              <Link href="/contact" className="btn btn-secondaire">
                Une question ? Écrivez-moi
              </Link>
            </section>
          </div>
        </div>
      </main>

      <Pied />
    </>
  );
}
