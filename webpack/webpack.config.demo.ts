import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import webpackBase, { paths } from './webpack.base';

export default {
  
  ...webpackBase,

  output: {
    ...webpackBase.output,
    path: `${paths.DEMO}/build`,
    filename: 'demo.js'
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.js']
  },

  devServer: {
    contentBase: `${paths.DEMO}/build`,
    inline: true,
    host: '0.0.0.0',
    port: '8080'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false, screw_ie8: true },
      comments: false,
      sourceMap: true
    }),
    new HtmlWebpackPlugin({
      template: `${paths.DEMO}/index.ejs`
    })
  ]

};
