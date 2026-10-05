'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Eye } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: Number(product.price),
      image: product.images[0] || '/images/hero.jpg',
      maxStock: product.stock,
    });
  };

  return (
    <article className="group relative rounded-2xl bg-white/[0.02] border border-white/10 hover:border-luxe-gold/50 overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-luxe-gold/10">
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/40">
        <Image
          src={product.images[0] || '/images/hero.jpg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-[#0a0a0f]/80 backdrop-blur-md border border-luxe-gold/40 text-luxe-gold">
            {product.badge}
          </span>
        )}

        {/* Quick Action Overlay */}
        <div className="absolute inset-x-4 bottom-4 flex gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-luxe-gold text-luxe-black font-semibold text-xs tracking-wider uppercase shadow-gold hover:bg-luxe-gold-light transition-colors"
          >
            <ShoppingBag className="w-4 h-4" /> Add to Bag
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="p-3 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white hover:text-luxe-gold transition-colors"
            aria-label={`View details for ${product.name}`}
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          {product.category && (
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">{product.category.name}</p>
          )}
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-heading text-lg font-semibold text-white group-hover:text-luxe-gold transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-xl font-bold text-white">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <span className="text-xs text-emerald-400 font-medium">In Stock</span>
        </div>
      </div>
    </article>
  );
};
