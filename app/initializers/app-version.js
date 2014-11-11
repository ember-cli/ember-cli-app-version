import config from '../config/environment';
import Ember from 'ember';
var capitalize = Ember.String.capitalize;

export default {
  name: 'App Version',
  initialize: function(container, application) {
    var appName = capitalize(application.toString());
    Ember.libraries.register(appName, config.APP.version);
  }
}
