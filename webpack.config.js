// This config file is for development setup using
// webpack-dev-server.

const webpack = require('webpack');

module.exports = {
  entry: {
    example: './examples/index.js',
    test: './test/index.js'
  },
  output: {
    path: './dist',
    publicPath: '/dist/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(ttf|svg|woff2|woff|eot)$/,
        loader: 'url?limit=100&name=[path][name].[hash:6].[ext]'
      }
    ]
  },
  vue: {
    autoprefixer: {
      browsers: ['last 2 versions']
    }
  }

};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
}
