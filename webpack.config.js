const path = require("path");
const Copy = require("copy-webpack-plugin");
const ExtractCss = require("mini-css-extract-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: { path: path.resolve(__dirname, "build"), filename: "js/bundle.js" },
  devServer: {
    port: 3000,
    open: true,
    contentBase: path.join(__dirname, "build"),
    liveReload: true,
    watchContentBase: true
  },
  plugins: [
    new Copy([
      { context: "src/", from: "*.html" },
      { context: "src/img/", from: "*.svg", to: "img/" },
      { context: "src/img/", from: "**/*.png", to: "img/" }
    ]),
    new ExtractCss({ filename: "css/index.css" })
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          ExtractCss.loader,
          { loader: "css-loader", options: { url: false } },
          "sass-loader"
        ]
      },
      { test: /\.(png|svg|jpg|gif)$/, use: ["file-loader"] }
    ]
  }
};
