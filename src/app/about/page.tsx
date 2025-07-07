'use client';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import Link from 'next/link';

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <>
      {/* HERO */}
      <section className="py-20 bg-white text-[#0F264B] text-center">
        <div className="container mx-auto space-y-6">
          <h1 className="text-4xl font-bold">{translations.aboutTitle[lang]}</h1>
          <p className="text-lg">{translations.aboutTagline?.[lang]}</p>
          <Link
            href="/enroll"
            className="inline-block bg-[#3C94E6] hover:bg-[#1C7CD6] text-white font-semibold py-3 px-6 rounded-full"
          >
            {translations.aboutApplyBtn?.[lang]}
          </Link>
        </div>
      </section>

      {/* STUDY OPTIONS */}
      <section className="py-16 bg-[#F9FAFB] text-center text-[#0F264B]">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-bold mb-2">{translations.aboutSelfStudyTitle?.[lang]}</h2>
            <p>{translations.aboutSelfStudyBody?.[lang]}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">{translations.aboutTuitionTitle?.[lang]}</h2>
            <p>{translations.aboutTuitionBody?.[lang]}</p>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="py-20 bg-white text-[#0F264B]">
        <div className="container mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-2">{translations.aboutWhoTitle?.[lang]}</h2>
            <p>{translations.aboutWhoBody?.[lang]}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">{translations.aboutAccredTitle?.[lang]}</h2>
            <p>
              {translations.aboutAccredBody?.[lang]}{' '}
              <a
                href="https://www.bqa.org.bw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {translations.aboutAccredLink?.[lang]}
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">{translations.aboutImpactTitle?.[lang]}</h2>
            <ul className="list-disc list-inside space-y-2 text-[#4F5F7A]">
              {translations.aboutImpactList?.[lang]?.map((point: string, i: number) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">{translations.aboutLeaderTitle?.[lang]}</h2>
            <p>{translations.aboutLeaderBody?.[lang]}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">{translations.aboutMissionTitle?.[lang]}</h2>
            <p>{translations.aboutMissionBody?.[lang]}</p>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-20 bg-[#F1F1F1] text-center">
        <blockquote className="max-w-2xl mx-auto text-xl italic text-[#0F264B] border-l-4 border-blue-400 pl-6">
          "{translations.aboutQuoteText?.[lang]}"
          <br />— {translations.aboutQuoteAuthor?.[lang]}
        </blockquote>
      </section>
    </>
  );
}
