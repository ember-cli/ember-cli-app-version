import { helper } from '@ember/component/helper';
import config from '../config/environment';
import { shaRegExp, versionRegExp, versionExtendedRegExp } from 'ember-cli-app-version/utils/regexp';

const {
  APP: {
    version
  }
} = config;

export function appVersion(_, hash = {}) {
  // e.g. 1.0.0-alpha.1+4jds75hf
  
  // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
  hash.versionOnly = hash.versionOnly || hash.hideSha;
  hash.shaOnly = hash.shaOnly || hash.hideVersion;
  
  if (hash.versionOnly) {
    if (hash.showExtended) {
      return version.match(versionExtendedRegExp)[0]; // 1.0.0-alpha.1
    } else {
      return version.match(versionRegExp)[0]; // 1.0.0
    }
  }
  
  if (hash.shaOnly) {
    return version.match(shaRegExp)[0]; // 4jds75hf
  }
  
  return version;
}

export default helper(appVersion);
