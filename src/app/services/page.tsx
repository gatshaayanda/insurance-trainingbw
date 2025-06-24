import { Metadata } from 'next';
import {
  Code,
  Sparkles,
  Wrench,
  ShieldCheck,
  Rocket,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services – AdminHub',
  description:
    'Explore AdminHub’s high-performance service stack: from fast custom builds and AI-assisted dev to secure dashboards and full monthly support.',
};

export default function ServicesPage() {
  const services = [
    {
      icon: <Code size={36} className="text-[#C9A43E]" />,
      title: 'Custom Framework Site Build',
      desc: 'Launch-ready websites powered by our proprietary Next.js + Firebase template base. Built for speed, tailored to you.',
    },
    {
      icon: <Sparkles size={36} className="text-[#C9A43E]" />,
      title: 'AI + Human Dev Collaboration',
      desc: 'We use smart automation to accelerate development — then review and refine every detail with 10+ years of experience.',
    },
    {
      icon: <Wrench size={36} className="text-[#C9A43E]" />,
      title: 'Monthly Support Plan',
      desc: 'Includes revisions, content updates, feature upgrades, admin help, and reporting — delivered monthly, with human touch.',
    },
    {
      icon: <ShieldCheck size={36} className="text-[#C9A43E]" />,
      title: 'Secret Login & Dashboards',
      desc: 'Private login triggers (not visible in URLs) with client-specific dashboards and real-time project tracking.',
    },
    {
      icon: <Rocket size={36} className="text-[#C9A43E]" />,
      title: 'Demo-to-Live Lifecycle',
      desc: 'Clients start with an intake form → we build a preview → they collaborate and approve → we launch and maintain.',
    },
  ];

  return (
    <section className="py-20 bg-[#F1F1F1] text-[#0B1A33]">
      <div className="container mx-auto max-w-5xl text-center space-y-12">
        <h1 className="text-4xl font-bold">🧩 Our Services</h1>
        <p className="text-[#4F5F7A] max-w-2xl mx-auto">
          AdminHub helps you launch and scale fast — without cutting corners. Here’s how we do it.
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
