'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/utils/firebaseConfig';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

interface Project {
  id: string;
  industry: string;
  progress_update: string;
}

export default function ClientLoginPage() {
  const router = useRouter();
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const { lang } = useLanguage();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/client-login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    });

    if (res.ok) {
      const { email } = await res.json();
      document.cookie = `role=${encodeURIComponent(email)}; path=/; max-age=${60 * 60 * 24}`;
      router.push('/client/dashboard');
    } else {
      const { error: msg } = await res.json();
      setError(msg || translations.loginFormError[lang]);
      setPw('');
    }
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snap = await getDocs(collection(firestore, 'projects'));
        const docs = snap.docs
          .map(doc => ({
            id: doc.id,
            ...(doc.data() as Partial<Project>),
          }))
          .filter(
            p =>
              typeof p.industry === 'string' &&
              typeof p.progress_update === 'string' &&
              p.progress_update.trim() !== ''
          );
        setProjects(docs as Project[]);
      } catch (err) {
        console.error('Error loading project data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev =>
        projects.length > 0 ? (prev + 1) % projects.length : 0
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [projects]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 py-12 space-y-10">
      {/* 🔐 Login Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          {translations.loginFormTitle[lang]}
        </h2>
        <input
          type="password"
          placeholder={translations.loginFormPlaceholder[lang]}
          value={pw}
          onChange={e => setPw(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {translations.loginFormBtn[lang]}
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>

      {/* 🔁 Public Project Progress Carousel */}
      <div className="w-full max-w-md bg-white p-5 rounded shadow text-sm text-[#0F264B] text-center">
        {loading ? (
          <p className="italic text-gray-500">Loading project updates...</p>
        ) : projects.length === 0 ? (
          <p className="italic text-gray-500">No public updates yet.</p>
        ) : (
          <>
            <p className="font-semibold">
              📊 {projects.length} active projects and counting!
            </p>
            <p className="mt-2 italic text-[#4F5F7A]">
              {projects[currentIndex]?.progress_update} <br />
              <span className="text-xs text-[#999]">
                — Project from the {projects[currentIndex]?.industry} industry
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
