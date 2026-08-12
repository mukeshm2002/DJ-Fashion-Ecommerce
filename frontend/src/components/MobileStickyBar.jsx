import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function MobileStickyBar() {
  const location = useLocation();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAdmin } = useAuth();

  // Hide on admin routes or checkout
  if (location.pathname.startsWith('/admin') || location.pathname === '/checkout') {
    return null;
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-surface/95 backdrop-blur-lg border-t border-brand-border/80 px-4 py-2 flex items-center justify-around shadow-floating">
      <Link
        to="/"
        className={`flex flex-col items-center py-1 px-3 rounded-xl text-[11px] font-medium transition-colors ${
          isActive('/') ? 'text-brand-primary font-semibold' : 'text-brand-muted hover:text-brand-dark'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span>Home</span>
      </Link>

      <Link
        to="/shop"
        className={`flex flex-col items-center py-1 px-3 rounded-xl text-[11px] font-medium transition-colors ${
          isActive('/shop') ? 'text-brand-primary font-semibold' : 'text-brand-muted hover:text-brand-dark'
        }`}
      >
        <Compass className="w-5 h-5 mb-0.5" />
        <span>Explore</span>
      </Link>

      <Link
        to="/wishlist"
        className={`flex flex-col items-center py-1 px-3 rounded-xl text-[11px] font-medium transition-colors relative ${
          isActive('/wishlist') ? 'text-brand-primary font-semibold' : 'text-brand-muted hover:text-brand-dark'
        }`}
      >
        <Heart className="w-5 h-5 mb-0.5" />
        <span>Wishlist</span>
        {wishlistCount > 0 && (
          <span className="absolute top-1 right-2 bg-brand-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
      </Link>

      <button
        onClick={() => setIsCartOpen(true)}
        className="flex flex-col items-center py-1 px-3 rounded-xl text-[11px] font-medium text-brand-muted hover:text-brand-dark relative"
      >
        <ShoppingBag className="w-5 h-5 mb-0.5" />
        <span>Bag</span>
        {totalItemsCount > 0 && (
          <span className="absolute top-1 right-2 bg-brand-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {totalItemsCount}
          </span>
        )}
      </button>

      <Link
        to={user ? (isAdmin ? "/admin/dashboard" : "/account") : "/login"}
        className={`flex flex-col items-center py-1 px-3 rounded-xl text-[11px] font-medium transition-colors ${
          isActive('/account') || isActive('/login') ? 'text-brand-primary font-semibold' : 'text-brand-muted hover:text-brand-dark'
        }`}
      >
        <User className="w-5 h-5 mb-0.5" />
        <span>{user ? 'Profile' : 'Login'}</span>
      </Link>
    </div>
  );
}
