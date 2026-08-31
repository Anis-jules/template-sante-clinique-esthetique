/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blanc: '#FFFFFF',
        beige: {
          50: '#FBF9F8',
          100: '#F6F3F0',
          200: '#EDE6E2',
          300: '#E4DEDB',
          400: '#C9A8A8',
          500: '#B06B6B',
          600: 'rgb(var(--hx-beige-600) / <alpha-value>)',
        },
        anthracite: {
          50: '#8A8A8A',
          100: '#6E6E6E',
          200: '#525252',
          300: '#3D3D3D',
          400: '#2B2B2B',
          500: 'rgb(var(--hx-anthracite-500) / <alpha-value>)',
          600: '#131313',
        },
        success: '#5E7E5E',
        warning: '#B89B4E',
        error: '#A85959',
      },
      fontFamily: {
        serif: ['Bellefair', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        heading: ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'subheading': ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.3' }],
      },
      maxWidth: {
        content: '80rem',
        prose: '42rem',
        wide: '64rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
