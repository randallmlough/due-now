const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.blue,
          light: colors.blue[300],
          default: colors.blue[500],
          dark: colors.blue[700],
        },
        secondary: { ...colors.purple, default: colors.purple[500] },
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
        gray: {
          ...colors.gray,
          light: colors.gray[300],
          default: colors.gray[500],
          dark: colors.gray[700],
        },
        neutral: colors.gray,
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
