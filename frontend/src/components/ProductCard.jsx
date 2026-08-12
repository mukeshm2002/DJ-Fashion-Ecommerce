import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import QuickAddModal from './QuickAddModal.jsx';
import { Heart, Star, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isLiked = isInWishlist(product._id || product.slug);

  const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop';
  const hoverImage = product.images?.[1] || mainImage;

  return (
    <>
      <div
        className="group relative flex flex-col bg-brand-surface rounded-card border border-brand-border/60 overflow-hidden transition-all duration-300 hover:shadow-subtle"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 4:5 Aspect Ratio Product Photography Container */}
        <div className="relative aspect-[4/5] bg-brand-bg overflow-hidden">
          
          <Link to={`/product/${product.slug}`}>
            {/* Primary & Hover Image Swap */}
            <img
              src={isHovered ? hoverImage : mainImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Link>

          {/* Discount Badge (Sparse Muted Burgundy) */}
          {product.discountPercentage > 0 && (
            <span className="absolute top-3 left-3 bg-brand-burgundy text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
              {product.discountPercentage}% OFF
            </span>
          )}

          {/* Wishlist Heart Icon (Top Right) */}
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-brand-dark hover:bg-white transition-all shadow-sm"
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-600 text-rose-600' : 'text-brand-dark'}`} />
          </button>

          {/* Quick Add Overlay Trigger Button */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setIsQuickAddOpen(true)}
              className="w-full bg-brand-dark text-white hover:bg-brand-hover font-sans text-[11px] font-bold uppercase tracking-widest py-2.5 rounded-btn shadow-floating flex items-center justify-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-brand-accent" />
              <span>QUICK ADD</span>
            </button>
          </div>

        </div>

        {/* Product Details Text Block Below */}
        <div className="p-4 space-y-1.5">
          <div className="flex justify-between items-start gap-2">
            <Link to={`/product/${product.slug}`} className="group-hover:text-brand-accent transition-colors">
              <h3 className="font-serif text-sm font-bold text-brand-dark line-clamp-1 leading-snug">
                {product.name}
              </h3>
            </Link>
            {product.rating > 0 && (
              <div className="flex items-center gap-1 text-[11px] font-semibold text-brand-muted shrink-0">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>{product.rating}</span>
              </div>
            )}
          </div>

          <p className="text-[11px] font-sans text-brand-muted uppercase tracking-wider">
            {product.category}
          </p>

          <div className="flex items-baseline gap-2 pt-1">
            <span className="font-sans text-sm font-extrabold text-brand-dark">
              ₹{product.price.toLocaleString()}
            </span>
            {product.comparePrice > product.price && (
              <span className="font-sans text-xs text-brand-muted line-through">
                ₹{product.comparePrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Quick Add Modal */}
      {isQuickAddOpen && (
        <QuickAddModal product={product} onClose={() => setIsQuickAddOpen(false)} />
      )}
    </>
  );
}
