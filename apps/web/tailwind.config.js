/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        dark: {
          DEFAULT: '#1f1928',
          50: '#2a2235',
          100: '#352b42',
          200: '#40344f',
          300: '#4b3d5c',
          400: '#564669',
          500: '#1f1928',
          600: '#1a1521',
          700: '#15111a',
          800: '#100d13',
          900: '#0b090c',
        },
      },
    },
  },
  plugins: [],
}

