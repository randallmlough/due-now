const tailwindcss = require('tailwindcss')

whitelistRegex = /^(?!sm|md|lg|xl).+(primary|secondary|neutral|success|danger|gray).+/

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.css',
    './src/**/*.html',
    './public/index.html',
  ],
  whitelistPatterns: [whitelistRegex],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
})

module.exports = {
  plugins: [
    require('postcss-import'),
    tailwindcss('./tailwind.js'),
    require('postcss-nested'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
}
