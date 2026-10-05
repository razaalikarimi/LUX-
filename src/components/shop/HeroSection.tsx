import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Photography with Luxury Vignette */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero.jpg"
          alt="Luxury Fashion Atelier"
          fill
          priority
          className="object-cover brightness-[0.42] contrast-[1.08] scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0a0a0f]/40 to-[#0a0a0f]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center z-10">
        {/* Prestige Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-luxe-gold/30 text-xs font-semibold uppercase tracking-[0.25em] text-luxe-gold-light mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-luxe-gold" /> Maison de Haute Horlogerie & Couture
        </div>

        {/* Hero Title */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
          Where Heritage Meets <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-luxe-gold-light via-luxe-gold to-luxe-gold-dark">
            Contemporary Luxury.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-10">
          Discover a private gallery of peerless Italian calfskin leathercraft, certified Swiss automatic chronographs, and rare botanical fragrances.
        </p>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/#products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-luxe-gold to-luxe-gold-dark text-luxe-black font-semibold text-sm tracking-wider uppercase shadow-gold hover:brightness-110 transition-all"
          >
            Explore The Collection <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/#heritage"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 border border-white/15 text-white font-medium text-sm tracking-wider uppercase hover:bg-white/10 hover:border-white/30 backdrop-blur-md transition-all"
          >
            The Atelier Story
          </Link>
        </div>

        {/* Trust Markers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-3xl mx-auto text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-luxe-gold flex-shrink-0" />
            <span className="text-xs text-slate-300">100% Certified Swiss & Italian Authenticity Guarantee</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full border border-luxe-gold flex items-center justify-center text-luxe-gold text-xs font-bold flex-shrink-0">✓</span>
            <span className="text-xs text-slate-300">White-Glove Insured Worldwide Delivery</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full border border-luxe-gold flex items-center justify-center text-luxe-gold text-xs font-bold flex-shrink-0">★</span>
            <span className="text-xs text-slate-300">Dedicated 24/7 Private Concierge Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};
