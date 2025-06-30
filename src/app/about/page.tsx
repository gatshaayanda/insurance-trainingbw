'use client';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <>
      <section className="py-20 bg-white text-[#0B1A33]">
        <div className="container mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold">{translations.aboutTitle[lang]}</h1>
          <p className="text-lg text-[#4F5F7A] max-w-3xl mx-auto">{translations.aboutBody[lang]}</p>
        </div>
      </section>

      <section className="py-20 bg-[#F1F1F1] text-[#0B1A33]">
        <div className="container mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{translations.aboutHowTitle[lang]}</h2>
            <p className="text-[#4F5F7A]">{translations.aboutHowBody[lang]}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">{translations.aboutLoginTitle[lang]}</h2>
            <p className="text-[#4F5F7A]">{translations.aboutLoginBody[lang]}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">{translations.aboutLifecycleTitle[lang]}</h2>
            <ul className="list-disc list-inside text-[#4F5F7A] mt-2 space-y-1">
              {translations.aboutLifecycleSteps[lang].map((step: string, i: number) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">{translations.aboutCapitalTitle[lang]}</h2>
            <p className="text-[#4F5F7A]">{translations.aboutCapitalBody[lang]}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-[#0B1A33]">
        <div className="container mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{translations.aboutEndorseTitle[lang]}</h2>
            <p className="text-[#4F5F7A]">{translations.aboutEndorseBody[lang]}</p>
            <ul className="list-disc list-inside text-[#4F5F7A] mt-2 space-y-1">
              {translations.aboutEndorseList[lang].map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">{translations.aboutMissionTitle[lang]}</h2>
            <p className="text-[#4F5F7A]">{translations.aboutMissionBody[lang]}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F1F1F1] text-[#0B1A33]">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-2xl font-bold">{translations.aboutSustainTitle[lang]}</h2>
          <p className="text-[#4F5F7A] max-w-2xl mx-auto">{translations.aboutSustainBody1[lang]}</p>
          <p className="text-[#4F5F7A] max-w-2xl mx-auto">{translations.aboutSustainBody2[lang]}</p>
          <ul className="text-left max-w-xl mx-auto list-disc list-inside text-[#4F5F7A] space-y-2">
            {translations.aboutSustainList[lang].map((point: string, i: number) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          <p className="text-[#4F5F7A] max-w-2xl mx-auto">{translations.aboutSustainBody3[lang]}</p>
          <a
            href="https://www.websitecarbon.com/website/adhubmvp-vercel-app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-blue-600 underline font-semibold"
          >
            {translations.aboutSustainCta[lang]}
          </a>
        </div>
      </section>
    </>
  );
}
