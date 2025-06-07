// src/app/privacy/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy – AdminHub',
  description: 'Read AdminHub’s privacy policy and how we handle your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-20 bg-white text-[#0B1A33]">
      <div className="container mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold">🔐 Privacy Policy</h1>
        <p className="text-sm text-[#4F5F7A]">
          AdminHub respects your privacy. We only collect information necessary for delivering digital services. We never share your data without your permission.
        </p>
        <p className="text-sm text-[#4F5F7A]">
          For any concerns, please email us at{' '}
          <a href="mailto:noreplyadhubmvp@gmail.com" className="underline text-[#0E3A62]">
            noreplyadhubmvp@gmail.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
