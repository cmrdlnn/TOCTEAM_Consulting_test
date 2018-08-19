const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'app/src/renderer_process.jsx'),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        loaders: ['style-loader', 'less-loader'],
      },
      {
        test: /\.(png|svg)$/,
        loaders: 'file-loader',
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'app/build'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'app/src'), 'node_modules'],
  },
  target: 'electron-renderer',
  watch: true,
};
