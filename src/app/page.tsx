'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Code, RefreshCcw, ArrowRightCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/utils/firebaseConfig';

interface Project {
  id: string;
  industry: string;
  progress_update: string;
}

export default function HomePage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const keys = useRef<string[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [greeting, setGreeting] = useState('');
  const [emoji, setEmoji] = useState('');

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(translations.greeting[lang]);
    setEmoji(hour < 12 ? '🌞' : hour < 18 ? '☀️' : '🌙');

    const onKey = (e: KeyboardEvent) => {
      keys.current.push(e.key.toLowerCase());
      if (keys.current.length > 5) keys.current.shift();
      if (keys.current.join('') === 'admin') {
        router.push('/login');
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lang, router]);

  const longPress = {
    onTouchStart: () => setTouchStart(Date.now()),
    onTouchEnd: () => {
      if (touchStart && Date.now() - touchStart > 600) {
        router.push('/login');
      }
      setTouchStart(null);
    },
  };

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
        console.error('❌ Error fetching projects:', err);
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

  const services = [
    {
      icon: <Code size={36} className="text-[#C9A43E]" />,
      title: translations.service1Title[lang],
      body: translations.service1Body[lang],
    },
    {
      icon: <RefreshCcw size={36} className="text-[#C9A43E]" />,
      title: translations.service2Title[lang],
      body: translations.service2Body[lang],
    },
    {
      icon: <ArrowRightCircle size={36} className="text-[#C9A43E]" />,
      title: translations.service3Title[lang],
      body: (
        <div className="space-y-1">
          <p>{translations.service3Body[lang]}</p>
          <Link
            href="https://adminhub-base-template.vercel.app/"
            target="_blank"
            className="underline text-[#C9A43E]"
          >
            {translations.tryDemo[lang]}
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <section
        {...longPress}
        className="flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 bg-gradient-to-br from-[#C9A43E] to-[#b3d0ff] text-white"
      >
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight max-w-3xl mb-4 drop-shadow-lg">
          {greeting} {emoji}, {translations.welcome[lang]}
        </h1>
        <p className="mt-2 max-w-xl text-lg text-white/80 mb-6">
          {translations.heroSub[lang]}
        </p>
        <Link
          href="#services"
          className="inline-flex items-center gap-2 bg-white text-[#0F264B] rounded-full px-7 py-3 font-semibold hover:brightness-105 transition"
        >
          {translations.exploreCta[lang]}
        </Link>
      </section>

      <section id="services" className="py-20 bg-[#FFFDF6]">
        <div className="container mx-auto px-6 grid gap-12 text-center md:grid-cols-3">
          {services.map(({ icon, title, body }) => (
            <div
              key={title}
              className="p-6 rounded-2xl shadow-md border bg-white hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-[#0F264B]">{title}</h3>
              <div className="text-sm text-[#4F5F7A]">{body}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#F1F1F1] text-center px-6">
        <div className="container mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-[#0F264B]">
            {translations.aboutTitle[lang]}
          </h2>
          <p className="text-[#4F5F7A]">{translations.aboutBody[lang]}</p>
        </div>
      </section>

      {/* 👇 Client Projects Carousel */}
      <section className="py-16 bg-[#F9FAFB] text-center px-6">
        <div className="container mx-auto max-w-xl space-y-6">
          <h2 className="text-xl font-bold text-[#0F264B]">
            {translations.clientTitle[lang]}
          </h2>
          <p className="text-[#4F5F7A]">{translations.clientBody[lang]}</p>

          <div className="text-sm text-[#0F264B] bg-white shadow rounded p-4 transition-all duration-500 min-h-[72px]">
            {loading ? (
              <p className="italic text-gray-500">Loading project data...</p>
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

          <Link
            href="/client/login"
            className="inline-block bg-[#0F264B] text-white px-6 py-3 rounded-full font-semibold hover:brightness-110"
          >
            {translations.loginBtn[lang]}
          </Link>
        </div>
      </section>

      <section className="py-12 bg-white border-t border-gray-100 text-center px-6">
        <div className="container mx-auto max-w-2xl space-y-4">
          <h2 className="text-xl font-bold text-[#0F264B]">
            {translations.greenTitle[lang]}
          </h2>
          <p className="text-[#4F5F7A] text-sm">
            {translations.greenBody1[lang]}{' '}
            <a
              href="https://www.websitecarbon.com/website/adhubmvp-vercel-app/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 font-medium"
            >
              Website Carbon Calculator
            </a>
            .
          </p>
          <p className="text-[#4F5F7A] text-sm">{translations.greenBody2[lang]}</p>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white text-center">
        <div className="container mx-auto max-w-xl px-6">
          <h2 className="text-2xl font-bold text-[#0F264B] mb-4">
            {translations.contactTitle[lang]}
          </h2>
          <p className="text-[#4F5F7A] mb-8">{translations.contactBody[lang]}</p>
          <Link
            href="mailto:noreplyadhubmvp@gmail.com"
            className="bg-[#fae9b9] text-[#0F264B] rounded-full px-7 py-3 font-semibold hover:brightness-110"
          >
            {translations.contactBtn[lang]}
          </Link>
        </div>
      </section>
    </>
  );
}
