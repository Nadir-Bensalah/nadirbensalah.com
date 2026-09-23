'use client';

import React, { useEffect, useState } from 'react';
import { changeRefusMesure, mesureRefusee, refusParLeNavigateur } from '@/lib/analytics';

/**
 * Le droit de dire non, en un clic, sans bandeau. Le choix est gardé dans le
 * stockage local : c'est la seule information que la mesure conserve au-delà
 * de la visite, et elle sert précisément à ne plus rien mesurer.
 */
export default function RefusMesure() {
  const [refuse, setRefuse] = useState<boolean | null>(null);
  const [parNavigateur, setParNavigateur] = useState(false);

  useEffect(() => {
    setRefuse(mesureRefusee());
    setParNavigateur(refusParLeNavigateur());
  }, []);

  if (refuse === null) return null;

  if (parNavigateur) {
    return (
      <p className="t-petit t-2" role="status">
        Votre navigateur demande à ne pas être suivi : aucune mesure n’est faite pendant vos
        visites.
      </p>
    );
  }

  return (
    <p>
      <button
        type="button"
        className="btn btn-secondaire"
        onClick={() => {
          changeRefusMesure(!refuse);
          setRefuse(!refuse);
        }}
      >
        {refuse ? 'Réactiver la mesure d’audience' : 'Ne plus mesurer mes visites'}
      </button>{' '}
      <span className="t-petit t-3" role="status">
        {refuse
          ? 'La mesure est désactivée sur cet appareil et ce navigateur.'
          : 'La mesure est active. Un clic suffit pour la désactiver sur cet appareil.'}
      </span>
    </p>
  );
}
