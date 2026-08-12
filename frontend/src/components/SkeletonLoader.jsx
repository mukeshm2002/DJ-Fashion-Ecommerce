import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="bg-brand-surface rounded-card overflow-hidden border border-brand-border/40 p-3 space-y-3 animate-pulse">
      <div className="bg-brand-border/50 aspect-[3/4] rounded-lg w-full" />
      <div className="space-y-2">
        <div className="h-3 bg-brand-border/50 rounded w-1/3" />
        <div className="h-4 bg-brand-border/60 rounded w-4/5" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 bg-brand-border/60 rounded w-1/4" />
          <div className="h-4 bg-brand-border/50 rounded w-1/6" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
      <div className="aspect-[3/4] bg-brand-border/50 rounded-card w-full" />
      <div className="space-y-6">
        <div className="h-4 bg-brand-border/50 rounded w-1/4" />
        <div className="h-8 bg-brand-border/70 rounded w-3/4" />
        <div className="h-6 bg-brand-border/60 rounded w-1/3" />
        <div className="h-20 bg-brand-border/40 rounded w-full" />
        <div className="h-12 bg-brand-border/60 rounded w-full" />
      </div>
    </div>
  );
}
