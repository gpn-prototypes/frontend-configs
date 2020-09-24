const nested = require('postcss-nested');

module.exports = function createPostcssConfig() {
  return {
    modules: false,
    postcssOptions: {
      plugins: [nested()],
    },
  };
};
