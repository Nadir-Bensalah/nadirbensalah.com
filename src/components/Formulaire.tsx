'use client';

import React, { useMemo, useRef, useState } from 'react';
import { EVENEMENTS, suit } from '@/lib/analytics';
import { profil } from '@/content/profil';

/**
 * Le formulaire de contact.
 *
 * Le site est exporté en statique : il n'y a aucun serveur à soi pour recevoir
 * une requête POST. Le message part donc vers un service d'envoi tiers, dont
 * la clé publique vit dans NEXT_PUBLIC_CLE_FORMULAIRE.
 *
 * Tant que cette clé n'est pas définie, le formulaire retombe sur l'ancien
 * comportement : composer un e-mail et ouvrir la messagerie du visiteur. Ça
 * marche, mais ça demande au prospect de finir le travail, et surtout aucune
 * tentative n'est tracée : impossible de savoir combien de gens ont rempli
 * les champs sans que le message parte.
 *
 * Le repli reste en place même avec la clé : si l'envoi échoue (réseau coupé,
 * service indisponible), le visiteur récupère son texte et l'adresse directe
 * plutôt qu'un message d'erreur sec.
 *
 * Les coordonnées directes sont affichées à côté, parce qu'un tiers des gens
 * préfèrent écrire eux-mêmes plutôt que remplir des champs.
 *
 * Anti-spam : un champ leurre invisible. Un robot le remplit, un humain ne le
 * voit pas. Sans serveur, c'est la seule défense possible, et elle suffit ici
 * puisque rien n'est publié automatiquement.
 */

type Etat = 'saisie' | 'envoi' | 'succes' | 'erreur';

export default function Formulaire({
  variante = 'contact',
  titreChamp = 'Votre projet, ou votre proposition de poste',
  placeholder = 'Décrivez votre besoin en quelques lignes : ce que le produit doit faire, pour qui, et sous quelle contrainte de temps.',
}: {
  variante?: 'contact' | 'challenge';
  titreChamp?: string;
  placeholder?: string;
}) {
  const [etat, setEtat] = useState<Etat>('saisie');

  // Une cle Web3Forms permet l'envoi reel ; sans elle on ouvre la messagerie.
  const cleFormulaire = process.env.NEXT_PUBLIC_CLE_FORMULAIRE;
  const envoiDirect = Boolean(cleFormulaire);
  // Le message compose est conserve : si la messagerie ne s'ouvre pas, le
  // visiteur doit pouvoir le recuperer plutot que de tout retaper.
  const [messageCompose, setMessageCompose] = useState('');
  const [copie, setCopie] = useState(false);
  // Distingue « le message est parti » de « votre messagerie devrait s'être
  // ouverte » : les deux méritent un texte différent.
  const [envoiReel, setEnvoiReel] = useState(false);
  const [erreurs, setErreurs] = useState<Record<string, string>>({});
  const leurre = useRef<HTMLInputElement>(null);
  // Pour la mesure : le formulaire a-t-il été commencé, et quand.
  const commence = useRef(false);
  const debut = useRef<number | null>(null);

  const auPremierCaractere = (evt: React.FormEvent<HTMLFormElement>) => {
    // Le champ leurre ne compte pas : seul un robot le remplit.
    if ((evt.target as HTMLInputElement).name === 'site' || commence.current) return;
    commence.current = true;
    debut.current = Date.now();
    suit(EVENEMENTS.formulaireCommence, { formulaire: variante });
  };
  const idResultat = useMemo(() => `resultat-${variante}`, [variante]);

  const valider = (donnees: FormData) => {
    const e: Record<string, string> = {};
    const nom = String(donnees.get('nom') || '').trim();
    const email = String(donnees.get('email') || '').trim();
    const message = String(donnees.get('message') || '').trim();

    if (nom.length < 2) e.nom = 'Indiquez au moins votre prénom.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      e.email = 'Cette adresse ne semble pas valide.';
    if (message.length < 20)
      e.message = 'Quelques lignes de plus m’aideraient à vous répondre utilement.';

    return e;
  };

  const soumettre = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const donnees = new FormData(form);

    // Champ leurre rempli : c'est un robot, ou un gestionnaire de mots de
    // passe trop zélé. On n'envoie rien, mais on ne détruit pas la saisie :
    // un humain pris pour un robot doit pouvoir récupérer son texte.
    if (leurre.current?.value) {
      setMessageCompose(String(donnees.get('message') || ''));
      setEtat('succes');
      return;
    }

    suit(EVENEMENTS.formulaireTentative, { formulaire: variante, envoi_direct: envoiDirect });

    const e = valider(donnees);
    setErreurs(e);
    if (Object.keys(e).length > 0) {
      // Le NOM des champs refusés, jamais leur contenu.
      const champs = ['nom', 'email', 'message'].filter((n) => e[n]);
      suit(EVENEMENTS.formulaireErreur, {
        formulaire: variante,
        champs_en_erreur: champs,
        nb_erreurs: champs.length,
      });
      setEtat('erreur');
      // On vise le champ par son nom, pas par [aria-invalid] : setErreurs est
      // asynchrone, l'attribut n'est pas encore posé dans le DOM à cet
      // instant, et la recherche ne trouvait jamais rien. L'utilisateur au
      // clavier restait sur le bouton sans savoir ce qui avait échoué.
      const ordre = ['nom', 'email', 'message'];
      const premierNom = ordre.find((n) => e[n]);
      if (premierNom) {
        form.querySelector<HTMLElement>(`[name="${premierNom}"]`)?.focus();
      }
      return;
    }

    setEtat('envoi');

    const nom = String(donnees.get('nom') || '').trim();
    const entreprise = String(donnees.get('entreprise') || '').trim();
    const email = String(donnees.get('email') || '').trim();
    const message = String(donnees.get('message') || '').trim();

    const sujet =
      variante === 'challenge'
        ? `Un problème à regarder : ${nom}${entreprise ? ` (${entreprise})` : ''}`
        : `Projet : ${nom}${entreprise ? ` (${entreprise})` : ''}`;

    const corps = [message, '', '--', `${nom}${entreprise ? ` · ${entreprise}` : ''}`, email].join(
      '\n'
    );

    setMessageCompose(corps);

    const cle = cleFormulaire;
    const ouvreMessagerie = (raison: 'sans_cle' | 'echec_envoi') => {
      // Ce n'est PAS un lead : on sait seulement que la messagerie du
      // visiteur a été ouverte, pas qu'il a réellement envoyé le message.
      suit(EVENEMENTS.formulaireMessagerie, { formulaire: variante, raison });
      window.location.href = `mailto:${profil.email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
      window.setTimeout(() => setEtat('succes'), 700);
    };
    const echec = (raison: string, statut?: number) =>
      suit(EVENEMENTS.formulaireEchec, { formulaire: variante, raison, statut_http: statut });

    // Sans clé configurée : l'ancien comportement, pour que le formulaire ne
    // soit jamais cassé pendant l'installation.
    if (!cle) {
      ouvreMessagerie('sans_cle');
      return;
    }

    void (async () => {
      try {
        const reponse = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: cle,
            subject: sujet,
            from_name: nom,
            // Répondre au message ouvre directement une réponse au visiteur.
            replyto: email,
            nom,
            entreprise: entreprise || '—',
            email,
            message,
            origine: variante,
          }),
        });

        // Le service répond en JSON { success: true } : un code 200 seul ne
        // suffit pas à compter un lead.
        const corpsReponse = (await reponse.json().catch(() => null)) as {
          success?: boolean;
        } | null;

        if (!reponse.ok || corpsReponse?.success !== true) {
          echec(
            !reponse.ok ? (reponse.status >= 500 ? 'http_5xx' : 'http_4xx') : 'reponse_invalide',
            reponse.status
          );
          ouvreMessagerie('echec_envoi');
          return;
        }

        // LE LEAD. Seul endroit du site où il est compté, après confirmation.
        suit(variante === 'challenge' ? EVENEMENTS.leadChallenge : EVENEMENTS.leadContact, {
          formulaire: variante,
          duree_saisie_s: debut.current
            ? Math.round((Date.now() - debut.current) / 1000)
            : undefined,
        });
        setEnvoiReel(true);
        setEtat('succes');
      } catch {
        // Réseau coupé, service injoignable ou requête bloquée : plutôt qu'un
        // message d'erreur sec, on bascule sur la messagerie. Le visiteur n'a
        // pas à savoir qu'un service tiers est tombé.
        echec('reseau');
        ouvreMessagerie('echec_envoi');
      }
    })();
  };

  if (etat === 'succes') {
    return (
      <div
        className="encadre encadre--action"
        role="status"
        id={idResultat}
        data-ph-masque
        style={{ alignItems: 'flex-start' }}
      >
        <div>
          <p className="t-h3" style={{ marginBottom: 'var(--e-2)' }}>
            {envoiReel ? 'Message reçu.' : 'Votre messagerie devrait s’être ouverte.'}
          </p>
          <p className="t-corps t-2" style={{ marginBottom: 'var(--e-4)' }}>
            {envoiReel ? (
              <>
                Je réponds sous 24 heures, y compris pour dire que ce n’est pas pour moi. Si vous
                voulez ajouter quelque chose, écrivez directement à{' '}
                <a href={`mailto:${profil.email}`} style={{ fontWeight: 600 }}>
                  {profil.email}
                </a>
                .
              </>
            ) : (
              <>
                Le message est pré-rempli : il ne reste qu’à l’envoyer. Si rien ne s’est ouvert,
                votre appareil n’a probablement pas de logiciel de messagerie configuré. Dans ce
                cas, récupérez votre texte ci-dessous et envoyez-le à{' '}
                <a href={`mailto:${profil.email}`} style={{ fontWeight: 600 }}>
                  {profil.email}
                </a>
                .
              </>
            )}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)' }}>
            <button
              type="button"
              className="btn btn-secondaire"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(messageCompose);
                  setCopie(true);
                  window.setTimeout(() => setCopie(false), 2500);
                } catch {
                  // Presse-papiers refusé : le texte reste lisible ci-dessous.
                  setCopie(false);
                }
              }}
            >
              {copie ? 'Message copié' : 'Copier mon message'}
            </button>
            <button
              type="button"
              className="btn btn-fantome"
              onClick={() => {
                // Un nouveau message est un nouveau formulaire commencé.
                commence.current = false;
                debut.current = null;
                setEtat('saisie');
              }}
            >
              Écrire un autre message
            </button>
          </div>

          <details style={{ marginTop: 'var(--e-4)' }}>
            <summary className="t-petit t-2" style={{ cursor: 'pointer' }}>
              Revoir mon message
            </summary>
            <pre
              className="ph-no-capture"
              style={{
                marginTop: 'var(--e-3)',
                whiteSpace: 'pre-wrap',
                fontFamily: 'var(--police)',
                fontSize: 14,
                lineHeight: 1.6,
                color: 'var(--texte-2)',
                background: 'var(--bg)',
                borderRadius: 'var(--r-2)',
                padding: 'var(--e-3)',
              }}
            >
              {messageCompose}
            </pre>
          </details>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={soumettre}
      onInput={auPremierCaractere}
      noValidate
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--e-4)' }}
    >
      {/* Champ leurre : invisible à l'écran, mais pas via display:none, que
          certains robots détectent. Retiré de l'ordre de tabulation et du
          calcul d'accessibilité. */}
      <div
        aria-hidden
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}
      >
        <label htmlFor={`site-${variante}`}>Ne pas remplir ce champ</label>
        <input
          ref={leurre}
          id={`site-${variante}`}
          name="site"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--e-4)',
        }}
      >
        <div>
          <label className="etiquette-champ" htmlFor={`nom-${variante}`}>
            Votre nom
          </label>
          <input
            id={`nom-${variante}`}
            name="nom"
            type="text"
            className="champ"
            autoComplete="name"
            required
            aria-invalid={erreurs.nom ? 'true' : undefined}
            aria-describedby={erreurs.nom ? `err-nom-${variante}` : undefined}
          />
          {erreurs.nom && (
            <p
              id={`err-nom-${variante}`}
              role="alert"
              className="t-petit"
              style={{ color: 'var(--danger)', marginTop: 6 }}
            >
              {erreurs.nom}
            </p>
          )}
        </div>

        <div>
          <label className="etiquette-champ" htmlFor={`entreprise-${variante}`}>
            Entreprise <span className="t-3">(facultatif)</span>
          </label>
          <input
            id={`entreprise-${variante}`}
            name="entreprise"
            type="text"
            className="champ"
            autoComplete="organization"
          />
        </div>
      </div>

      <div>
        <label className="etiquette-champ" htmlFor={`email-${variante}`}>
          Votre e-mail
        </label>
        <input
          id={`email-${variante}`}
          name="email"
          type="email"
          inputMode="email"
          className="champ"
          autoComplete="email"
          required
          aria-invalid={erreurs.email ? 'true' : undefined}
          aria-describedby={erreurs.email ? `err-email-${variante}` : undefined}
        />
        {erreurs.email && (
          <p
            id={`err-email-${variante}`}
            role="alert"
            className="t-petit"
            style={{ color: 'var(--danger)', marginTop: 6 }}
          >
            {erreurs.email}
          </p>
        )}
      </div>

      <div>
        <label className="etiquette-champ" htmlFor={`message-${variante}`}>
          {titreChamp}
        </label>
        <textarea
          id={`message-${variante}`}
          name="message"
          className="champ"
          rows={7}
          required
          placeholder={placeholder}
          aria-invalid={erreurs.message ? 'true' : undefined}
          aria-describedby={erreurs.message ? `err-message-${variante}` : undefined}
        />
        {erreurs.message && (
          <p
            id={`err-message-${variante}`}
            role="alert"
            className="t-petit"
            style={{ color: 'var(--danger)', marginTop: 6 }}
          >
            {erreurs.message}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)', alignItems: 'center' }}>
        <button type="submit" className="btn btn-principal btn-large" disabled={etat === 'envoi'}>
          {etat === 'envoi'
            ? envoiDirect
              ? 'Envoi en cours…'
              : 'Ouverture de votre messagerie…'
            : envoiDirect
              ? 'Envoyer'
              : 'Préparer l’e-mail'}
        </button>
        <p className="t-petit t-3" style={{ maxWidth: 340 }}>
          {envoiDirect
            ? 'Le message m’est envoyé directement. Je réponds sous 24 heures ouvrées.'
            : 'Le message s’ouvre dans votre messagerie. Rien n’est stocké sur ce site.'}
        </p>
      </div>
    </form>
  );
}
