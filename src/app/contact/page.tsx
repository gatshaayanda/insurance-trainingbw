import { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact – AdminHub',
  description: 'Start your website with AdminHub by submitting your intake form.',
};

export default function ContactPage() {
  return <ContactForm />;
}
