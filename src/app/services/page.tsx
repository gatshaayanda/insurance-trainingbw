// src/app/services/page.tsx
import { Metadata } from 'next';
import { Code, RefreshCcw, ArrowRightCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services – AdminHub',
  description: 'Discover AdminHub’s full range of design, build, and care-plan offerings.',
};

export default function ServicesPage() {
  const services = [
    {
      icon: <Code size={36} className="text-[#C5A100]" />,
      title: 'Design & Build',
      desc: 'Custom websites and apps crafted to meet your business goals.',
    },
    {
      icon: <RefreshCcw size={36} className="text-[#C5A100]" />,
      title: 'Care Plans',
      desc: 'We maintain and optimize your platform monthly—so you don’t have to.',
    },
    {
      icon: <ArrowRightCircle size={36} className="text-[#C5A100]" />,
      title: 'Scale & Evolve',
      desc: 'Add features as your business grows. Iterate with confidence.',
    },
  ];

  return (
    <section className="py-20 bg-[#F1F1F1] text-[#0B1A33]">
      <div className="container mx-auto max-w-5xl text-center space-y-12">
        <h1 className="text-4xl font-bold">🛠 Services</h1>
        <div className="grid gap-10 md:grid-cols-3">
          {services.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-[#4F5F7A]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
