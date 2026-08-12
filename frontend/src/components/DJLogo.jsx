import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

/**
 * High-Fashion Interlocking D+J Monogram SVG
 */
export const DJMonogram = ({ color = 'dark', className = 'w-7 h-7' }) => {
  // Color palette selection
  const getColorHex = (mode) => {
    switch (mode) {
      case 'light':
        return { primary: '#F7F3EE', accent: '#C8A878' };
      case 'gold':
        return { primary: '#C8A878', accent: '#F7F3EE' };
      case 'black':
        return { primary: '#000000', accent: '#C8A878' };
      case 'white':
        return { primary: '#FFFFFF', accent: '#C8A878' };
      case 'dark':
      default:
        return { primary: '#111111', accent: '#C8A878' };
    }
  };

  const { primary, accent } = getColorHex(color);

  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DJ Monogram"
    >
      {/* Outer Editorial Circle Accent (Subtle, High-Fashion) */}
      <circle cx="60" cy="60" r="56" stroke={primary} strokeWidth="1.5" strokeOpacity="0.15" />

      {/* Custom Interlocking 'D' Letterform */}
      {/* High-contrast serif vertical stem */}
      <rect x="36" y="26" width="9" height="68" rx="1.5" fill={primary} />
      {/* Top serif cap */}
      <path d="M 30 26 H 51 V 31 H 30 Z" fill={primary} />
      {/* Bottom serif cap */}
      <path d="M 30 89 H 51 V 94 H 30 Z" fill={primary} />
      
      {/* Elegant D Loop Curve */}
      <path
        d="M 45 31 C 74 31 88 42 88 60 C 88 78 74 89 45 89 H 41 V 81 H 45 C 68 81 78 72 78 60 C 78 48 68 39 45 39 Z"
        fill={primary}
      />

      {/* Interlocking Fashion 'J' Letterform */}
      {/* J Top Crossbar */}
      <path d="M 52 42 H 74 V 47 H 52 Z" fill={accent} />
      {/* J Flowing Stem Intersecting D */}
      <path
        d="M 64 43 V 72 C 64 82 57 89 46 89 C 39 89 33 84 31 78 C 30 75 32 72 36 72 C 39 72 41 74 42 76 C 43 78 44 81 47 81 C 52 81 55 77 55 71 V 43 H 64 Z"
        fill={accent}
      />
    </svg>
  );
};

/**
 * Reusable DJ Logo Master Component supporting Wordmark, Monogram, and Stacked variants.
 */
export const DJLogo = ({
  variant = 'wordmark', // 'wordmark' | 'monogram' | 'stacked' | 'compact'
  color = 'dark',       // 'dark' | 'light' | 'gold' | 'black' | 'white'
  showTagline = false,
  showLocation = false,
  isLink = true,
  className = '',
}) => {
  const getTextColor = (mode) => {
    switch (mode) {
      case 'light':
        return 'text-brand-bg';
      case 'gold':
        return 'text-brand-accent';
      case 'white':
        return 'text-white';
      case 'black':
        return 'text-black';
      case 'dark':
      default:
        return 'text-brand-dark';
    }
  };

  const textColorClass = getTextColor(color);

  // 1. STANDALONE MONOGRAM VARIANT
  if (variant === 'monogram' || variant === 'compact') {
    const monogramEl = <DJMonogram color={color} className={`w-8 h-8 ${className}`} />;
    return isLink ? <RouterLink to="/">{monogramEl}</RouterLink> : monogramEl;
  }

  // 2. STACKED BRAND MARK VARIANT (Hero, About, Packaging, Marketing)
  if (variant === 'stacked') {
    const stackedContent = (
      <div className={`flex flex-col items-center text-center space-y-3 ${className}`}>
        <DJMonogram color={color} className="w-16 h-16" />
        
        <div className="flex flex-col items-center">
          <span className={`font-serif text-5xl sm:text-6xl font-bold tracking-[0.25em] uppercase leading-none ${textColorClass}`}>
            DJ
          </span>
          <span className="font-sans text-xs font-extrabold tracking-[0.4em] uppercase text-brand-accent mt-2">
            FASHION
          </span>
        </div>

        {showTagline && (
          <p className="font-serif italic text-sm text-brand-muted tracking-wide max-w-xs">
            "Style That Feels Like You."
          </p>
        )}

        {showLocation && (
          <span className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase text-brand-muted/80 border-t border-brand-border/60 pt-2">
            TIRUPPUR • TAMIL NADU • INDIA
          </span>
        )}
      </div>
    );

    return isLink ? <RouterLink to="/">{stackedContent}</RouterLink> : stackedContent;
  }

  // 3. PRIMARY WORDMARK VARIANT (Default for Navbar, Footer)
  const wordmarkContent = (
    <div className={`inline-flex items-center gap-3 group cursor-pointer ${className}`}>
      <DJMonogram color={color} className="w-8 h-8 transition-transform duration-300 group-hover:scale-105" />
      <div className="flex flex-col">
        <span className={`font-serif text-2xl font-bold tracking-[0.2em] leading-none uppercase ${textColorClass}`}>
          DJ
        </span>
        {showTagline && (
          <span className="font-sans text-[9px] font-medium tracking-[0.25em] uppercase text-brand-muted mt-1">
            Style That Feels Like You.
          </span>
        )}
        {showLocation && (
          <span className="font-sans text-[8px] font-semibold tracking-[0.3em] uppercase text-brand-muted/80 mt-0.5">
            TIRUPPUR • INDIA
          </span>
        )}
      </div>
    </div>
  );

  return isLink ? <RouterLink to="/">{wordmarkContent}</RouterLink> : wordmarkContent;
};

export default DJLogo;
