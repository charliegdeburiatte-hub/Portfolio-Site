/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aero-inspired palette
        'aero-base': '#F8FAFB',
        'aero-light': '#EEF2F5',
        'aero-blue': '#4A9EFF',
        'aero-dark': '#2A2F3A',
        'depth': {
          100: '#D4DCE6',
          200: '#A8B5C7',
          300: '#7B8FA3',
        },
      },
      boxShadow: {
        'aero': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.06)',
        'aero-md': '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)',
        'aero-lg': '0 12px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)',
        'glow-blue': '0 0 20px rgba(74, 158, 255, 0.15)',
        'glow-blue-hover': '0 0 30px rgba(74, 158, 255, 0.25)',
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
