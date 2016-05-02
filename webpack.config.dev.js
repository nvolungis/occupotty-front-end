var webpack               = require("webpack");
var WebpackNotifierPlugin = require("webpack-notifier");
var HtmlWebpackPlugin     = require("html-webpack-plugin");
var ExtractTextPlugin     = require("extract-text-webpack-plugin");
var path                  = require("path");

babelOptions = {
  cacheDirectory: true,
  presets: ["es2015", "stage-0", "react"],
  plugins: ["transform-decorators-legacy"]
}

var webpackConfig = {
  entry: {
    app: [
      "webpack-dev-server/client?http://localhost:9898", // WebpackDevServer host and port
      "webpack/hot/only-dev-server",
      "./app/index.jsx"
    ],
    vendor: "./app/vendors/index.js"
  },
  devServer: {
    port: 9898,
    host: '0.0.0.0',
    historyApiFallback: true,
    publicPath: '/',
    contentBase: "./build/dev_build"
  },
  output: {
    publicPath: "/",
    path: "./build/dev_build",
    filename: "app.bundle-[hash].js"
  },
  devtool: "eval-source-map",
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
        loader: "style-loader!css-loader?modules"
      },
      { // a non-module build for global-default dep css
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        loader: "style-loader!css-loader?modules!stylus-loader"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [ "file" ]
      },
      {test: /\.mp3/, loader: "file"},
      {test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
    ],

    postLoaders: [
      { loader: "transform?brfs" }
    ]
  },
  resolve: {

    // Needed so you can require("a") instead of require("a.jsx")
    extensions: ["", ".js", ".jsx", ".json", ".css", ".styl"],

    // Let us do things like require("app/reducers/application")
    root: __dirname,

    // Whenever someone does import "react", resolve the one in the node_modules
    // at the top level, just in case a dependency also has react in its node_modules,
    // we don't want to be running to versions of react!!!
    alias: {
      react: path.join(__dirname, "node_modules/react")
    }
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.bundle-[hash].js", minChunks: Infinity}),
    new HtmlWebpackPlugin({
      template: "./app/assets/index.template.html"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ]
};


module.exports = webpackConfig;
