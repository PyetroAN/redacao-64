/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['"Cinzel"', 'serif'],
        subhead: ['"Old Standard TT"', 'serif'],
        body: ['"Courier Prime"', 'monospace'],
        stamp: ['"Special Elite"', 'cursive'],
      },
      backgroundImage: {
        'paper-texture': "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
        'wood-texture': "url('https://www.transparenttextures.com/patterns/wood-pattern.png')",
      }
    },
  },
  plugins: [],
}