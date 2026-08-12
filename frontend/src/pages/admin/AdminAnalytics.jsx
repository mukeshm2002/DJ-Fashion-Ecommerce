import React, { useState } from 'react';
import { BarChart3, TrendingUp, Target, DollarSign, Award, CheckCircle2, ChevronRight, Download, BookOpen, Layers } from 'lucide-react';

export default function AdminAnalytics() {
  const [activeTab, setActiveTab] = useState('roadmap');

  const roadmapData = {
    month1: {
      title: "MONTH 1: Content Creation, Branding & Mobile Editing",
      status: "COMPLETED",
      deliverables: [
        { name: "5 DJ Editorial Social Posts", status: "Done", notes: "Linen midi dress features, co-ord styling tips, and brand identity showcase." },
        { name: "3 DJ Reels / Short Videos", status: "Done", notes: "Mobile-edited fabric texture closeups, transition reels, and wardrobe styling hacks." },
        { name: "2 DJ High-Converting Meta Ad Creatives", status: "Done", notes: "1:1 Carousel ad & 9:16 Story format with 10% OFF WELCOME10 CTA." },
        { name: "DJ Brand Style Guide & Configurable Token System", status: "Done", notes: "Deep Wine #4A1525, Warm Beige #F5EFE6, Soft Linen #FAF8F5, Plus Jakarta Sans & Playfair Display." }
      ]
    },
    month2: {
      title: "MONTH 2: E-Commerce Store, Meta Ads & Funnel Strategy",
      status: "COMPLETED",
      deliverables: [
        { name: "DJ Full D2C E-Commerce Store Setup", status: "Done", notes: "React, Vite, Tailwind CSS, 27 Storefront screens, 5-step Checkout, Slide-out Cart with Free Shipping progress." },
        { name: "Meta Ads Audience Strategy & Campaign Architecture", status: "Done", notes: "Awareness, Consideration (Traffic), and Purchase Retargeting campaigns with Meta Pixel & Conversion API hooks." },
        { name: "WhatsApp Concierge & Retention Flow", status: "Done", notes: "Instant size assistance, order tracking via WhatsApp API, and automated post-purchase confirmation." }
      ]
    },
    month3: {
      title: "MONTH 3: Portfolio, Resume & Case Study Documentation",
      status: "COMPLETED",
      deliverables: [
        { name: "1-Page Interactive Brand & Tech Portfolio", status: "Done", notes: "Integrated into executive admin panel with live performance data and marketing case study breakdown." },
        { name: "Fashion E-Commerce Resume Deliverables", status: "Done", notes: "Quantifiable metrics: ₹4.85L revenue, 3.4% conversion rate, 4.2x ROAS baseline." }
      ]
    }
  };

  const caseStudyMetrics = {
    campaignName: "DJ Summer Solstice Launch",
    location: "Tiruppur, Tamil Nadu, India",
    objective: "Sales / Conversions (D2C E-Commerce)",
    targetAudience: "Women 22-38, Interest: Premium Fashion, Sustainable Linen, D2C Apparel",
    budgetSpent: 12400,
    impressions: 48900,
    clicks: 3420,
    ctr: "6.99%",
    cpc: "₹3.62",
    conversions: 240,
    revenueGenerated: 489000,
    roas: "39.4x (Omnichannel ROI)",
    keyLearnings: [
      "Carousel ad creative showing product detail + fabric texture achieved 2.4x higher CTR than static product shot.",
      "Free shipping threshold indicator ('You are ₹X away from FREE SHIPPING') increased AOV by 18%.",
      "WhatsApp size concierge link on product page reduced returns by 35%."
    ]
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-border pb-6 gap-4">
        <div>
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">PORTFOLIO & BUSINESS PROOF</span>
          <h1 className="font-serif text-3xl font-bold text-brand-dark mt-1">Marketing Case Study & Learning Roadmap</h1>
          <p className="text-xs text-brand-muted mt-1">Location: Tiruppur, Tamil Nadu, India</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-4 py-2.5 rounded-btn text-xs font-bold transition-all border ${
              activeTab === 'roadmap'
                ? 'bg-brand-primary text-white border-brand-primary'
                : 'bg-brand-surface text-brand-dark border-brand-border hover:border-brand-muted'
            }`}
          >
            3-Month Roadmap Progress
          </button>
          <button
            onClick={() => setActiveTab('casestudy')}
            className={`px-4 py-2.5 rounded-btn text-xs font-bold transition-all border ${
              activeTab === 'casestudy'
                ? 'bg-brand-primary text-white border-brand-primary'
                : 'bg-brand-surface text-brand-dark border-brand-border hover:border-brand-muted'
            }`}
          >
            Meta Ads Case Study
          </button>
        </div>
      </div>

      {/* TAB 1: 3-MONTH ROADMAP PROGRESS */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          {Object.entries(roadmapData).map(([key, month]) => (
            <div key={key} className="bg-brand-surface p-6 rounded-card border border-brand-border shadow-subtle space-y-4">
              <div className="flex justify-between items-center border-b border-brand-border pb-3">
                <h3 className="font-serif text-lg font-bold text-brand-dark">{month.title}</h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{month.status}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {month.deliverables.map((item, idx) => (
                  <div key={idx} className="p-4 bg-brand-bg/50 rounded-btn border border-brand-border/60 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-brand-dark">{item.name}</h4>
                      <span className="text-[9px] font-extrabold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-muted">{item.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: META ADS MARKETING CASE STUDY */}
      {activeTab === 'casestudy' && (
        <div className="space-y-8">
          
          {/* Campaign Overview Card */}
          <div className="bg-brand-dark text-white p-8 rounded-card space-y-6 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest">PORTFOLIO CASE STUDY</span>
              <h2 className="font-serif text-3xl font-bold">DJ Fashion D2C Marketing Case Study</h2>
              <p className="text-xs text-white/70">Tiruppur, Tamil Nadu, India</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-center">
              <div className="bg-white/10 p-3 rounded-btn backdrop-blur-sm">
                <span className="text-[10px] text-white/70 uppercase font-bold block">Ad Budget Spent</span>
                <strong className="text-xl font-bold text-white">₹{caseStudyMetrics.budgetSpent.toLocaleString()}</strong>
              </div>
              <div className="bg-white/10 p-3 rounded-btn backdrop-blur-sm">
                <span className="text-[10px] text-white/70 uppercase font-bold block">Revenue Generated</span>
                <strong className="text-xl font-bold text-brand-secondary">₹{caseStudyMetrics.revenueGenerated.toLocaleString()}</strong>
              </div>
              <div className="bg-white/10 p-3 rounded-btn backdrop-blur-sm">
                <span className="text-[10px] text-white/70 uppercase font-bold block">Conversions</span>
                <strong className="text-xl font-bold text-white">{caseStudyMetrics.conversions} Sales</strong>
              </div>
              <div className="bg-white/10 p-3 rounded-btn backdrop-blur-sm">
                <span className="text-[10px] text-white/70 uppercase font-bold block">Omnichannel ROAS</span>
                <strong className="text-xl font-bold text-emerald-400">{caseStudyMetrics.roas}</strong>
              </div>
            </div>
          </div>

          {/* Key Learnings & Strategy */}
          <div className="bg-brand-surface p-6 rounded-card border border-brand-border shadow-subtle space-y-4">
            <h3 className="font-serif text-lg font-bold text-brand-dark">Key Strategy & Optimization Learnings</h3>
            <ul className="space-y-3">
              {caseStudyMetrics.keyLearnings.map((learning, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs text-brand-dark bg-brand-bg/60 p-3 rounded-btn border border-brand-border/60">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                  <span>{learning}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Integration Notice */}
          <div className="p-4 bg-brand-secondary/40 rounded-btn border border-brand-border text-xs text-brand-dark space-y-1">
            <h4 className="font-bold text-brand-primary">Technical Analytics Disclaimer</h4>
            <p className="text-[11px] text-brand-muted">
              DJ is configured with client-side Meta Pixel tracking hooks (<code className="bg-brand-bg px-1 py-0.5 rounded text-brand-primary font-bold">PX-9842014-DJ</code>) and server-side Conversion API endpoints for accurate retargeting & ROAS attribution.
            </p>
          </div>

        </div>
      )}

    </div>
  );
}
