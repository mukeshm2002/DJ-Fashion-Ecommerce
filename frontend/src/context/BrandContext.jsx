import React, { createContext, useContext, useState } from 'react';
import { BRAND_CONFIG } from '../config/brand.config.js';

const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
  const [brand, setBrand] = useState(BRAND_CONFIG);

  const updateBrand = (newConfig) => {
    setBrand((prev) => ({ ...prev, ...newConfig }));
  };

  return (
    <BrandContext.Provider value={{ brand, updateBrand }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => useContext(BrandContext);
