import * as webpack from 'webpack';
import * as CompressionPlugin from 'compression-webpack-plugin';
import webpackBase from './webpack.base';

const config: webpack.Configuration = {

  ...webpackBase,

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false, screw_ie8: true },
      comments: false,
      sourceMap: true
    }),
    new CompressionPlugin({
      regExp: /\.js$/
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ]

};

export default config;
