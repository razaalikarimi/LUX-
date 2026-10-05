'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice();

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/" className="text-sm text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Return to Salon
        </Link>
      </div>

      <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-10">Your Shopping Bag</h1>

      {items.length === 0 ? (
        <div className="text-center py-24 border border-white/10 rounded-3xl bg-white/[0.02]">
          <h2 className="text-xl font-heading font-medium text-white mb-3">Your luxury bag is currently empty</h2>
          <p className="text-sm text-slate-400 mb-8 max-w-md mx-auto">Explore our private collections of Swiss timepieces, Italian leather bags, and haute parfumerie.</p>
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-luxe-gold text-luxe-black font-semibold text-xs tracking-wider uppercase shadow-gold hover:bg-luxe-gold-light transition-all"
          >
            Explore Masterpieces
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items Table */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/10 items-center">
                <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-black/40 flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-semibold text-white">{item.name}</h3>
                  <p className="text-sm text-luxe-gold font-medium mt-1">{formatPrice(item.price)}</p>

                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center border border-white/10 rounded-full bg-black/40">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-slate-300 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm px-2 font-medium text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-slate-300 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-500 hover:text-red-400 text-xs flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-heading text-lg font-bold text-white">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}

            <div className="flex justify-end pt-4">
              <button
                onClick={clearCart}
                className="text-xs text-slate-500 hover:text-slate-300 underline"
              >
                Clear Entire Bag
              </button>
            </div>
          </div>

          {/* Summary Box */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-luxe-gold/30 h-fit space-y-6">
            <h3 className="font-heading text-xl font-bold text-white border-b border-white/10 pb-4">Order Summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span className="text-white font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Insured Global Courier</span>
                <span className="text-emerald-400 font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Estimated Taxes</span>
                <span className="text-slate-400">Calculated at checkout</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
              <span className="text-base text-white font-medium">Total</span>
              <span className="font-heading text-2xl font-bold text-luxe-gold">{formatPrice(totalPrice)}</span>
            </div>

            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-gradient-to-r from-luxe-gold to-luxe-gold-dark text-luxe-black font-semibold text-sm tracking-wider uppercase shadow-gold hover:brightness-110 transition-all"
            >
              Proceed to Secure Checkout <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="pt-4 border-t border-white/5 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-luxe-gold" />
                <span>256-Bit SSL End-to-End Encrypted Checkout</span>
              </div>
              <p>Authenticity certificates included with all orders.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
