import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useBrand } from '../context/BrandContext.jsx';

export default function WhatsAppFloat({ customMessage }) {
  const { brand } = useBrand();
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const number = brand.contact.whatsappNumber || '919876543210';
  const defaultText = customMessage || brand.contact.whatsappDefaultMessage;

  const handleSend = (text) => {
    const finalMsg = text || userMsg || defaultText;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40">
      {isOpen && (
        <div className="mb-3 w-72 bg-brand-surface rounded-card shadow-modal border border-brand-border p-4 text-brand-dark animate-in fade-in slide-in-from-bottom-3">
          <div className="flex items-center justify-between pb-3 border-b border-brand-border">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="font-serif text-sm font-bold text-brand-primary">DJ Styling Concierge</h4>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-brand-muted hover:text-brand-dark">
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-brand-muted my-3 leading-relaxed">
            Hi! Need help with sizing, fabric care, or order status? Connect with our personal stylist instantly.
          </p>

          <div className="space-y-1.5 mb-3">
            {[
              "Need size & fit recommendations",
              "Track my recent order status",
              "Custom styling suggestions for an event"
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(preset)}
                className="w-full text-left text-[11px] bg-brand-bg hover:bg-brand-secondary text-brand-dark px-3 py-2 rounded-btn font-medium transition-colors border border-brand-border/40"
              >
                💬 {preset}
              </button>
            ))}
          </div>

          <div className="flex gap-2 pt-2 border-t border-brand-border">
            <input
              type="text"
              placeholder="Type your message..."
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              className="flex-1 text-xs bg-brand-bg text-brand-dark px-3 py-2 rounded-btn border border-brand-border focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-btn transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-floating flex items-center justify-center transition-all duration-300 hover:scale-105 group"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2">
          Chat With Stylist
        </span>
      </button>
    </div>
  );
}
