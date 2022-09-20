const HtmlWebpackPlugin = require("html-webpack-plugin");
 const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
 const isProd = process.env.NODE_ENV === "production";
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
 const ESLintPlugin = require('eslint-webpack-plugin');

 const path = require("path");
 const { dirname } = require("path");
 const buildPath = path.resolve(__dirname, "dist");
 const publicPath = path.resolve(__dirname, "public");
 const srcPath = path.resolve(__dirname, "src")
 module.exports = {
  entry: path.resolve(srcPath, "index.tsx"),
  output: {
   path: buildPath,
   publicPath: "/",
   filename: "bundle.js",
  },

  target: process.env.NODE_ENV === "development" ?
  "web" : "browserslist",

  mode: isProd ? "production" : "development",

  devtool: isProd ? "hidden-source-map" : "eval-source-map",

  plugins: [
    new HtmlWebpackPlugin({
     template: path.join(publicPath, "index.html"),
     favicon: path.join(publicPath, "favicon.ico"),
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
     filename: "[name]-[hash].css"
    }),
    new ForkTsCheckerPlugin(),
    new ESLintPlugin(),
   ].filter(Boolean),
  
  module: {
   rules: [
    {
     test: /\.([jt])sx?$/,
     use: "babel-loader"
    },
    {
     test: /\.s?css$/,
     exclude: /\.module\.s?css$/,
     use: [
       isProd ? MiniCssExtractPlugin.loader : "style-loader",
       "css-loader", 
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: ["autoprefixer"]
            }
          }
        }, 
        "sass-loader"
      ]
    },
    {
     test: /\.module\.s?css$/,
     use: [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      {
       loader: "css-loader",
       options: {
        modules: {
         localIdentName:!isProd ? "[path][name]__[local]" : "[hash:base64]"
        }
       }
      },
      {
       loader: "postcss-loader",
       options: {
        postcssOptions: {
         plugins: ["autoprefixer"]
        }
       }
      },
      "sass-loader"]
    },
    {
     test: /\.(png|svg|jpg)$/,
     type: "asset/resource",	// Наиболее подходящий из ассетов
    }
   ]
  },
  
  devServer: {
   host: "127.0.0.1",
   port: 9002,
   hot: true,
   historyApiFallback: true,
  },
  
  resolve: {
   extensions: [".jsx", ".js", ".tsx", ".ts"],

   alias: {
    components: path.resolve(__dirname, 'src/components/'),
    pages: path.resolve(__dirname, 'src/pages/'),
    config: path.resolve(__dirname, 'src/config/'),
    styles: path.resolve(__dirname, 'src/styles/'),
    store: path.resolve(__dirname, 'src/store/'),
    utils: path.resolve(__dirname, 'src/utils/'),
    assets: path.resolve(__dirname, 'src/assets/'),
   }
  },
 }