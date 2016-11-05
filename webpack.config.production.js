const { join } = require('path')
const { readdirSync } = require('fs')
const webpack = require('webpack')
const devConfig = require('./webpack.config.dev')
const CssConfig = devConfig[1]

const NODE_ENV = process.env.NODE_ENV || 'production'
const JS_ENTRY_PATH = 'ui/js/entries'

const JsConfig = () => {
  let entries = readdirSync(join(__dirname, JS_ENTRY_PATH))
    .map((file) => file.split('.')[0])

  return {
    entry: entries.reduce((obj, name) => {
      return Object.assign(obj, {
        [name]: [
          'babel-polyfill',
          join(__dirname, `ui/js/entries/${name}`)
        ]
      })
    }, {}),
    output: {
      path: join(__dirname, 'public/js'),
      filename: '[name].bundle.js',
      publicPath: '/js/'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ],
    module: {
      loaders: [
        {
          test: /\.js$|\.jsx$/,
          loader: 'babel',
          include: __dirname,
          query: {
            presets: [ 'es2015', 'react' ],
            babelrc: false,
            compact: false,
            sourceRoot: __dirname
          }
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    },
    resolve: {
      extensions: [ '', '.js', '.jsx', '.json' ]
    }
  }
}

module.exports = [
  JsConfig(),
  CssConfig
]
