import * as path from 'path';

export const paths = {
  SRC: path.resolve(__dirname, '../src'),
  DIST: path.resolve(__dirname, '../dist'),
  DEMO: path.resolve(__dirname, '../demo')
};

export default {

  entry: `${paths.SRC}/index.ts`,

  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.js']
  },

  output: {
    library: 'ContacthubConnectSocial',
    libraryTarget: 'var' as 'var',
    path: paths.DIST,
    filename: 'contacthub-connect-social.min.js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: [
          paths.SRC
        ]
      }
    ]
  }

};
