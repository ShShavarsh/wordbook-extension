const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    popup: path.resolve('./src/popup.js'),
    background: path.resolve('./src/extension-core/background/background.js'),
    'content-script': path.resolve('./src/extension-core/scripts/index.js')
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
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000
            }
          }
        ]
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
          from: path.resolve('src/extension-core/manifest.json'),
          to: path.resolve('dist')
        },
        {
          from: path.resolve('src/extension-core/styles/loading-spinner.css'),
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
  },
  optimization: {
    splitChunks: {
      chunks (chunk) {
        return chunk.name !== 'content-script'
      }
    }
  }
}
