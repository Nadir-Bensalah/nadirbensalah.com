'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const STORAGE_KEY = 'nadir-language-suggestion-dismissed';

function getSuggestedPath(pathname: string, language: string) {
  const isEnglishBrowser = language.toLowerCase().startsWith('en');
  const isEnglishPage = pathname.startsWith('/en/');
  const isEnglishFrancePage = pathname.startsWith('/en-fr/');
  const isEnglishTunisiaPage = pathname.startsWith('/en-tn/');
  const isFrenchPage = pathname.startsWith('/fr-fr/') || pathname.startsWith('/fr-tn/') || pathname.startsWith('/services/') || pathname.startsWith('/prix/');

  if (isEnglishBrowser && !isEnglishPage && !isEnglishFrancePage && !isEnglishTunisiaPage) {
    if (pathname.startsWith('/fr-fr/')) return pathname.replace('/fr-fr/', '/en-fr/');
    if (pathname.startsWith('/fr-tn/')) return pathname.replace('/fr-tn/', '/en-tn/').replace('/tunisie', '/tunisia');
    if (pathname.startsWith('/services/')) return pathname.replace('/services/', '/en/services/');
    if (pathname.startsWith('/prix/')) return pathname.replace('/prix/', '/en/pricing/');
    return '/en/services/creation-application-mobile';
  }

  if (!isEnglishBrowser && (isEnglishPage || isEnglishFrancePage || isEnglishTunisiaPage)) {
    if (pathname.startsWith('/en-fr/')) return pathname.replace('/en-fr/', '/fr-fr/');
    if (pathname.startsWith('/en-tn/')) return pathname.replace('/en-tn/', '/fr-tn/').replace('/tunisia', '/tunisie');
    if (pathname.startsWith('/en/services/')) return pathname.replace('/en/services/', '/services/');
    if (pathname.startsWith('/en/pricing/')) return pathname.replace('/en/pricing/', '/prix/');
    return '/';
  }

  if (!isEnglishBrowser && isFrenchPage) return null;

  return null;
}

export default function LanguageSuggestion() {
  const pathname = usePathname() || '/';
  const [visible, setVisible] = useState(false);
  const [browserLanguage, setBrowserLanguage] = useState('');

  useEffect(() => {
    const dismissed = window.localStorage.getItem(STORAGE_KEY);
    const language = window.navigator.language || window.navigator.languages?.[0] || '';
    setBrowserLanguage(language);
    setVisible(!dismissed && Boolean(getSuggestedPath(pathname, language)));
  }, [pathname]);

  const suggestedPath = useMemo(() => getSuggestedPath(pathname, browserLanguage), [pathname, browserLanguage]);

  if (!visible || !suggestedPath) return null;

  const isEnglishSuggestion = suggestedPath.startsWith('/en');

  return (
    <div className="fixed bottom-5 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-white/[0.08] bg-[#09090B]/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          {isEnglishSuggestion ? 'Your browser is in English. You can view the English version of this content.' : 'Votre navigateur semble être en français. Vous pouvez consulter la version française.'}
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link href={suggestedPath} className="btn-primary px-4 py-2 rounded-full text-sm font-700">
            {isEnglishSuggestion ? 'View English' : 'Voir en français'}
          </Link>
          <button
            type="button"
            onClick={() => {
              window.localStorage.setItem(STORAGE_KEY, 'true');
              setVisible(false);
            }}
            className="text-sm font-700 text-[#A1A1AA] hover:text-white transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
