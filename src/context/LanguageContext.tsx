'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Lang = 'en' | 'tn';

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({
  lang: 'en',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  // Load language from localStorage if available (client-side only)
  useEffect(() => {
    const storedLang = localStorage.getItem('lang') as Lang | null;
    if (storedLang === 'en' || storedLang === 'tn') {
      setLang(storedLang);
    }
  }, []);

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
