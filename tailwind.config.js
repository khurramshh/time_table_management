/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'amber-100-50': 'rgba(255, 239, 153, 0.5)', // Amber color with 50% opacity
        'amber-100-30': 'rgba(255, 239, 153, 0.3)'  // Amber color with 30% opacity
      }
    },
  },
  plugins: [],
}