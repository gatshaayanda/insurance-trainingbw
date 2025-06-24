'use client';

import { useSearchParams } from 'next/navigation';

export default function ContactForm() {
  const searchParams = useSearchParams();
  const success = searchParams.get('success') === '1';

  return (
    <section className="py-20 bg-white text-[#0B1A33]">
      <div className="container max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-6">📬 Start Your Project</h1>
        <p className="text-center text-[#4F5F7A] mb-10">
          Fill out this quick form and we’ll be in touch.
        </p>

        {success && (
          <div className="bg-green-100 text-green-800 text-sm p-4 rounded mb-6 text-center font-medium">
            ✅ Your submission was received!
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
            placeholder="Your Full Name"
            className="w-full border p-3 rounded"
          />
          <input
            type="text"
            name="contact"
            required
            placeholder="The Best way to contact you, Email or WhatsApp"
            className="w-full border p-3 rounded"
          />

          {[
            ['projectGoals', '1. What should your website help you with?'],
            ['painPoints', '2. What’s holding your business back online right now?'],
            ['pages', '3. What pages would you like included?'],
            ['content', '4. Do you have text, images, or files you want used?'],
            ['features', '5. Special features? (Bookings, downloads, forms, etc.)'],
            ['designPreferences', '6. Preferred colors or design style?'],
            ['inspiration', '7. Websites you admire or want to reference?'],
            ['mood', '8. What should visitors feel when landing on your site?'],
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
            🚀 Submit Your Intake
          </button>
        </form>
      </div>
    </section>
  );
}
