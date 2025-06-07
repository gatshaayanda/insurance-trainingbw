// src/app/contact/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us – AdminHub',
  description: 'Reach out to AdminHub via email or WhatsApp. We’re here to help.',
};

export default function ContactPage() {
  return (
    <section className="py-20 bg-white text-[#0B1A33]">
      <div className="container mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold">💬 Let’s Talk</h1>
        <p className="text-[#4F5F7A]">
          Reach out via email or WhatsApp. We’re here to help.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="mailto:noreplyadhubmvp@gmail.com"
            className="bg-[#0B1A33] text-white rounded-full px-6 py-3 font-semibold hover:opacity-90"
          >
            📧 Email Us
          </Link>
          <Link
            href="https://wa.me/26773065682"
            className="bg-green-600 text-white rounded-full px-6 py-3 font-semibold hover:bg-green-700"
          >
            📲 WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
}
