"use strict";
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');  //打包文件夹清空
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// var env = process.env.npm_lifecycle_event
const config = {
  mode:'development',
  entry:{
	index:['babel-polyfill',"./src/main.js"],
  },
  output: {
	path: path.resolve(__dirname, 'build'),
    filename: '[name].js'  
  },
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    host: "192.168.19.45",
    port: "8090",
    open: true, // 开启浏览器
    hot: true,   // 开启热更新
    disableHostCheck: true, 
  },
  module:{
    rules:[
      //art-template解析器
      {
        test: /\.art$/, 
        loader: "art-template-loader",
      },
      {
        test:/\.(png|jpg|gif|jpeg|svg)$/,
        use:[
          {
            loader: "url-loader",
            options: {
              name: "[name].[hash:5].[ext]",
              limit: 1024, // size <= 1kib
              outputPath: "images"
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        include:path.resolve(__dirname, 'src'),
        options:{
          presets: ["@babel/preset-env"]
          //outputPath:path.resolve(__dirname, 'build/js'),
        }		
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,  //tip:first css-loader,then MiniCssExtractPlugin.loader,last style-loader;
          'css-loader'
        ]
      },
      { 
        test:/\.scss$/,
        use: [
          'style-loader',
              MiniCssExtractPlugin.loader,		  
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: "assets/fonts"
        }
      }	  
    ], 
  },
  resolve: {
    //extensions: ['.js', '.art', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
	    title: "认证页",
      chunks: ['index'],  // 按需引入对应名字的js文件
      template: "./src/index.html"
    }),
	  // new webpack.ProvidePlugin({
    //   $:'jquery', //所有页面都会引入 _ 这个变量，不用再import引入
    //   ko:'knockout'
    // }),
  	new CleanWebpackPlugin(),
  	new MiniCssExtractPlugin({
      filename: "[name].css",
	    chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([
      {
        from:path.resolve(__dirname, 'src/static/images'),
        to:path.resolve(__dirname, 'build/images'),
      },
      // {
      //   from:path.resolve(__dirname, 'src/static/fonts/font-awesome-4.7.0'),
      //   to:path.resolve(__dirname, 'build/assets/fonts'),
      // },   
    ]),
    new webpack.ProvidePlugin({
      $:'jquery', //所有页面都会引入 _ 这个变量，不用再import引入     
    }),
    // 设置环境变量信息
    new webpack.DefinePlugin({
      'process.env': {
        env: JSON.stringify(process.env.npm_lifecycle_event)
      }
    })
	  //new OptimizeCSSAssetsPlugin({}),
  ],
  node: {
    fs: "empty"
  },
  //watch: true, // 开启监听文件更改，自动刷新
  //watchOptions: {
  //  ignored: /node_modules/, //忽略不用监听变更的目录
  //  aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
  //  poll:1000 //每秒询问的文件变更的次数
  //},
};
module.exports = config;
