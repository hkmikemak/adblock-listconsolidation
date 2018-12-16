const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
    // new UglifyJsPlugin({
    //   parallel: true,
    //   uglifyOptions: {
    //     ecma: 6,
    //     compress: true,
    //     output: {
    //       comments: false,
    //       ecma: 6
    //     }
    //   }
    // })
  ],
  externals: [
    (context, request, callback) => {
      if (request === './config.json')
        return callback(null, `commonjs ${request}`);
      else
        callback();
    }
  ]
};
