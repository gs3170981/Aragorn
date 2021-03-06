const path = require('path');
const { ContextReplacementPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';

module.exports = {
  target: 'electron-main',
  entry: {
    index: path.resolve(__dirname, './src/index.ts'),
    preload: path.resolve(__dirname, './src/preload.ts')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist/main')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [path.resolve(__dirname, './'), 'node_modules', 'src']
  },
  node: {
    __dirname: false,
    __filename: false
  },
  devtool: devMode ? 'source-map' : 'none',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        enforce: 'pre',
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([{ from: path.resolve(__dirname, './assets'), to: path.resolve(__dirname, './dist/assets') }]),
    new ContextReplacementPlugin(/any-promise/)
  ]
};
