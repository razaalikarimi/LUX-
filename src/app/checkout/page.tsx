'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { ShieldCheck, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successOrder, setSuccessOrder] = useState<{ orderNumber: string; total: number } | null>(null);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (items.length === 0) {
      setErrorMsg('Your shopping bag is empty.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        items: items.map((i) => ({
          productId: i.id,
          quantity: i.quantity,
          price: i.price,
        })),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to place luxury order');
      }

      // Order created successfully
      setSuccessOrder({
        orderNumber: data.orderNumber,
        total: totalPrice,
      });
      clearCart();
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during checkout processing.');
    } finally {
      setLoading(false);
    }
  };

  if (successOrder) {
    return (
      <div className="pt-36 pb-24 max-w-2xl mx-auto px-6 text-center">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-luxe-gold font-semibold">Payment Confirmed</span>
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mt-2 mb-4">Maison Order Secured</h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto mb-8">
          Thank you, <strong className="text-white">{formData.customerName}</strong>. Your luxury creation is being prepared with insured white-glove packaging.
        </p>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-left mb-8 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Order Reference:</span>
            <span className="font-mono text-luxe-gold font-bold">{successOrder.orderNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Total Settled:</span>
            <span className="text-white font-medium">{formatPrice(successOrder.total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Confirmation Sent To:</span>
            <span className="text-slate-200">{formData.customerEmail}</span>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-luxe-gold text-luxe-black font-semibold text-xs tracking-wider uppercase shadow-gold hover:bg-luxe-gold-light transition-all"
        >
          Return to Atelier
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <Link href="/cart" className="text-sm text-slate-400 hover:text-white flex items-center gap-1.5 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Bag
      </Link>

      <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-10">Private Client Checkout</h1>

      {items.length === 0 ? (
        <div className="text-center py-20 border border-white/10 rounded-2xl">
          <p className="text-slate-400 mb-6">Your shopping bag is empty.</p>
          <Link href="/#products" className="px-6 py-2.5 rounded-full bg-luxe-gold text-luxe-black font-semibold text-xs uppercase">
            Browse Masterpieces
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {errorMsg}
              </div>
            )}

            {/* Client Identity */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-5">
              <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                1. Client Contact Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Lady Eleanor Vance"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:border-luxe-gold focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    placeholder="eleanor@vanceholdings.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:border-luxe-gold focus:outline-none text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5">Telephone *</label>
                  <input
                    type="tel"
                    required
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    placeholder="+1 (555) 234-8901"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:border-luxe-gold focus:outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Destination */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-5">
              <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                2. White-Glove Delivery Destination
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5">Street Address *</label>
                  <input
                    type="text"
                    required
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="740 Park Avenue, Apt 14B"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:border-luxe-gold focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5">City *</label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:border-luxe-gold focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5">State / Province *</label>
                  <input
                    type="text"
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="NY"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:border-luxe-gold focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5">Postal Code *</label>
                  <input
                    type="text"
                    required
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="10021"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:border-luxe-gold focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5">Country *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-white/10 text-white focus:border-luxe-gold focus:outline-none text-sm"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="France">France</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Japan">Japan</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-luxe-gold to-luxe-gold-dark text-luxe-black font-semibold text-sm tracking-wider uppercase shadow-gold hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" /> {loading ? 'Securing Transaction...' : `Confirm & Authorize ${formatPrice(totalPrice)}`}
            </button>
          </form>

          {/* Order Summary Sidebar */}
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 h-fit space-y-6">
            <h3 className="font-heading text-lg font-bold text-white border-b border-white/10 pb-4">Bag Review ({items.length})</h3>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div>
                    <h4 className="text-white font-medium line-clamp-1">{item.name}</h4>
                    <span className="text-xs text-slate-400">Qty: {item.quantity}</span>
                  </div>
                  <span className="text-slate-200 font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Courier Service</span>
                <span className="text-emerald-400">Complimentary Insured</span>
              </div>
              <div className="flex justify-between text-white font-heading text-xl font-bold pt-2">
                <span>Total</span>
                <span className="text-luxe-gold">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-luxe-gold flex-shrink-0" />
              <span>Full Authenticity Deed & Bespoke Client Concierge included.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
