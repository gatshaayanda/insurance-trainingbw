'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="container flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-extrabold text-[#0E3A62]">AdminHub</Link>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28}/> : <Menu size={28}/>}
        </button>
        <nav className={`${isOpen ? 'block' : 'hidden'} md:flex md:space-x-6`}>
          {["Home","About","Services","Portfolio","Blog","FAQ","Contact","Privacy","Terms"].map(page => (
            <Link key={page} href={`/${page.toLowerCase()}`}>{page}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
