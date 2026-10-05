'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalCount, toggleCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCount = mounted ? getTotalCount() : 0;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="font-heading text-2xl md:text-3xl font-bold tracking-widest text-white group">
          LUX<span className="text-luxe-gold group-hover:text-luxe-gold-light transition-colors">É</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          <Link href="/#collections" className="text-sm uppercase tracking-wider text-slate-300 hover:text-luxe-gold transition-colors">
            Collections
          </Link>
          <Link href="/#products" className="text-sm uppercase tracking-wider text-slate-300 hover:text-luxe-gold transition-colors">
            Timepieces & Leather
          </Link>
          <Link href="/#heritage" className="text-sm uppercase tracking-wider text-slate-300 hover:text-luxe-gold transition-colors">
            Maison Heritage
          </Link>
          <Link href="/#reviews" className="text-sm uppercase tracking-wider text-slate-300 hover:text-luxe-gold transition-colors">
            Client Testimonials
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleCart}
            aria-label="Open Shopping Bag"
            className="relative p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-luxe-gold text-slate-200 hover:text-luxe-gold transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-luxe-gold text-luxe-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-gold">
                {totalCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-200 hover:text-white"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-[#0a0a0f]/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-5 animate-in slide-in-from-top">
          <Link
            href="/#collections"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg text-slate-200 hover:text-luxe-gold transition-colors"
          >
            Collections
          </Link>
          <Link
            href="/#products"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg text-slate-200 hover:text-luxe-gold transition-colors"
          >
            Timepieces & Leather
          </Link>
          <Link
            href="/#heritage"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg text-slate-200 hover:text-luxe-gold transition-colors"
          >
            Maison Heritage
          </Link>
          <Link
            href="/#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg text-slate-200 hover:text-luxe-gold transition-colors"
          >
            Client Reviews
          </Link>
          <Link
            href="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg text-luxe-gold font-semibold pt-2 border-t border-white/10"
          >
            Shopping Bag ({totalCount})
          </Link>
        </div>
      )}
    </header>
  );
};
