const merge = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  devServer: {
    overlay: true,
    compress: false,
    port: 5000,
  },
});
