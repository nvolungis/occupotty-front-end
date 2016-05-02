var webpack               = require("webpack");
var WebpackNotifierPlugin = require("webpack-notifier");
var HtmlWebpackPlugin     = require("html-webpack-plugin");
var ExtractTextPlugin     = require("extract-text-webpack-plugin");
var path                  = require("path");

var devServer;
if (process.env.WEBPACK_DEV_SERVER) {
  devServer = {
    contentBase: "./build/prod_build"
  };
}

babelOptions = {
  cacheDirectory: true,
  presets: ["es2015", "stage-0", "react"],
  plugins: ["transform-decorators-legacy"]
}

var webpackConfig = {
  entry: {
    app: [
      "./app/index.jsx"
    ],
    vendor: "./app/vendors/index.js"
  },
  output: {
    path: "./build/prod_build",
    publicPath: "/",
    filename: "app.bundle-[chunkhash].js",
  },
  devServer: devServer,
  module: {
    loaders: [
      // IMPORTANT: we don"t want to process EVERY single JS file with babel
      // loader. We only want to process the files inside our app structure
      // otherwise this could get very slow or even fail.
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          "react-hot-loader",
          "babel-loader?" + JSON.stringify(babelOptions)
        ],
      },

      {test: /\.json$/, loader: "json-loader"},
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules")
      },
      { // a non-module build for global-default dep css
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules!stylus-loader")
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          "file",
          "image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=true&progressive=true"
        ]
      },
      {test: /\.mp3/, loader: "file"},
      {test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
    ]
  },
  resolve: {
    // Needed so you can require("a") instead of require("a.jsx")
    extensions: ["", ".js", ".jsx", ".json", ".styl"],
    // Let us do things like require("app/reducers/application")
    root: __dirname,
    alias: {
      react: path.join(__dirname, "node_modules/react")
    }
  },
  plugins: [
    new ExtractTextPlugin("app.bundle-[chunkhash].css", {allChunks: true}),
    new WebpackNotifierPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.bundle-[chunkhash].js", minChunks: Infinity}),
    new HtmlWebpackPlugin({
      template: "./app/assets/index.template.html"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
};


module.exports = webpackConfig;
