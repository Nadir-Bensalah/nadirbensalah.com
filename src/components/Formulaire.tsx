'use client';

import React, { useMemo, useRef, useState } from 'react';
import { EVENEMENTS, suit } from '@/lib/analytics';
import { profil } from '@/content/profil';

/**
 * Le formulaire de contact.
 *
 * Le site est exporté en statique : il n'y a aucun serveur pour recevoir une
 * requête POST. Le formulaire compose donc un e-mail et l'ouvre dans le client
 * de messagerie du visiteur. C'est moins élégant qu'un envoi silencieux, mais
 * c'est honnête : le message part vraiment, et le visiteur en garde une copie
 * dans ses messages envoyés.
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
  titreChamp = 'Que voulez-vous construire ?',
  placeholder = 'Décrivez votre besoin en quelques lignes : ce que le produit doit faire, pour qui, et sous quelle contrainte de temps.',
}: {
  variante?: 'contact' | 'challenge';
  titreChamp?: string;
  placeholder?: string;
}) {
  const [etat, setEtat] = useState<Etat>('saisie');
  // Le message compose est conserve : si la messagerie ne s'ouvre pas, le
  // visiteur doit pouvoir le recuperer plutot que de tout retaper.
  const [messageCompose, setMessageCompose] = useState('');
  const [copie, setCopie] = useState(false);
  const [erreurs, setErreurs] = useState<Record<string, string>>({});
  const leurre = useRef<HTMLInputElement>(null);
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

    const e = valider(donnees);
    setErreurs(e);
    if (Object.keys(e).length > 0) {
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
    suit(variante === 'challenge' ? EVENEMENTS.envoieChallenge : EVENEMENTS.envoieContact);

    window.location.href = `mailto:${profil.email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;

    // Le client de messagerie s'ouvre dans un autre processus : on repasse en
    // état lisible pour que le visiteur comprenne ce qui vient de se passer.
    window.setTimeout(() => setEtat('succes'), 700);
  };

  if (etat === 'succes') {
    return (
      <div
        className="encadre encadre--action"
        role="status"
        id={idResultat}
        style={{ alignItems: 'flex-start' }}
      >
        <div>
          <p className="t-h3" style={{ marginBottom: 'var(--e-2)' }}>
            Votre messagerie devrait s’être ouverte.
          </p>
          <p className="t-corps t-2" style={{ marginBottom: 'var(--e-4)' }}>
            Le message est pré-rempli : il ne reste qu’à l’envoyer. Si rien ne s’est ouvert, votre
            appareil n’a probablement pas de logiciel de messagerie configuré. Dans ce cas,
            récupérez votre texte ci-dessous et envoyez-le à{' '}
            <a href={`mailto:${profil.email}`} style={{ fontWeight: 600 }}>
              {profil.email}
            </a>
            .
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
            <button type="button" className="btn btn-fantome" onClick={() => setEtat('saisie')}>
              Écrire un autre message
            </button>
          </div>

          <details style={{ marginTop: 'var(--e-4)' }}>
            <summary className="t-petit t-2" style={{ cursor: 'pointer' }}>
              Revoir mon message
            </summary>
            <pre
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
          {etat === 'envoi' ? 'Ouverture de votre messagerie…' : 'Envoyer'}
        </button>
        <p className="t-petit t-3" style={{ maxWidth: 340 }}>
          Le message s’ouvre dans votre messagerie. Rien n’est stocké sur ce site.
        </p>
      </div>
    </form>
  );
}
