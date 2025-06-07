'use client';
import { useEffect, useState } from 'react';

export default function AdminHubLoader() {
  const [visible, setVisible] = useState(true);
  const [fading,  setFading]  = useState(false);

  useEffect(() => {
    const fade = setTimeout(() => setFading(true), 800);
    const hide = setTimeout(() => setVisible(false), 1500);
    return () => { clearTimeout(fade); clearTimeout(hide); };
  }, []);

  if (!visible) return null;
  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#bce2ff] to-[#62A3E3] transition-opacity duration-700 ${fading ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative flex items-center justify-center mb-6">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#0E3A62] opacity-60"></div>
        <span className="absolute text-3xl font-extrabold text-[#0E3A62]">AH</span>
      </div>
      <span className="animate-pulse">Loading your experience...</span>
    </div>
  );
}
