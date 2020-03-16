const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'ui/src/index.js'),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules|backend/,
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
      template: path.resolve(__dirname, 'ui/src/index.html'),
      filename: 'index.html',
    }),
  ],
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: 'async',
      name: false,
    },
  },
  output: {
    path: path.resolve(__dirname, 'ui/dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    enforceExtension: false,
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      Components: path.resolve(__dirname, 'ui/src/js/components/'),
      Services: path.resolve(__dirname, 'ui/src/js/services/'),
      Actions: path.resolve(__dirname, 'ui/src/js/actions/'),
      Selectors: path.resolve(__dirname, 'ui/src/js/selectors/'),
      Reducers: path.resolve(__dirname, 'ui/src/js/reducers/'),
    },
  },
};
