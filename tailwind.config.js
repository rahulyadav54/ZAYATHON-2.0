/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#080811',
          primary: '#080811',
          secondary: '#100D1D',
          card: '#171328',
          glass: 'rgba(23, 19, 40, 0.75)',
        },
        primary: {
          purple: '#9B70FF',
          DEFAULT: '#9B70FF',
          violet: '#743BFF',
          neon: '#35D5FF',
        },
        text: {
          main: '#FFFFFF',
          secondary: '#A5A0B5',
          muted: '#76708F',
        },
        accent: {
          blue: '#35D5FF',
          purple: '#9B70FF',
          violet: '#743BFF',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.12)',
          subtle: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(155, 112, 255, 0.3)',
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(155, 112, 255, 0.5)',
        'glow-blue': '0 0 25px -5px rgba(53, 213, 255, 0.5)',
        'glow-sm': '0 0 15px rgba(155, 112, 255, 0.25)',
        'card-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}
