'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Code, RefreshCcw, ArrowRightCircle } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const keys = useRef<string[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [greeting, setGreeting] = useState('');
  const [emoji, setEmoji] = useState('');

  useEffect(() => {
    // Greeting & emoji
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening');
    setEmoji(hour < 12 ? '🌞' : hour < 18 ? '☀️' : '🌙');

    // “Admin” hotkey
    const onKey = (e: KeyboardEvent) => {
      keys.current.push(e.key.toLowerCase());
      if (keys.current.length > 5) keys.current.shift();
      if (keys.current.join('') === 'admin') {
        router.push('/login');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [router]);

  // Long-press for mobile login
  const longPress = {
    onTouchStart: () => setTouchStart(Date.now()),
    onTouchEnd: () => {
      if (touchStart && Date.now() - touchStart > 600) router.push('/login');
      setTouchStart(null);
    },
  };

  const services = [
    {
      icon: <Code size={36} className="text-[#C5A100]" />,
      title: 'Design & Build',
      body:
        'Websites & apps as fast as Netflix or Tiktok. Built with our AI-powered, custom framework!',
    },
    {
      icon: <RefreshCcw size={36} className="text-[#C5A100]" />,
      title: 'Care Plans',
      body:
        'Ongoing updates, analytics, and concierge-level support — month after month.',
    },
    {
      icon: <ArrowRightCircle size={36} className="text-[#C5A100]" />,
      title: 'Try the Demo',
      body: (
        <div className="space-y-1">
          <p>Explore the speed and power of the kind of apps we build for you.</p>
          <Link
            href="https://adminhub-base-template.vercel.app/"
            target="_blank"
            className="underline text-[#C5A100]"
          >
            Launch Live Demo →
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Hero */}
      <section
        {...longPress}
        className="flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 bg-gradient-to-br from-[#5593ff] to-[#0B2342] text-white"
      >
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight max-w-3xl mb-4 drop-shadow-lg">
          {greeting} {emoji}, welcome to AdminHub!
        </h1>
        <p className="mt-2 max-w-xl text-lg text-gray-200 mb-6">
          From idea → launch → live updates. Faster than ever.
        </p>
        <Link
          href="#services"
          className="inline-flex items-center gap-2 bg-[#C5A100] text-[#0B1A33] rounded-full px-7 py-3 font-semibold hover:opacity-90 transition"
        >
          🚀 launch our demo below
        </Link>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6 grid gap-10 text-center md:grid-cols-3">
          {services.map(({ icon, title, body }) => (
            <div key={title} className="p-6 rounded-2xl shadow hover:shadow-lg transition">
              <div className="flex justify-center mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <div className="text-sm text-[#4F5F7A]">{body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-[#F1F1F1] text-center px-6">
        <div className="container mx-auto max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold">📍 About AdminHub</h2>
          <p className="text-[#4F5F7A]">
            A global builder of sites & apps using a custom Next.js + Firebase framework. We turn ideas into production-grade apps — fast.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white text-center">
        <div className="container mx-auto max-w-xl px-6">
          <h2 className="text-2xl font-bold mb-4">📞 Ready to Start?</h2>
          <p className="text-[#4F5F7A] mb-8">
            We’re onboarding a few select clients. Want to be next?
          </p>
          <Link
            href="mailto:noreplyadhubmvp@gmail.com"
            className="bg-[#0B1A33] text-white rounded-full px-7 py-3 font-semibold hover:opacity-90"
          >
            📧 Email Us
          </Link>
        </div>
      </section>
    </>
  );
}
