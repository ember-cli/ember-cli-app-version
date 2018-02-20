import { helper } from '@ember/component/helper';
import config from '../config/environment';
import { shaRegExp, versionRegExp, versionExtendedRegExp } from 'ember-cli-app-version/utils/regexp';

const {
  APP: {
    version
  }
} = config;

export function makeHelper(version) {
  return function appVersion(_, hash = {}) {
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    hash.versionOnly = hash.versionOnly || hash.hideSha;
    hash.shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (hash.versionOnly) {
      if (hash.showExtended) {
        match = version.match(versionExtendedRegExp); // 1.0.0-alpha.1
      } else {
        match = version.match(versionRegExp); // 1.0.0
      }
    }

    if (hash.shaOnly) {
      match = version.match(shaRegExp); // 4jds75hf
    }

    return match?match[0]:version;
  };
}

export default helper(appVersion);
