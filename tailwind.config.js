/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Purple theme - Black Sabbath inspired
        'primary': '#6B46C1', // Deep purple
        'primary-light': '#9F7AEA', // Light purple
        'primary-dark': '#4C1D95', // Very deep purple
        'accent': '#8B5CF6', // Bright purple accent
        'bg-base': '#0F0A1F', // Very dark purple-black
        'bg-light': '#1A1429', // Dark purple background
        'bg-card': '#231938', // Card background purple
        'text-primary': '#E9D5FF', // Light purple text
        'text-secondary': '#C4B5FD', // Medium purple text
        'text-muted': '#A78BFA', // Muted purple

        // Alternative: Forest Green theme (comment out purple above and uncomment below to switch)
        // 'primary': '#059669', // Emerald green
        // 'primary-light': '#10B981', // Light green
        // 'primary-dark': '#065F46', // Deep forest green
        // 'accent': '#34D399', // Bright green accent
        // 'bg-base': '#064E3B', // Very dark green
        // 'bg-light': '#065F46', // Dark green background
        // 'bg-card': '#047857', // Card background green
        // 'text-primary': '#D1FAE5', // Light green text
        // 'text-secondary': '#A7F3D0', // Medium green text
        // 'text-muted': '#6EE7B7', // Muted green

        'depth': {
          100: '#4C1D95',
          200: '#6B46C1',
          300: '#8B5CF6',
        },
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)',
        'card-md': '0 4px 16px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3)',
        'card-lg': '0 12px 32px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.4)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-purple-hover': '0 0 30px rgba(139, 92, 246, 0.5)',
        'glow-accent': '0 0 25px rgba(167, 139, 250, 0.4)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
