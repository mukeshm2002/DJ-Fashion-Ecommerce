import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBrand } from '../context/BrandContext.jsx';
import { DJLogo } from '../components/DJLogo.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { ProductGridSkeleton } from '../components/SkeletonLoader.jsx';
import api from '../services/api.js';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../data/seedData.js';
import { ArrowRight, Sparkles, Instagram, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { brand } = useBrand();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const { data } = await api.get('/products');
        if (data.success && data.products.length > 0) {
          setProducts(data.products);
        } else {
          setProducts(INITIAL_PRODUCTS);
        }
      } catch (error) {
        setProducts(INITIAL_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeProducts();
  }, []);

  const newArrivals = products.filter((p) => p.isNewArrival || p.tags?.includes('NewArrival')).slice(0, 8);
  const trendingProducts = products.filter((p) => p.isTrending || p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-24 md:space-y-36 pb-20">
      
      {/* SECTION 1 — FULL-WIDTH EDITORIAL HERO (85vh, EDGE-TO-EDGE) */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-brand-dark overflow-hidden text-brand-bg -mt-[76px] pt-[76px]">
        {/* Editorial Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
            alt="DJ Fashion Editorial Hero"
            className="w-full h-full object-cover object-center opacity-55 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
        </div>

        {/* Minimal Hero Content Overlay */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-brand-accent"
          >
            <Sparkles className="w-3 h-3 text-brand-accent" />
            <span>SUMMER SOLSTICE COLLECTION 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white leading-[1.05] uppercase"
          >
            STYLE THAT<br />FEELS LIKE YOU.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-lg text-white/80 max-w-xl mx-auto font-sans font-light tracking-wide leading-relaxed"
          >
            {brand.subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/new-arrivals"
              className="w-full sm:w-auto bg-brand-surface text-brand-dark hover:bg-brand-secondary font-sans font-bold text-xs uppercase tracking-[0.2em] px-9 py-4 rounded-btn shadow-floating transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>SHOP NEW ARRIVALS</span>
              <ArrowRight className="w-4 h-4 text-brand-accent" />
            </Link>
            <Link
              to="/shop"
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white font-sans font-bold text-xs uppercase tracking-[0.2em] px-9 py-4 rounded-btn border border-white/40 transition-all duration-300 flex items-center justify-center"
            >
              EXPLORE COLLECTION
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — EDITORIAL CATEGORY CAMPAIGN BLOCKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-brand-border pb-4">
          <div>
            <span className="text-[10px] font-sans font-bold text-brand-muted uppercase tracking-[0.25em]">CURATED RANGE</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mt-1">Campaign Categories</h2>
          </div>
          <Link to="/shop" className="text-xs font-sans font-bold text-brand-dark uppercase tracking-widest hover:text-brand-accent flex items-center gap-1">
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {INITIAL_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-card border border-brand-border/60 bg-brand-dark"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent" />
              <div className="absolute bottom-5 inset-x-4 text-center">
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-brand-accent transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/70 font-sans font-semibold mt-1 block">
                  EXPLORE EDIT
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3 — NEW ARRIVALS CATALOGUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-brand-border pb-4">
          <div>
            <span className="text-[10px] font-sans font-bold text-brand-muted uppercase tracking-[0.25em]">SEASONAL DROPS</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mt-1">New Arrivals</h2>
          </div>
          <Link to="/new-arrivals" className="text-xs font-sans font-bold text-brand-dark uppercase tracking-widest hover:text-brand-accent flex items-center gap-1">
            <span>Shop New Drops</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <ProductGridSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product._id || product.slug} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* SECTION 4 — ASYMMETRIC EDITORIAL TRENDING SHOWCASE */}
      <section className="bg-brand-secondary/50 py-20 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Editorial Copy */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-sans font-bold text-brand-muted uppercase tracking-[0.25em]">MAGAZINE EDITORIAL</span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brand-dark leading-tight">
                Trending Now: Organic Linen & Silk
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted font-sans font-light leading-relaxed">
                Elevate your daily rhythm with masterfully draped silk wraps and breathable organic linen co-ords handcrafted in Tiruppur, Tamil Nadu.
              </p>
              <div className="pt-4">
                <Link
                  to="/trending"
                  className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-hover text-white font-sans font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-btn shadow-subtle transition-colors"
                >
                  <span>EXPLORE TRENDING EDIT</span>
                  <ArrowRight className="w-4 h-4 text-brand-accent" />
                </Link>
              </div>
            </div>

            {/* Right Asymmetric Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {trendingProducts.slice(0, 2).map((product) => (
                <ProductCard key={product._id || product.slug} product={product} />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5 — SHOP BY STYLE MOOD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] font-sans font-bold text-brand-muted uppercase tracking-[0.25em]">MOODBOARD SELECTIONS</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">Shop By Style</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { title: "Everyday Confidence", tag: "Everyday", img: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=800&auto=format&fit=crop" },
            { title: "Minimal Elegance", tag: "Minimal", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop" },
            { title: "Party & Soirée", tag: "Party", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop" },
            { title: "Power Workwear", tag: "Workwear", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop" },
            { title: "Resort & Casual", tag: "Casual", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" },
            { title: "Statement Accessories", tag: "Statement", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop" },
          ].map((style) => (
            <Link
              key={style.title}
              to={`/shop?tag=${style.tag}`}
              className="group relative aspect-[16/10] overflow-hidden rounded-card border border-brand-border/60 bg-brand-dark"
            >
              <img src={style.img} alt={style.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-75 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-brand-dark/40 group-hover:bg-brand-dark/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:scale-105 transition-transform uppercase tracking-wider">
                  {style.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 6 — DEEP ESPRESSO EMOTIONAL BRAND STORY WITH STACKED BRAND MARK */}
      <section className="bg-brand-espresso text-brand-bg py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <DJLogo variant="stacked" color="light" showTagline={true} showLocation={true} />

          <p className="text-xs sm:text-sm text-brand-bg/70 max-w-2xl mx-auto font-sans font-light leading-relaxed pt-4 border-t border-white/10">
            Headquartered in Tiruppur, Tamil Nadu, India — DJ combines traditional textile mastery with modern editorial cuts to craft wardrobe pillars built for confidence.
          </p>
          
          <div className="pt-4">
            <Link to="/about" className="inline-block bg-brand-surface text-brand-dark font-sans font-bold text-xs uppercase tracking-[0.2em] px-9 py-4 rounded-btn hover:bg-brand-secondary transition-colors">
              DISCOVER DJ
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7 — SOCIAL INSTAGRAM FEED GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-[10px] font-sans font-bold text-brand-muted uppercase tracking-[0.25em] flex items-center justify-center gap-1.5">
            <Instagram className="w-4 h-4 text-brand-accent" />
            <span>@DJ ON INSTAGRAM</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">Styled By You</h2>
          <p className="text-xs text-brand-muted font-sans">Tag #DJStyle for a chance to be featured in our fashion journal.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop", user: "@ananya.s" },
            { img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop", user: "@priya_looks" },
            { img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop", user: "@tanya.vibe" },
            { img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop", user: "@stylebymeira" },
          ].map((ugc, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden bg-brand-bg rounded-card border border-brand-border/60">
              <img src={ugc.img} alt={`Styled by ${ugc.user}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-brand-dark/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-sans font-semibold gap-1.5">
                <Instagram className="w-4 h-4" />
                <span>{ugc.user}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8 — EDITORIAL NEWSLETTER */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-sans font-bold text-brand-muted uppercase tracking-[0.25em]">EDITORIAL WORLD</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark uppercase">JOIN THE DJ WORLD.</h2>
          <p className="text-xs text-brand-muted font-sans">New collections, private offers, and stories from DJ Tiruppur.</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (emailInput) {
              alert('Thank you for subscribing to DJ World!');
              setEmailInput('');
            }
          }}
          className="flex max-w-md mx-auto gap-3 pt-2"
        >
          <input
            type="email"
            placeholder="Enter your email address..."
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
            className="flex-1 bg-transparent border-b border-brand-dark text-xs py-3 text-brand-dark focus:outline-none placeholder:text-brand-muted font-sans"
          />
          <button
            type="submit"
            className="bg-brand-dark hover:bg-brand-hover text-white text-xs font-sans font-bold uppercase tracking-widest px-8 py-3 rounded-btn shadow-subtle transition-colors"
          >
            JOIN
          </button>
        </form>
      </section>

    </div>
  );
}
