'use client';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-[#C9A43E] to-[#0F264B] text-white mt-12 shadow-inner">
      <div className="text-center text-xs text-gray-900 mb-4">
        {translations.footerPower[lang]} <strong>0.06g CO₂</strong> per view.{' '}
        <a
          href="https://www.websitecarbon.com/website/adhubmvp-vercel-app/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-green-300"
        >
          {translations.footerVerified[lang]}
        </a>
      </div>
      <div className="container px-4 py-6 text-center text-sm space-y-1">
        <p>&copy; {new Date().getFullYear()} Insurance Training BW. {translations.footerCopyright[lang]}</p>
        <p className="opacity-90">{translations.footerMade[lang]}</p>
      </div>
    </footer>
  );
}
