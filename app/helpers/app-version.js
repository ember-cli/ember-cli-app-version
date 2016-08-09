import Ember from 'ember';
import config from '../config/environment';

const {
  APP: {
    version
  }
} = config;

export function appVersion() {
  return version;
}

export default Ember.Helper.helper(appVersion);
