const path = require('path');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');

module.exports = {

  entry: {
    server: './server.ts'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'main.server': path.join(__dirname, 'dist', 'dist-server', 'main.bundle')
    }
  },
  target: 'node',
  
  externals: [
    {"fs": 'require("fs")'},
    /(node_modules|main\..*\.js)/,
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      }
    ]
  },
  plugins: []
}
