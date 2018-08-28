const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');

const devServerOptions = process.argv.find(arg => arg.endsWith('webpack-dev-server'))
  && {
    devServer: { headers: { 'Access-Control-Allow-Origin': '*' } },
    output: { publicPath: 'http://0.0.0.0:8080/' },
  };

module.exports = merge({
  entry: path.join(__dirname, 'src/renderer/index.jsx'),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-export-default-from',
          ],
          presets: ['@babel/env', '@babel/react'],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'renderer.js',
    publicPath: './',
  },
  plugins: [
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      filename: 'index.html',
      template: 'src/renderer/template.html',
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src/renderer'), 'node_modules'],
  },
  target: 'electron-renderer',
}, devServerOptions);
