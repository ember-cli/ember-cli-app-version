import Ember from 'ember';

const { classify } = Ember.String;

export default function initializerFactory(name, version) {
  let registered = false;

  return function() {
    if (!registered && name && version) {
      var appName = classify(name);
      Ember.libraries.register(appName, version);
      registered = true;
    }
  };
}
