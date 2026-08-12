import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';
import { useToast } from '../../context/ToastContext.jsx';
import { INITIAL_CAMPAIGNS } from '../../data/seedData.js';
import { Megaphone, Plus, ExternalLink, BarChart2, DollarSign } from 'lucide-react';

export default function AdminCampaigns() {
  const { addToast } = useToast();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const { data } = await api.get('/campaigns');
        if (data.success && data.campaigns.length > 0) {
          setCampaigns(data.campaigns);
        } else {
          setCampaigns(INITIAL_CAMPAIGNS);
        }
      } catch (err) {
        setCampaigns(INITIAL_CAMPAIGNS);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-brand-border pb-6">
        <div>
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">DIGITAL MARKETING COMMAND</span>
          <h1 className="font-serif text-3xl font-bold text-brand-dark mt-1">Meta Ads & Campaign Management</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((c, i) => (
          <div key={i} className="bg-brand-surface p-6 rounded-card border border-brand-border shadow-subtle space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-extrabold uppercase bg-brand-secondary text-brand-primary px-2.5 py-0.5 rounded">
                  {c.type} Campaign
                </span>
                <h3 className="font-serif text-xl font-bold text-brand-dark mt-2">{c.name}</h3>
                <p className="text-xs text-brand-muted mt-0.5">Landing URL: <code className="bg-brand-bg px-1 py-0.5 rounded text-brand-primary">/campaign/{c.slug}</code></p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
                {c.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-3 bg-brand-bg/60 rounded-btn text-center text-xs">
              <div>
                <span className="text-brand-muted text-[10px] uppercase block">Budget</span>
                <strong className="text-brand-dark">₹{c.budget?.toLocaleString()}</strong>
              </div>
              <div>
                <span className="text-brand-muted text-[10px] uppercase block">Impressions</span>
                <strong className="text-brand-dark">{c.impressions?.toLocaleString()}</strong>
              </div>
              <div>
                <span className="text-brand-muted text-[10px] uppercase block">Conversions</span>
                <strong className="text-emerald-700">{c.conversions} Sales</strong>
              </div>
            </div>

            <div className="text-[11px] text-brand-muted space-y-1">
              <p>Meta Pixel ID: <strong className="text-brand-dark">{c.metaPixelId || 'PX-9842014-DJ'}</strong></p>
              <p>UTM Tracking: <strong className="text-brand-dark">utm_source={c.utmSource || 'meta_ads'} & utm_campaign={c.utmCampaign || 'summer_launch'}</strong></p>
            </div>

            <div className="pt-2 flex gap-2">
              <a
                href={`/campaign/${c.slug}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold uppercase py-2.5 rounded-btn flex items-center justify-center gap-1.5"
              >
                <span>View Campaign Landing Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
