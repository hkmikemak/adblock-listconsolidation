const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.ts"
  },
  externals: [
    (context, request, callback) => {
      if (request === "./config.json") return callback(null, `commonjs ${request}`);
      else if (request === "7zip-bin") return callback(null, `commonjs ${request}`);
      else callback();
    }
  ],
  mode: "production",
  module: {
    rules: [{
      loader: "ts-loader",
      test: /.ts$/
    }]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [new TerserPlugin({
    extractComments: false,
    parallel: true,
    terserOptions: {
      compress: true,
      ecma: 2020,
      mangle: true,
      output: {
        beautify: true,
        comments: false
      }
    }
  })],
  resolve: {
    extensions: [".ts", ".js"]
  },
  target: "node",
  watch: true
};
