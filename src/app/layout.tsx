import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loader from '@/components/AdminHubLoader';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LanguageProvider } from '@/context/LanguageContext';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Insurance Training BW',
  description:
    'Modern, professional training access for the insurance industry in Botswana. Clean layout, downloadable resources, and 24/7 smart support.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased bg-[--background] text-[--foreground]`}
      >
        <LanguageProvider>
          <AnalyticsProvider>
            <Loader />
            <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
              <Header />
            </div>
            <main className="flex-grow bg-white bg-opacity-90">{children}</main>
            <Footer />
            <Analytics />
            <SpeedInsights />
          </AnalyticsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
