import React from 'react';
import { App } from '@/content/apps';

/**
 * Les captures réelles de la fiche App Store, présentées dans un cadre de
 * téléphone sobre. Pas de perspective, pas de reflet : le contenu de l'écran
 * est le sujet, le cadre n'est qu'un repère d'échelle.
 *
 * Sur mobile, la bande défile horizontalement ; c'est le seul endroit du site
 * où un défilement latéral est voulu, et il est confiné à ce conteneur.
 */
export default function GalerieCaptures({ app }: { app: App }) {
  if (!app.captures.length) return null;

  return (
    <section aria-label={`Captures d’écran de ${app.nomCourt}`} className="bande-captures">
      <ul className="piste-captures">
        {app.captures.map((src, i) => (
          <li key={src} className="cadre-tel">
            <img
              src={src}
              alt={`${app.nomCourt}, écran ${i + 1} sur ${app.captures.length}`}
              width={276}
              height={598}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </li>
        ))}
      </ul>

      <style>{`
        .bande-captures {
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-block: var(--e-2);
        }
        .bande-captures::-webkit-scrollbar { display: none; }

        .piste-captures {
          list-style: none;
          margin: 0;
          padding-inline: var(--marge-mobile);
          display: flex;
          gap: var(--e-4);
          width: max-content;
          min-width: 100%;
          justify-content: flex-start;
        }

        .cadre-tel {
          flex: none;
          width: clamp(180px, 46vw, 276px);
          aspect-ratio: 1179 / 2556;
          border-radius: clamp(20px, 5vw, 30px);
          padding: 5px;
          background: var(--bg-3);
          border: 1px solid var(--trait);
          overflow: hidden;
        }
        .cadre-tel img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: clamp(16px, 4.2vw, 25px);
          background: var(--bg-2);
        }

        /* Au-delà du conteneur, la bande se centre au lieu de coller à gauche. */
        @media (min-width: 1240px) {
          .piste-captures { justify-content: center; padding-inline: 0; }
        }
      `}</style>
    </section>
  );
}
