'use client';

import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

export default function ContactForm() {
  const searchParams = useSearchParams();
  const success = searchParams.get('success') === '1';
  const { lang } = useLanguage();

  return (
    <section className="py-20 bg-white text-[#0B1A33]">
      <div className="container max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-6">
          📬 {translations.contactFormTitle[lang]}
        </h1>
        <p className="text-center text-[#4F5F7A] mb-10">
          {translations.contactFormIntro[lang]}
        </p>

        {success && (
          <div className="bg-green-100 text-green-800 text-sm p-4 rounded mb-6 text-center font-medium">
            ✅ {translations.contactFormSuccess[lang]}
          </div>
        )}

        <form
          action="https://formspree.io/f/mgvylnne"
          method="POST"
          className="space-y-6"
        >
          <input type="hidden" name="_redirect" value="/contact?success=1" />

          <input
            type="text"
            name="name"
            required
            placeholder={translations.contactFormName[lang]}
            className="w-full border p-3 rounded"
          />
          <input
            type="text"
            name="contact"
            required
            placeholder={translations.contactFormContact[lang]}
            className="w-full border p-3 rounded"
          />

          {[
            ['projectGoals', translations.contactFormQ1[lang]],
            ['painPoints', translations.contactFormQ2[lang]],
            ['pages', translations.contactFormQ3[lang]],
            ['content', translations.contactFormQ4[lang]],
            ['features', translations.contactFormQ5[lang]],
            ['designPreferences', translations.contactFormQ6[lang]],
            ['inspiration', translations.contactFormQ7[lang]],
            ['mood', translations.contactFormQ8[lang]],
          ].map(([name, label]) => (
            <textarea
              key={name}
              name={name}
              required
              placeholder={label as string}
              className="w-full border p-3 rounded"
              rows={3}
            />
          ))}

          <input type="text" name="_gotcha" className="hidden" />

          <button
            type="submit"
            className="bg-[#0F264B] text-white px-6 py-3 rounded-full font-semibold hover:brightness-110"
          >
            🚀 {translations.contactFormCta[lang]}
          </button>
        </form>
      </div>
    </section>
  );
}
