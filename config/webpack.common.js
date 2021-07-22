const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Production',
        template:'./src/index.html',
        inject:false
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      })
    ],
    devServer: {
      contentBase: './dist',
    },
    output: {
      filename: './bundle.js',
      path: path.resolve(__dirname, '../dist'),
      clean:true,
      publicPath: './',
    },
    optimization: {
      minimize: true,
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        // `...`,
        new CssMinimizerPlugin(),
      ],
    },
    module: {
        rules: [
            // Babel Loader
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  cacheDirectory:true,
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/plugin-proposal-object-rest-spread']
                }
              }
            },

            {
              test: /.s?css$/,
              use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
          // Asset Management for import Images as modules
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          // Asset Management for loading Fonts
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
          },
          // Asset Management for loading JSON, XML files
          {
            test: /\.(csv|tsv)$/i,
            use: ['csv-loader'],
          },
          {
            test: /\.xml$/i,
            use: ['xml-loader'],
          },
        ]
      }
};