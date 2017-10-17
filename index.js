/* global module, require */
'use strict';
var fs = require('fs');

module.exports = {
  name: 'ember-cli-app-version',
  config: function(env, baseConfig) {
    var config = this._super.config.apply(this, arguments);

    var version = require('git-repo-version')(null, this.project.root);
    let gitCommand = "git log --max-count=1 --format='%aI'";
    let gitCommitDate = require('child_process').execSync(gitCommand).toString().trim();
    if (version && gitCommitDate && baseConfig.APP) {
      baseConfig.APP.name = this.project.pkg.name;
      baseConfig.APP.version = version + " " + gitCommitDate;
    }

    return config;
  }
};
