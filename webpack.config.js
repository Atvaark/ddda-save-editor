const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const directories = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  node_modules: path.resolve(__dirname, 'node_modules')
};

module.exports = {
  context: directories.src,
  entry: './index.jsx',
  output: {
    path: directories.dist,
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dragon\'s Dogma Savegame Editor'
    })
  ],
  resolve: {
    root: [
      directories.src,
      directories.node_modules
    ]
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', include: directories.src },
      { test: /\.jsx?$/, loaders: ['babel-loader'], include: directories.src },
      { test: /\.css$/, loaders: ['style', 'css'], include: directories.src },
      { test: /\.css$/, loader: 'style-loader!css-loader', exclude: directories.src },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ],
  },
};
