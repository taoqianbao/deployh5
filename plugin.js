const deployh5 = require('./lib/index');
const path = require('path');

module.exports = function(pluginConfig, config, callback) {
  deployh5.publish(path.join(process.cwd(), config.basePath), config, callback);
};
