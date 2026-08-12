import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import api from '../services/api.js';
import { INITIAL_PRODUCTS, INITIAL_CAMPAIGNS } from '../data/seedData.js';
import { Sparkles, Clock, MessageCircle, ArrowRight, ShieldCheck, Star } from 'lucide-react';

export default function CampaignLanding() {
  const { slug } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const { data } = await api.get(`/campaigns/slug/${slug}`);
        if (data.success && data.campaign) {
          setCampaign(data.campaign);
        } else {
          fallbackCampaign();
        }
      } catch (err) {
        fallbackCampaign();
      } finally {
        setLoading(false);
      }
    };

    const fallbackCampaign = () => {
      const found = INITIAL_CAMPAIGNS.find(c => c.slug === slug) || INITIAL_CAMPAIGNS[0];
      setCampaign(found);
      setProducts(INITIAL_PRODUCTS.slice(0, 6));
    };

    fetchCampaign();
  }, [slug]);

  if (loading || !campaign) {
    return <div className="py-20 text-center text-brand-muted text-sm font-medium">Loading Campaign Landing Page...</div>;
  }

  return (
    <div className="space-y-16 pb-16">
      
      {/* CAMPAIGN HERO BANNER */}
      <section className="relative bg-brand-dark text-white py-20 px-4 rounded-b-card overflow-hidden text-center">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-primary/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest text-brand-secondary">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>SPECIAL META ADS CAMPAIGN</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-tight">
            {campaign.headline}
          </h1>

          <p className="text-sm sm:text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            {campaign.subheadline}
          </p>

          {/* Countdown Timer */}
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-card border border-white/20">
            <Clock className="w-5 h-5 text-brand-accent animate-pulse" />
            <div className="flex items-center gap-3 font-mono font-bold text-lg sm:text-xl">
              <div>
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[10px] block font-sans text-white/60 uppercase">Hours</span>
              </div>
              <span>:</span>
              <div>
                <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[10px] block font-sans text-white/60 uppercase">Mins</span>
              </div>
              <span>:</span>
              <div>
                <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[10px] block font-sans text-white/60 uppercase">Secs</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <a
              href="#campaign-products"
              className="inline-flex items-center gap-2 bg-brand-accent text-brand-dark font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-btn shadow-floating hover:bg-white transition-colors"
            >
              <span>{campaign.ctaText || 'CLAIM 10% OFF OFFER'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CAMPAIGN PRODUCTS GRID */}
      <section id="campaign-products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">CURATED PROMO DROP</span>
          <h2 className="font-serif text-3xl font-bold text-brand-dark mt-1">Featured Campaign Items</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id || p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF & TRUST */}
      <section className="bg-brand-secondary/40 py-12 border-y border-brand-border">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="flex justify-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <blockquote className="font-serif text-xl sm:text-2xl italic font-semibold text-brand-dark max-w-2xl mx-auto">
            "DJ dresses fit like an absolute dream. The linen quality and plum tones look even richer in real life!"
          </blockquote>
          <p className="text-xs font-bold uppercase tracking-wider text-brand-muted">— Verified Buyer Meira K.</p>
        </div>
      </section>

    </div>
  );
}
