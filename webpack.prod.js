const config = require('./webpack.config.js');

module.exports = {
  ...config,
  mode: 'production',
  output: {
    ...config.output,
    publicPath: '', 
  }
};