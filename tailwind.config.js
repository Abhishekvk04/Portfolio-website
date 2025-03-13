/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme
        dark: {
          bg: '#121212',
          surface: '#1e1e1e',
          surfaceElevated: '#282828',
          textPrimary: '#e0e0e0',
          textSecondary: '#b0b0b0',
          border: '#444444',
        },
        // Light theme
        light: {
          bg: '#f5f5f5',
          surface: '#ffffff',
          surfaceElevated: '#f0f0f0',
          textPrimary: '#121212',
          textSecondary: '#555555',
          border: '#dddddd',
        },
        // Accent colors
        accent: {
          primary: '#66fcf1',
          secondary: '#4fa3e3',
        }
      },
      fontFamily: {
        code: ['"Fira Code"', 'monospace'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.25)',
        'card-hover': '0 8px 25px rgba(0, 0, 0, 0.3)',
        'card-light': '0 4px 15px rgba(0, 0, 0, 0.1)',
        'card-light-hover': '0 8px 20px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
