import * as path from 'path';

export const paths = {
  SRC: path.resolve(__dirname, '../src'),
  DIST: path.resolve(__dirname, '../dist')
};

export default {

  entry: `${paths.SRC}/index.ts`,

  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts']
  },

  output: {
    library: 'SocialAutofill',
    libraryTarget: 'var' as 'var',
    path: paths.DIST,
    filename: 'app.[hash].js'
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
