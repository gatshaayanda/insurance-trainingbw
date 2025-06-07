// src/app/terms/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions – AdminHub',
  description: 'Review the terms and conditions for using AdminHub services.',
};

export default function TermsPage() {
  return (
    <section className="py-20 bg-white text-[#0B1A33]">
      <div className="container mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">📜 Terms & Conditions</h1>
        <p className="text-sm text-[#4F5F7A]">
          By using AdminHub, you agree to our service policies. We operate transparently, and all deliverables are documented and confirmed with the client.
        </p>
        <p className="text-sm text-[#4F5F7A]">
          All services are subject to scope approval and payment prior to project commencement.
        </p>
      </div>
    </section>
  );
}
