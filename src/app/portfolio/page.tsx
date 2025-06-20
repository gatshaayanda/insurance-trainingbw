import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio – AdminHub',
  description: 'Explore projects built with AdminHub’s Next.js & Firebase framework.',
};

export default function PortfolioPage() {
  const projects = [
    {
      title: 'Texas Papa (🇰🇷 Korean/English)',
      desc: 'Bilingual site with Korean-English toggle and mobile-first experience.',
      link: 'https://texaspapa.vercel.app/',
    },
    {
      title: 'Small Business Association',
      desc: 'Supporting rollout to 600+ businesses via AdminHub partnership.',
      link: 'https://small-business-association.vercel.app/',
    },
    {
      title: 'MKT Corporate Firm',
      desc: 'Botswana-based partner agency focused on digital automation.',
      link: 'https://mkt-corporate-firm.vercel.app/',
    },
    {
      title: 'BGR Chapel',
      desc: 'Modern church platform with sermon content and events.',
      link: 'https://blazing-generation-revival-chapel.vercel.app/',
    },
    {
      title: 'Bling Deep Chess Academy',
      desc: 'Digital school for youth-focused chess education.',
      link: 'https://bling-deep-chess-academy.vercel.app/',
    },
    {
      title: 'Sports Center Botswana',
      desc: 'Sports news and promotions portal for youth athletics.',
      link: 'https://sports-center-botswana.vercel.app/',
    },
    {
      title: 'Melodi Media',
      desc: 'Content management and blog tools for a creative media brand.',
      link: 'https://melodi-media.vercel.app/',
    },
    {
      title: 'IYTRONE Electronics',
      desc: 'Professional site for a Botswana-based electronics repair brand.',
      link: 'https://iytrone-electronics.vercel.app/',
    },
    {
      title: 'Mingy Media',
      desc: 'Chilled social marketing agency with blog, portfolio, and admin backend.',
      link: 'https://mingy-media.vercel.app/',
    },
  ];

  return (
    <section className="py-20 bg-white text-[#0B1A33]">
      <div className="container mx-auto max-w-5xl space-y-8 text-center">
        <h1 className="text-4xl font-bold">🖼 Portfolio</h1>
        <p className="text-[#4F5F7A] max-w-xl mx-auto">
          These are real-world projects built using AdminHub’s Next.js & Firebase framework.
        </p>

        <div className="grid gap-10 md:grid-cols-2 text-left">
          {projects.map(({ title, desc, link }) => (
            <div
              key={title}
              className="p-6 bg-[#F9FAFB] rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-sm text-[#4F5F7A] mb-4">{desc}</p>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C5A100] font-medium hover:underline"
              >
                View Project →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
