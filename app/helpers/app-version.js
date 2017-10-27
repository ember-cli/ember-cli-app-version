import Ember from 'ember';
import config from '../config/environment';
import { shaRegExp, versionRegExp, dateRegExp } from 'ember-cli-app-version/utils/regexp';

const {
  APP: {
    version
  }
} = config;

export function appVersion(_, hash = {}) {
  let displayVersion = "";

  if (!hash.hideVersion) {
    displayVersion = version.match(versionRegExp)[0];
  }

  if (!hash.hideSha) {
    if (displayVersion) {
      displayVersion += "+";
    }
    displayVersion += version.match(shaRegExp)[0];
  }

  if (hash.showDate) {
    if (displayVersion) {
      displayVersion += " ";
    }
    displayVersion += version.match(dateRegExp)[0];
  }

  return displayVersion;
}

export default Ember.Helper.helper(appVersion);
