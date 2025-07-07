'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function HomePage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const keys = useRef<string[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      keys.current.push(e.key.toLowerCase());
      if (keys.current.length > 5) keys.current.shift();
      if (keys.current.join('') === 'admin') router.push('/login');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [router]);

  const longPress = {
    onTouchStart: () => setTouchStart(Date.now()),
    onTouchEnd: () => {
      if (touchStart && Date.now() - touchStart > 600) {
        router.push('/login');
      }
      setTouchStart(null);
    },
  };

  return (
    <>
      {/* HERO */}
      <section
        {...longPress}
        className="bg-[#5999ff] text-white text-center px-6 pt-32 pb-20 relative"
      >
        <div className="absolute top-6 left-6 text-sm bg-white text-[#0F264B] px-3 py-1 rounded shadow">
          LOGO PLACEHOLDER
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-2">
          {translations.heroHeadline[lang]}
        </h1>
        <h2 className="text-xl sm:text-2xl font-medium mb-4 tracking-wide">
          {translations.heroCallout[lang]}
        </h2>
        <p className="text-white/80 max-w-xl mx-auto mb-6">
          {translations.heroSubText[lang]}
        </p>
        <Link
          href="/enroll"
          className="inline-block bg-[#3C94E6] hover:bg-[#1C7CD6] text-white font-semibold py-3 px-6 rounded-full"
        >
          {translations.heroApplyBtn[lang]}
        </Link>
      </section>

      {/* STATS */}
      <section className="bg-[#E6F0FB] py-12 text-center text-[#0F264B]">
        <p className="text-lg font-semibold mb-6">
          {translations.statsIntro[lang]}
        </p>
        <div className="flex flex-wrap justify-center gap-10">
          <div>
            <p className="text-2xl font-bold">10,000+</p>
            <p>{translations.statGraduates[lang]}</p>
          </div>
          <div>
            <p className="text-2xl font-bold">10+</p>
            <p>{translations.statYears[lang]}</p>
          </div>
          <div>
            <p className="text-2xl font-bold">40+</p>
            <p>{translations.statClients[lang]}</p>
          </div>
          <div>
            <p className="text-2xl font-bold">50+</p>
            <p>{translations.statCourses[lang]}</p>
          </div>
        </div>
      </section>

      {/* COP Explainer */}
      <section className="bg-[#B3D0FF] text-[#0F264B] py-16 px-6">
        <div className="container mx-auto flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold">{translations.copTitle[lang]}</h2>
            <p>{translations.copBody[lang]}</p>
          </div>
          <div className="md:w-1/2 bg-white text-[#0F264B] rounded-lg p-6 shadow">
            <ul className="list-disc list-inside space-y-2 text-sm">
              {translations.copChecklist[lang].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 font-semibold">{translations.copClosing[lang]}</p>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="bg-white text-center py-20 px-6">
        <h2 className="text-2xl font-bold text-[#0F264B] mb-8">
          {translations.coursesTitle[lang]}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            'Risk Management COP',
            'Anti-Money Laundering',
            'Retirement Funds COP',
          ].map((title, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden shadow border bg-white"
            >
              <div className="h-48 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
                COURSE IMAGE PLACEHOLDER
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#0F264B]">{title}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {translations.courseAccredited[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-[#F9FAFB] text-center px-6">
        <blockquote className="max-w-3xl mx-auto text-xl italic text-[#0F264B] border-l-4 border-[#3C94E6] pl-6">
          {translations.quoteMalcolmX[lang]}
          <br />– Malcolm X
        </blockquote>
      </section>

      {/* About */}
      <section className="py-20 px-6 text-[#0F264B] bg-white">
        <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">{translations.aboutTitle[lang]}</h2>
            <p className="mb-4">{translations.aboutBody[lang]}</p>
            <Link
              href="/about"
              className="text-sm font-medium underline text-blue-600"
            >
              {translations.aboutMoreBtn[lang]}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 bg-gray-100 rounded shadow flex items-center justify-center text-xs text-gray-500">
              IMAGE PLACEHOLDER
            </div>
            <div className="h-32 bg-gray-100 rounded shadow flex items-center justify-center text-xs text-gray-500">
              IMAGE PLACEHOLDER
            </div>
          </div>
        </div>
      </section>

      {/* Questions CTA */}
      <section className="bg-[#E6F0FB] py-16 text-center px-6">
        <h2 className="text-2xl font-bold text-[#0F264B] mb-2">
          {translations.questionsTitle[lang]}
        </h2>
        <p className="text-[#4F5F7A] max-w-xl mx-auto">
          {translations.questionsText[lang]}
        </p>
        <Link
          href="https://wa.me/26772554667"
          className="mt-6 inline-block bg-[#0F264B] text-white px-6 py-3 rounded-full font-semibold hover:brightness-110"
        >
          {translations.questionsCtaBtn[lang]}
        </Link>
      </section>
    </>
  );
}
