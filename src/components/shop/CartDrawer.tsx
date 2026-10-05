'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCart();

  if (!isOpen) return null;

  const totalPrice = getTotalPrice();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Bag">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e0e16] border-l border-white/10 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-luxe-gold" />
              <h2 className="font-heading text-xl font-bold text-white">Your Shopping Bag</h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
              aria-label="Close Shopping Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
                <ShoppingBag className="w-16 h-16 text-slate-600 mb-4 stroke-[1.2]" />
                <p className="text-lg font-medium text-white mb-2">Your Bag is Empty</p>
                <p className="text-sm text-slate-400 max-w-xs mb-6">Explore our curated collections of rare timepieces and couture leathercraft.</p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-full bg-luxe-gold text-luxe-black font-semibold text-sm hover:bg-luxe-gold-light transition-all"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-black/40 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-white line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-luxe-gold font-medium mt-0.5">{formatPrice(item.price)}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-white/10 rounded-full bg-black/30">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 px-2 text-slate-300 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs px-2 font-medium text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 px-2 text-slate-300 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#0a0a0f]/80 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Subtotal</span>
                <span className="text-lg font-heading font-bold text-white">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-xs text-slate-400">Complimentary insured global white-glove courier shipping.</p>

              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-luxe-gold to-luxe-gold-dark text-luxe-black font-semibold text-sm hover:brightness-110 shadow-gold transition-all"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center py-2.5 px-6 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                >
                  View Full Bag Details
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
