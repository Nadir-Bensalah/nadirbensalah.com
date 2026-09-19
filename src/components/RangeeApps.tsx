import React from 'react';
import Link from 'next/link';
import { apps } from '@/content/apps';

/**
 * Les huit icônes en éventail : la preuve, avant même la première phrase.
 *
 * Chaque tuile est un lien réel vers son étude de cas. La rotation est
 * purement décorative et se désactive sous prefers-reduced-motion.
 */
export default function RangeeApps() {
  return (
    <div className="rangee-apps" role="list" aria-label="Les huit applications publiées">
      {apps.map((app, i) => (
        <Link
          key={app.slug}
          href={`/realisations/${app.slug}`}
          role="listitem"
          className="tuile-app"
          style={{ ['--i' as string]: i }}
          title={`${app.nomCourt} — ${app.categorie}`}
        >
          <img
            src={app.icone}
            alt={app.nomCourt}
            width={72}
            height={72}
            loading="eager"
            decoding="async"
            style={{ width: '100%', height: '100%', borderRadius: 'inherit' }}
          />
        </Link>
      ))}

      <style>{`
        .rangee-apps {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          flex-wrap: nowrap;
          padding-block: 14px;
        }
        .tuile-app {
          flex: none;
          width: clamp(38px, 9.5vw, 68px);
          aspect-ratio: 1;
          border-radius: clamp(9px, 2.2vw, 16px);
          overflow: hidden;
          border: 1px solid var(--trait);
          background: var(--bg-2);
          transform: rotate(var(--r, 0deg)) translateY(var(--y, 0)) scale(var(--s, 1));
          transition: transform var(--t-apparition);
        }
        .tuile-app:nth-child(1) { --r: -10deg; --y: 14px; }
        .tuile-app:nth-child(2) { --r: -7deg;  --y: 6px; }
        .tuile-app:nth-child(3) { --r: -4deg;  --y: 1px; }
        .tuile-app:nth-child(4) { --r: -1deg;  --y: -3px; --s: 1.05; }
        .tuile-app:nth-child(5) { --r: 2deg;   --y: -3px; --s: 1.05; }
        .tuile-app:nth-child(6) { --r: 5deg;   --y: 1px; }
        .tuile-app:nth-child(7) { --r: 8deg;   --y: 6px; }
        .tuile-app:nth-child(8) { --r: 11deg;  --y: 14px; }
        .tuile-app:hover {
          transform: rotate(0deg) translateY(-6px) scale(1.12);
          z-index: 2;
          box-shadow: var(--ombre-flottant);
        }
        @media (max-width: 420px) {
          .rangee-apps { gap: 6px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tuile-app { transform: none; }
          .tuile-app:hover { transform: none; box-shadow: none; }
        }
      `}</style>
    </div>
  );
}
