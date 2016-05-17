'use strict';

// Depends
var path              = require('path');
var webpack           = require('webpack');
var autoprefixer      = require('autoprefixer-core');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

// var NODE_ENV = process.env.NODE_ENV || "production";
// var DEVELOPMENT  = NODE_ENV === "production" ? false : true;
var stylesLoader = 'css-loader?sourceMap!postcss-loader!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true';

const paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
};

module.exports = {
  // entry points
  entry: {
    vendor: path.resolve(path.join(paths.src, '/app/index.vendor.js')),
    app: path.resolve(path.join(paths.src, '/app/index.bootstrap.js')),
    // polyfill: 'babel-polyfill'
  },

  // output system
  output: {
    path: paths.dist,
    filename: '[name].js',
    publicPath: '/'
  },

  // resolves modules
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules'],
    alias: {
      _appRoot:     path.join(paths.src, 'app'),
      _images:      path.join(paths.src, 'app', 'assets', 'images'),
      _stylesheets: path.join(paths.src, 'app', 'assets', 'styles'),
      _scripts:     path.join(paths.src, 'app', 'assets', 'js')
    }
  },

  // modules resolvers
  module: {
    noParse: [],
    loaders: [{
      test: /\.html$/,
      loaders: [
        'ngtemplate-loader?relativeTo='+ paths.src,
        'html-loader?attrs[]=img:src&attrs[]=img:data-src'
      ]
    }, {
      test: /\.js$/,
      loaders: [
        'baggage-loader?[file].html&[file].css'
      ]
    }, {
      test: /\.js$/,
      include: [
        path.resolve(path.join(paths.src, "app")),
      ],
      loaders: [
        'ng-annotate-loader'
      ]
    }, {
      test: /\.js$/,
      include: [
        path.resolve(path.join(paths.src, "app")),
      ],
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
        plugins: ['transform-runtime', 'add-module-exports'],
        presets: ['angular', 'es2017']
      }
    }, {
      test: /\.css$/,
      loaders: [
        'style-loader',
        'css-loader?sourceMap',
        'postcss-loader'
      ]
    },
    // {
    //   test: /\.(scss|sass)$/,
    //   loader: ('style-loader!' + stylesLoader)
    // },
    {
      test: /\.(woff2|woff|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loaders: [
        "url-loader?name=assets/fonts/[name]_[hash].[ext]"
      ]
    },
    {
      test: /\.(jpe?g|png|gif)$/i,
      loaders: [
        'url-loader?name=assets/images/[name]_[hash].[ext]&limit=10000'
      ]
    },
    {
      test: require.resolve("angular"),
      loaders: [
        "expose?angular"
      ]
    },

    ]
  },

  // post css
  postcss: [autoprefixer({ browsers: ['last 5 versions'] })],

  // load plugins
  plugins: [
    //new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|hu/),
    // new webpack.DefinePlugin({
    //   'NODE_ENV': JSON.stringify(NODE_ENV)
    // }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.NoErrorsPlugin(),
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin({
      moveToParents: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      async: true,
      children: true,
      minChunks: Infinity
    }),
    // new ExtractTextPlugin('assets/styles/css/[name]' + '.[chunkhash].css', { allChunks: true }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(paths.src, 'index.html')
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   minimize: true,
    //   warnings: false,
    //   sourceMap: true
    // })
  ],

  devtool: 'source-map'
};
