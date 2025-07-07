'use client';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function ServicesPage() {
  const { lang } = useLanguage();

  return (
    <>
      <section className="py-20 bg-white text-[#0F264B] text-center">
        <div className="container mx-auto space-y-6">
          <h1 className="text-4xl font-bold">{translations.servicesTitle[lang]}</h1>
          <p className="text-lg text-[#4F5F7A] max-w-2xl mx-auto">
            {translations.servicesIntro[lang]}
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#F9FAFB] text-[#0F264B]">
        <div className="container mx-auto grid md:grid-cols-2 gap-10 max-w-5xl">
          <div className="bg-white p-8 rounded-xl shadow border">
            <h2 className="text-2xl font-semibold mb-2">{translations.servicesSelfTitle[lang]}</h2>
            <p className="text-[#4F5F7A] mb-4">{translations.servicesSelfBody[lang]}</p>
            <p className="font-bold text-[#0F264B]">{translations.servicesSelfPrice[lang]}</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow border">
            <h2 className="text-2xl font-semibold mb-2">{translations.servicesTuitionTitle[lang]}</h2>
            <p className="text-[#4F5F7A] mb-4">{translations.servicesTuitionBody[lang]}</p>
            <p className="font-bold text-[#0F264B]">{translations.servicesTuitionPrice[lang]}</p>
          </div>
        </div>
      </section>
    </>
  );
}
