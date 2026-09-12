/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        oxblood: {
          50: '#FBF3F3',
          100: '#F1DADA',
          300: '#C77A7A',
          500: '#8A2E2E',
          600: '#6B1F1F',
          700: '#4A0E0E',
          900: '#2B0606',
        },
        bg: 'var(--bg)',
        'bg-subtle': 'var(--bg-subtle)',
        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
        border: 'var(--border)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
