/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      transitionTimingFunction: {
        'geo-out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'geo-in': 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
      }
    }
  },
  plugins: [],
}
