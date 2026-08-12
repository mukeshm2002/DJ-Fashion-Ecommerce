import React from 'react';
import { useBrand } from '../context/BrandContext.jsx';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQ() {
  const { brand } = useBrand();

  const faqs = [
    {
      q: `What is ${brand.name}'s Return & Exchange Policy?`,
      a: "We offer a 7-day hassle-free doorstep pickup policy for returns or size exchanges. Garments must be unworn with original brand tags intact."
    },
    {
      q: "How long does shipping take?",
      a: "Standard shipping takes 3-5 business days across India. Express shipping is complimentary for orders above ₹1,999."
    },
    {
      q: "Where is DJ based?",
      a: `DJ is headquartered in ${brand.location.fullAddress}.`
    },
    {
      q: "Are DJ fabrics organic and sustainably sourced?",
      a: `Yes! All ${brand.name} garments are crafted from organic linen, mulberry silk-satin, or certified sustainable cotton.`
    },
    {
      q: "How do I determine my size?",
      a: "Each product page includes a Size Guide modal with exact chest, waist, and hip measurements in inches. You can also chat directly with our WhatsApp Styling Concierge for personal guidance."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">HELP & FREQUENTLY ASKED QUESTIONS</span>
        <h1 className="font-serif text-4xl font-bold text-brand-dark">Frequently Asked Questions</h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-brand-surface p-6 rounded-card border border-brand-border space-y-2">
            <h3 className="font-serif text-lg font-bold text-brand-dark flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-primary shrink-0" />
              <span>{faq.q}</span>
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed pl-6">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
