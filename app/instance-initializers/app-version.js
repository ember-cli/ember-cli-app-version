import Ember from 'ember';
import config from '../config/environment';

const { String } = Ember;
const { classify } = String;
const { APP } = config;
const { name } = APP;

let registered = false;

export default {
  name: 'App Version',
  initialize: function(application) {
    if (!registered && name) {
      var appName = classify(name);
      Ember.libraries.register(name, config.APP.version);
      registered = true;
    }
  }
}
