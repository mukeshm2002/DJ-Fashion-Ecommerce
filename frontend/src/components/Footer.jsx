import React from 'react';
import { Link } from 'react-router-dom';
import { useBrand } from '../context/BrandContext.jsx';
import { DJLogo } from './DJLogo.jsx';
import { Instagram, MessageCircle, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const { brand } = useBrand();

  return (
    <footer className="bg-brand-dark text-brand-bg pt-16 pb-12 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Editorial Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Left Brand Identity & Location */}
          <div className="md:col-span-4 space-y-5">
            <DJLogo variant="wordmark" color="light" showTagline={true} />
            
            <p className="text-xs text-brand-bg/70 leading-relaxed max-w-sm font-light">
              {brand.subtext}
            </p>
            
            <div className="flex items-center gap-2 text-xs text-brand-accent font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>TIRUPPUR • TAMIL NADU • INDIA</span>
            </div>
          </div>

          {/* Center Links Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Column 1: SHOP */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">Shop</h4>
              <ul className="space-y-2.5 text-xs text-brand-bg/70">
                <li><Link to="/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
                <li><Link to="/category/dresses" className="hover:text-white transition-colors">Dresses</Link></li>
                <li><Link to="/category/co-ords" className="hover:text-white transition-colors">Co-ords</Link></li>
                <li><Link to="/category/tops" className="hover:text-white transition-colors">Tops & Blouses</Link></li>
                <li><Link to="/category/accessories" className="hover:text-white transition-colors">Accessories</Link></li>
              </ul>
            </div>

            {/* Column 2: ABOUT */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">About</h4>
              <ul className="space-y-2.5 text-xs text-brand-bg/70">
                <li><Link to="/about" className="hover:text-white transition-colors">About DJ</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/admin/analytics" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Case Study</span>
                  <ArrowUpRight className="w-3 h-3 text-brand-accent" />
                </Link></li>
              </ul>
            </div>

            {/* Column 3: HELP */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">Help</h4>
              <ul className="space-y-2.5 text-xs text-brand-bg/70">
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                <li><Link to="/returns" className="hover:text-white transition-colors">Return Policy</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Column 4: FOLLOW & CONTACT */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">Follow</h4>
              <div className="flex items-center gap-3">
                <a
                  href={brand.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-accent hover:text-brand-dark transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={brand.social.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-emerald-600 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
              <p className="text-[11px] text-brand-bg/60 pt-2">
                Concierge Assistance: <br />
                <span className="text-white font-semibold">{brand.contact.email}</span>
              </p>
            </div>

          </div>

        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-bg/50 gap-4 font-light">
          <p>© {new Date().getFullYear()} DJ. All Rights Reserved. Tiruppur • Tamil Nadu • India.</p>
          <div className="flex gap-6 text-[11px]">
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/admin/login" className="hover:text-white">Admin Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
