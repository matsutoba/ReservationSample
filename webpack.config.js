const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const historyApiFallback = require("connect-history-api-fallback");

const addon = (app, middleware, option) => {
  app.use(convert(historyApiFallback()));
};

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader', 
          { 
            loader: 'css-loader',
            options: {
              url: true,
            }
          }
        ],
      }
    ]
  },

  plugins: [
    // HTML ファイルの出力設定
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ],

  devServer: {
    //contentBase: path.join(__dirname, 'public'),
    open: true,
    //openPage: 'index.html',
    watchContentBase: true,
    port: 3000,
    historyApiFallback: {
      index: '/'
    }
  }
};