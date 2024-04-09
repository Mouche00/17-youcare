/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'primary' : '#2C1320',
        'secondary' : '#5F4B66',
        'third' : '#A7ADC6',
        'pink' : '#77176e',
        'secPink' : '#c83fa9',
        'background' : '#FEF2F4',
        'gray' : '#A9A9A9',
        'green' : '#74E291',
        'red' : '#FF204E',
        'secGreen' : '#57cc99',
        secRed : "#bf0603"
      }
    },
  },
  plugins: [],
}