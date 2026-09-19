import React from 'react';
import Link from 'next/link';
import { apps } from '@/content/apps';

/**
 * Les huit icônes en éventail : la preuve, avant même la première phrase.
 *
 * Chaque tuile est un lien réel vers son étude de cas. La rotation est
 * purement décorative et se désactive sous prefers-reduced-motion.
 *
 * C'est une vraie liste : un <li> qui contient un <a>. Porter role="listitem"
 * directement sur le lien écraserait son rôle de lien, et les huit tuiles
 * sortiraient de la liste des liens des lecteurs d'écran.
 */
export default function RangeeApps() {
  return (
    <>
      <ul className="rangee-apps" aria-label="Les huit applications publiées">
        {apps.map((app, i) => (
          <li key={app.slug} className="tuile-app" style={{ ['--i' as string]: i }}>
            <Link
              href={`/realisations/${app.slug}`}
              aria-label={`${app.nomCourt}, ${app.categorie} : voir l’étude de cas`}
            >
              <img
                src={app.icone}
                alt=""
                aria-hidden
                width={72}
                height={72}
                loading="eager"
                decoding="async"
              />
            </Link>
          </li>
        ))}
      </ul>

      <style>{`
        .rangee-apps {
          --espace-tuiles: 10px;
          list-style: none;
          margin: 0;
          padding: 14px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--espace-tuiles);
          flex-wrap: nowrap;
          width: 100%;
        }
        .tuile-app {
          flex: none;
          /* Huit tuiles et sept espaces doivent tenir dans la largeur utile.
             Un minimum de 38 px debordait a 320 px : on borne plutot par le
             calcul, (100% - 7 espaces) / 8, ce qui tient par construction. */
          width: min(calc((100% - 7 * var(--espace-tuiles)) / 8), 68px);
          aspect-ratio: 1;
          border-radius: clamp(9px, 2.2vw, 16px);
          overflow: hidden;
          border: 1px solid var(--trait);
          background: var(--bg-2);
          transform: rotate(var(--r, 0deg)) translateY(var(--y, 0)) scale(var(--s, 1));
          transition: transform var(--t-apparition);
        }
        .tuile-app a { display: block; width: 100%; height: 100%; }
        .tuile-app img { width: 100%; height: 100%; border-radius: inherit; }
        .tuile-app:nth-child(1) { --r: -10deg; --y: 14px; }
        .tuile-app:nth-child(2) { --r: -7deg;  --y: 6px; }
        .tuile-app:nth-child(3) { --r: -4deg;  --y: 1px; }
        .tuile-app:nth-child(4) { --r: -1deg;  --y: -3px; --s: 1.05; }
        .tuile-app:nth-child(5) { --r: 2deg;   --y: -3px; --s: 1.05; }
        .tuile-app:nth-child(6) { --r: 5deg;   --y: 1px; }
        .tuile-app:nth-child(7) { --r: 8deg;   --y: 6px; }
        .tuile-app:nth-child(8) { --r: 11deg;  --y: 14px; }
        .tuile-app:hover,
        .tuile-app:focus-within {
          transform: rotate(0deg) translateY(-6px) scale(1.12);
          z-index: 2;
          box-shadow: var(--ombre-flottant);
        }
        @media (max-width: 420px) {
          .rangee-apps { --espace-tuiles: 6px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tuile-app,
          .tuile-app:hover,
          .tuile-app:focus-within { transform: none; box-shadow: none; }
        }
      `}</style>
    </>
  );
}
