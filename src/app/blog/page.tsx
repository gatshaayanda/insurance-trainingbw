// src/app/blog/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insights & Updates – AdminHub',
  description:
    'Stay tuned for product releases, case studies, and AdminHub news—coming soon!',
};

export default function BlogPage() {
  return (
    <section className="py-20 bg-[#F1F1F1] text-[#0B1A33]">
      <div className="container mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold">📰 Insights & Updates</h1>
        <p className="text-[#4F5F7A]">
          From product releases to case studies, this is where we’ll share our thoughts, updates, and learnings.
        </p>
        <p className="italic text-[#4F5F7A]">Coming soon…</p>
      </div>
    </section>
  );
}
