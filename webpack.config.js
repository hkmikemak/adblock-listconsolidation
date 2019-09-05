const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: { index: './src/index.ts' },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: { extensions: ['.ts', '.js'] },
  module: { rules: [{ test: /.ts$/, loader: 'ts-loader' }] },
  watch: true,
  mode: 'production',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  plugins: [
    new TerserPlugin({
      cache: true,
      extractComments: false,
      parallel: true,
      terserOptions: {
        compress: true,
        ecma: 6,
        mangle: true,
        output: {
          beautify: false,
          comments: false
        }
      },
      sourceMap: false
    })
  ],
  externals: [
    (context, request, callback) => {
      if (request === './config.json')
        return callback(null, `commonjs ${request}`);
      else if (request == '7zip-bin' )
        return callback(null, `commonjs ${request}`);
      else
        callback();
    }
  ]
};
