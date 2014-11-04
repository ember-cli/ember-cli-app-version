'use strict';

var execSync = require('exec-sync');
var fs = require('fs');

module.exports = {
  name: 'ember-cli-app-version',
  config: function(env, baseConfig) {
    this._super.config.apply(this, arguments);

    var version;
    try {
      version = execSync('git describe')
    } catch (e) {
      // do nothing
    }

    if (typeof version === 'undefined') {
      try {
        version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
      } catch (e) {
        // do nothing
      }
    }

    if (version) {
      baseConfig.APP.version = version;
    }
  }
};
