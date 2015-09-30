import Ember from 'ember';

var classify = Ember.String.classify;

export default function initializerFactory(name, version) {
  var registered = false;

  return function() {
    if (!registered && name && version) {
      var appName = classify(name);
      Ember.libraries.register(appName, version);
      registered = true;
    }
  };
}
