import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { X, ShoppingBag, Check } from 'lucide-react';

export default function QuickAddModal({ product, onClose }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || 'Default');

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, 1);
    addToast(`Added ${product.name} to Bag`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-brand-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-brand-surface max-w-sm w-full rounded-card shadow-modal border border-brand-border p-6 relative space-y-4">
        
        <div className="flex justify-between items-start border-b border-brand-border pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent">{product.category}</span>
            <h3 className="font-serif text-base font-bold text-brand-dark leading-tight">{product.name}</h3>
          </div>
          <button onClick={onClose} className="p-1 text-brand-muted hover:text-brand-dark">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-4">
          <img src={product.images?.[0]} alt={product.name} className="w-20 h-24 object-cover rounded bg-brand-bg shrink-0" />
          <div className="space-y-1">
            <p className="font-mono text-sm font-extrabold text-brand-dark">₹{product.price.toLocaleString()}</p>
            <p className="text-[11px] text-brand-muted line-clamp-2">{product.fabric || 'Premium Eco Fabric'}</p>
          </div>
        </div>

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block">Select Size:</label>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 py-2 text-xs font-bold font-mono rounded-btn border transition-all ${
                    selectedSize === size
                      ? 'bg-brand-dark text-white border-brand-dark'
                      : 'bg-brand-bg text-brand-dark border-brand-border hover:border-brand-muted'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleAdd}
          className="w-full bg-brand-dark hover:bg-brand-hover text-white font-sans text-xs font-bold uppercase tracking-widest py-3.5 rounded-btn shadow-subtle flex items-center justify-center gap-2 transition-all"
        >
          <ShoppingBag className="w-4 h-4 text-brand-accent" />
          <span>ADD TO BAG</span>
        </button>
      </div>
    </div>
  );
}
