import Ember from 'ember';

const { libraries } = Ember;

export default function initializerFactory(name, version) {
  let registered = false;

  return function () {
    if (!registered && name && version) {
      libraries.register(name, version);
      registered = true;
    }
  };
}
