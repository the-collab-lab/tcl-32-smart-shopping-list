const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Roboto'", ...defaultTheme.fontFamily.sans],
        serif: ["'Roboto Slab'", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        'maroon-flush': '#CB1E51',
        'ronchi-yellow': '#E6D041',
        'red-damask': '#E17B37',
        'strong-lime-green': '#07C804',
      },
      backgroundImage: {
        'main-image': "url('/src/img/placeholder.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
