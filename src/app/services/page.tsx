'use client';

import {
  Code,
  Sparkles,
  Wrench,
  ShieldCheck,
  Rocket,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function ServicesPage() {
  const { lang } = useLanguage();

  const services = [
    {
      icon: <Code size={36} className="text-[#C9A43E]" />,
      title: translations.servicePage1Title[lang],
      desc: translations.servicePage1Desc[lang],
    },
    {
      icon: <Sparkles size={36} className="text-[#C9A43E]" />,
      title: translations.servicePage2Title[lang],
      desc: translations.servicePage2Desc[lang],
    },
    {
      icon: <Wrench size={36} className="text-[#C9A43E]" />,
      title: translations.servicePage3Title[lang],
      desc: translations.servicePage3Desc[lang],
    },
    {
      icon: <ShieldCheck size={36} className="text-[#C9A43E]" />,
      title: translations.servicePage4Title[lang],
      desc: translations.servicePage4Desc[lang],
    },
    {
      icon: <Rocket size={36} className="text-[#C9A43E]" />,
      title: translations.servicePage5Title[lang],
      desc: translations.servicePage5Desc[lang],
    },
  ];

  return (
    <section className="py-20 bg-[#F1F1F1] text-[#0B1A33]">
      <div className="container mx-auto max-w-5xl text-center space-y-12">
        <h1 className="text-4xl font-bold">🧩 {translations.servicesTitle[lang]}</h1>
        <p className="text-[#4F5F7A] max-w-2xl mx-auto">
          {translations.servicesIntro[lang]}
        </p>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-[#4F5F7A] text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
