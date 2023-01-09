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
    if (baseConfig.APP) {
      baseConfig.APP.name = this.project.pkg.name;
    }

    return {
      [this.pkg.name]: {
        version: gitRepoVersion(null, this.project.root),
      },
    };
  },
};
