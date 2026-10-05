import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroSection } from '@/components/shop/HeroSection';
import { ProductCard } from '@/components/shop/ProductCard';
import { Sparkles, ArrowRight, Shield, Award, Gem, CheckCircle } from 'lucide-react';
import type { Product } from '@/types';

// Pre-defined enterprise products to render statically on server
const PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    name: "L'Étoile Noir Leather Handbag",
    slug: 'letoile-noir-handbag',
    description: 'Supple calfskin leather with 24k gold-plated brass lock closures. Hand-stitched in Florence by master leather artisans.',
    price: 2450,
    compareAtPrice: 2850,
    sku: 'LUXE-BAG-001',
    stock: 12,
    images: ['/images/product1.jpg'],
    badge: 'Best Seller',
    isFeatured: true,
    categoryId: 'cat_1',
    category: { name: 'Leather Goods', slug: 'leather-goods' },
  },
  {
    id: 'prod_2',
    name: 'Aura Chronograph Gold Timepiece',
    slug: 'aura-chronograph-gold',
    description: 'Crafted in 18k yellow gold with sapphire crystal face and an exhibition caseback displaying the 38-jewel automatic movement.',
    price: 6800,
    compareAtPrice: 7200,
    sku: 'LUXE-WAT-002',
    stock: 5,
    images: ['/images/product2.jpg'],
    badge: 'Limited Edition',
    isFeatured: true,
    categoryId: 'cat_2',
    category: { name: 'Haute Horlogerie', slug: 'haute-horlogerie' },
  },
  {
    id: 'prod_3',
    name: 'Sovereign Stiletto Heeled Pumps',
    slug: 'sovereign-stiletto-pumps',
    description: 'Iconic 105mm stiletto silhouette sculptured from velvet-soft Italian suede with hand-beveled sole and gold heel-tip.',
    price: 1290,
    compareAtPrice: null,
    sku: 'LUXE-SHO-003',
    stock: 18,
    images: ['/images/product3.jpg'],
    badge: 'New Arrival',
    isFeatured: true,
    categoryId: 'cat_3',
    category: { name: 'Footwear & Couture', slug: 'footwear-couture' },
  },
  {
    id: 'prod_4',
    name: "Elixir d'Or Signature Parfum",
    slug: 'elixir-dor-signature-parfum',
    description: 'A sumptuous symphony of Grasse rose, bourbon vanilla, dark amber, and smoky oud. Bottled in hand-polished French crystal.',
    price: 380,
    compareAtPrice: 420,
    sku: 'LUXE-PRF-004',
    stock: 45,
    images: ['/images/product4.jpg'],
    badge: 'Signature Scent',
    isFeatured: true,
    categoryId: 'cat_4',
    category: { name: 'Parfumerie Privée', slug: 'parfumerie-privee' },
  },
];

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Curated Collections Bar */}
      <section id="collections" className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-luxe-gold font-semibold">Curation</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mt-2">Maison Categories</h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md mt-4 md:mt-0">
            Hand-selected by our creative directorship. Each collection exemplifies centuries of traditional European savoir-faire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: 'Leather Goods', count: '18 Creations', img: '/images/product1.jpg', tag: 'Handmade in Florence' },
            { title: 'Swiss Horology', count: '12 Timepieces', img: '/images/product2.jpg', tag: 'COSC Certified' },
            { title: 'Haute Footwear', count: '24 Silhouettes', img: '/images/product3.jpg', tag: 'Milano Atelier' },
            { title: 'Parfumerie Privée', count: '8 Distillations', img: '/images/product4.jpg', tag: 'Grasse Heritage' },
          ].map((cat, idx) => (
            <Link
              key={idx}
              href="/#products"
              className="group relative h-80 rounded-2xl overflow-hidden border border-white/10 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent"
            >
              <Image
                src={cat.img}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover -z-10 brightness-[0.6] group-hover:scale-105 group-hover:brightness-[0.75] transition-all duration-700"
              />
              <span className="text-[10px] uppercase tracking-widest text-luxe-gold font-semibold mb-1">{cat.tag}</span>
              <h3 className="font-heading text-xl font-bold text-white group-hover:text-luxe-gold transition-colors">{cat.title}</h3>
              <p className="text-xs text-slate-300 mt-1">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Flagship Products Grid */}
      <section id="products" className="py-20 bg-[#0d0d15] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-luxe-gold font-semibold">Excellence</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mt-2 mb-4">Featured Masterpieces</h2>
            <p className="text-sm text-slate-400">
              Limited-production artisanal creations available exclusively through our digital flagship salon and private client appointments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Atelier Heritage & Craftsmanship */}
      <section id="heritage" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/images/hero.jpg"
              alt="Atelier Craftsman at Work"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-[#0a0a0f]/80 backdrop-blur-md border border-white/10">
              <p className="text-xs text-luxe-gold font-semibold uppercase tracking-wider">Atelier Heritage • Est. 1988</p>
              <p className="text-sm text-slate-200 mt-1 font-light italic">"Perfection is not an accident—it is the relentless pursuit of millimeter precision."</p>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-luxe-gold font-semibold">The Philosophy</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">
              An Obsession With Uncompromising Detail.
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm">
              At LUXÉ, we reject mass industrialization in favor of time-honored artisanal patience. Every leather piece undergoes 48 distinct hand-treatments; each mechanical watch movement is regulated by certified master horologists.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                <Gem className="w-6 h-6 text-luxe-gold mb-3" />
                <h4 className="text-white font-semibold text-sm">Ethically Sourced Materials</h4>
                <p className="text-xs text-slate-400 mt-1">Full-grain calfskin and Fairmined 18k certified gold.</p>
              </div>
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                <Award className="w-6 h-6 text-luxe-gold mb-3" />
                <h4 className="text-white font-semibold text-sm">Lifetime Warranty</h4>
                <p className="text-xs text-slate-400 mt-1">Comprehensive concierge servicing and authenticity deed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Client Testimonials */}
      <section id="reviews" className="py-20 bg-[#0d0d15] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-luxe-gold font-semibold">Accolades</span>
            <h2 className="font-heading text-3xl font-bold text-white mt-2">Client Impressions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "The Aura Chronograph is magnificent. The gold exhibition caseback reveals horological craftsmanship on par with the venerable Swiss giants.",
                author: 'Lord Julian Sterling',
                role: 'Collector & Philanthropist',
              },
              {
                text: "The leather scent and stitching on the L'Étoile handbag are astonishing. Unboxing it felt like receiving an artifact from an exclusive salon.",
                author: 'Victoria Vance',
                role: 'Creative Director, Paris',
              },
              {
                text: "White-glove courier delivery arrived in Tokyo within 48 hours in a velvet-lined temperature-controlled case. Simply impeccable hospitality.",
                author: 'Kenji Takahashi',
                role: 'Private Client, Ginza',
              },
            ].map((review, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 relative">
                <div className="text-luxe-gold text-lg mb-4">★★★★★</div>
                <p className="text-sm text-slate-300 italic leading-relaxed mb-6">"{review.text}"</p>
                <div>
                  <h4 className="text-sm font-semibold text-white">{review.author}</h4>
                  <p className="text-xs text-slate-400">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
