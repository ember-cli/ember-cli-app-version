'use strict';

const getGitInfo = require('git-repo-info');
const path = require('path');

function gitRepoVersion(options) {
  options = options || {};
  let shaLength = options.shaLength != null ? options.shaLength : 8;
  let includeDate = options.includeDate || false;
  let projectPath = options.projectPath || process.cwd();
  let info = getGitInfo(projectPath);
  let packageVersion = require(path.join(projectPath, 'package.json')).version;

  let prefix;
  if (info.tag && !(packageVersion && info.tag.includes(packageVersion))) {
    prefix = info.tag;
  } else if (packageVersion) {
    prefix = packageVersion;
  } else if (info.branch) {
    prefix = info.branch;
  } else {
    prefix = 'DETACHED_HEAD';
  }

  let sha = '';
  if (shaLength > 0 && info.sha) {
    sha = '+' + info.sha.substring(0, shaLength);
  }

  let authorDate = includeDate ? ' ' + info.authorDate : '';

  return prefix + sha + authorDate;
}

module.exports = {
  name: require('./package').name,
  config(env, baseConfig) {
    let config = this._super.config.apply(this, arguments);

    if (!baseConfig.APP) {
      return config;
    }

    baseConfig.APP.name = this.project.pkg.name;

    if (baseConfig[this.name] && baseConfig[this.name].version) {
      baseConfig.APP.version = baseConfig[this.name].version;
      return config;
    }

    let version = gitRepoVersion(null, this.project.root);
    if (version && baseConfig.APP) {
      baseConfig.APP.version = version;
    }

    return config;
  },
};
