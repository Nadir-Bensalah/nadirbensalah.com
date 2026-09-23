/**
 * Crée dans PostHog les trois tableaux de bord du site : Acquisition,
 * Engagement, Conversion.
 *
 * Usage :
 *   POSTHOG_CLE_PERSO=phx_... POSTHOG_PROJET=12345 node scripts/posthog-tableaux.mjs
 *   node scripts/posthog-tableaux.mjs --a-blanc     (affiche ce qui serait créé)
 *
 * La clé personnelle se crée dans PostHog : Settings > Personal API keys,
 * avec les droits « dashboard: write » et « insight: write ». Elle donne accès
 * en lecture et en écriture au projet : elle ne doit JAMAIS finir dans le
 * dépôt, et peut être révoquée juste après.
 *
 * Chaque graphique exclut le trafic local (banc de test, développement) par
 * un filtre sur l'hôte, sans dépendre des réglages du projet.
 */

const HOTE = process.env.POSTHOG_HOTE_API ?? 'https://eu.posthog.com';
const CLE = process.env.POSTHOG_CLE_PERSO;
const PROJET = process.env.POSTHOG_PROJET;
const A_BLANC = process.argv.includes('--a-blanc');

const HORS_TEST = [
  { key: '$host', operator: 'not_regex', value: '^(localhost|127\\.0\\.0\\.1)', type: 'event' },
];
const PERIODE = { date_from: '-30d' };
const PERIODE_LONGUE = { date_from: '-90d' };

/* ------------------------------------------------------------------ */
/* Briques                                                              */
/* ------------------------------------------------------------------ */

const ev = (event, extra = {}) => ({ kind: 'EventsNode', event, name: event, ...extra });
const prop = (key, value, operator = 'exact') => ({
  key,
  value: Array.isArray(value) || operator !== 'exact' ? value : [value],
  operator,
  type: 'event',
});
const ventile = (...proprietes) => ({
  breakdowns: proprietes.map((property) => ({ property, type: 'event' })),
});

function tendance(series, { ventilation, affichage = 'ActionsLineGraph', formule, periode } = {}) {
  return {
    kind: 'InsightVizNode',
    source: {
      kind: 'TrendsQuery',
      series,
      interval: 'week',
      dateRange: periode ?? PERIODE_LONGUE,
      properties: HORS_TEST,
      filterTestAccounts: true,
      ...(ventilation ? { breakdownFilter: ventilation } : {}),
      trendsFilter: { display: affichage, ...(formule ? { formula: formule } : {}) },
    },
  };
}

function entonnoir(etapes, { ventilation, periode } = {}) {
  return {
    kind: 'InsightVizNode',
    source: {
      kind: 'FunnelsQuery',
      series: etapes,
      dateRange: periode ?? PERIODE_LONGUE,
      properties: HORS_TEST,
      filterTestAccounts: true,
      // L'identifiant ne survit pas à l'onglet : un entonnoir se lit donc
      // visite par visite, et une fenêtre d'un jour suffit.
      funnelsFilter: {
        funnelVizType: 'steps',
        funnelOrderType: 'ordered',
        funnelWindowInterval: 1,
        funnelWindowIntervalUnit: 'day',
      },
      ...(ventilation
        ? { breakdownFilter: { breakdown: ventilation, breakdown_type: 'event' } }
        : {}),
    },
  };
}

const sessions = (event, extra) => ev(event, { math: 'unique_session', ...extra });
const LEAD_CONTACT = ev('submit_contact');
const LEAD_CHALLENGE = ev('challenge_submit');
const VERS_CONTACT = ev('cta_click', { properties: [prop('vers_contact', true)] });

/** Le parcours de référence : arrivée → contenu → CTA → formulaire → lead. */
const PARCOURS_LEAD = [
  ev('$pageview'),
  ev('$pageview', {
    name: 'contenu consulté',
    properties: [
      prop('page_type', [
        'realisations',
        'etude_de_cas',
        'service',
        'expertise',
        'local',
        'recrutement',
      ]),
    ],
  }),
  VERS_CONTACT,
  ev('form_start'),
  ev('form_submit_attempt'),
  LEAD_CONTACT,
];

/* ------------------------------------------------------------------ */
/* Les tableaux                                                         */
/* ------------------------------------------------------------------ */

const TABLEAUX = [
  {
    nom: 'Acquisition',
    description: 'D’où viennent les visiteurs, et par où ils entrent.',
    graphiques: [
      ['Visites par semaine', tendance([sessions('$pageview')])],
      [
        'Visites par canal',
        tendance([sessions('$pageview')], {
          ventilation: ventile('canal'),
          affichage: 'ActionsBarValue',
          periode: PERIODE,
        }),
      ],
      [
        'Sources et campagnes (UTM)',
        tendance([sessions('$pageview')], {
          ventilation: ventile('source', 'campagne'),
          affichage: 'ActionsTable',
          periode: PERIODE,
        }),
      ],
      [
        'Sites référents',
        tendance([sessions('$pageview')], {
          ventilation: ventile('referrer_domaine'),
          affichage: 'ActionsTable',
          periode: PERIODE,
        }),
      ],
      [
        'Pages d’arrivée',
        tendance([sessions('$pageview')], {
          ventilation: ventile('landing_page'),
          affichage: 'ActionsTable',
          periode: PERIODE,
        }),
      ],
      [
        'Ordinateur, mobile, tablette',
        tendance([sessions('$pageview')], {
          ventilation: ventile('$device_type'),
          affichage: 'ActionsPie',
          periode: PERIODE,
        }),
      ],
      [
        'Pays',
        tendance([sessions('$pageview')], {
          ventilation: ventile('$geoip_country_name'),
          affichage: 'ActionsTable',
          periode: PERIODE,
        }),
      ],
      [
        'Pages introuvables atteintes (404)',
        tendance([ev('$pageview', { properties: [prop('page_type', 'erreur_404')] })], {
          ventilation: ventile('$pathname'),
          affichage: 'ActionsTable',
          periode: PERIODE,
        }),
      ],
    ],
  },
  {
    nom: 'Engagement',
    description: 'Ce que les visiteurs consultent, et ce qui ne sert à rien.',
    graphiques: [
      [
        'Pages les plus vues',
        tendance([ev('$pageview')], {
          ventilation: ventile('$pathname'),
          affichage: 'ActionsTable',
          periode: PERIODE,
        }),
      ],
      [
        'Visites par type de page',
        tendance([sessions('$pageview')], {
          ventilation: ventile('page_type'),
          affichage: 'ActionsBarValue',
          periode: PERIODE,
        }),
      ],
      [
        'Études de cas consultées',
        tendance([sessions('$pageview', { properties: [prop('page_type', 'etude_de_cas')] })], {
          ventilation: ventile('contenu_id'),
          affichage: 'ActionsBarValue',
          periode: PERIODE_LONGUE,
        }),
      ],
      [
        'Intentions : déclarées et déduites',
        tendance([sessions('$pageview')], {
          ventilation: ventile('intention', 'intention_origine'),
          affichage: 'ActionsTable',
          periode: PERIODE_LONGUE,
        }),
      ],
      [
        'Portes de l’accueil choisies',
        tendance([ev('intent_select')], {
          ventilation: ventile('intention_choisie'),
          affichage: 'ActionsBarValue',
          periode: PERIODE_LONGUE,
        }),
      ],
      [
        'CV téléchargés, par emplacement',
        tendance([ev('cv_download')], {
          ventilation: ventile('emplacement'),
          affichage: 'ActionsTable',
          periode: PERIODE_LONGUE,
        }),
      ],
      [
        'Clics vers l’App Store, par application',
        tendance([ev('app_store_click')], {
          ventilation: ventile('app'),
          affichage: 'ActionsBarValue',
          periode: PERIODE_LONGUE,
        }),
      ],
      [
        'Lectures complètes (90 %) par type de page',
        tendance([ev('scroll_depth', { properties: [prop('profondeur', 90)] })], {
          ventilation: ventile('page_type'),
          affichage: 'ActionsBarValue',
          periode: PERIODE_LONGUE,
        }),
      ],
      [
        'Sorties vers GitHub, LinkedIn, Capmedia',
        tendance([ev('outbound_click')], {
          ventilation: ventile('destination'),
          affichage: 'ActionsBarValue',
          periode: PERIODE_LONGUE,
        }),
      ],
    ],
  },
  {
    nom: 'Conversion',
    description:
      'Ce qui produit des prises de contact. Un lead = submit_contact ou challenge_submit, comptés après confirmation du service d’envoi.',
    graphiques: [
      ['Leads par semaine', tendance([LEAD_CONTACT, LEAD_CHALLENGE])],
      [
        'Taux de conversion visite → lead (%)',
        tendance(
          [sessions('$pageview'), sessions('submit_contact'), sessions('challenge_submit')],
          { formule: '(B + C) / A * 100' }
        ),
      ],
      ['Parcours vers le lead', entonnoir(PARCOURS_LEAD)],
      [
        'Parcours vers le lead, par intention',
        entonnoir(PARCOURS_LEAD, { ventilation: 'intention' }),
      ],
      ['Parcours vers le lead, par canal', entonnoir(PARCOURS_LEAD, { ventilation: 'canal' })],
      [
        'Parcours vers le lead, par campagne',
        entonnoir(PARCOURS_LEAD, { ventilation: 'campagne' }),
      ],
      [
        'Parcours vers le lead, par page d’arrivée',
        entonnoir(PARCOURS_LEAD, { ventilation: 'landing_type' }),
      ],
      [
        'Parcours vers le lead, ordinateur ou mobile',
        entonnoir(PARCOURS_LEAD, { ventilation: '$device_type' }),
      ],
      [
        'Du contenu consulté au lead, par page',
        entonnoir([PARCOURS_LEAD[1], VERS_CONTACT, LEAD_CONTACT], { ventilation: 'contenu_id' }),
      ],
      [
        'Leads par source et campagne',
        tendance([LEAD_CONTACT, LEAD_CHALLENGE], {
          ventilation: ventile('canal', 'source', 'campagne'),
          affichage: 'ActionsTable',
        }),
      ],
      [
        'Leads par intention',
        tendance([LEAD_CONTACT, LEAD_CHALLENGE], {
          ventilation: ventile('intention', 'intention_origine'),
          affichage: 'ActionsTable',
        }),
      ],
      [
        'Leads par page d’arrivée',
        tendance([LEAD_CONTACT, LEAD_CHALLENGE], {
          ventilation: ventile('landing_page'),
          affichage: 'ActionsTable',
        }),
      ],
      [
        'CTA vers le contact : lesquels sont cliqués',
        tendance([VERS_CONTACT], { ventilation: ventile('cta_id'), affichage: 'ActionsTable' }),
      ],
      [
        'Formulaires : commencés, envoyés, en erreur, réussis',
        tendance([
          ev('form_start'),
          ev('form_submit_attempt'),
          ev('form_error'),
          ev('form_submit_failed'),
          LEAD_CONTACT,
          LEAD_CHALLENGE,
        ]),
      ],
      [
        'Erreurs de formulaire, par champ',
        tendance([ev('form_error')], {
          ventilation: ventile('champs_en_erreur', 'formulaire'),
          affichage: 'ActionsTable',
        }),
      ],
      [
        'Contacts hors formulaire : e-mail, téléphone, messagerie ouverte',
        tendance([ev('contact_click'), ev('form_mailto_fallback')], {
          ventilation: ventile('moyen', 'raison'),
          affichage: 'ActionsTable',
        }),
      ],
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Envoi                                                                */
/* ------------------------------------------------------------------ */

async function api(chemin, corps) {
  const reponse = await fetch(`${HOTE}/api/projects/${PROJET}${chemin}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${CLE}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(corps),
  });
  const texte = await reponse.text();
  if (!reponse.ok) throw new Error(`${chemin} → ${reponse.status} ${texte.slice(0, 400)}`);
  return JSON.parse(texte);
}

if (process.argv.includes('--json')) {
  console.log(
    JSON.stringify(TABLEAUX.flatMap((t) => t.graphiques.map(([nom, q]) => ({ nom, q }))))
  );
  process.exit(0);
}

if (A_BLANC) {
  for (const t of TABLEAUX) {
    console.log(`\n## ${t.nom} (${t.graphiques.length} graphiques)`);
    for (const [nom, requete] of t.graphiques) console.log(`- ${nom} [${requete.source.kind}]`);
  }
  console.log(
    `\nExemple de requête envoyée :\n${JSON.stringify(TABLEAUX[2].graphiques[2][1], null, 2)}`
  );
  process.exit(0);
}

if (!CLE || !PROJET) {
  console.error(
    'POSTHOG_CLE_PERSO et POSTHOG_PROJET sont nécessaires (voir l’en-tête du fichier).'
  );
  process.exit(1);
}

for (const t of TABLEAUX) {
  const tableau = await api('/dashboards/', { name: t.nom, description: t.description });
  console.log(`\n${t.nom} → ${HOTE}/project/${PROJET}/dashboard/${tableau.id}`);
  for (const [nom, requete] of t.graphiques) {
    try {
      await api('/insights/', { name: nom, query: requete, dashboards: [tableau.id] });
      console.log(`  ✓ ${nom}`);
    } catch (err) {
      console.log(`  ✗ ${nom} : ${err.message}`);
    }
  }
}
