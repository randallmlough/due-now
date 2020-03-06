const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#66d49d',
          200: '#4dcd8c',
          300: '#33c67c',
          400: '#1abf6b',
          500: '#00b85b',
          600: '#00a652',
          700: '#009349',
          800: '#008140',
          900: '#006e37',
          light: '#4dcd8c',
          default: '#00b85b',
          dark: '#009349',
        },
        secondary: { ...colors.blue, default: colors.blue[500] },
        success: {
          ...colors.green,
          light: colors.green[300],
          default: colors.green[500],
          dark: colors.green[700],
        },
        danger: {
          ...colors.red,
          light: colors.red[300],
          default: colors.red[500],
          dark: colors.red[700],
        },
        info: {
          ...colors.blue,
          light: colors.blue[300],
          default: colors.blue[500],
          dark: colors.blue[700],
        },
        dark: {
          100: '#828283',
          200: '#6d6d6f',
          300: '#59595a',
          400: '#444446',
          500: '#2f2f31',
          600: '#2a2a2c',
          700: '#262627',
          800: '#212122',
          900: '#1c1c1d',
        },
      },
    },
  },
  plugins: [
    function({ addBase, config }) {
      addBase({
        h1: { fontSize: config('theme.fontSize.3xl') },
        h2: { fontSize: config('theme.fontSize.2xl') },
        h3: { fontSize: config('theme.fontSize.xl') },
        h4: { fontSize: config('theme.fontSize.lg') },
      })
    },
  ],
}
