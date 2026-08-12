import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { ProductDetailsSkeleton } from '../components/SkeletonLoader.jsx';
import api from '../services/api.js';
import { INITIAL_PRODUCTS } from '../data/seedData.js';
import { Star, Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, Ruler, ChevronRight, Share2, Plus, Minus, MessageCircle } from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selected Options
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${slug}`);
        if (data.success && data.product) {
          setProduct(data.product);
          setSelectedImage(data.product.images?.[0] || '');
          setSelectedSize(data.product.sizes?.[0] || 'M');
          setSelectedColor(data.product.colors?.[0]?.name || 'Default');
          setRelatedProducts(data.relatedProducts || []);
        } else {
          fallbackLocalProduct();
        }
      } catch (error) {
        fallbackLocalProduct();
      } finally {
        setLoading(false);
      }
    };

    const fallbackLocalProduct = () => {
      const found = INITIAL_PRODUCTS.find(p => p.slug === slug || p._id === slug) || INITIAL_PRODUCTS[0];
      setProduct(found);
      setSelectedImage(found.images?.[0] || '');
      setSelectedSize(found.sizes?.[0] || 'M');
      setSelectedColor(found.colors?.[0]?.name || 'Default');
      setRelatedProducts(INITIAL_PRODUCTS.filter(p => p.slug !== found.slug).slice(0, 4));
    };

    fetchProduct();
  }, [slug]);

  if (loading || !product) {
    return <ProductDetailsSkeleton />;
  }

  const isLiked = isInWishlist(product._id || product.slug);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    addToast(`Added ${product.name} to your Bag`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-[11px] font-sans font-medium uppercase tracking-wider text-brand-muted">
        <Link to="/" className="hover:text-brand-dark">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/shop" className="hover:text-brand-dark">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-brand-dark">{product.category}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-dark font-semibold line-clamp-1">{product.name}</span>
      </nav>

      {/* OPEN EDITORIAL PRODUCT DISPLAY (NO NESTED CONTAINER) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT: OPEN IMAGE GALLERY */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-20 rounded-card overflow-hidden border transition-all shrink-0 ${
                    selectedImage === img ? 'border-brand-dark scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main Product Image (4:5 Ratio) */}
          <div className="flex-1 aspect-[4/5] bg-brand-bg rounded-card overflow-hidden relative border border-brand-border/60">
            <img
              src={selectedImage || product.images?.[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 bg-brand-burgundy text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>
        </div>

        {/* RIGHT: EDITORIAL PRODUCT INFO */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold text-brand-muted uppercase tracking-[0.25em]">
                {product.collectionName || product.category}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  addToast('Product link copied!', 'info');
                }}
                className="text-brand-muted hover:text-brand-dark p-1"
                title="Share product"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mt-2 leading-tight">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 text-xs font-bold text-brand-dark bg-brand-secondary px-2.5 py-1 rounded border border-brand-border">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs text-brand-muted font-sans">({product.numReviews || 28} Verified Reviews)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pt-2">
            <span className="font-sans text-3xl font-extrabold text-brand-dark">
              ₹{product.price.toLocaleString()}
            </span>
            {product.comparePrice > product.price && (
              <span className="font-sans text-lg text-brand-muted line-through">
                ₹{product.comparePrice.toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-brand-muted font-sans font-light leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2 pt-2">
              <label className="text-xs font-sans font-bold uppercase tracking-wider text-brand-dark block">
                Color: <span className="font-normal text-brand-muted">{selectedColor}</span>
              </label>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-btn text-xs font-medium border transition-all ${
                      selectedColor === c.name
                        ? 'border-brand-dark bg-brand-secondary text-brand-dark font-bold'
                        : 'border-brand-border text-brand-dark hover:border-brand-muted'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-sans font-bold uppercase tracking-wider text-brand-dark">
                  Select Size: <span className="font-normal text-brand-muted">{selectedSize}</span>
                </label>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs font-semibold text-brand-accent hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2 font-mono text-xs">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-3 rounded-btn transition-all border ${
                      selectedSize === s
                        ? 'bg-brand-dark text-white border-brand-dark font-bold'
                        : 'bg-brand-surface text-brand-dark border-brand-border hover:border-brand-muted'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-2">
            <label className="text-xs font-sans font-bold uppercase tracking-wider text-brand-dark">Quantity:</label>
            <div className="flex items-center border border-brand-border rounded bg-brand-surface">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-brand-dark hover:bg-brand-secondary"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-4 text-xs font-bold font-mono">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-brand-dark hover:bg-brand-secondary"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-brand-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="bg-brand-dark hover:bg-brand-hover text-white font-sans text-xs font-bold uppercase tracking-widest py-4 rounded-btn shadow-floating flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-brand-accent" />
                <span>ADD TO BAG</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="bg-brand-surface hover:bg-brand-secondary text-brand-dark font-sans text-xs font-bold uppercase tracking-widest py-4 rounded-btn border border-brand-dark shadow-subtle flex items-center justify-center gap-2 transition-colors"
              >
                <span>BUY IT NOW</span>
              </button>
            </div>

            <button
              onClick={() => toggleWishlist(product)}
              className={`w-full py-3 rounded-btn text-xs font-sans font-bold uppercase tracking-wider border flex items-center justify-center gap-2 transition-all ${
                isLiked
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : 'bg-brand-surface text-brand-dark border-brand-border hover:border-brand-muted'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
              <span>{isLiked ? 'SAVED TO WISHLIST' : 'SAVE TO WISHLIST'}</span>
            </button>
          </div>

          {/* WhatsApp Direct Inquiry Button */}
          <a
            href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi DJ Team! I have a question about ${product.name} (SKU: ${product.sku}). Can you assist with size & fit?`)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 rounded-btn text-xs font-sans font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Size & Fit Guidance on WhatsApp?</span>
          </a>

          {/* Shipping & Authenticity Badges */}
          <div className="pt-4 grid grid-cols-3 gap-2 text-center text-[10px] text-brand-muted font-sans font-semibold">
            <div className="p-3 bg-brand-surface rounded-card border border-brand-border/60">
              <Truck className="w-4 h-4 text-brand-dark mx-auto mb-1" />
              <span>Free Express Shipping</span>
            </div>
            <div className="p-3 bg-brand-surface rounded-card border border-brand-border/60">
              <RotateCcw className="w-4 h-4 text-brand-dark mx-auto mb-1" />
              <span>7-Day Doorstep Returns</span>
            </div>
            <div className="p-3 bg-brand-surface rounded-card border border-brand-border/60">
              <ShieldCheck className="w-4 h-4 text-brand-dark mx-auto mb-1" />
              <span>Tiruppur Quality Tailoring</span>
            </div>
          </div>
        </div>

      </div>

      {/* TABBED DETAILS SECTION BELOW */}
      <div className="border-t border-brand-border pt-12 space-y-8">
        <div className="flex border-b border-brand-border overflow-x-auto no-scrollbar gap-8">
          {[
            { id: 'description', label: 'Product Description' },
            { id: 'fabric', label: 'Fabric & Care' },
            { id: 'sizefit', label: 'Size & Fit' },
            { id: 'shipping', label: 'Shipping & Returns' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-xs font-sans font-bold tracking-widest uppercase transition-all whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'border-brand-dark text-brand-dark'
                  : 'border-transparent text-brand-muted hover:text-brand-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-brand-surface p-8 rounded-card border border-brand-border text-xs text-brand-dark leading-relaxed font-sans font-light">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold">Thoughtfully Designed in Tiruppur</h3>
              <p>{product.description}</p>
              <p>Tailored with precise seam construction, luxury finishing, and designed to endure seasonal wardrobe shifts seamlessly.</p>
            </div>
          )}

          {activeTab === 'fabric' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold">Fabric Composition & Care</h3>
              <p><strong>Composition:</strong> {product.fabric || '100% Premium Eco Linen Cotton Blend'}</p>
              <p><strong>Care Instructions:</strong> {product.careInstructions || 'Hand wash cold or dry clean recommended.'}</p>
            </div>
          )}

          {activeTab === 'sizefit' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold">Fit Details</h3>
              <p><strong>Fit Type:</strong> {product.fit || 'Regular True-to-Size Fit'}</p>
              <p>Model is 5'8" wearing size S. Order true bust and waist size.</p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold">Shipping & Doorstep Pickup Returns</h3>
              <p>Complimentary Express Shipping on all domestic orders over ₹1,999. Deliveries take 3-5 business days.</p>
              <p>7-day hassle-free doorstep pickup return policy.</p>
            </div>
          )}
        </div>
      </div>

      {/* COMPLETE THE LOOK / RECOMMENDED MATCHES */}
      {relatedProducts.length > 0 && (
        <div className="space-y-8 pt-8 border-t border-brand-border">
          <div>
            <span className="text-[10px] font-sans font-bold text-brand-muted uppercase tracking-[0.25em]">CURATED MATCHES</span>
            <h2 className="font-serif text-3xl font-bold text-brand-dark mt-1">Complete The Look</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id || p.slug} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* SIZE GUIDE MODAL */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 bg-brand-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-surface max-w-lg w-full rounded-card shadow-modal border border-brand-border p-6 relative">
            <h3 className="font-serif text-xl font-bold text-brand-dark mb-4">DJ Women's Size Guide (Inches)</h3>
            <table className="w-full text-xs text-left border-collapse border border-brand-border font-sans">
              <thead>
                <tr className="bg-brand-bg font-bold">
                  <th className="p-2 border">Size</th>
                  <th className="p-2 border">Bust</th>
                  <th className="p-2 border">Waist</th>
                  <th className="p-2 border">Hip</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border font-bold">XS</td><td className="p-2 border">32"</td><td className="p-2 border">26"</td><td className="p-2 border">35"</td></tr>
                <tr><td className="p-2 border font-bold">S</td><td className="p-2 border">34"</td><td className="p-2 border">28"</td><td className="p-2 border">37"</td></tr>
                <tr><td className="p-2 border font-bold">M</td><td className="p-2 border">36"</td><td className="p-2 border">30"</td><td className="p-2 border">39"</td></tr>
                <tr><td className="p-2 border font-bold">L</td><td className="p-2 border">38"</td><td className="p-2 border">32"</td><td className="p-2 border">41"</td></tr>
                <tr><td className="p-2 border font-bold">XL</td><td className="p-2 border">40"</td><td className="p-2 border">34"</td><td className="p-2 border">43"</td></tr>
              </tbody>
            </table>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="mt-6 w-full bg-brand-dark text-white text-xs font-bold uppercase py-3 rounded-btn"
            >
              Close Size Chart
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
