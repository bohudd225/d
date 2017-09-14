import * as fs from 'fs';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import webpackBase, { paths } from './webpack.base';

const config = JSON.parse(fs.existsSync(`${__dirname}/../config.json`) ? fs.readFileSync(`${__dirname}/../config.json`, 'utf8') : '{}');

function getConfigVariable(value?: string): string {
  return value ? `"${value}"` : 'undefined';
}

export default {

  ...webpackBase,

  output: {
    ...webpackBase.output,
    path: `${paths.DEMO}/build`,
    filename: 'demo.js'
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
      CONTACTHUB_TOKEN: getConfigVariable(config.CONTACTHUB_TOKEN || process.env.CONTACTHUB_TOKEN),
      CONTACTHUB_WORKSPACE_ID: getConfigVariable(config.CONTACTHUB_WORKSPACE_ID || process.env.CONTACTHUB_WORKSPACE_ID),
      CONTACTHUB_NODE_ID: getConfigVariable(config.CONTACTHUB_NODE_ID || process.env.CONTACTHUB_NODE_ID),
      FACEBOOK_CLIENT_ID: getConfigVariable(config.FACEBOOK_CLIENT_ID || process.env.FACEBOOK_CLIENT_ID),
      GOOGLE_CLIENT_ID: getConfigVariable(config.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID),
      LINKEDIN_CLIENT_ID: getConfigVariable(config.LINKEDIN_CLIENT_ID || process.env.LINKEDIN_CLIENT_ID),
      template: `${paths.DEMO}/index.ejs`
    })
  ]

};
