# La mesure d'audience

PostHog, projet européen (Francfort). Tout le code est dans
`src/lib/analytics.ts` (configuration, dictionnaire, contexte, filtre de
confidentialité) et `src/components/Mesure.tsx` (chargement, qualification des
clics, profondeur de lecture).

## Les événements

Les pages vues (`$pageview`) et les sorties de page (`$pageleave`) sont
automatiques. Les autres sont nommés, et chacun sert une décision.

| Événement              | Déclencheur                                                         | Propriétés propres                                                                        |
| ---------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `intent_select`        | clic sur une porte de l'accueil                                     | `intention_choisie`, `destination`                                                        |
| `cta_click`            | bouton interne, ou tout lien vers /contact, /en/contact, /challenge | `cta_id`, `cta_texte`, `cta_style`, `destination`, `vers_contact`, `emplacement`          |
| `cv_download`          | lien vers le PDF du CV                                              | `emplacement`, `fichier`                                                                  |
| `app_store_click`      | lien vers l'App Store                                               | `app`, `app_store_id`, `type_lien`, `emplacement`                                         |
| `contact_click`        | lien `mailto:` ou `tel:`                                            | `moyen` (email, telephone), `emplacement`                                                 |
| `outbound_click`       | tout autre lien externe                                             | `destination` (github, linkedin, capmedia, site_produit, autre), `domaine`, `emplacement` |
| `form_start`           | premier caractère saisi                                             | `formulaire` (contact, challenge)                                                         |
| `form_submit_attempt`  | clic sur « Envoyer »                                                | `formulaire`, `envoi_direct`                                                              |
| `form_error`           | validation refusée                                                  | `formulaire`, `champs_en_erreur` (noms), `nb_erreurs`                                     |
| `form_submit_failed`   | le service d'envoi échoue                                           | `formulaire`, `raison` (http_4xx, http_5xx, reponse_invalide, reseau), `statut_http`      |
| `form_mailto_fallback` | la messagerie du visiteur s'ouvre                                   | `formulaire`, `raison` (sans_cle, echec_envoi)                                            |
| **`submit_contact`**   | **LEAD** : Web3Forms a répondu `{ success: true }`                  | `formulaire`, `duree_saisie_s`                                                            |
| **`challenge_submit`** | **LEAD** : idem, depuis /challenge                                  | `formulaire`, `duree_saisie_s`                                                            |
| `scroll_depth`         | 50 puis 90 % d'une page de lecture                                  | `profondeur`                                                                              |

`form_mailto_fallback` n'est pas un lead : on sait que la messagerie s'est
ouverte, pas que le message est parti.

## Les propriétés présentes sur TOUS les événements

Ajoutées par `enrichit()` juste avant l'envoi, pages vues comprises.

- La page : `page_type`, `langue`, `contenu_id` (étude de cas, guide, article, page de service).
- L'origine de la visite, figée à la première page : `canal` (direct, recherche,
  social, referral, assistant_ia, email, campagne, payant, prospection),
  `source`, `medium`, `campagne`, `utm_contenu`, `utm_terme`,
  `referrer_domaine`, `landing_page`, `landing_type`.
- L'intention : `intention` (recruteur, projet, portfolio, inconnue) et
  `intention_origine` (declaree, deduite, inconnue). Déclarée par une porte de
  l'accueil ; sinon déduite de la première page qui la trahit (/cdi →
  recruteur, /freelance ou /audit → projet, /realisations → portfolio).

`emplacement` vaut l'en-tête, le pied, le menu mobile, la barre collante, le
héros, l'identifiant de la section, ou ce que déclare un `data-emplacement`.

## Ajouter un bouton

Rien à faire : l'écouteur global le qualifie par sa destination. Un lien
interne est un `cta_click` s'il porte la classe `btn` ou l'attribut
`data-cta`, ou s'il mène au contact.

## Confidentialité

- Aucun cookie. Identifiant dans le sessionStorage, effacé à la fermeture de
  l'onglet. Seul le refus de la mesure est gardé durablement.
- Global Privacy Control, Do Not Track, ou le bouton des mentions légales :
  PostHog n'est pas téléchargé du tout.
- Aucune valeur de champ n'est envoyée. `nettoie()` remplace en dernier
  recours toute valeur qui ressemble à un e-mail ou à un téléphone.
- Replay : tous les champs masqués, textes des liens e-mail et téléphone
  masqués, écran de confirmation masqué, message recomposé bloqué.
- Le trafic de `localhost` est marqué test (`$internal_or_test_user`) et exclu
  des tableaux de bord.

## Vérifier

```sh
NEXT_PUBLIC_CLE_FORMULAIRE=cle-de-test npm run build && npm run tester-mesure
npm run build && npm run tester-mesure -- --sans-cle
```

Neuf parcours dans Chrome, chaque envoi vers PostHog lu et comparé aux
attentes. Le banc échoue si une coordonnée saisie sort du navigateur. Le
service d'envoi du formulaire reçoit une réponse fabriquée : aucun message ne
part réellement.

## Les tableaux de bord

```sh
node scripts/posthog-tableaux.mjs --a-blanc
POSTHOG_CLE_PERSO=phx_... POSTHOG_PROJET=<id> node scripts/posthog-tableaux.mjs
```

Acquisition (8 graphiques), Engagement (9), Conversion (16, dont 7
entonnoirs). Requêtes validées contre le schéma publié par PostHog.
