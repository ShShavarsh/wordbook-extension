const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  devServer: {
    port: 3010,
    watchContentBase: true
  },
  entry: {
    index: path.resolve('./src/index.js')

  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/
        ],
        resolve: {
          fullySpecified: false
        },
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/content/manifest.json'),
          to: path.resolve('dist')
        },
        // {
        //   from: path.resolve('src/content/index.html'),
        //   to: path.resolve('dist')
        // },
        {
          from: path.resolve('src/content/index.css'),
          to: path.resolve('dist')
        },
        {
          from: path.resolve('src/content/scripts/content-script.js'),
          to: path.resolve('dist')
        },
        {
          from: path.resolve('src/content/scripts/background.js'),
          to: path.resolve('dist')
        },
        {
          from: path.resolve('src/content/styles/loading-spinner.css'),
          to: path.resolve('dist')
        },
        {
          from: path.resolve('src/assets/icons'),
          to: path.resolve('dist')
        }
      ],
      options: {
        concurrency: 100
      }
    }),
    new HtmlPlugin({
      title: 'Wordbook',
      filename: 'popup.html',
      chunks: ['popup']
    })
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js'
  }
}
