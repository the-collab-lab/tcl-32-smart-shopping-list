module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        // 'main-image': "url('./img/placeholder.jpg')",
        'main-image': `url('${
          process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '.'
        }/img/placeholder.jpg')`,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
