'use client';

import { useEffect, useState } from 'react';

export default function AdminHubLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fade = setTimeout(() => setFading(true), 800);
    const hide = setTimeout(() => setVisible(false), 1500);
    return () => {
      clearTimeout(fade);
      clearTimeout(hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700 bg-gradient-to-br from-[#C9A43E] to-[#0F264B] ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex items-center justify-center mb-6">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-white/40"></div>
        <span className="absolute text-4xl font-extrabold text-white tracking-widest">AH</span>
      </div>
      <span className="text-white font-medium animate-pulse text-sm tracking-wide">
        Loading your experience...
      </span>
    </div>
  );
}
