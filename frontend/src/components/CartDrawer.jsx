import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    freeShippingProgress,
    appliedCoupon,
    setAppliedCoupon,
    couponDiscount,
    shippingFee,
    tax,
    grandTotal,
  } = useCart();

  const { addToast } = useToast();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();

    if (!code) return;

    if (code === 'WELCOME10') {
      const discount = Math.round((subtotal * 10) / 100);
      setAppliedCoupon({ code: 'WELCOME10', discountType: 'PERCENTAGE', discountValue: 10, discountAmount: discount });
      addToast('Coupon WELCOME10 applied! (10% OFF)', 'success');
      setCouponInput('');
    } else if (code === 'DJSTYLE500') {
      if (subtotal < 2999) {
        setCouponError('Minimum order of ₹2,999 required for DJSTYLE500');
      } else {
        setAppliedCoupon({ code: 'DJSTYLE500', discountType: 'FIXED', discountValue: 500, discountAmount: 500 });
        addToast('Coupon DJSTYLE500 applied! (₹500 OFF)', 'success');
        setCouponInput('');
      }
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-brand-dark/70 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="w-screen max-w-md bg-brand-bg shadow-2xl flex flex-col justify-between"
          >
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-brand-border bg-brand-surface flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-dark" />
                <h2 className="font-serif text-xl font-bold text-brand-dark">Your Shopping Bag</h2>
                <span className="font-mono text-xs bg-brand-secondary px-2 py-0.5 rounded font-bold text-brand-dark">
                  {cartItems.reduce((a, b) => a + b.quantity, 0)}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 text-brand-muted hover:text-brand-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-6 py-3 bg-brand-secondary/60 border-b border-brand-border text-xs font-sans">
              {amountNeededForFreeShipping > 0 ? (
                <p className="text-brand-dark font-medium">
                  Add <strong className="text-brand-dark font-bold">₹{amountNeededForFreeShipping.toLocaleString()}</strong> more to qualify for <strong className="text-brand-accent uppercase">FREE EXPRESS SHIPPING</strong>
                </p>
              ) : (
                <p className="text-emerald-800 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>YOU QUALIFY FOR FREE EXPRESS SHIPPING!</span>
                </p>
              )}
              <div className="w-full h-1.5 bg-brand-border rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-brand-dark transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="py-20 text-center space-y-4 text-brand-muted">
                  <ShoppingBag className="w-12 h-12 mx-auto text-brand-muted/50" />
                  <p className="font-serif text-lg font-bold text-brand-dark">Your bag is empty</p>
                  <p className="text-xs">Explore our curated collection to find your everyday style.</p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/shop');
                    }}
                    className="inline-block bg-brand-dark text-white font-sans text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-btn shadow-subtle"
                  >
                    Explore Shop
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-brand-surface rounded-card border border-brand-border/60">
                    <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded bg-brand-bg shrink-0" />
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-xs font-bold text-brand-dark line-clamp-1">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-brand-muted hover:text-rose-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-brand-muted mt-0.5">Size: {item.size} • Color: {item.color}</p>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center border border-brand-border rounded bg-brand-bg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-brand-dark hover:bg-brand-secondary"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-brand-dark hover:bg-brand-secondary"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-xs font-bold text-brand-dark">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer & Checkout Action */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-brand-surface border-t border-brand-border space-y-4">
                
                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-brand-muted absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Promo Code (WELCOME10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2 bg-brand-bg rounded-btn border border-brand-border focus:outline-none uppercase font-mono"
                    />
                  </div>
                  <button type="submit" className="bg-brand-secondary text-brand-dark font-bold text-xs px-3 py-2 rounded-btn uppercase hover:bg-brand-accent transition-colors">
                    Apply
                  </button>
                </form>

                {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}

                {/* Subtotal Summary */}
                <div className="space-y-1.5 text-xs text-brand-dark pt-2 border-t border-brand-border">
                  <div className="flex justify-between text-brand-muted">
                    <span>Subtotal</span>
                    <span className="font-mono font-semibold text-brand-dark">₹{subtotal.toLocaleString()}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-800 font-bold">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span className="font-mono">-₹{couponDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-brand-muted">
                    <span>Shipping</span>
                    <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-brand-dark pt-2 border-t border-brand-border">
                    <span>Grand Total</span>
                    <span className="font-mono text-base font-extrabold text-brand-dark">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full bg-brand-dark hover:bg-brand-hover text-white font-sans text-xs font-bold uppercase tracking-widest py-4 rounded-btn shadow-floating flex items-center justify-center gap-2 transition-all"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4 text-brand-accent" />
                </button>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
