const tailwindcss = require('tailwindcss')
module.exports = {
  plugins: [
    require('postcss-import'),
    tailwindcss('./tailwind.js'),
    require('postcss-nested'),
    process.env.NODE_ENV === 'production' &&
      require('@fullhuman/postcss-purgecss')({
        content: [
          './src/**/*.js',
          './src/**/*.jsx',
          './src/**/*.css',
          './public/index.html',
        ],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      }),
    require('autoprefixer'),
  ],
}
