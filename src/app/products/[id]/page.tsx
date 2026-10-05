'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, ArrowLeft, ShieldCheck, Gem, RefreshCw, Star } from 'lucide-react';

const CATALOG: Record<string, any> = {
  'letoile-noir-handbag': {
    id: 'prod_1',
    name: "L'Étoile Noir Leather Handbag",
    slug: 'letoile-noir-handbag',
    description: 'Meticulously crafted from supple calfskin leather with 24k gold-plated brass lock closures. Hand-stitched in Florence by third-generation leather artisans.',
    price: 2450,
    compareAtPrice: 2850,
    sku: 'LUXE-BAG-001',
    stock: 12,
    images: ['/images/product1.jpg'],
    badge: 'Best Seller',
    details: [
      'Material: 100% Full-Grain Florentine Calfskin',
      'Hardware: 24k Polished Gold-Plated Brass',
      'Lining: Pure Suede Interior with Dual Slip Pockets',
      'Dimensions: 28cm (W) x 20cm (H) x 12cm (D)',
      'Origin: Handcrafted in Florence, Italy',
    ],
  },
  'aura-chronograph-gold': {
    id: 'prod_2',
    name: 'Aura Chronograph Gold Timepiece',
    slug: 'aura-chronograph-gold',
    description: 'Crafted in solid 18k yellow gold with sapphire crystal face and an exhibition caseback displaying the 38-jewel automatic chronometer movement.',
    price: 6800,
    compareAtPrice: 7200,
    sku: 'LUXE-WAT-002',
    stock: 5,
    images: ['/images/product2.jpg'],
    badge: 'Limited Edition',
    details: [
      'Case: 41mm Solid 18k Yellow Gold',
      'Movement: Calibre 8900 Automatic, 70-Hour Power Reserve',
      'Crystal: Scratch-Resistant Sapphire with Anti-Reflective Coating',
      'Water Resistance: 100 meters / 330 feet',
      'Origin: Genevan Master Horology, Switzerland',
    ],
  },
  'sovereign-stiletto-pumps': {
    id: 'prod_3',
    name: 'Sovereign Stiletto Heeled Pumps',
    slug: 'sovereign-stiletto-pumps',
    description: 'Iconic 105mm stiletto silhouette sculptured from velvet-soft Italian suede with hand-beveled leather sole and polished gold heel-tip.',
    price: 1290,
    compareAtPrice: null,
    sku: 'LUXE-SHO-003',
    stock: 18,
    images: ['/images/product3.jpg'],
    badge: 'New Arrival',
    details: [
      'Upper: Italian Velvet Suede',
      'Heel Height: 105mm / 4.1 inches',
      'Sole: Hand-Beveled Tuscan Leather',
      'Insole: Ergonomic Padded Memory Leather Bed',
      'Origin: Handcrafted in Milan, Italy',
    ],
  },
  'elixir-dor-signature-parfum': {
    id: 'prod_4',
    name: "Elixir d'Or Signature Parfum",
    slug: 'elixir-dor-signature-parfum',
    description: 'A sumptuous symphony of Grasse rose, bourbon vanilla, dark amber, and smoky Cambodian oud. Bottled in hand-polished French crystal.',
    price: 380,
    compareAtPrice: 420,
    sku: 'LUXE-PRF-004',
    stock: 45,
    images: ['/images/product4.jpg'],
    badge: 'Signature Scent',
    details: [
      'Concentration: Extrait de Parfum (32% Pure Essence)',
      'Top Notes: Calabrian Bergamot, Pink Peppercorn',
      'Heart Notes: Centifolia Rose de Mai, Bourbon Vanilla',
      'Base Notes: Rare Cambodian Oud, Ambergris, Mysore Sandalwood',
      'Origin: Grasse, France',
    ],
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.id as string;
  const product = CATALOG[slug] || CATALOG['letoile-noir-handbag'];
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images[0],
        maxStock: product.stock,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <Link href="/#products" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Return to Salon Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Product Studio Photography */}
        <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {product.badge && (
            <span className="absolute top-6 left-6 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#0a0a0f]/80 backdrop-blur-md border border-luxe-gold/40 text-luxe-gold">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Details & Actions */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 text-luxe-gold text-sm mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-luxe-gold" />
                ))}
              </div>
              <span className="text-xs text-slate-400 font-medium">5.0 (Client Rated)</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4">
              <span className="font-heading text-3xl font-bold text-luxe-gold">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-base text-slate-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              <span className="text-xs text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                In Stock ({product.stock} units remain)
              </span>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed border-t border-white/10 pt-6">
            {product.description}
          </p>

          {/* Specifications */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-luxe-gold font-semibold">Atelier Specifications</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {product.details?.map((detail: string, idx: number) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxe-gold" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          {/* Add to Cart Control */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex gap-4">
              <div className="flex items-center border border-white/10 rounded-full bg-black/40 px-3">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-3 text-slate-300 hover:text-white"
                >
                  -
                </button>
                <span className="text-sm font-semibold text-white px-2">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="px-3 py-3 text-slate-300 hover:text-white"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 py-4 px-8 rounded-full bg-gradient-to-r from-luxe-gold to-luxe-gold-dark text-luxe-black font-semibold text-sm tracking-wider uppercase shadow-gold hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> {added ? '✓ Added to Bag' : 'Add to Shopping Bag'}
              </button>
            </div>
          </div>

          {/* Luxury Guarantees */}
          <div className="grid grid-cols-2 gap-4 pt-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-luxe-gold" />
              <span>Full Authenticity Deed</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-luxe-gold" />
              <span>30-Day Complimentary Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
