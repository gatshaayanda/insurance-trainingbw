import { Metadata } from 'next';
import ContactForm from './ContactForm';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Contact – AdminHub',
  description: 'Start your website with AdminHub by submitting your intake form.',
};

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading contact form...</div>}>
      <ContactForm />
    </Suspense>
  );
}

