import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { ProductGridSkeleton } from '../components/SkeletonLoader.jsx';
import api from '../services/api.js';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../data/seedData.js';
import { SlidersHorizontal, ArrowUpDown, X, Check, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';
  const tagQuery = searchParams.get('tag') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(categoryQuery);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [priceRange, setPriceRange] = useState(6000);
  const [sortBy, setSortBy] = useState('recommended');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryQuery) setSelectedCategory(categoryQuery);
  }, [categoryQuery]);

  useEffect(() => {
    const fetchShopProducts = async () => {
      setLoading(true);
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
    fetchShopProducts();
  }, []);

  // Filter & Sort Logic
  let filteredProducts = products.filter((p) => {
    if (selectedCategory && p.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    if (selectedSize && !p.sizes?.includes(selectedSize)) return false;
    if (selectedColor && !p.colors?.some((c) => c.name.toLowerCase() === selectedColor.toLowerCase())) return false;
    if (p.price > priceRange) return false;
    if (tagQuery && !p.tags?.includes(tagQuery)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description?.toLowerCase().includes(q);
      const matchTag = p.tags?.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchTag) return false;
    }
    return true;
  });

  // Sorting
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    filteredProducts.sort((a, b) => (b.isNewArrival ? 1 : -1));
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedSize('');
    setSelectedColor('');
    setPriceRange(6000);
    setSortBy('recommended');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="border-b border-brand-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-sans font-bold text-brand-muted uppercase tracking-[0.25em]">CATALOGUE DISCOVERY</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-dark mt-1">
            {selectedCategory ? selectedCategory : 'Shop All'}
          </h1>
          <p className="text-xs text-brand-muted font-sans mt-1">
            {filteredProducts.length} items found {searchQuery ? `for "${searchQuery}"` : ''}
          </p>
        </div>

        {/* Mobile Filter Trigger & Desktop Sort */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-brand-surface border border-brand-border px-4 py-2.5 rounded-btn text-xs font-bold uppercase tracking-wider text-brand-dark"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-accent" />
            <span>Filter & Sort</span>
          </button>

          <div className="hidden lg:flex items-center gap-2 text-xs font-sans text-brand-dark">
            <span className="text-brand-muted uppercase font-bold text-[10px] tracking-wider">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-brand-surface border border-brand-border px-3 py-2 rounded-btn font-medium focus:outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="newest">Newest Drops</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Filter Column + Right Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* DESKTOP LEFT FILTER COLUMN */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-4 border-r border-brand-border/60">
          
          <div className="flex justify-between items-center pb-3 border-b border-brand-border">
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-brand-dark">Filter By</span>
            {(selectedCategory || selectedSize || selectedColor || tagQuery || searchQuery) && (
              <button onClick={clearFilters} className="text-[11px] font-semibold text-brand-accent hover:underline">
                Reset All
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-brand-dark">Categories</h4>
            <div className="space-y-2 text-xs font-sans text-brand-muted">
              <button
                onClick={() => setSelectedCategory('')}
                className={`block hover:text-brand-dark transition-colors ${!selectedCategory ? 'font-bold text-brand-dark' : ''}`}
              >
                All Categories
              </button>
              {INITIAL_CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`block hover:text-brand-dark transition-colors ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase() ? 'font-bold text-brand-dark' : ''
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-3 pt-4 border-t border-brand-border/60">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-brand-dark">Size</h4>
            <div className="grid grid-cols-5 gap-2 font-mono text-xs">
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                  className={`py-2 rounded-btn border text-center transition-all ${
                    selectedSize === size
                      ? 'bg-brand-dark text-white border-brand-dark font-bold'
                      : 'bg-brand-surface text-brand-dark border-brand-border hover:border-brand-muted'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3 pt-4 border-t border-brand-border/60">
            <div className="flex justify-between text-xs font-sans font-bold">
              <span>Max Price</span>
              <span className="font-mono text-brand-dark">₹{priceRange.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="6000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-brand-dark"
            />
          </div>

        </aside>

        {/* RIGHT: LUXURY PRODUCT CATALOGUE GRID */}
        <main className="lg:col-span-9">
          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : filteredProducts.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <p className="font-serif text-2xl font-bold text-brand-dark">No Products Found</p>
              <p className="text-xs text-brand-muted">Try adjusting your filters or search term to discover available pieces.</p>
              <button
                onClick={clearFilters}
                className="bg-brand-dark text-white font-sans text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-btn shadow-subtle"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id || product.slug} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>

      {/* MOBILE BOTTOM SHEET FILTER DRAWER */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-dark/70 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileFilterOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute bottom-0 inset-x-0 bg-brand-surface rounded-t-modal p-6 max-h-[85vh] overflow-y-auto space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center border-b border-brand-border pb-4">
                <h3 className="font-serif text-lg font-bold text-brand-dark">Filter & Sort</h3>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sort By Mobile */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-brand-dark">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full text-xs p-3 bg-brand-bg rounded-btn border border-brand-border font-medium"
                >
                  <option value="recommended">Recommended</option>
                  <option value="newest">Newest Drops</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* Category Filter Mobile */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-brand-dark">Category</label>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`px-3 py-2 rounded-btn border ${!selectedCategory ? 'bg-brand-dark text-white font-bold' : 'bg-brand-bg text-brand-dark'}`}
                  >
                    All
                  </button>
                  {INITIAL_CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`px-3 py-2 rounded-btn border ${selectedCategory.toLowerCase() === cat.name.toLowerCase() ? 'bg-brand-dark text-white font-bold' : 'bg-brand-bg text-brand-dark'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-brand-dark text-white font-sans text-xs font-bold uppercase tracking-widest py-4 rounded-btn"
              >
                Apply Filters ({filteredProducts.length} Items)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
