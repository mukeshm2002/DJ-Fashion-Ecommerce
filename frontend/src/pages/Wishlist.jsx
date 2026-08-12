import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleMoveToCart = (product) => {
    addToCart(product, product.sizes?.[0] || 'M', product.colors?.[0]?.name || 'Default');
    removeFromWishlist(product._id || product.slug);
    addToast(`Moved ${product.name} to Shopping Bag`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header */}
      <div className="border-b border-brand-border pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">SAVED ESSENTIALS</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mt-1">Your Wishlist</h1>
          <p className="text-xs text-brand-muted mt-1">{wishlistItems.length} saved items</p>
        </div>
      </div>

      {/* Grid or Empty State */}
      {wishlistItems.length === 0 ? (
        <div className="bg-brand-surface rounded-card p-16 text-center border border-brand-border space-y-6 max-w-lg mx-auto my-12">
          <div className="w-20 h-20 bg-brand-bg rounded-full flex items-center justify-center mx-auto text-brand-muted shadow-subtle">
            <Heart className="w-10 h-10 text-brand-primary/60" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-brand-dark">Your Wishlist is Empty</h2>
            <p className="text-xs text-brand-muted max-w-xs mx-auto leading-relaxed">
              Bookmark pieces that capture your heart. Revisit them anytime to add directly to your bag.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-btn shadow-floating transition-colors"
          >
            <span>EXPLORE COLLECTIONS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div
              key={product._id || product.slug}
              className="bg-brand-surface rounded-card overflow-hidden border border-brand-border shadow-subtle flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] bg-brand-bg">
                <Link to={`/product/${product.slug}`}>
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <button
                  onClick={() => {
                    removeFromWishlist(product._id || product.slug);
                    addToast('Removed from Wishlist', 'info');
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-brand-muted hover:text-rose-600 shadow-sm"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-3">
                <Link to={`/product/${product.slug}`}>
                  <h3 className="font-serif text-base font-bold text-brand-dark line-clamp-1 hover:text-brand-primary">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-baseline justify-between">
                  <span className="text-base font-bold text-brand-primary">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    IN STOCK
                  </span>
                </div>

                <button
                  onClick={() => handleMoveToCart(product)}
                  className="w-full bg-brand-dark hover:bg-brand-primary text-white font-bold text-xs uppercase tracking-wider py-3 rounded-btn flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>MOVE TO BAG</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
