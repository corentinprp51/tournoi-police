/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'Montserrat', 'Arial', 'Helvetica', 'sans-serif']
    },
    extend: {
      colors: {
        default: '#111111',
        'input-bg': '#414141'
      }
    }
  },
  plugins: []
}
