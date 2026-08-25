/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Product Sans"', 'sans-serif'],
      },
      colors: {
        gray: {
          850: '#1f2937',
          900: '#111827',
          950: '#030712',
        }
      }
    },
  },
  plugins: [],
}
