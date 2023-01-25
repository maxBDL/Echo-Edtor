/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'light_green': '#557576',
      'dark': '#102127',
      'light_dark': '#182B31'
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}