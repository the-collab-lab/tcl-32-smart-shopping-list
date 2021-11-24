module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'main-image': "url('/src/img/placeholder.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
