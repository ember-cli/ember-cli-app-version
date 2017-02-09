import Ember from 'ember';
import config from '../config/environment';

const {
  APP: {
    version
  }
} = config;

export function appVersion(_, hash = {}) {
  if (hash.hideSha) {
    return version.match(/\d[.]\d[.]\d/)[0];
  }

  if (hash.hideVersion) {
    return version.match(/[a-z\d]{8}/)[0];
  }

  return version;
}

export default Ember.Helper.helper(appVersion);
