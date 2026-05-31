/** @type {import('tailwindcss').Config} */
const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  18: '72px',
  20: '80px',
  24: '96px',
  32: '128px'
};

module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}', './design-system/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '360px',
      mobile: '390px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      laptop: '1280px',
      xl: '1440px',
      desktop: '1440px'
    },
    spacing,
    extend: {
      maxWidth: { page: '1440px', content: '1200px' },
      colors: {
        navy: '#0B1B2B', ivory: '#F8F5EF', gold: '#C8A96A', 'gold-dark': '#9D7A3D', pearl: '#F8F5EF', ink: '#0B1B2B', champagne: '#EFE5D1', smoke: '#A3A3A3'
      },
      fontFamily: { serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'], sans: ['Manrope', 'Inter', 'Aptos', 'sans-serif'] },
      fontSize: {
        'display-80': ['80px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-64': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-48': ['48px', { lineHeight: '1.15', letterSpacing: '-0.018em' }],
        'heading-40': ['40px', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'heading-32': ['32px', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'heading-24': ['24px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'body-18': ['18px', { lineHeight: '1.7' }],
        'body-16': ['16px', { lineHeight: '1.7' }],
        'body-14': ['14px', { lineHeight: '1.7' }]
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        full: '9999px',
        button: '12px',
        card: '16px',
        panel: '20px'
      },
      boxShadow: {
        lift: '0 18px 44px rgba(11, 27, 43, 0.12)',
        soft: '0 12px 32px rgba(11, 27, 43, 0.08)',
        glow: '0 0 32px rgba(200, 169, 106, 0.32)',
        card: '0 8px 24px rgba(11, 27, 43, 0.08)',
        elevated: '0 24px 56px rgba(11, 27, 43, 0.14)',
        floating: '0 32px 72px rgba(11, 27, 43, 0.20)'
      },
      backgroundImage: { grain: 'radial-gradient(circle at 18% 10%, rgba(200,169,106,.14), transparent 26%), linear-gradient(135deg, #F8F5EF 0%, #EFE5D1 100%)', navyfade: 'linear-gradient(180deg, rgba(11,27,43,0.08) 0%, rgba(11,27,43,0.88) 100%)' },
      transitionTimingFunction: { luxe: 'cubic-bezier(0.22, 1, 0.36, 1)', premium: 'cubic-bezier(0.16, 1, 0.3, 1)' }
    }
  },
  plugins: []
};
