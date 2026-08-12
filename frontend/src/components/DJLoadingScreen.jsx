import React from 'react';
import { DJMonogram } from './DJLogo.jsx';

export default function DJLoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-brand-bg flex flex-col items-center justify-center space-y-4">
      <div className="animate-pulse">
        <DJMonogram color="dark" className="w-16 h-16" />
      </div>
      <span className="font-serif text-sm tracking-[0.3em] font-bold text-brand-dark uppercase">
        DJ FASHION
      </span>
      <span className="font-sans text-[10px] text-brand-muted tracking-[0.25em] uppercase">
        TIRUPPUR • TAMIL NADU • INDIA
      </span>
    </div>
  );
}
