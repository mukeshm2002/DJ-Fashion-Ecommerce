import React, { createContext, useContext, useState, useEffect } from 'react';
import { BRAND_CONFIG } from '../config/brand.config.js';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('dj_cart');
    return saved ? JSON.parse(saved) : [
      {
        id: 'DJ-DRS-001-Wine-M',
        productId: 'seraphina-tiered-midi-dress',
        name: 'Seraphina Tiered Midi Dress',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
        price: 3499,
        comparePrice: 4299,
        size: 'M',
        color: 'Wine Plum',
        colorHex: '#4A1525',
        quantity: 1,
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem('dj_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size = 'M', color = 'Wine Plum', quantity = 1) => {
    const variantId = `${product._id || product.slug}-${color}-${size}`;
    const selectedColor = product.colors?.find(c => c.name === color) || { name: color, hex: '#4A1525' };

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === variantId);
      if (existing) {
        return prev.map((item) =>
          item.id === variantId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: variantId,
          productId: product._id || product.slug,
          slug: product.slug,
          name: product.name,
          image: product.images?.[0] || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
          price: product.price,
          comparePrice: product.comparePrice || 0,
          size: size || product.sizes?.[0] || 'M',
          color: selectedColor.name,
          colorHex: selectedColor.hex,
          quantity,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (variantId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== variantId));
  };

  const updateQuantity = (variantId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(variantId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === variantId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  // Subtotal calculation
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Free shipping threshold logic
  const freeShippingThreshold = BRAND_CONFIG.freeShippingThreshold;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // Coupon discount calculation
  let couponDiscount = 0;
  let isFreeShipping = subtotal >= freeShippingThreshold;

  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'PERCENTAGE') {
      couponDiscount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      if (appliedCoupon.maxDiscountAmount > 0) {
        couponDiscount = Math.min(couponDiscount, appliedCoupon.maxDiscountAmount);
      }
    } else if (appliedCoupon.discountType === 'FIXED') {
      couponDiscount = Math.min(appliedCoupon.discountValue, subtotal);
    } else if (appliedCoupon.discountType === 'FREE_SHIPPING') {
      isFreeShipping = true;
    }
  }

  const shippingFee = isFreeShipping || subtotal === 0 ? 0 : 150;
  const tax = Math.round(subtotal * 0.05);
  const grandTotal = Math.max(0, subtotal - couponDiscount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
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
        totalItemsCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
