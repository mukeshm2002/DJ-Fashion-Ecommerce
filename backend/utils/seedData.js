export const INITIAL_CATEGORIES = [
  {
    name: "Dresses",
    slug: "dresses",
    description: "Flowing silhouettes, midi cuts, and statement mini dresses designed for timeless elegance.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    name: "Co-ords",
    slug: "co-ords",
    description: "Effortlessly matched top and bottom sets for seamless, modern style.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    name: "Tops",
    slug: "tops",
    description: "Structured blouses, linen shirts, and minimalist knits tailored for daily confidence.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    name: "Bottoms",
    slug: "bottoms",
    description: "High-waisted trousers, pleated skirts, and wide-leg linen pants.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Handcrafted leather bags, gold accent jewelry, and silk scarves.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    featured: true,
  },
];

export const INITIAL_PRODUCTS = [
  {
    name: "Seraphina Tiered Midi Dress",
    slug: "seraphina-tiered-midi-dress",
    sku: "DJ-DRS-001",
    category: "Dresses",
    collectionName: "Summer Solstice",
    description: "Crafted from breathable organic linen blend, the Seraphina dress features a graceful square neckline, elasticated flutter sleeves, and a tiered flared hemline that sways with every step.",
    fabric: "70% Organic Linen, 30% Cotton",
    fit: "Relaxed Fit with Smocked Waist",
    careInstructions: "Hand wash cold or gentle machine wash. Line dry in shade.",
    price: 3499,
    comparePrice: 4299,
    stock: 18,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Wine Plum", hex: "#4A1525", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop" },
      { name: "Warm Olive", hex: "#556B2F", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop" }
    ],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop"
    ],
    tags: ["Midi", "Linen", "Summer", "Bestseller"],
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    rating: 4.9,
    numReviews: 38
  },
  {
    name: "Aurelia Satin Wrap Dress",
    slug: "aurelia-satin-wrap-dress",
    sku: "DJ-DRS-002",
    category: "Dresses",
    collectionName: "Evening Reverie",
    description: "Luxurious heavyweight silk-satin wrapping gracefully around the silhouette. Features a subtle V-neckline, self-tie waist belt, and elegant bishop sleeves.",
    fabric: "100% Eco-Silk Satin",
    fit: "Adjustable Wrap Fit",
    careInstructions: "Dry clean recommended.",
    price: 4899,
    comparePrice: 5999,
    stock: 12,
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Emerald Green", hex: "#0F5257", image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop" },
      { name: "Champagne Gold", hex: "#D4A373", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop" }
    ],
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop"
    ],
    tags: ["Satin", "Wrap Dress", "Partywear", "Evening"],
    isNewArrival: false,
    isBestSeller: true,
    isTrending: true,
    rating: 4.8,
    numReviews: 24
  },
  {
    name: "Verona Linen Crop & Wide Pants Co-ord",
    slug: "verona-linen-crop-wide-pants-coord",
    sku: "DJ-CRD-001",
    category: "Co-ords",
    collectionName: "Summer Solstice",
    description: "Two-piece ensemble featuring a cropped button-front linen top and high-waisted wide-leg trousers with elasticated back waist band.",
    fabric: "100% Organic Linen",
    fit: "Top: Tailored Crop, Pants: Wide Leg",
    careInstructions: "Hand wash cold. Flat dry.",
    price: 4999,
    comparePrice: 5999,
    stock: 14,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Sage Green", hex: "#8A9A86", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" },
      { name: "Warm Cream", hex: "#F5EFE6", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop" }
    ],
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop"
    ],
    tags: ["Co-ord", "Linen", "Set", "Bestseller"],
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    rating: 4.9,
    numReviews: 52
  },
  {
    name: "Camilla Corset Poplin Shirt",
    slug: "camilla-corset-poplin-shirt",
    sku: "DJ-TOP-001",
    category: "Tops",
    collectionName: "Workwear & Beyond",
    description: "Crisp organic cotton poplin shirt featuring integrated boning waist details that sculpt a flattering waistline.",
    fabric: "100% Organic Cotton Poplin",
    fit: "Structured Slim Fit",
    careInstructions: "Iron on high heat.",
    price: 2799,
    comparePrice: 3499,
    stock: 16,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Pure White", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=1000&auto=format&fit=crop" }
    ],
    images: [
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=1000&auto=format&fit=crop"
    ],
    tags: ["Shirt", "Corset", "Cotton", "Workwear"],
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    rating: 4.8,
    numReviews: 29
  },
  {
    name: "Helena Pleated Wide Leg Trousers",
    slug: "helena-pleated-wide-leg-trousers",
    sku: "DJ-BTM-001",
    category: "Bottoms",
    collectionName: "Workwear & Beyond",
    description: "Architectural wide-leg tailored trousers with double front pleats, slant side pockets, and high-waist belt loops.",
    fabric: "65% Viscose, 30% Polyester, 5% Elastane",
    fit: "High-Waist Tailored Wide Leg",
    careInstructions: "Machine wash cold with mild detergent.",
    price: 3699,
    comparePrice: 4499,
    stock: 17,
    sizes: ["26", "28", "30", "32", "34"],
    colors: [
      { name: "Midnight Black", hex: "#1A1A1A", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop" }
    ],
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop"
    ],
    tags: ["Trousers", "Pleated", "Wide Leg", "Workwear"],
    isNewArrival: false,
    isBestSeller: true,
    isTrending: true,
    rating: 4.9,
    numReviews: 64
  },
  {
    name: "Monaco Sculpted Leather Shoulder Bag",
    slug: "monaco-sculpted-leather-shoulder-bag",
    sku: "DJ-ACC-001",
    category: "Accessories",
    collectionName: "Statement Edit",
    description: "Curved moon-shaped handcrafted genuine leather handbag with gold finish turn-lock closure.",
    fabric: "100% Full-grain Nappa Leather",
    fit: "One Size",
    careInstructions: "Wipe clean with soft damp leather cloth.",
    price: 4999,
    comparePrice: 6299,
    stock: 8,
    sizes: ["One Size"],
    colors: [
      { name: "Rich Wine", hex: "#4A1525", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop" }
    ],
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop"
    ],
    tags: ["Bag", "Leather", "Handbag", "Luxury"],
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    rating: 5.0,
    numReviews: 41
  }
];

export const INITIAL_COUPONS = [
  {
    code: "WELCOME10",
    discountType: "PERCENTAGE",
    discountValue: 10,
    minOrderAmount: 999,
    maxDiscountAmount: 500,
    isActive: true
  },
  {
    code: "DJSTYLE500",
    discountType: "FIXED",
    discountValue: 500,
    minOrderAmount: 2999,
    isActive: true
  }
];

export const INITIAL_CAMPAIGNS = [
  {
    name: "Summer D2C Launch Campaign",
    slug: "summer-d2c-launch",
    type: "Sales",
    headline: "Style That Feels Like You — Summer Collection",
    subheadline: "Elevate your daily wardrobe with curated linen, satin wrap dresses & minimalist co-ords.",
    ctaText: "EXPLORE COLLECTION",
    discountCode: "WELCOME10",
    budget: 25000,
    spent: 12400,
    status: "Active",
    impressions: 48900,
    clicks: 3420,
    conversions: 240,
    revenue: 489000
  }
];
