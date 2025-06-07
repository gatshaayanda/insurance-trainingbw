// src/app/about/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us – AdminHub',
  description:
    'Learn more about AdminHub, our mission, partnerships, and vision for the future.',
};

export default function AboutPage() {
  return (
    <>
      {/* Who We Are */}
      <section className="py-20 bg-white text-[#0B1A33]">
        <div className="container mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold">📍 Who We Are</h1>
          <p className="text-lg text-[#4F5F7A]">
            AdminHub is The Boutique Digital Partner. Our team leverages 10+ years of ICT experience to
            deliver powerful, scalable web platforms — combining{' '}
            <span className="font-semibold text-[#0E3A62]">Next.js</span>,{' '}
            <span className="font-semibold text-[#0E3A62]">Firebase</span>, and AI tooling.
          </p>
          <p className="text-[#4F5F7A]">
            We help small businesses, founders, and creators launch faster with enterprise-grade tech —
            delivered concierge-style.
          </p>
        </div>
      </section>

      {/* Our Capabilities */}
      <section className="py-20 bg-[#F1F1F1] text-[#0B1A33]">
        <div className="container mx-auto space-y-12">
          {/* Global-Ready Payments */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">🌍 Global-Ready Payments</h2>
            <p className="text-[#4F5F7A]">
              We’ve integrated seamless payment gateways: <strong>Scotiabank</strong> for international
              clients and <strong>FNB</strong> for African partners. Whether you’re in New York or
              Gaborone, your digital operations can transact globally.
            </p>
          </div>

          {/* Strategic Partnerships */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">🤝 Strategic Partnerships</h2>
            <p className="text-[#4F5F7A]">
              AdminHub actively collaborates with forward-thinking organizations. Our recent
              partnerships include:
            </p>
            <ul className="list-disc list-inside text-[#4F5F7A] mt-2 space-y-1">
              <li>
                <strong>MIT Kuo Sharper Center & BDIH</strong> — international innovation collaboration
              </li>
              <li>
                <strong>LEA</strong> — government enterprise authority refining our business plan
              </li>
              <li>
                <strong>Youth Development Fund</strong> — national committee supporting our high-level
                service delivery
              </li>
              <li>
                <strong>Small Business Association of Botswana</strong> — enabling 600+ local small
                businesses
              </li>
              <li>
                <strong>MKT Firm</strong> — our reseller in digital transformation
              </li>
            </ul>
          </div>

          {/* Endorsements */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">✅ Endorsed & Trusted!</h2>
            <p className="text-[#4F5F7A]">
              Our model is endorsed by the <strong>Small Business Association Botswana (SBAB)</strong> and{' '}
              <strong>LEA</strong>. We’re also part of Botswana’s <strong>YDF 2025</strong> program to
              scale AdminHub nationally.
            </p>
          </div>

          {/* What’s Ahead */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">🚀 What’s Ahead</h2>
            <p className="text-[#4F5F7A]">
              This year we aim to secure Youth Development Fund financing, cementing our local
              credibility before expanding internationally.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
