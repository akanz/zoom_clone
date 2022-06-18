/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brownish': '#202124',
        'grayish': '#3c4043'
      },
      height: {
        '1/15': '15%',
        '1/10': '10%',
        '8/15': '85%',
        '9/10': '90%',
      }
    },
  },
  plugins: [],
}
