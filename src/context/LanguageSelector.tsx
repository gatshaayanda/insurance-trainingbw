'use client';

import { useLanguage } from '../context/LanguageContext';

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value as 'en' | 'kr' | 'tn')}
      className="ml-2 px-2 py-1 text-xs rounded-full bg-[var(--brand-blue)] text-white hover:bg-black transition"
    >
      <option value="en">🇺🇸 English</option>
      <option value="kr">🇰🇷 한국어</option>
      <option value="tn">🇧🇼 Setswana</option>
    </select>
  );
}
