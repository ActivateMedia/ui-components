/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/**/*.{ts,tsx}',
    './src/**/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: {
          100: 'rgba(83, 121, 255, 0.10)',
          200: 'rgba(83, 121, 255, 0.20)',
          300: 'rgba(83, 121, 255, 0.30)',
          400: 'rgba(83, 121, 255, 0.40)',
          500: 'rgba(83, 121, 255, 0.50)',
          600: 'rgba(83, 121, 255, 0.60)',
          700: 'rgba(83, 121, 255, 0.70)',
          800: 'rgba(83, 121, 255, 0.80)',
          90: 'rgba(83, 121, 255, 0.90)',
          900: '#5379FF'
        },
        secondary: {
          100: 'rgba(254, 134, 61, 0.1)',
          200: 'rgba(254, 134, 61, 0.2)',
          300: 'rgba(254, 134, 61, 0.3)',
          400: 'rgba(254, 134, 61, 0.4)',
          500: 'rgba(254, 134, 61, 0.5)',
          600: 'rgba(254, 134, 61, 0.6)',
          700: 'rgba(254, 134, 61, 0.7)',
          800: 'rgba(254, 134, 61, 0.8)',
          900: '#FE863D'
        },
        light: {
          100: '#FFFFFF',
          200: '#F5F4F4', // off white
          300: '#FAFAFA'
        },
        //greyscale
        dark: {
          100: 'rgba(12, 15, 19, 0.1)',
          200: 'rgba(12, 15, 19, 0.2)',
          300: 'rgba(12, 15, 19, 0.3)',
          400: 'rgba(12, 15, 19, 0.4)',
          500: 'rgba(12, 15, 19, 0.5)',
          600: 'rgba(12, 15, 19, 0.6)',
          700: 'rgba(12, 15, 19, 0.7)',
          800: 'rgba(12, 15, 19, 0.8)',
          900: '#0C0F13'
        },
        agent: {
          red: '#FF4D4D',
          green: 'rgba(138, 221, 99, 0.9)',
          yellow: '#F3E66D'
        }
      },
      boxShadow: {
        100: '0px 2px 4px rgba(87, 72, 74, 0.1)',
        200: '0px 4px 16px rgba(87, 72, 74, 0.1)',
        300: '0px 10px 24px rgba(87, 72, 74, 0.1)'
      }
    }
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries')
  ]
};
