/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#111111',       // Obsidian Black
          bg: '#F7F3EE',         // Warm Ivory
          surface: '#FFFFFF',    // Pure White
          secondary: '#EFE8DE',  // Soft Cream
          accent: '#C8A878',     // Champagne Accent
          espresso: '#2A211D',   // Deep Espresso
          muted: '#8A8178',      // Muted Taupe
          burgundy: '#6F3038',   // Muted Burgundy (Sparse Accent)
          border: '#E2DAD0',     // Subtle Neutral Border
          primary: '#111111',    // Primary Buttons & Elements (Obsidian)
          hover: '#2A211D',      // Hover State (Espresso)
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      borderRadius: {
        'card': '4px',
        'btn': '2px',
        'modal': '6px',
      },
      boxShadow: {
        'subtle': '0 2px 15px -3px rgba(17, 17, 17, 0.04), 0 1px 6px -2px rgba(17, 17, 17, 0.02)',
        'floating': '0 10px 30px -5px rgba(17, 17, 17, 0.12)',
        'modal': '0 25px 50px -12px rgba(17, 17, 17, 0.25)',
      }
    },
  },
  plugins: [],
}
