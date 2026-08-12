import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';
import { useToast } from '../../context/ToastContext.jsx';
import { INITIAL_COUPONS } from '../../data/seedData.js';
import { Tag, Plus, Check } from 'lucide-react';

export default function AdminCoupons() {
  const { addToast } = useToast();
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-brand-border pb-6">
        <div>
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">OFFERS & PROMOTIONS</span>
          <h1 className="font-serif text-3xl font-bold text-brand-dark mt-1">Discount Coupons & Promo Codes</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.map((c, i) => (
          <div key={i} className="bg-brand-surface p-6 rounded-card border border-brand-border shadow-subtle flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-extrabold text-brand-primary bg-brand-secondary px-3 py-1 rounded border border-brand-primary/20">
                  {c.code}
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Active</span>
              </div>
              <p className="text-xs text-brand-dark font-medium pt-2">
                {c.discountType === 'PERCENTAGE' ? `${c.discountValue}% OFF Subtotal` : `Flat ₹${c.discountValue} OFF`}
              </p>
              <p className="text-[11px] text-brand-muted">Min order amount: ₹{c.minOrderAmount}</p>
            </div>

            <div className="text-right text-xs text-brand-muted">
              <Tag className="w-6 h-6 text-brand-primary ml-auto" />
              <span className="text-[10px] block mt-1">Unlimited Redemptions</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
