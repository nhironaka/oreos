const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const parts = require('./webpack.parts');

module.exports = {
  ...parts.generateSourceMaps({ type: 'inline-source-map' }),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
  resolve: {
    enforceExtension: false,
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      Components: path.resolve(__dirname, 'src/js/components/'),
      Services: path.resolve(__dirname, 'src/js/services/'),
    },
  },
  devServer: {
    compress: false,
    hotOnly: true,
    port: 3000,
  },
};
