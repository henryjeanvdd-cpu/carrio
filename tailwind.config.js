/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        carrio: {
          blue: '#3B82F6',
          green: '#10B981',
          indigo: '#6366F1',
          midnight: '#0B0F1A',
          deep: '#141B2D',
          surface: '#1C2438',
          slate: '#2A3550',
          muted: '#6B7A99',
          silver: '#94A3C0',
          text: '#D4DCE8',
        }
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
};
