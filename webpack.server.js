const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  entry: {
    server: path.resolve(__dirname, 'backend/server.js'),
    migrate: path.resolve(__dirname, 'backend/db/init.js'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  externals: [nodeExternals()],
};
