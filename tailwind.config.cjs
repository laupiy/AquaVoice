module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    './pages/**/*.{js,jsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        abyss: {
          950: '#071B2B',
          900: '#0B2A42',
          800: '#113A5C',
          700: '#184C75',
        },
        current: {
          600: '#0D9488',
          500: '#14B8A6',
          400: '#2DD4BF',
        },
        flow: {
          600: '#0369A1',
          500: '#0EA5E9',
          400: '#38BDF8',
        },
        mist: {
          50: '#F5F9FA',
          100: '#EAF2F4',
          200: '#DCE8EC',
        },
        'slate-ink': '#26333D',
        safe: '#14B8A6',
        caution: '#F59E0B',
        critical: '#E11D48',
      },
      fontFamily: {
        display: ['Manrope', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
