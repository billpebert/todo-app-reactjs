/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./public/**/*.html",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    fontFamily: {
      poppins: "Poppins, sans-serif",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "50px",
        xl: "220px",
      },
      screens: {
        'sm': '576px',
        'md': '767px',
        'lg': '1024px',
        'xl': '1440px'
      },
    },
    extend: {
      colors: {
        skyBlue: '#16ABF8',
        dark: '#111111',
        grey: '#888888',
        secondary: '#F4F4F4',
        darkBrown: '#4A4A4A',
        danger: '#ED4C5C',
        success: '#00A790',
        warning: '#FFCE31',
        cyan: '#43C4E3',
        magenta: '#B01AFF'
      }
    },
  },
  plugins: [
    require("tw-elements/dist/plugin")
  ],
}