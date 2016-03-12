// const webpack = require('karma-webpack');

module.exports = function karmaConfig(config) {
  config.set({
    files: [
      'webpack.tests.js'
    ],
    // plugins: [
    //   webpack,
    //   'karma-jasmine',
    //   'karma-spec-reporter',
    //   'karma-phantomjs-launcher'
    // ],
    browsers: ['Chrome', 'PhantomJS'],
    frameworks: ['jasmine'],
    preprocessors: {
      'webpack.tests.js': ['webpack']
    },
    reporters: ['spec'],
    specReporter: {
      maxLogLines: 5,         // limit number of lines logged per test
      suppressErrorSummary: true,  // do not print error summary
      suppressFailed: false,  // do not print information about failed tests
      suppressPassed: false,  // do not print information about passed tests
      suppressSkipped: true,  // do not print information about skipped tests
      showSpecTiming: false // print the time elapsed for each spec
    },
    webpack: {
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
      }
    },
    webpackMiddleware: {
      noInfo: true
    }
  });
};
