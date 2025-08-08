/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'moroccan-gold': '#D4A574',
        'moroccan-red': '#C2472B',
        'moroccan-cream': '#FFF8F0',
        'moroccan-dark': '#8B4513',
      },
    },
  },
  plugins: [],
}