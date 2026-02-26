/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        surface: '#0b1120',
        glass: 'rgba(255, 255, 255, 0.08)',
        neonA: '#6d28d9',
        neonB: '#06b6d4',
        neonC: '#ec4899'
      },
      boxShadow: {
        neon: '0 0 20px rgba(99,102,241,0.4), 0 0 40px rgba(6,182,212,0.25)'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 0.7, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.02)' }
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        progressSweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(400%)' }
        }
      },
      animation: {
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        gradientShift: 'gradientShift 10s ease infinite',
        progressSweep: 'progressSweep 1.5s linear infinite'
      }
    }
  },
  plugins: []
};
