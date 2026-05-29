/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDF8EC',
          100: '#FAF0D0',
          200: '#F4DFA0',
          300: '#EEC96B',
          400: '#E8B43B',
          500: '#C9A84C',
          600: '#A8893A',
          700: '#856B2C',
          800: '#624E1F',
          900: '#3F3112',
        },
        cream: {
          50: '#FFFDF9',
          100: '#FAF6F0',
          200: '#F5EDE0',
          300: '#EDD9C4',
          400: '#E0C4A4',
          500: '#D1AA82',
        },
        blush: {
          50: '#FEF7F4',
          100: '#FCEEE8',
          200: '#F9D9CF',
          300: '#F5D6C8',
          400: '#EDB8A4',
          500: '#E39A7F',
        },
        dark: {
          900: '#0A0A0A',
          800: '#141414',
          700: '#1E1E1E',
          600: '#2A2A2A',
          500: '#3A3A3A',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        lato: ['Lato', 'system-ui', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'bounce-subtle': 'bounceSlight 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        bounceSlight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
};
