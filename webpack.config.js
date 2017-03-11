var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'app', 'frontend', 'javascripts'),
  entry: './entry.js',
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'react'] },
        }],
      },
    ],
  },
};
