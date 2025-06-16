'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="container flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-extrabold text-[#0E3A62]">
          AdminHub
        </Link>

        {/* mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* nav */}
        <nav
          className={`
            ${isOpen ? 'flex' : 'hidden'}
            flex-col space-y-4 items-start
            md:flex md:flex-row md:space-y-0 md:space-x-6 md:items-center
          `}
        >
          {[
            'Home',
            'About',
            'Services',
            'Portfolio',
            'Blog',
            'FAQ',
            'Contact',
            'Privacy',
            'Terms',
          ].map((page) => (
            <Link
              key={page}
              href={`/${page.toLowerCase()}`}
              className="block md:inline-block text-gray-800 hover:text-[#C5A100] transition"
            >
              {page}
            </Link>
          ))}

          {/* Client Login */}
          <Link
            href="/client/login"
            className="bg-[#b8d8f5] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#174a7d] transition"
          >
            Client Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
