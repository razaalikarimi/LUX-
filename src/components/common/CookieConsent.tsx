'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('luxe_cookie_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('luxe_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('luxe_cookie_consent', 'essential_only');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie and Privacy Preferences"
      className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50 p-6 rounded-2xl bg-[#12121a]/95 backdrop-blur-2xl border border-luxe-gold/30 shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="space-y-1">
        <h4 className="font-heading text-sm font-semibold text-white">Privacy & Cookie Preferences</h4>
        <p className="text-xs text-slate-400 leading-relaxed">
          We use strictly essential cookies to preserve your shopping bag and ensure optimal encrypted checkout performance. Read our{' '}
          <Link href="/privacy-policy.html" className="text-luxe-gold underline hover:text-luxe-gold-light">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleAccept}
          className="flex-1 py-2 px-4 rounded-full bg-luxe-gold text-luxe-black font-semibold text-xs hover:bg-luxe-gold-light transition-colors"
        >
          Accept All
        </button>
        <button
          onClick={handleReject}
          className="py-2 px-4 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium text-xs hover:bg-white/10 transition-colors"
        >
          Essential Only
        </button>
      </div>
    </aside>
  );
};
