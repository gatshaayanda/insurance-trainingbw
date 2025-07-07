'use client';

import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function ContactPage() {
  const { lang } = useLanguage();

  return (
    <>
      <section className="py-20 bg-white text-[#0F264B] text-center">
        <div className="container mx-auto space-y-6">
          <h1 className="text-4xl font-bold">{translations.contactTitle[lang]}</h1>
          <p className="text-lg text-[#4F5F7A] max-w-xl mx-auto">
            {translations.contactBody[lang]}
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F1F1F1] text-[#0F264B]">
        <div className="container mx-auto max-w-2xl space-y-8">
          {/* Contact Card 1 */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-xl font-bold">Insurance Training Institute</h2>
            <p>WhatsApp: <a href="https://wa.me/26772199926" className="text-blue-600 underline">+267 72 199 926</a></p>
            <p className="text-sm italic text-gray-600">
              "It’s your time to do COP and prepare for the year. WhatsApp us for more details!"
            </p>
          </div>

          {/* Contact Card 2 */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-xl font-bold">Insurance Training</h2>
            <p>WhatsApp: <a href="https://wa.me/26773931344" className="text-blue-600 underline">+267 73 931 344</a></p>
            <p className="text-sm italic text-gray-600">Available during office hours</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#E6F0FB] text-center text-[#0F264B]">
        <p className="text-lg font-semibold mb-4">{translations.questionsText[lang]}</p>
        <a
          href="https://wa.me/26772199926"
          className="inline-block bg-[#0F264B] text-white px-6 py-3 rounded-full font-semibold hover:brightness-110"
        >
          {translations.questionsCtaBtn[lang]}
        </a>
      </section>
    </>
  );
}
