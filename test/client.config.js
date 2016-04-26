var config = require('../config');

module.exports = config => {
  config.set({
    frameworks: ['browserify', 'mocha'],
    browsers: ['PhantomJS'],
    files: ['client/**/*.spec.js'],
    preprocessors: {
      'client/**/*.spec.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: [
        ['envify', Object.assign({ _: 'purge' }, config.env)]
      ]
    }
  });
};
