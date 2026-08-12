import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('dj_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('dj_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.slug === product.slug || item._id === product._id);
      if (exists) {
        return prev.filter((item) => item.slug !== product.slug && item._id !== product._id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productIdOrSlug) => {
    return wishlistItems.some(
      (item) => item._id === productIdOrSlug || item.slug === productIdOrSlug
    );
  };

  const removeFromWishlist = (productIdOrSlug) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item._id !== productIdOrSlug && item.slug !== productIdOrSlug)
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        wishlistCount: wishlistItems.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
