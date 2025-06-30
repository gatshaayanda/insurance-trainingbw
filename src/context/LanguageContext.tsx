'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'en' | 'kr' | 'tn'; // Setswana = 'tn'

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({
  lang: 'en',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
