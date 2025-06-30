'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  const nav = [
    { href: '/', en: 'Home', kr: '홈', tn: 'Legae' },
    { href: '/about', en: 'About', kr: '소개', tn: 'Ka ga rona' },
    { href: '/services', en: 'Services', kr: '서비스', tn: 'Ditirelo' },
    { href: '/blog', en: 'Inside AdminHub', kr: '어드민허브 살펴보기', tn: 'Mo Teng ga AdminHub' },
    { href: '/contact', en: 'Contact', kr: '문의하기', tn: 'Ikopanye' },
  ];

  return (
    <header className="w-full bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="container flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-extrabold text-[#0F264B]">
          AdminHub
        </Link>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2" aria-label="Toggle menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav
          className={`
            ${isOpen ? 'flex' : 'hidden'}
            flex-col space-y-4 items-start
            md:flex md:flex-row md:space-y-0 md:space-x-6 md:items-center
          `}
        >
          {nav.map(({ href, en, kr, tn }) => (
            <Link
              key={href}
              href={href}
              className="text-[#0F264B] hover:text-[#C9A43E] transition font-medium"
            >
              {lang === 'en' ? en : lang === 'kr' ? kr : tn}
            </Link>
          ))}

          <Link
            href="/client/login"
            className="bg-[#fae9b9] text-[#0F264B] px-4 py-2 rounded-full text-sm font-semibold hover:brightness-110 transition"
          >
            {lang === 'en'
              ? 'Client Login'
              : lang === 'kr'
              ? '클라이언트 로그인'
              : 'Kena jaaka moreki'}
          </Link>

          {/* Language Selector */}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as 'en' | 'kr' | 'tn')}
            className="text-sm bg-[#0F264B] text-white rounded-full px-3 py-1 ml-2"
          >
            <option value="en">🇺🇸 English</option>
            <option value="kr">🇰🇷 한국어</option>
            <option value="tn">🇧🇼 Setswana</option>
          </select>
        </nav>
      </div>
    </header>
  );
}
