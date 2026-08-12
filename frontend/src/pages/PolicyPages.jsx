import React from 'react';
import { useLocation } from 'react-router-dom';

export default function PolicyPages() {
  const location = useLocation();

  const getPolicyContent = () => {
    switch (location.pathname) {
      case '/shipping':
        return {
          title: "Shipping & Delivery Policy",
          content: "We deliver across all major cities in India via premium courier partners (Bluedart, Delhivery). Orders above ₹1,999 qualify for free express shipping. Standard delivery takes 3-5 business days."
        };
      case '/returns':
        return {
          title: "7-Day Return & Exchange Policy",
          content: "If your order doesn't fit perfectly, you can request a return or exchange within 7 days of delivery. Our courier team will collect the parcel directly from your doorstep."
        };
      case '/privacy':
        return {
          title: "Privacy Policy",
          content: "DJ values your privacy. Your personal information, delivery addresses, and payment data are encrypted using standard 256-bit SSL protocols and are never shared with third parties."
        };
      case '/terms':
      default:
        return {
          title: "Terms of Service",
          content: "By using the DJ Fashion E-Commerce platform, you agree to our standard customer service terms, store policies, and intellectual property rights."
        };
    }
  };

  const policy = getPolicyContent();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="font-serif text-3xl font-bold text-brand-dark border-b border-brand-border pb-4">{policy.title}</h1>
      <div className="bg-brand-surface p-8 rounded-card border border-brand-border text-sm text-brand-dark leading-relaxed">
        <p>{policy.content}</p>
      </div>
    </div>
  );
}
