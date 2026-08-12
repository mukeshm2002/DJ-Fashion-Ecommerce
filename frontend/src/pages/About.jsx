import React from 'react';
import { useBrand } from '../context/BrandContext.jsx';
import { DJLogo } from '../components/DJLogo.jsx';
import { Sparkles, Heart, ShieldCheck, Feather, MapPin } from 'lucide-react';

export default function About() {
  const { brand } = useBrand();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-sans">
      
      {/* Brand Identity Header */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <DJLogo variant="stacked" color="dark" showTagline={true} showLocation={true} />
        
        <p className="text-sm text-brand-muted font-light leading-relaxed pt-4 border-t border-brand-border">
          Headquartered in <strong>{brand.location.fullAddress}</strong>, {brand.name} brings modern editorial D2C fashion to women everywhere with a commitment to natural fabrics, architectural silhouettes, and effortless daily confidence.
        </p>
      </div>

      <div className="aspect-[21/9] rounded-card overflow-hidden bg-brand-bg shadow-subtle border border-brand-border">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop"
          alt="DJ Brand Atelier in Tiruppur, Tamil Nadu, India"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-brand-surface p-6 rounded-card border border-brand-border space-y-3">
          <Feather className="w-8 h-8 text-brand-accent" />
          <h3 className="font-serif text-lg font-bold text-brand-dark">Natural Eco Fabrics</h3>
          <p className="text-xs text-brand-muted font-light leading-relaxed">
            We prioritize breathable organic linen, silk-satin, and sustainable cottons that feel soft against the skin.
          </p>
        </div>

        <div className="bg-brand-surface p-6 rounded-card border border-brand-border space-y-3">
          <Heart className="w-8 h-8 text-brand-accent" />
          <h3 className="font-serif text-lg font-bold text-brand-dark">Timeless Longevity</h3>
          <p className="text-xs text-brand-muted font-light leading-relaxed">
            Designed to transcend fast-fashion trends, ensuring every garment remains a cherished pillar of your wardrobe.
          </p>
        </div>

        <div className="bg-brand-surface p-6 rounded-card border border-brand-border space-y-3">
          <MapPin className="w-8 h-8 text-brand-accent" />
          <h3 className="font-serif text-lg font-bold text-brand-dark">Tiruppur Craftsmanship</h3>
          <p className="text-xs text-brand-muted font-light leading-relaxed">
            Rooted in Tiruppur, Tamil Nadu, India — celebrated globally for excellence in textile manufacturing and quality tailoring.
          </p>
        </div>
      </div>

    </div>
  );
}
