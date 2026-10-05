import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { CookieConsent } from '@/components/common/CookieConsent';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LUXÉ — Luxury Fashion, Haute Horlogerie & Lifestyle',
  description: 'Enterprise luxury fashion platform. Curated collections of fine Swiss timepieces, Italian leather goods, and signature fragrances.',
  metadataBase: new URL(process.env.PUBLIC_DOMAIN || 'https://luxe.example.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LUXÉ — Luxury Fashion & Haute Horlogerie',
    description: 'Curated collections of fine Swiss timepieces, Italian leather goods, and signature fragrances.',
    url: 'https://luxe.example.com',
    siteName: 'LUXÉ Maison',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'LUXÉ Luxury Fashion Atelier',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUXÉ — Luxury Fashion & Haute Horlogerie',
    description: 'Curated collections of fine Swiss timepieces, Italian leather goods, and signature fragrances.',
    images: ['/images/hero.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#0a0a0f] text-slate-100 antialiased selection:bg-luxe-gold selection:text-luxe-black">
        <a href="#mainContent" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-luxe-gold focus:text-luxe-black focus:font-semibold focus:rounded-md">
          Skip to main content
        </a>
        <Navbar />
        <CartDrawer />
        <main id="mainContent" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
