import React from 'react';
import Link from 'next/link';
import { App, dateFr } from '@/content/apps';
import LienAppStore from '@/components/LienAppStore';

/**
 * La carte d'une application dans une grille.
 * Une bordure fine, un rayon court, pas d'ombre : la carte ne flotte pas.
 */
export default function CarteApp({
  app,
  prioritaire = false,
}: {
  app: App;
  prioritaire?: boolean;
}) {
  return (
    <article
      className="carte-app"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--e-3)',
        background: 'var(--bg)',
        border: '1px solid var(--trait)',
        borderRadius: 'var(--r-3)',
        padding: 'var(--e-5)',
        transition: 'background var(--t-survol), border-color var(--t-survol)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--e-3)' }}>
        <img
          src={app.icone}
          alt=""
          width={52}
          height={52}
          loading={prioritaire ? 'eager' : 'lazy'}
          decoding="async"
          style={{
            width: 52,
            height: 52,
            borderRadius: 12,
            flex: 'none',
            border: '1px solid var(--trait)',
          }}
        />
        <div style={{ minWidth: 0, flex: 1 }}>
          <h3 className="t-h3" style={{ marginBottom: 2 }}>
            <Link
              href={`/realisations/${app.slug}`}
              style={{ color: 'var(--texte)' }}
              className="lien-carte"
            >
              {app.nomCourt}
            </Link>
          </h3>
          <p className="t-micro t-3">
            {app.categorie} · en ligne depuis le {dateFr(app.sortie)}
          </p>
        </div>
        {app.client && <span className="pastille pastille--client">Client</span>}
      </div>

      <p className="t-petit t-2" style={{ flex: 1 }}>
        {app.baseline}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {/* On en montre cinq plutôt que trois : les technologies qui
            distinguent réellement un profil (ActivityKit, App Intents,
            SwiftUI, Core NFC) arrivent en fin de liste, et un « +3 » les
            rendait invisibles à qui survole. */}
        {app.stack.slice(0, 5).map((t) => (
          <span key={t} className="pastille">
            {t}
          </span>
        ))}
        {app.stack.length > 5 && (
          <span className="pastille" title={app.stack.slice(5).join(', ')}>
            +{app.stack.length - 5}
          </span>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          gap: 'var(--e-4)',
          alignItems: 'center',
          paddingTop: 'var(--e-1)',
        }}
      >
        <Link
          href={`/realisations/${app.slug}`}
          className="t-petit t-fort lien-action-carte"
          style={{ color: 'var(--action)' }}
        >
          L’étude de cas
        </Link>
        <LienAppStore
          url={app.appStoreUrl}
          app={app.nomCourt}
          className="t-petit lien-sobre lien-action-carte"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
        >
          App&nbsp;Store
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </LienAppStore>
      </div>
    </article>
  );
}
