import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Updated to Jakarta for that clean Gen-Z SaaS vibe
        sans: ['var(--font-jakarta)', 'ui-sans-serif', 'system-ui'],
        montserrat: ['var(--font-montserrat)'],
      },
      letterSpacing: {
        // For that "stacked" aggressive look in the hero
        tightest: '-.06em',
      },
      colors: {
        // Neo-Brutalist Palette
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          orange: "#FF5F1F", // Electric Orange
          mint: "#B4F8C8",   // Soft Mint
          yellow: "#FFD700", // Cyber Yellow
        },
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'float': 'float 5s ease-in-out infinite',
        'wiggle': 'wiggle 0.3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
      boxShadow: {
        // The core of Neo-Brutalism: Hard, black offsets
        'neo': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'neo-xl': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
        'neo-hover': '2px 2px 0px 0px rgba(0, 0, 0, 1)',
      },
    },
  },
  plugins: [],
};

export default config;