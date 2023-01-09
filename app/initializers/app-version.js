import initializerFactory from 'ember-cli-app-version/initializer-factory';
import config from '../config/environment';

let name, version;
if (config.APP) {
  if (config[config.APP.name]?.storeVersionInMeta) {
    config.APP.version = document.head.querySelector(
      `meta[name="${config.APP.name}"]`
    ).content;
  }

  name = config.APP.name;
  version = config.APP.version;
}

export default {
  name: 'App Version',
  initialize: initializerFactory(name, version),
};
