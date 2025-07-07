'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  const nav = [
    { href: '/', en: 'Home', tn: 'Legae' },
    { href: '/about', en: 'About', tn: 'Ka ga rona' },
    { href: '/services', en: 'Services', tn: 'Ditirelo' },
    { href: '/contact', en: 'Contact', tn: 'Ikopanye' },
  ];

  return (
    <header className="w-full bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="container flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-extrabold text-[#0F264B]">
          Insurance Training BW
        </Link>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2" aria-label="Toggle menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav
          className={`${
            isOpen ? 'flex' : 'hidden'
          } flex-col space-y-4 items-start md:flex md:flex-row md:space-y-0 md:space-x-6 md:items-center`}
        >
          {nav.map(({ href, en, tn }) => (
            <Link
              key={href}
              href={href}
              className="text-[#0F264B] hover:text-[#C9A43E] transition font-medium"
            >
              {lang === 'tn' ? tn : en}
            </Link>
          ))}

  

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as 'en' | 'tn')}
            className="text-sm bg-[#0F264B] text-white rounded-full px-3 py-1 ml-2"
          >
            <option value="en">🇺🇸 English</option>
            <option value="tn">🇧🇼 Setswana</option>
          </select>
        </nav>
      </div>
    </header>
  );
}
