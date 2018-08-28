const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/main/index.js'),
  target: 'electron-main',
};
