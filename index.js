'use strict';

const getGitInfo = require('git-repo-info');
const path = require('path');
const fs = require('node:fs/promises');

const { JSDOM } = require('jsdom');

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

  config() {
    const appVersion = gitRepoVersion(null, this.project.root);

    return {
      'ember-cli-app-version': {
        appVersion,
      },
    };
  },

  async postBuild(result) {
    let indexHtmlFileNames = ['index.html'];

    if (this.app.tests) {
      indexHtmlFileNames.push('tests/index.html');
    }

    await Promise.all(
      indexHtmlFileNames.map((fileName) => {
        let filePath = path.join(result.graph.outputPath, fileName);

        return writeAppVersion(
          filePath,
          gitRepoVersion(null, this.project.root)
        );
      })
    );
  },
};

async function writeAppVersion(filePath, tagContent) {
  let htmlFile;

  try {
    htmlFile = await fs.readFile(filePath);
  } catch (e) {
    console.warn(`index.html not found:`, JSON.stringify(e));
    return;
  }

  let dom = new JSDOM(htmlFile.toString());

  writeMetaTag(dom.window.document, tagContent);

  await fs.writeFile(filePath, dom.serialize());
}

function writeMetaTag(document, tagContent) {
  let versionMetaElement = document.createElement('meta');
  versionMetaElement.name = 'ember-cli-app-version';
  versionMetaElement.content = tagContent;

  document.head.appendChild(versionMetaElement);
}
