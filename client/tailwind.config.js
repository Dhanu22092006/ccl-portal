/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        'ccl-ocean': { DEFAULT: '#0B4F6C', light: '#1a7a9e', dark: '#083a52' },
        'ccl-forest': { DEFAULT: '#2D6A4F', light: '#52a076', dark: '#1e4a37' },
        'ccl-earth': { DEFAULT: '#6B4226', light: '#9c6344', dark: '#4a2d1a' },
        'ccl-sand': { DEFAULT: '#F5A623', light: '#f7c064', dark: '#d4890a' },
        'ccl-coral': { DEFAULT: '#E84855', light: '#f07077', dark: '#c4313d' },
        'ccl-teal': { DEFAULT: '#0E6E8C', light: '#1ea0c8', dark: '#0a5068' },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'count-up': 'countUp 1s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        countUp: { '0%': { opacity: '0', transform: 'scale(0.8)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0B4F6C 0%, #2D6A4F 50%, #6B4226 100%)',
        'ocean-gradient': 'linear-gradient(135deg, #0B4F6C 0%, #0E6E8C 100%)',
        'forest-gradient': 'linear-gradient(135deg, #2D6A4F 0%, #74C69D 100%)',
      },
    },
  },
  plugins: [],
}
