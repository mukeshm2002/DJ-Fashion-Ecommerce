import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useBrand } from '../context/BrandContext.jsx';
import { DJLogo, DJMonogram } from './DJLogo.jsx';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { user, isAdmin } = useAuth();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { brand } = useBrand();
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { label: 'Shop All', path: '/shop' },
    { label: 'New Arrivals', path: '/new-arrivals' },
    { label: 'Collections', path: '/collections' },
    { label: 'Journal', path: '/about' },
  ];

  return (
    <>
      {/* Top Editorial Announcement Banner */}
      <div className="bg-brand-dark text-brand-bg text-[11px] font-sans font-medium uppercase tracking-[0.2em] py-2 px-4 text-center border-b border-white/10 flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-brand-accent animate-pulse" />
        <span>COMPLIMENTARY EXPRESS SHIPPING ON ORDERS OVER ₹1,999 • TIRUPPUR, INDIA</span>
      </div>

      {/* Main Luxury Header Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-bg/90 backdrop-blur-md shadow-subtle border-b border-brand-border/60'
            : 'bg-brand-bg border-b border-brand-border/40'
        }`}
        style={{ height: '76px' }}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Hamburger + Monogram (Visible on Mobile) */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 text-brand-dark hover:text-brand-accent transition-colors"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-brand-dark hover:text-brand-accent transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* LEFT: Logo Variant Switcher (Desktop: Primary Wordmark, Mobile: Monogram) */}
          <div className="flex items-center">
            {/* Desktop Logo */}
            <div className="hidden sm:block">
              <DJLogo variant="wordmark" color="dark" />
            </div>
            {/* Mobile Logo */}
            <div className="sm:hidden">
              <DJLogo variant="monogram" color="dark" />
            </div>
          </div>

          {/* CENTER: Editorial Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-9 text-xs font-sans uppercase font-medium tracking-[0.18em]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-1 transition-colors hover:text-brand-dark ${
                    isActive ? 'text-brand-dark font-semibold' : 'text-brand-muted'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-dark"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Action Icons (Search, Account, Wishlist, Bag) */}
          <div className="flex items-center gap-3 sm:gap-6 text-brand-dark">
            
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 text-xs font-medium text-brand-muted hover:text-brand-dark transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="uppercase tracking-wider">Search</span>
            </button>

            {/* Account Icon / Admin Portal Link */}
            <Link
              to={user ? (isAdmin ? '/admin/dashboard' : '/account') : '/login'}
              className="p-1.5 text-brand-muted hover:text-brand-dark transition-colors"
              title={user ? user.name : 'Sign In'}
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative p-1.5 text-brand-muted hover:text-brand-dark transition-colors"
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-dark text-white font-mono text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-brand-dark text-white hover:bg-brand-hover text-xs font-sans font-medium uppercase tracking-wider px-3.5 py-2.5 rounded-btn flex items-center gap-2 transition-colors shadow-subtle"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-brand-accent" />
              <span className="hidden sm:inline">Bag</span>
              <span className="font-mono font-bold text-[10px] bg-brand-accent text-brand-dark px-1.5 py-0.2 rounded">
                {totalItemsCount}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-dark/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="bg-brand-surface w-full max-w-2xl rounded-card shadow-modal overflow-hidden border border-brand-border p-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                <span className="text-xs font-semibold tracking-widest text-brand-muted uppercase">Search DJ Catalogue</span>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 text-brand-muted hover:text-brand-dark"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="mt-4 flex gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-brand-muted absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dresses, co-ords, linen shirts, silk..."
                    autoFocus
                    className="w-full text-xs pl-10 pr-4 py-3 bg-brand-bg rounded-btn border border-brand-border focus:outline-none focus:border-brand-dark font-sans"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-brand-dark hover:bg-brand-hover text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-btn"
                >
                  Search
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER NAVIGATION */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-dark/70 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="bg-brand-bg w-4/5 max-w-sm h-full shadow-2xl p-6 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-brand-border pb-4">
                  <DJLogo variant="wordmark" color="dark" />
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-brand-muted hover:text-brand-dark">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-4 font-serif text-lg font-bold text-brand-dark">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="flex items-center justify-between py-2 border-b border-brand-border/40 hover:text-brand-accent transition-colors"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-brand-muted" />
                    </Link>
                  ))}
                  <Link
                    to="/about"
                    className="flex items-center justify-between py-2 border-b border-brand-border/40 hover:text-brand-accent transition-colors"
                  >
                    <span>About DJ</span>
                    <ChevronRight className="w-4 h-4 text-brand-muted" />
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center justify-between py-2 border-b border-brand-border/40 hover:text-brand-accent transition-colors"
                  >
                    <span>Contact Us</span>
                    <ChevronRight className="w-4 h-4 text-brand-muted" />
                  </Link>
                </nav>
              </div>

              <div className="pt-6 border-t border-brand-border space-y-3 text-xs text-brand-muted font-sans">
                <p className="font-bold text-brand-dark uppercase tracking-wider">TIRUPPUR • TAMIL NADU • INDIA</p>
                <p>care@djfashion.com</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
