import * as webpack from 'webpack';
import * as CompressionPlugin from 'compression-webpack-plugin';
import webpackBase from './webpack.base';

const config: webpack.Configuration = {

  ...webpackBase,

  plugins: [
    new webpack.DefinePlugin({
      /*
      "development" is needed to make tcomb to throw errors.
      As tcomb is our only dep that differs in production this should be harmless
      */
      'process.env.NODE_ENV': JSON.stringify('develoment')
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
