import Ember from 'ember';
import config from '../config/environment';

const {
  APP: {
    version
  }
} = config;

export function makeHelper(version) {
  return function appVersion(_, hash = {}) {
    let versionArray = version.split('+')
    let plainVersion = versionArray[0]
    let buildHash = ''
    if (versionArray.length > 1) {
      buildHash = versionArray[1]
    }
    if (hash.hideSha) {
      return plainVersion;
    } else if (hash.hideVersion) {
      return buildHash;
    } else {
      return version;
    }
  }
}

export default Ember.Helper.helper(makeHelper(version));
