'use strict';

const getGitInfo = require('git-repo-info');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { JSDOM } = require('jsdom');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

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

    let version = gitRepoVersion(null, this.project.root);

    if (baseConfig[this.name] && baseConfig[this.name].storeVersionInMeta) {
      this._versionForMetaTag = version;
      return config;
    }

    if (baseConfig[this.name] && baseConfig[this.name].version) {
      baseConfig.APP.version = baseConfig[this.name].version;
      return config;
    }

    if (version && baseConfig.APP) {
      baseConfig.APP.version = version;
    }

    return config;
  },

  async postBuild(result) {
    if (this._versionForMetaTag) {
      let indexHtmlFileNames = ['index.html'];

      if (this.app.tests) {
        indexHtmlFileNames.push('tests/index.html');
      }

      await Promise.all(
        indexHtmlFileNames.map((fileName) => {
          let filePath = path.join(result.graph.outputPath, fileName);

          return writeMetaTags(
            filePath,
            this.modulePrefix,
            this._versionForMetaTag
          );
        })
      );
    }
  },
};

async function writeMetaTags(filePath, tagName, tagContent) {
  let htmlFile;

  try {
    htmlFile = await readFile(filePath);
  } catch (e) {
    console.warn(`index.html not found:`, JSON.stringify(e));
    return;
  }

  let dom = new JSDOM(htmlFile.toString());

  let versionMetaElement = dom.window.document.createElement('meta');
  versionMetaElement.name = tagName;
  versionMetaElement.content = tagContent;

  dom.window.document.head.appendChild(versionMetaElement);

  await writeFile(filePath, dom.serialize());
}
