import config from '../config/environment';
import Ember from 'ember';

export default {
  name: 'App Version',
  initialize: function() {
    Ember.libraries.register('App', config.APP.version);
  }
}
