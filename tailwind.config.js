/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffffffde',
        secondary: '#242424',
      },
    },
  },
  plugins: [],
}
