// src/app/about/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About AdminHub',
  description:
    'Learn how AdminHub was built — from idea to platform — and how it helps clients launch fast, scale affordably, and stay supported long-term.',
};

export default function AboutPage() {
  return (
    <>
      {/* Origin Story */}
      <section className="py-20 bg-white text-[#0B1A33]">
        <div className="container mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold">📍 Built With Purpose</h1>
          <p className="text-lg text-[#4F5F7A] max-w-3xl mx-auto">
            AdminHub was built to solve a real problem — how to help businesses launch faster with less guesswork, less cost, and more support. What started as remote freelance income became real capital, reinvested into building a tech company from scratch.
          </p>
          <p className="text-[#4F5F7A] max-w-3xl mx-auto">
            With zero external funding, AdminHub has now processed over <strong>BWP 549,792.47</strong> in founder-paid capital, formally written into the company’s equity structure. That capital built a powerful product: one that blends a custom site template base, AI assistance, and over 10 years of programming experience.
          </p>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 bg-[#F1F1F1] text-[#0B1A33]">
        <div className="container mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-semibold mb-2">🚀 How We Work</h2>
            <p className="text-[#4F5F7A]">
              We build websites fast — but right. Every site starts with a custom-built template base,
              enhanced by AI tools, but closely reviewed by a developer with a decade of experience.
              Clients preview, give input, and once approved, we shift to a monthly support plan that
              includes updates, revisions, upgrades, admin, and reports.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">🔐 Secret Login, Secure Access</h2>
            <p className="text-[#4F5F7A]">
              The AdminHub landing page has a secret login trigger (no visible URL path) with
              server-side protection. Once inside, clients can access their project dashboard using a
              private password that links only to their build.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">📋 Project Lifecycle</h2>
            <ul className="list-disc list-inside text-[#4F5F7A] mt-2 space-y-1">
              <li>✅ Fill the intake form</li>
              <li>🔧 We build your preview site</li>
              <li>🔑 You log in privately to review and comment</li>
              <li>💬 We collaborate until it’s perfect</li>
              <li>📈 Then monthly support kicks in — fast revisions, admin, and reporting</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">🧾 Capitalized and Formalized</h2>
            <p className="text-[#4F5F7A]">
              AdminHub was funded entirely by real revenue — including over 8 years of contract income under UK company law, remote work income processed through Scotiabank and FNB, and verified capital investments. That BWP 549,792.47 has now been formally capitalized into shares, with 51% allocated to the founder and the rest unissued.
            </p>
          </div>
        </div>
      </section>

      {/* Validation */}
      <section className="py-20 bg-white text-[#0B1A33]">
        <div className="container mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-semibold mb-2">✅ Endorsed by Trusted Institutions</h2>
            <p className="text-[#4F5F7A]">
              AdminHub is endorsed by:
            </p>
            <ul className="list-disc list-inside text-[#4F5F7A] mt-2 space-y-1">
              <li>📌 <strong>LEA Botswana</strong> – assisted in refining our business plan for YDF</li>
              <li>📌 <strong>SBAB</strong> – support for scaling our SME services nationally</li>
              <li>📌 <strong>Nexus Chartered Accountants</strong> – verifying our financial capitalization</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">🎯 Our Mission</h2>
            <p className="text-[#4F5F7A]">
              To be the go-to digital launch partner for African entrepreneurs, small businesses, and remote-first founders. We combine design, dev, and data into one powerful package — fast to launch, smart to scale.
            </p>
          </div>
        </div>
      </section>

      {/* 🌱 Sustainability Commitment */}
      <section className="py-20 bg-[#F1F1F1] text-[#0B1A33]">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-2xl font-bold">🌱 Our Commitment to Sustainability</h2>
          <p className="text-[#4F5F7A] max-w-2xl mx-auto">
            At AdminHub, we believe in building not just fast and beautiful websites — but also responsible, environmentally-friendly digital experiences.
          </p>
          <p className="text-[#4F5F7A] max-w-2xl mx-auto">
            We’re proud to share that our own site is greener than <strong>89% of websites</strong> tested by the Website Carbon Calculator.
          </p>

          <ul className="text-left max-w-xl mx-auto list-disc list-inside text-[#4F5F7A] space-y-2">
            <li>🟢 <strong>Low carbon footprint:</strong> Only 0.06g of CO₂ per page view</li>
            <li>🔌 <strong>Efficient hosting:</strong> Powered by renewable energy via Vercel</li>
            <li>⚙️ <strong>Optimized code & assets:</strong> Tailored for performance and efficiency</li>
          </ul>

          <p className="text-[#4F5F7A] max-w-2xl mx-auto">
            💡 By choosing AdminHub, you’re not just getting a top-tier site — you’re helping reduce internet-related carbon emissions. And yes, we run the same carbon tests for every client build too.
          </p>

          <a
            href="https://www.websitecarbon.com/website/adhubmvp-vercel-app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-blue-600 underline font-semibold"
          >
            🔍 View Our Website Carbon Report →
          </a>
        </div>
      </section>
    </>
  );
}
