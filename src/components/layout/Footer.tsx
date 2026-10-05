import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#06060a] border-t border-white/10 pt-20 pb-10 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="space-y-4">
          <Link href="/" className="font-heading text-2xl font-bold tracking-widest text-white">
            LUX<span className="text-luxe-gold">É</span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400">
            The definitive destination for luxury fashion, fine Swiss horology, and artisanal leathercraft. Engineered for uncompromising elegance.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:text-luxe-gold transition-colors">
              Instagram
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:text-luxe-gold transition-colors">
              X / Twitter
            </a>
          </div>
        </div>

        {/* Collections */}
        <div>
          <h4 className="text-white font-medium uppercase tracking-wider text-sm mb-4">Haute Collections</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#products" className="hover:text-luxe-gold transition-colors">Leather Goods & Handbags</Link></li>
            <li><Link href="/#products" className="hover:text-luxe-gold transition-colors">Fine Gold Timepieces</Link></li>
            <li><Link href="/#products" className="hover:text-luxe-gold transition-colors">Artisanal Stiletto Footwear</Link></li>
            <li><Link href="/#products" className="hover:text-luxe-gold transition-colors">Private Perfume Vault</Link></li>
          </ul>
        </div>

        {/* Maison */}
        <div>
          <h4 className="text-white font-medium uppercase tracking-wider text-sm mb-4">Maison Heritage</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#heritage" className="hover:text-luxe-gold transition-colors">Atelier Craftsmanship</Link></li>
            <li><Link href="/#reviews" className="hover:text-luxe-gold transition-colors">Client Accreditations</Link></li>
            <li><Link href="/privacy-policy.html" className="hover:text-luxe-gold transition-colors">Privacy Governance</Link></li>
            <li><Link href="/terms-and-conditions.html" className="hover:text-luxe-gold transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Concierge & Inquiries */}
        <div>
          <h4 className="text-white font-medium uppercase tracking-wider text-sm mb-4">Private Concierge</h4>
          <ul className="space-y-2 text-sm">
            <li>📍 [COMPANY_ADDRESS]</li>
            <li>✉️ [CLIENT_EMAIL]</li>
            <li>📞 [CLIENT_PHONE]</li>
            <li className="pt-2 text-xs text-slate-500">Bespoke consultations available by private appointment.</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>&copy; {new Date().getFullYear()} LUXÉ Maison International. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy-policy.html" className="hover:text-slate-300">Privacy Policy</Link>
          <Link href="/terms-and-conditions.html" className="hover:text-slate-300">Terms & Conditions</Link>
          <Link href="/sitemap.xml" className="hover:text-slate-300">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
};
