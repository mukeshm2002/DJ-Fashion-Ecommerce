import React from 'react';
import { useBrand } from '../context/BrandContext.jsx';
import { Mail, MapPin, MessageCircle, Clock } from 'lucide-react';

export default function Contact() {
  const { brand } = useBrand();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">GET IN TOUCH</span>
        <h1 className="font-serif text-4xl font-bold text-brand-dark">Contact {brand.name}</h1>
        <p className="text-xs text-brand-muted">We are here to assist with sizing guidance, order tracking, and custom inquiries.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-brand-surface p-6 rounded-card border border-brand-border space-y-2 text-center">
          <MapPin className="w-6 h-6 text-brand-primary mx-auto" />
          <h3 className="font-serif text-base font-bold text-brand-dark">Headquarters</h3>
          <p className="text-xs text-brand-muted font-medium">
            {brand.name}<br />
            {brand.contact.address}
          </p>
        </div>

        <div className="bg-brand-surface p-6 rounded-card border border-brand-border space-y-2 text-center">
          <Mail className="w-6 h-6 text-brand-primary mx-auto" />
          <h3 className="font-serif text-base font-bold text-brand-dark">Email Support</h3>
          <p className="text-xs text-brand-muted font-medium">{brand.contact.email}</p>
        </div>

        <a
          href={brand.social.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="bg-brand-surface p-6 rounded-card border border-brand-border space-y-2 text-center hover:border-emerald-500 transition-colors"
        >
          <MessageCircle className="w-6 h-6 text-emerald-600 mx-auto" />
          <h3 className="font-serif text-base font-bold text-brand-dark">WhatsApp Concierge</h3>
          <p className="text-xs text-emerald-700 font-bold">Chat Live With Us</p>
        </a>
      </div>
    </div>
  );
}
